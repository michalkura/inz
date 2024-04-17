import pandas as pd
import reflex as rx
from PIL import Image

from inzynierka.pages.cpm_aoa_graph import CPM_graph
from ..templates import template


class cpm_aoa_site(rx.State):
    G: CPM_graph = CPM_graph()
    input_json: str

    @rx.var
    def nodes_list(self) -> list[str]:
        return self.G.get_nodes_list()

    @rx.var
    def edges_list(self) -> list[str]:
        return self.G.get_edges_list_string()

    def handle_edges_submit(self, new_edges: dict):
        predecessor = new_edges.get("predecessor")
        successor = new_edges.get("successor")
        try:
            edge_time = float(new_edges.get("edge_time"))
        except ValueError:
            edge_time = 0
        if not predecessor or not successor or not edge_time:
            return
        self.G.add_edge(predecessor, successor, edge_time)

    def handle_node_addition(self, node: dict):
        node_name = node.get("node_name")
        if not node_name:
            return
        self.G.add_node(node_name)

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
    def cpm_dataframe(self) -> pd.DataFrame:
        df = self.G.get_pd_dataframe()
        try:
            return df
        except KeyError:
            return pd.DataFrame()

    # @rx.var
    # def cpm_json(self) -> str:
    #     return self.G.get_data_json()

    def set_input_json(self, input_json: str):
        self.input_json = input_json

    def submit_input(self):
        self.G.set_data_json(self.input_json)

    @rx.var
    def cmp_image(self) -> Image:
        return self.G.export_graph_img()


@template(route="/cpm_AoA", title="CPM AoA", image="/github.svg")
def graph():
    return rx.vstack(
        # plotly graph
        rx.image(src=cpm_aoa_site.cmp_image),
        rx.divider(),
        rx.hstack(
            # edges form
            rx.box(
                rx.vstack(
                    rx.vstack(
                        rx.heading("Node creation", size='1'),
                        rx.form(
                            rx.hstack(
                                rx.input(placeholder="Add node name", name="node_name", size='1'),
                                rx.button("Submit", type="submit", size='1'),
                            ),
                            on_submit=cpm_aoa_site.handle_node_addition,
                            reset_on_submit=True,
                        ),
                    )
                ),
                width="25%"
            ),
            rx.box(
                width="5%"
            ),
            # edges form
            rx.chakra.box(
                rx.vstack(
                    rx.heading("Edge creation", size='1'),
                    rx.form(
                        rx.chakra.hstack(
                            rx.select(
                                cpm_aoa_site.nodes_list, placeholder="Select predecessor node.", size="1",
                                name='predecessor'
                            ),
                            rx.select(
                                cpm_aoa_site.nodes_list, placeholder="Select successor node.", size="1",
                                name='successor'
                            ),
                            rx.input(
                                placeholder="Enter edge time.", size="1",
                                     name='edge_time'),
                            rx.button(
                                "Add edge", type="submit", size='1')
                            ),
                        on_submit=cpm_aoa_site.handle_edges_submit,
                        reset_on_submit=True,

                    )
                ),
                width="70%"

            ),
            width="100%",
            align_items='start'
        ),
        rx.divider(),

        rx.hstack(
            # node deletion
            rx.box(
                rx.vstack(
                    rx.heading("Node deletion", size='1'),
                    rx.form(
                        rx.hstack(
                            rx.select(
                                cpm_aoa_site.nodes_list, placeholder="Select node to delete.", size="1",
                                name='node_del'
                            ),
                            rx.button(
                                "Delete node", type="submit"
                            )),
                        on_submit=cpm_aoa_site.handle_node_deletion,
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
                    rx.heading("Edge deletion", size='1'),
                    rx.form(
                        rx.hstack(
                            rx.select(
                                cpm_aoa_site.edges_list, placeholder="Select edge to delete.", size="1",
                                name='edge_del'
                            ),
                            rx.button(
                                "Delete edge", type="submit", size="1"
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
        rx.divider(),
        # dataframe
        rx.data_table(
            data=cpm_aoa_site.cpm_dataframe,
            pagination=True,
            search=True,
        ),
        rx.divider(),
        # graph io
        # rx.hstack(
        #     # output
        #     rx.chakra.box(
        #         rx.chakra.heading("Graph output", size='md'),
        #         rx.chakra.text_area(
        #             value=cpm_aoa_site.cpm_json,
        #             is_read_only=True
        #         ),
        #         width='45%'
        #     ),
        #     rx.box(
        #         width='10%'
        #     ),
        #     # input
        #     rx.box(
        #         rx.heading("Graph input", size='md'),
        #         rx.chakra.editable(
        #             rx.chakra.editable_preview(),
        #             rx.chakra.editable_textarea(),
        #             placeholder="Paste your graph here...",
        #             on_change=cpm_aoa_site.set_input_json,
        #             width="100%"
        #         ),
        #
        #         rx.chakra.button("Confirm Input", type_="submit", on_click=cpm_aoa_site.submit_input),
        #
        #         width='45%'
        #     ),
        #     width='100%',
        #     align_items='start'
        # ),

    )
