import json

import networkx as nx
import pandas as pd
import plotly.graph_objects as go
import reflex as rx
from matplotlib import pyplot as plt

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
    edges_data: dict[str, list[str]]
    nodes_data: dict[str, dict[str, int | float]]

    def __init__(self):
        # self.load_graph_from_csv('data.csv')
        edges_data = {'start': ['a', 'b'], 'a': ['c'], 'b': ['c', 'd'], 'c': ['e'],
                      'd': ['e', 'f'], 'e': ['finish'], 'f': ['finish'], 'finish': []}
        nodes_data = {
            'start': {'task_time': 0.0},
            'a': {'task_time': 2.0},
            'b': {'task_time': 5.0},
            'c': {'task_time': 1.0},
            'd': {'task_time': 6.0},
            'e': {'task_time': 4.0},
            'f': {'task_time': 2.0},
            'finish': {'task_time': 0.0}}

        super().__init__(
            edges_data=edges_data,
            nodes_data=nodes_data
        )

    def set_edges_data(self, edges_data: dict[str, list[str]]):
        self.edges_data = edges_data

    def set_nodes_data(self, nodes_data: dict[str, dict[str, int | float]]):
        self.nodes_data = nodes_data

    def set_data_from_graph(self, g: nx.DiGraph):
        self.edges_data = nx.to_dict_of_lists(g)
        self.nodes_data = dict(nx.nodes(g).data())

    def get_graph_from_data(self) -> nx.DiGraph:
        G = nx.from_dict_of_lists(self.edges_data, create_using=nx.DiGraph)
        nx.set_node_attributes(G, self.nodes_data)
        return G

    def set_early_start_finish(self):
        G = self.get_graph_from_data()
        nodes_order = list(nx.topological_sort(G))
        for node in nodes_order:
            early_start = 0
            for predecessor in G.predecessors(node):
                early_start = max(early_start, G.nodes[predecessor]['early_finish'])
            G.nodes[node]['early_start'] = early_start
            G.nodes[node]['early_finish'] = early_start + G.nodes[node]['task_time']
        last_node = nodes_order[-1]
        G.nodes[last_node]['late_start'] = G.nodes[last_node]['early_start']
        G.nodes[last_node]['late_finish'] = G.nodes[last_node]['early_finish']
        self.set_data_from_graph(G)

    def set_late_start_finish(self):
        G = self.get_graph_from_data()
        nodes_order = list(nx.topological_sort(G))
        nodes_order.reverse()
        G.nodes[nodes_order[0]]['critical'] = True
        G.nodes[nodes_order[0]]['slack_time'] = 0
        for node in nodes_order[1:]:
            late_finish = float('inf')
            for successor in G.successors(node):
                late_finish = min(G.nodes[successor]['late_start'], late_finish)
            G.nodes[node]['early_start'] = round(G.nodes[node]['early_start'], 6)
            G.nodes[node]['early_finish'] = round(G.nodes[node]['early_finish'], 6)
            G.nodes[node]['late_finish'] = round(late_finish, 6)
            G.nodes[node]['late_start'] = round(late_finish - G.nodes[node]['task_time'], 6)
            G.nodes[node]['critical'] = True if G.nodes[node]['late_finish'] == G.nodes[node]['early_finish'] else False
            G.nodes[node]['slack_time'] = late_finish - G.nodes[node]['early_finish']
        self.set_data_from_graph(G)

    def is_directed_acyclic_graph(self):
        G = self.get_graph_from_data()
        return nx.is_directed_acyclic_graph(G)

    def add_node(self, task_name, task_time):
        G = self.get_graph_from_data()
        G.add_node(task_name, task_time=task_time)
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

    def get_edges_list(self):
        G = self.get_graph_from_data()
        return list(G.edges())

    def get_edges_list_string(self):
        G = self.get_graph_from_data()
        return [edge[0] + '->' + edge[1] for edge in G.edges()]

    def recalculate_graph(self):
        self.set_early_start_finish()
        self.set_late_start_finish()
        self.set_pos()

    def print_graph(self):
        print(self.nodes_data)

    def get_data(self):
        return self.edges_data, self.nodes_data

    def get_data_json(self):
        result_nodes = {}
        for k, v in self.nodes_data.items():
            result_nodes[k] = {"task_time": v.get("task_time")}
        return json.dumps({'Edges': self.edges_data, 'Nodes': result_nodes}, indent=1)

    def set_data_json(self, json_data: str):
        try:
            json_data_dict = json.loads(json_data)
            G = get_graph_from_json(json_data_dict.get('Edges'), json_data_dict.get('Nodes'))
            if nx.is_directed_acyclic_graph(G):
                self.set_data_from_graph(G)
        except:
            return

    def set_pos(self):
        G = self.get_graph_from_data()
        for layer, nodes in enumerate(nx.topological_generations(G)):
            # `multipartite_layout` expects the layer as a node attribute, so add the
            # numeric layer value as a node attribute
            for node in nodes:
                G.nodes[node]["layer"] = layer

        # Compute the multipartite_layout using the "layer" node attribute
        pos = nx.multipartite_layout(G, subset_key="layer")

        for node in G.nodes:
            G.nodes[node]['pos'] = list(pos[node])
        self.set_data_from_graph(G)

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
        return df[['Node name', 'task_time', 'early_start', 'late_start', 'critical', 'slack_time']]

    def get_plotly_data(self) -> go.Figure:
        self.recalculate_graph()
        node_x = []
        node_y = []
        node_label = []
        colors = []
        custom_data = []
        early_starts = self.get_node_attribute('early_start')
        early_finishes = self.get_node_attribute('early_finish')
        late_starts = self.get_node_attribute('late_start')
        late_finishes = self.get_node_attribute('late_finish')
        critical_nodes = self.get_node_attribute('critical')
        G = self.get_graph_from_data()
        for node in G.nodes():
            x, y = G.nodes[node]['pos']
            node_x.append(x)
            node_y.append(y)
            node_label.append(node)
            colors.append(1 if critical_nodes[node] else 0)
            custom_data.append(
                [early_starts[node], early_finishes[node], late_starts[node], late_finishes[node]])

        # Make a list of edges for plotly, including line segments that result in arrowheads
        edge_x = []
        edge_y = []
        for edge in G.edges():
            start = G.nodes[edge[0]]['pos']
            end = G.nodes[edge[1]]['pos']
            edge_x, edge_y = addEdge(start, end, edge_x, edge_y, .8, 'end', .04, 30, nodeSize)

        edge_trace = go.Scatter(x=edge_x, y=edge_y, line=dict(width=lineWidth, color=lineColor), hoverinfo='none',
                                mode='lines')

        node_trace = go.Scatter(x=node_x, y=node_y, mode='markers+text', hoverinfo='text', text=node_label,
                                textposition="top center", customdata=custom_data,
                                hovertemplate="<br>".join([
                                    "early_start: %{customdata[0]}",
                                    "early_finish: %{customdata[1]}",
                                    "late_start: %{customdata[2]}",
                                    "late_finish: %{customdata[3]}",
                                ]),
                                marker=dict(showscale=False, color=colors, size=nodeSize),
                                name=''
                                )
        self.export_graph_img()
        return go.Figure(data=[edge_trace, node_trace])

    def export_graph_img(self):
        G = self.get_graph_from_data()
        for layer, nodes in enumerate(nx.topological_generations(G)):
            # `multipartite_layout` expects the layer as a node attribute, so add the
            # numeric layer value as a node attribute
            for node in nodes:
                G.nodes[node]["layer"] = layer

        # Compute the multipartite_layout using the "layer" node attribute
        pos = nx.multipartite_layout(G, subset_key="layer")

        fig, ax = plt.subplots()
        nx.draw_networkx(G, pos=pos, ax=ax)
        ax.set_title("DAG layout in topological order")
        fig.tight_layout()
        plt.savefig('assets/foo.png')