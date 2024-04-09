import pandas as pd
import plotly.graph_objects as go
import reflex as rx

from inzynierka.pages.cpm_aoa_graph import CPM_graph
from ..templates import template


class cpm_aoa_site(rx.State):
    G: CPM_graph = CPM_graph()
    node_fields: list[str] = []
    input_json: str

    @rx.cached_var
    def form_node_placeholders(self) -> list[str]:
        return [
            " ".join(
                w.capitalize() for w in field.split("_")
            )
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
        for key, value in nodes.items():
            try:
                self.G.add_node(key, float(value))
            except ValueError:
                self.G.add_node(key, 0)
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


@template(route="/cpm_AoA", title="CPM AoA", image="/github.svg")
def graph():
    return rx.chakra.vstack(
        # plotly graph
        rx.plotly(data=cpm_aoa_site.cpm_plotly,
                  layout=dict(
                      showlegend=False,
                      hovermode='closest',
                      margin=dict(b=20, l=5, r=5, t=40),
                      xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                      yaxis=dict(showgrid=False, zeroline=False, showticklabels=False))
                  ),
        rx.chakra.divider(),
        rx.image(src="/foo.png"),
        rx.chakra.divider(),
        rx.chakra.hstack(
            # edges form
            rx.chakra.box(
                rx.chakra.vstack(
                    rx.chakra.vstack(
                        rx.chakra.heading("Node creation", size='md'),
                        rx.chakra.form(
                            rx.chakra.hstack(
                                rx.chakra.input(
                                    placeholder="Add node name",
                                    name="new_field",
                                ),
                                rx.chakra.button("+", type_="submit"),
                            ),
                            on_submit=cpm_aoa_site.add_node_field,
                            reset_on_submit=True,
                        ),
                        rx.chakra.divider(),
                        rx.chakra.form(
                            rx.chakra.vstack(
                                rx.foreach(
                                    cpm_aoa_site.node_fields,
                                    lambda field, idx: rx.chakra.input(
                                        placeholder=cpm_aoa_site.form_node_placeholders[idx] + ' node time',
                                        name=field,
                                    ),
                                ),
                                rx.chakra.button("Submit", type_="submit"),
                            ),
                            on_submit=cpm_aoa_site.handle_nodes_submit,
                            reset_on_submit=True,
                        )
                    )
                ),
                width="45%"
            ),
            rx.chakra.box(
                width="10%"
            ),
            # edges form
            rx.chakra.box(
                rx.chakra.vstack(
                    rx.chakra.heading("Edge creation", size='md'),
                    rx.chakra.form(
                        rx.chakra.hstack(
                            rx.chakra.select(
                                cpm_aoa_site.nodes_list, placeholder="Select predecessor node.", size="xs", name='predecessor'
                            ),
                            rx.chakra.select(
                                cpm_aoa_site.nodes_list, placeholder="Select successor node.", size="xs", name='successor'
                            ),
                            rx.chakra.button(
                                "Add edge", type_="submit"
                            )),
                        on_submit=cpm_aoa_site.handle_edges_submit,
                        reset_on_submit=True,

                    )
                ),
                width="45%"

            ),
            width="100%",
            align_items='start'
        ),
        rx.chakra.divider(),

        rx.chakra.hstack(
            # node deletion
            rx.chakra.box(
                rx.chakra.vstack(
                    rx.chakra.heading("Node deletion", size='md'),
                    rx.chakra.form(
                        rx.chakra.hstack(
                            rx.chakra.select(
                                cpm_aoa_site.nodes_list, placeholder="Select node to delete.", size="xs", name='node_del'
                            ),
                            rx.chakra.button(
                                "Delete node", type_="submit"
                            )),
                        on_submit=cpm_aoa_site.handle_node_deletion,
                        reset_on_submit=True,
                    )
                ),
                width='45%'
            ),
            rx.chakra.box(
                width='10%'
            ),
            # edge deletion
            rx.chakra.box(
                rx.chakra.vstack(
                    rx.chakra.heading("Edge deletion", size='md'),
                    rx.chakra.form(
                        rx.chakra.hstack(
                            rx.chakra.select(
                                cpm_aoa_site.edges_list, placeholder="Select edge to delete.", size="xs", name='edge_del'
                            ),
                            rx.chakra.button(
                                "Delete edge", type_="submit"
                            )),
                        on_submit=cpm_aoa_site.handle_edge_deletion,
                        reset_on_submit=True,
                    ),
                ),
                width='45%'
            ),
            width='100%',
            align_items='start'
        ),
        rx.chakra.divider(),
        # dataframe
        rx.data_table(
            data=cpm_aoa_site.cpm_dataframe,
            pagination=True,
            search=True,
        ),
        rx.chakra.divider(),
        # graph io
        rx.chakra.hstack(
            # output
            rx.chakra.box(
                rx.chakra.heading("Graph output", size='md'),
                rx.chakra.text_area(
                    value=cpm_aoa_site.cpm_json,
                    is_read_only=True
                ),
                width='45%'
            ),
            rx.chakra.box(
                width='10%'
            ),
            # input
            rx.chakra.box(
                rx.chakra.heading("Graph input", size='md'),
                rx.chakra.editable(
                    rx.chakra.editable_preview(),
                    rx.chakra.editable_textarea(),
                    placeholder="Paste your graph here...",
                    on_change=cpm_aoa_site.set_input_json,
                    width="100%"
                ),

                rx.chakra.button("Confirm Input", type_="submit", on_click=cpm_aoa_site.submit_input),

                width='45%'
            ),
            width='100%',
            align_items='start'
        ),

    )
