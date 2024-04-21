import csv
import json
import os

import matplotlib
import networkx as nx
import pandas as pd
import reflex as rx
from PIL import Image
from matplotlib import pyplot as plt
from netgraph import Graph as gdraw

nodeColor = 'Blue'
nodeSize = 20
lineWidth = 2
lineColor = '#000000'


def get_graph_from_json(edges: object, nodes: object) -> nx.DiGraph:
    G = nx.from_dict_of_lists(edges, create_using=nx.DiGraph)
    nx.set_node_attributes(G, nodes)
    return G


class PERT_graph(rx.Base):
    edges_data: list[tuple[str, str, dict[str, int | float]]]
    nodes_data: list[tuple[str, dict[str, int | float]]]

    def __init__(self):
        # self.load_graph_from_csv('data.csv')
        edges_data = [('1', '2', {'time': 2}), (1, 3, {'time': 2}),
                      ('2', '3', {'time': 2}), (2, 4, {'time': 3}),
                      ('3', '4', {'time': 4}), (4, 5, {'time': 1})]
        nodes_data = [(1, {}), (2, {}), (3, {}), (4, {}), (5, {})]

        super().__init__(
            edges_data=edges_data,
            nodes_data=nodes_data
        )

    def set_nodes_data(self, nodes_data: list[tuple[str, dict[str, int | float]]]):
        self.nodes_data = nodes_data

    def set_edges_data(self, edges_data: list[tuple[str, str, dict[str, int | float]]]):
        self.edges_data = edges_data

    def set_data_from_graph(self, g: nx.DiGraph):
        self.edges_data = nx.edges(g).data()
        self.nodes_data = g.nodes(data=True)

    def get_graph_from_data(self) -> nx.DiGraph:
        G = nx.DiGraph(self.edges_data)
        G.add_nodes_from(self.nodes_data)
        return G

    def set_early_start_finish(self):
        G = self.get_graph_from_data()
        nodes_order = list(nx.topological_sort(G))
        for node in nodes_order:
            early_start = 0
            for predecessor in G.predecessors(node):
                early_start = max(early_start, G.nodes[predecessor]['early_start'] + G.edges[predecessor, node]['time'])
            G.nodes[node]['early_start'] = early_start

        G.nodes[nodes_order[-1]]['late_start'] = G.nodes[nodes_order[-1]]['early_start']
        G.nodes[nodes_order[-1]]['slack_time'] = 0
        self.set_data_from_graph(G)

    def set_late_start_finish(self):
        G = self.get_graph_from_data()
        nodes_order = list(nx.topological_sort(G))
        nodes_order.reverse()
        for node in nodes_order[1:]:
            late_start = float('inf')
            for successor in G.successors(node):
                late_start = min(G.nodes[successor]['late_start'] - G.edges[node, successor]['time'], late_start)

            G.nodes[node]['late_start'] = late_start
            G.nodes[node]['slack_time'] = late_start - G.nodes[node]['early_start']
        self.set_data_from_graph(G)

    # def set_critical_edges(self):
    #     G = self.get_graph_from_data()
    #     for edge in G.edges:
    #         G.edges[edge]['critical'] = (
    #                 G.nodes[edge[1]]['early_start'] - G.nodes[edge[0]]['early_start'] == G.edges[edge]['time'])
    #     self.set_data_from_graph(G)

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

    def add_edge(self, task_predecessor, task_successor, edge_time):
        G = self.get_graph_from_data()
        G.add_edge(task_predecessor, task_successor, time=edge_time)
        if not nx.is_directed_acyclic_graph(G):
            G.remove_edge(task_predecessor, task_successor)
        self.set_data_from_graph(G)

    def get_nodes_list(self):
        G = self.get_graph_from_data()
        return list(G.nodes())

    def get_edges_list_string(self):
        G = self.get_graph_from_data()
        return [edge[0] + '->' + edge[1] for edge in G.edges()]

    def recalculate_graph(self):
        self.set_early_start_finish()
        self.set_late_start_finish()
        # self.set_critical_edges()

    def set_data_json(self, json_data: str):
        try:
            json_data_dict = json.loads(json_data)
            G = get_graph_from_json(json_data_dict.get('Edges'), json_data_dict.get('Nodes'))
            if nx.is_directed_acyclic_graph(G):
                self.set_data_from_graph(G)
        except:
            return

    def get_node_attribute(self, attribute_name):
        G = self.get_graph_from_data()
        return nx.get_node_attributes(G, attribute_name, default=0)

    def get_pd_dataframe(self) -> pd.DataFrame:
        self.recalculate_graph()
        G = self.get_graph_from_data()
        df = pd.DataFrame.from_dict(dict(G.nodes(data=True)), orient='index')
        df.replace(True, 'X', inplace=True)
        df.reset_index(inplace=True)
        df.rename(columns={'index': 'Node name', 'early_start': 'early start', 'late_start': 'late start',
                           'slack_time': 'slack time'}, inplace=True)
        df = df.round(2)
        return df[['Node name', 'early start', 'late start', 'slack time']]
        # return df[['Node name', 'task_time', 'early_start', 'slack_time']]

    def export_graph_img(self) -> Image:
        self.recalculate_graph()
        G = self.get_graph_from_data()
        pos = nx.planar_layout(G)
        edge_labels = nx.get_edge_attributes(G, 'time')

        matplotlib.use('AGG')
        # fig, ax = plt.subplots(figsize=(16, 16))
        fig, ax = plt.subplots()
        labels = dict()
        sizes = dict()
        edge_colors = dict()
        early_starts = nx.get_node_attributes(G, 'early_start')
        late_starts = nx.get_node_attributes(G, 'late_start')
        slack_times = nx.get_node_attributes(G, 'slack_time')
        for node in G.nodes:
            labels[node] = (f"{node}\n t⁰={early_starts[node]}"
                            f"\n t¹={late_starts[node]}\n L={slack_times[node]}")
            labels[node] = f"{node}"
            sizes[node] = 5
        # for edge in G.edges:
        #     edge_colors[edge] = 'tab:red' if G.edges[edge]['critical'] else 'tab:gray'
        #
        longest_path = nx.dag_longest_path(G, weight="time")
        critical_path = [(longest_path[i], longest_path[i+1]) for i in range(len(longest_path)-1)]
        colors = ['red' if e in critical_path else 'black' for e in G.edges]
        nx.draw_networkx(G, pos=pos, ax=ax, edge_color=colors)#, labels=labels)
        nx.draw_networkx_edge_labels(G, pos, edge_labels, rotate=False)
        # gdraw(G, node_layout=pos, edge_labels=edge_labels, ax=ax,
        #       # , node_labels=labels,edge_size=sizes, node_size=6,edge_label_fontdict=dict(size=8),
        #       edge_label_rotate=False, edge_color=edge_colors, arrows=True)
        fig.canvas.draw()
        img = Image.frombytes('RGB', fig.canvas.get_width_height(), fig.canvas.tostring_rgb())
        plt.close()
        return img

    def export_csv_file(self):
        # csv_string = "predecessor;successor;time;\r\n"
        # for edge in self.edges_data:
        #     csv_string += f"{edge[0]};{edge[1]};{edge[2]['time']};{0xa}"
        # return csv_string
        with open('assets/names.csv', 'w', newline='') as csvfile:
            fieldnames = ['predecessor', 'successor', 'time']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            for edge in self.edges_data:
                writer.writerow({'predecessor': edge[0], 'successor': edge[1], 'time': edge[2]['time']})

    def reset_graph(self):
        self.edges_data = []
        self.set_nodes_data([('0', {})])
