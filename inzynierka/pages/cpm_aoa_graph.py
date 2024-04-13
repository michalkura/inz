import json

import networkx as nx
import pandas as pd
import plotly.graph_objects as go
import reflex as rx
import matplotlib
from matplotlib import pyplot as plt
from PIL import Image

from inzynierka.pages.addEdge import addEdge

nodeColor = 'Blue'
nodeSize = 20
lineWidth = 2
lineColor = '#000000'


def get_graph_from_json(edges: object, nodes: object) -> nx.DiGraph:
    G = nx.from_dict_of_lists(edges, create_using=nx.DiGraph)
    nx.set_node_attributes(G, nodes)
    return G


class CPM_graph(rx.Base):
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

    def set_nodes_data(self, nodes_data: dict[str, dict[str, int | float]]):
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

    def set_critical_edges(self):
        G = self.get_graph_from_data()
        for edge in G.edges:
            G.edges[edge]['critical'] = (
                    G.nodes[edge[1]]['early_start'] - G.nodes[edge[0]]['early_start'] == G.edges[edge]['time'])
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

    def add_edge(self, task_predecessor, task_successor):
        G = self.get_graph_from_data()
        G.add_edge(task_predecessor, task_successor)
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
        self.set_critical_edges()

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
        df.rename(columns={'index': 'Node name'}, inplace=True)
        df = df.round(2)
        return df[['Node name']]
        # return df[['Node name', 'task_time', 'early_start', 'slack_time']]

    def export_graph_img(self) -> Image:
        self.recalculate_graph()
        G = self.get_graph_from_data()
        pos = nx.planar_layout(G)

        matplotlib.use('AGG')
        fig, ax = plt.subplots()
        nx.draw_networkx(G, pos=pos, ax=ax)
        fig.tight_layout()
        fig.canvas.draw()
        return Image.frombytes('RGB', fig.canvas.get_width_height(), fig.canvas.tostring_rgb())
