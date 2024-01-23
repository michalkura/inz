import pandas as pd
import plotly.graph_objects as go
import reflex as rx

from .pert_graph import PERT_graph
from ..templates import template


class pert_site(rx.State):
    G: PERT_graph = PERT_graph()
    node_fields: list[str] = []
    input_json: str

    @rx.cached_var
    def form_node_placeholders(self) -> list[str]:
        return [
            " ".join(w.capitalize() for w in field.split("_"))
            for field in self.node_fields
        ]

    def add_node_field(self, new_nodes: dict):
        new_field = new_nodes.get("new_field")
        if not new_field:
            return
        field_name = (
            new_field.strip().lower().replace(" ", "_")
        )
        self.node_fields.append(field_name)

    @rx.var
    def nodes_list(self) -> list[str]:
        return self.G.get_nodes_list()

    @rx.var
    def edges_list(self) -> list[str]:
        return self.G.get_edges_list_string()

    def handle_edges_submit(self, new_edges: dict):
        predecessor = new_edges.get("predecessor")
        successor = new_edges.get("successor")
        if not predecessor or not successor:
            return
        self.G.add_edge(predecessor, successor)

    def handle_nodes_submit(self, nodes: dict[str, float]):
        for field in self.node_fields:
            try:
                self.G.add_node(field, float(nodes[field + '_most_likely']), float(nodes[field + '_pessimistic_time']),
                                float(nodes[field + '_optimistic_time']))
            except ValueError:
                self.G.add_node(field, 0, 0, 0)
        self.node_fields.clear()

    def handle_node_deletion(self, node: dict):
        node_to_del = node.get("node_del")
        if not node_to_del:
            return
        self.G.remove_node(node_to_del)

    def handle_edge_deletion(self, edge: dict):
        edge_to_del = edge.get("edge_del").split('->')
        if not edge_to_del:
            return
        self.G.remove_edge(edge_to_del[0], edge_to_del[1])

    @rx.var
    def cpm_plotly(self) -> go.Figure:
        return self.G.get_plotly_data()

    @rx.var
    def cpm_dataframe(self) -> pd.DataFrame:
        df = self.G.get_pd_dataframe()
        try:
            return df
        except KeyError:
            return pd.DataFrame()

    @rx.var
    def cpm_json(self) -> str:
        return self.G.get_data_json()

    def set_input_json(self, input_json: str):
        self.input_json = input_json

    def submit_input(self):
        self.G.set_data_json(self.input_json)


@template(route="/pert_graph", title="PERT", image="/github.svg")
def pert_graph():
    return rx.vstack(
        # plotly graph
        rx.plotly(data=pert_site.cpm_plotly,
                  layout=dict(
                      showlegend=False,
                      hovermode='closest',
                      margin=dict(b=20, l=5, r=5, t=40),
                      xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                      yaxis=dict(showgrid=False, zeroline=False, showticklabels=False))
                  ),
        rx.divider(),
        rx.hstack(
            # edges form
            rx.box(
                rx.vstack(
                    rx.vstack(
                        rx.heading("Node creation", size='md'),
                        rx.form(
                            rx.hstack(
                                rx.input(
                                    placeholder="Add node name",
                                    name="new_field",
                                ),
                                rx.button("+", type_="submit"),
                            ),
                            on_submit=pert_site.add_node_field,
                            reset_on_submit=True,
                        ),
                        rx.divider(),
                        rx.form(
                            rx.vstack(
                                rx.foreach(
                                    pert_site.node_fields,
                                    lambda field, idx:
                                    rx.hstack(
                                        rx.input(
                                            placeholder=pert_site.form_node_placeholders[idx] + ' most likely time',
                                            name=field + '_most_likely',
                                        ),
                                        rx.input(
                                            placeholder=pert_site.form_node_placeholders[idx] + ' pessimistic time',
                                            name=field + '_pessimistic_time',
                                        ),
                                        rx.input(
                                            placeholder=pert_site.form_node_placeholders[idx] + ' optimistic time',
                                            name=field + '_optimistic_time',
                                        ),
                                    ),
                                ),
                                rx.button("Submit", type_="submit"),
                            ),
                            on_submit=pert_site.handle_nodes_submit,
                            reset_on_submit=True,
                        )
                    )
                ),
                width="45%"
            ),
            rx.box(
                width="10%"
            ),
            # edges form
            rx.box(
                rx.vstack(
                    rx.heading("Edge creation", size='md'),
                    rx.form(
                        rx.hstack(
                            rx.select(
                                pert_site.nodes_list, placeholder="Select predecessor node.", size="xs",
                                name='predecessor'
                            ),
                            rx.select(
                                pert_site.nodes_list, placeholder="Select successor node.", size="xs",
                                name='successor'
                            ),
                            rx.button(
                                "Add edge", type_="submit"
                            )),
                        on_submit=pert_site.handle_edges_submit,
                        reset_on_submit=True,

                    )
                ),
                width="45%"

            ),
            width="100%",
            align_items='start'
        ),
        rx.divider(),

        rx.hstack(
            # node deletion
            rx.box(
                rx.vstack(
                    rx.heading("Node deletion", size='md'),
                    rx.form(
                        rx.hstack(
                            rx.select(
                                pert_site.nodes_list, placeholder="Select node to delete.", size="xs", name='node_del'
                            ),
                            rx.button(
                                "Delete node", type_="submit"
                            )),
                        on_submit=pert_site.handle_node_deletion,
                        reset_on_submit=True,
                    )
                ),
                width='45%'
            ),
            rx.box(
                width='10%'
            ),
            # edge deletion
            rx.box(
                rx.vstack(
                    rx.heading("Edge deletion", size='md'),
                    rx.form(
                        rx.hstack(
                            rx.select(
                                pert_site.edges_list, placeholder="Select edge to delete.", size="xs", name='edge_del'
                            ),
                            rx.button(
                                "Delete edge", type_="submit"
                            )),
                        on_submit=pert_site.handle_edge_deletion,
                        reset_on_submit=True,
                    ),
                ),
                width='45%'
            ),
            width='100%',
            align_items='start'
        ),
        rx.divider(),
        # dataframe
        rx.data_table(
            data=pert_site.cpm_dataframe,
            pagination=True,
            search=True,
        ),
        rx.divider(),
        # graph io
        rx.hstack(
            # output
            rx.box(
                rx.heading("Data output", size='md'),
                rx.text_area(
                    value=pert_site.cpm_json,
                    is_read_only=True
                ),
                width='45%'
            ),
            rx.box(
                width='10%'
            ),
            # input
            rx.box(
                rx.heading("Data input", size='md'),
                rx.editable(
                    rx.editable_preview(),
                    rx.editable_textarea(),
                    placeholder="Paste your data here...",
                    on_change=pert_site.set_input_json,
                    width="100%"
                ),

                rx.button("Confirm Input", type_="submit", on_click=pert_site.submit_input),

                width='45%'
            ),
            width='100%',
            align_items='start'
        ),

    )
