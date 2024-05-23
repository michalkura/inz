import csv

import matplotlib
import networkx as nx
import pandas as pd
import reflex as rx
from PIL import Image
from matplotlib import pyplot as plt


def set_task_times(edges_data: list[tuple[str, str, dict[str, int | float]]]):
    for edge in edges_data:
        edge[2]["time"] = (4 * edge[2]["most_likely_time"] + edge[2]["pessimistic_time"] + edge[2][
            "optimistic_time"]) / 6
        edge[2]["task_variance"] = (edge[2]["pessimistic_time"] + edge[2]["optimistic_time"]) / 6
    return list(edges_data)


class PERT_graph(rx.Base):
    edges_data: list[tuple[str, str, dict[str, int | float]]]
    nodes_data: list[tuple[str, dict[str, int | float]]]

    def __init__(self):
        # self.load_graph_from_csv("data.csv")
        edges_data = [
            ("1", "2", {"most_likely_time": 2.0, "optimistic_time": 1.0, "pessimistic_time": 0.0},),
            ("1", "3", {"most_likely_time": 5.0, "optimistic_time": 4.0, "pessimistic_time": 0.0},),
            ("2", "3", {"most_likely_time": 1.0, "optimistic_time": 0.5, "pessimistic_time": 0.0},),
            ("2", "4", {"most_likely_time": 6.0, "optimistic_time": 5.0, "pessimistic_time": 0.0},),
            ("3", "4", {"most_likely_time": 4.0, "optimistic_time": 3.0, "pessimistic_time": 0.0},),
            ("4", "5", {"most_likely_time": 2.0, "optimistic_time": 1.0, "pessimistic_time": 0.0},)
        ]
        nodes_data = [(1, {}), (2, {}), (3, {}), (4, {}), (5, {})]
        edges_data = set_task_times(edges_data)
        super().__init__(
            edges_data=edges_data,
            nodes_data=nodes_data
        )

    def set_task_times(self):
        for edge in self.edges_data:
            edge[2]["time"] = (4 * edge[2]["most_likely_time"] + edge[2]["pessimistic_time"] + edge[2][
                "optimistic_time"]) / 6
            edge[2]["task_variance"] = (edge[2]["pessimistic_time"] + edge[2]["optimistic_time"]) / 6

    def set_nodes_data(self, nodes_data: list[tuple[str, dict[str, int | float]]]):
        self.nodes_data = nodes_data

    def set_edges_data(self, edges_data: list[tuple[str, str, dict[str, int | float]]]):
        self.edges_data = edges_data

    def set_data_from_graph(self, g: nx.DiGraph):
        self.set_edges_data(list(nx.edges(g).data()))
        self.set_nodes_data(list(g.nodes(data=True)))
        self.set_task_times()

    def get_graph_from_data(self) -> nx.DiGraph:
        self.set_task_times()
        G = nx.DiGraph(self.edges_data)
        G.add_nodes_from(self.nodes_data)
        return G

    def set_early_start_finish(self):
        G = self.get_graph_from_data()
        nodes_order = list(nx.topological_sort(G))
        for node in nodes_order:
            early_start = 0
            for predecessor in G.predecessors(node):
                early_start = max(early_start, G.nodes[predecessor]["early_start"] + G.edges[predecessor, node]["time"])
            G.nodes[node]["early_start"] = early_start

        G.nodes[nodes_order[-1]]["late_start"] = G.nodes[nodes_order[-1]]["early_start"]
        G.nodes[nodes_order[-1]]["slack_time"] = 0
        self.set_data_from_graph(G)

    def set_late_start_finish(self):
        G = self.get_graph_from_data()
        nodes_order = list(nx.topological_sort(G))
        nodes_order.reverse()
        for node in nodes_order[1:]:
            late_start = float("inf")
            for successor in G.successors(node):
                late_start = min(G.nodes[successor]["late_start"] - G.edges[node, successor]["time"], late_start)

            G.nodes[node]["late_start"] = late_start
            G.nodes[node]["slack_time"] = late_start - G.nodes[node]["early_start"]
        self.set_data_from_graph(G)

    def is_directed_acyclic_graph(self):
        G = self.get_graph_from_data()
        return nx.is_directed_acyclic_graph(G)

    def add_node(self, task_name):
        G = self.get_graph_from_data()
        G.add_node(task_name)
        self.set_data_from_graph(G)

    def remove_node(self, task_name):
        G = self.get_graph_from_data()
        G.remove_node(task_name)
        self.set_data_from_graph(G)

    def remove_edge(self, predecessor, successor):
        G = self.get_graph_from_data()
        G.remove_edge(predecessor, successor)
        self.set_data_from_graph(G)

    def add_edge(self, task_predecessor, task_successor, most_likely_time, optimistic_time, pessimistic_time):
        G = self.get_graph_from_data()
        G.add_edge(task_predecessor, task_successor, most_likely_time=most_likely_time, optimistic_time=optimistic_time,
                   pessimistic_time=pessimistic_time)
        if not nx.is_directed_acyclic_graph(G):
            G.remove_edge(task_predecessor, task_successor)
        self.set_data_from_graph(G)

    def get_nodes_list(self):
        G = self.get_graph_from_data()
        return list(G.nodes())

    def get_edges_list_string(self):
        G = self.get_graph_from_data()
        return [str(edge[0]) + "->" + str(edge[1]) for edge in G.edges()]

    def recalculate_graph(self):
        self.set_early_start_finish()
        self.set_late_start_finish()

    def get_node_attribute(self, attribute_name):
        G = self.get_graph_from_data()
        return nx.get_node_attributes(G, attribute_name, default=0)

    def get_pd_dataframe(self) -> pd.DataFrame:
        self.recalculate_graph()
        G = self.get_graph_from_data()
        df = pd.DataFrame.from_dict(dict(G.nodes(data=True)), orient="index")
        df.replace(True, "X", inplace=True)
        df.reset_index(inplace=True)
        df = df.round(2)
        return df

    def export_graph_img(self, layout="layer") -> Image:
        self.recalculate_graph()
        G = self.get_graph_from_data()

        match layout:
            case "layer":
                pos = self.get_layered_pos()
            case "planar":
                pos = nx.planar_layout(G)
                # graph is not planar
            case "graphviz":
                pos = nx.nx_pydot.graphviz_layout(G, prog="dot")
                # graphviz not installed
            case "bfs_layout":
                pos = nx.bfs_layout(G, start=list(nx.topological_sort(G))[0])
                # nodes are not connected
            case "random":
                pos = nx.random_layout(G)
            case _:
                pos = self.get_layered_pos()

        edge_labels = nx.get_edge_attributes(G, "time")
        for k, v in edge_labels.items():
            edge_labels[k] = round(v, 2)
        matplotlib.use("AGG")
        fig, ax = plt.subplots(figsize=(20, 10))

        longest_path = nx.dag_longest_path(G, weight="time")
        critical_path = [(longest_path[i], longest_path[i + 1]) for i in range(len(longest_path) - 1)]
        colors = ["red" if e in critical_path else "black" for e in G.edges]
        nx.draw_networkx(G, pos=pos, ax=ax, edge_color=colors)
        nx.draw_networkx_edge_labels(G, pos, edge_labels, rotate=False)
        fig.canvas.draw()
        img = Image.frombytes("RGB", fig.canvas.get_width_height(), fig.canvas.tostring_rgb())
        plt.close()
        return img

    def get_layered_pos(self):
        G = self.get_graph_from_data()
        for layer, nodes in enumerate(nx.topological_generations(G)):
            # `multipartite_layout` expects the layer as a node attribute, so add the
            # numeric layer value as a node attribute
            for node in nodes:
                G.nodes[node]["layer"] = layer

        # Compute the multipartite_layout using the "layer" node attribute
        return nx.multipartite_layout(G, subset_key="layer")

    def export_csv_file(self):
        csv_string = "predecessor,successor,most_likely_time,optimistic_time,pessimistic_time\r\n"
        for edge in self.edges_data:
            csv_string += (f"{edge[0]},{edge[1]},{edge[2]['most_likely_time']},{edge[2]['optimistic_time']},"
                           + f"{edge[2]['pessimistic_time']}\r\n")
        return csv_string

    def reset_graph(self):
        self.set_edges_data([])
        self.set_nodes_data([("0", {})])
