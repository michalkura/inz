import networkx as nx
import pandas as pd

from inzynierka.pages.cpm_graph import CPM_graph

nodeColor = 'Blue'
nodeSize = 20
lineWidth = 2
lineColor = '#000000'


def get_graph_from_json(edges: object, nodes: object) -> nx.DiGraph:
    G = nx.from_dict_of_lists(edges, create_using=nx.DiGraph)
    nx.set_node_attributes(G, nodes)
    return G


def set_task_times(nodes_data: dict[str, dict[str, int | float]]):
    for k, v in nodes_data.items():
        nodes_data[k]['task_time'] = (4 * v['most_likely_time'] + v['pessimistic_time'] + v['optimistic_time']) / 6
        nodes_data[k]['task_variance'] = (v['pessimistic_time'] + v['optimistic_time']) / 6
    return nodes_data


class PERT_graph(CPM_graph):
    def __init__(self):
        edges_data = {'start': ['a', 'b'], 'a': ['c'], 'b': ['c', 'd'], 'c': ['e'],
                      'd': ['e', 'f'], 'e': ['finish'], 'f': ['finish'], 'finish': []}
        nodes_data = {
            'start': {'most_likely_time': 0.0, 'optimistic_time': 0.0, 'pessimistic_time': 0.0},
            'a': {'most_likely_time': 2.0, 'optimistic_time': 1.0, 'pessimistic_time': 0.0},
            'b': {'most_likely_time': 5.0, 'optimistic_time': 4.0, 'pessimistic_time': 0.0},
            'c': {'most_likely_time': 1.0, 'optimistic_time': 0.5, 'pessimistic_time': 0.0},
            'd': {'most_likely_time': 6.0, 'optimistic_time': 5.0, 'pessimistic_time': 0.0},
            'e': {'most_likely_time': 4.0, 'optimistic_time': 3.0, 'pessimistic_time': 0.0},
            'f': {'most_likely_time': 2.0, 'optimistic_time': 1.0, 'pessimistic_time': 0.0},
            'finish': {'most_likely_time': 0.0, 'optimistic_time': 0.0, 'pessimistic_time': 0.0}
        }
        nodes_data = set_task_times(nodes_data)
        super().__init__()
        self.set_edges_data(edges_data)
        self.set_nodes_data(nodes_data)

    def recalculate_graph(self):
        self.set_task_time()
        self.set_variance()
        self.set_early_start_finish()
        self.set_late_start_finish()
        self.set_pos()

    def get_pd_dataframe(self) -> pd.DataFrame:
        self.recalculate_graph()
        G = self.get_graph_from_data()
        df = pd.DataFrame.from_dict(dict(G.nodes(data=True)), orient='index')
        df.replace(True, 'X', inplace=True)
        df.reset_index(inplace=True)
        df.rename(columns={'index': 'Node name'}, inplace=True)
        df = df.round(2)
        return df[['Node name', 'task_time', 'early_start', 'late_start', 'critical', 'slack_time', 'most_likely_time',
                   'optimistic_time', 'pessimistic_time', 'variance']]

    def set_task_time(self):
        for k, v in self.nodes_data.items():
            self.nodes_data[k]['task_time'] = (4 * v['most_likely_time'] + v['pessimistic_time'] + v[
                'optimistic_time']) / 6
            self.nodes_data[k]['task_variance'] = (v['pessimistic_time'] + v['optimistic_time']) / 6
        return self.nodes_data

    def set_variance(self):
        for k, v in self.nodes_data.items():
            self.nodes_data[k]['variance'] = (v['pessimistic_time'] - v['optimistic_time']) / 6
        return self.nodes_data

    def add_node(self, task_name, most_likely_time, pessimistic_time, optimistic_time):
        G = self.get_graph_from_data()
        G.add_node(task_name, most_likely_time=most_likely_time, pessimistic_time=pessimistic_time,
                   optimistic_time=optimistic_time)
        self.set_data_from_graph(G)
        self.set_task_time()
