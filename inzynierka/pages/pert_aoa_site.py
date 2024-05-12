import csv

import pandas as pd
import reflex as rx
from PIL import Image

from inzynierka.pages.pert_aoa_graph import PERT_graph
from ..templates import template


class pert_aoa_site(rx.State):
    G: PERT_graph = PERT_graph()
    input_json: str
    predecessor: str = ""
    successor: str = ""
    node_to_delete: str = ""
    edge_to_delete: str = ""
    selected_layout: str = "layer"
    selected_layout_real: str = "layer"

    @rx.var
    def nodes_list(self) -> list[str]:
        return self.G.get_nodes_list()

    @rx.var
    def edges_list(self) -> list[str]:
        return self.G.get_edges_list_string()

    def set_default_layout(self) -> None:
        self.selected_layout_real = "layer"
        self.selected_layout = "layer"

    def handle_edges_submit(self, new_edges: dict):
        predecessor = self.predecessor
        successor = self.successor
        try:
            most_likely_time = float(new_edges.get("most_likely_time"))
            optimistic_time = float(new_edges.get("optimistic_time"))
            pessimistic_time = float(new_edges.get("pessimistic_time"))
        except ValueError:
            most_likely_time = 0
            optimistic_time = 0
            pessimistic_time = 0
        if predecessor == "" or successor == "" or not most_likely_time or not optimistic_time or not pessimistic_time:
            return rx.window_alert("Select predecessor and successor and task time")

        self.set_default_layout()
        self.G.add_edge(predecessor, successor, most_likely_time, optimistic_time, pessimistic_time)
        self.predecessor = ""
        self.successor = ""

    def handle_node_addition(self, node: dict):
        node_name = str(node.get("node_name"))
        if "->" in node_name:
            return rx.window_alert("Node contains forbidden characters")
        if not node_name:
            return rx.window_alert("Enter node name first")

        self.set_default_layout()
        self.G.add_node(node_name)

    def handle_node_deletion(self, node: dict):
        node_to_del = self.node_to_delete
        if node_to_del == "":
            return rx.window_alert("Select node to delete first")
        if len(self.G.get_nodes_list()) == 1:
            return rx.window_alert("Graph has to have at least 1 node")

        self.set_default_layout()
        self.G.remove_node(node_to_del)
        self.node_to_delete = ""

    def handle_edge_deletion(self, edge: dict):
        edge_to_del = str(edge.get("edge_del")).split("->")
        if self.edge_to_delete == "":
            return rx.window_alert("Select edge to delete first")

        self.set_default_layout()
        self.G.remove_edge(edge_to_del[0], edge_to_del[1])
        self.edge_to_delete = ""

    @rx.var
    def pert_dataframe(self) -> pd.DataFrame:
        df = self.G.get_pd_dataframe()
        try:
            return df
        except KeyError:
            return pd.DataFrame()

    async def handle_upload(self, files: list[rx.UploadFile]):
        H: PERT_graph = PERT_graph()
        H.reset_graph()
        H.remove_node("0")
        fieldnames = ["predecessor", "successor", "most_likely_time", "optimistic_time", "pessimistic_time"]
        for file in files:
            upload_data = await file.read()
            outfile = rx.get_upload_dir() / file.filename
            # Save the file.
            with outfile.open("wb") as file_object:
                file_object.write(upload_data)

            with outfile.open("r") as csvfile:
                reader = csv.DictReader(csvfile, fieldnames=fieldnames, delimiter=";")
                try:
                    for row in reader:
                        H.add_edge(str(row["predecessor"]), str(row["successor"]), float(row["most_likely_time"]),
                                   float(row["optimistic_time"]), float(row["pessimistic_time"]))
                except KeyError:
                    return rx.window_alert("Provided data is corrupted")
                except TypeError as e:
                    return rx.window_alert("Provided data is corrupted")
            if H.is_directed_acyclic_graph():
                self.G = H
            else:
                return rx.window_alert("Provided Graph is not directed acyclic graph")

    @staticmethod
    def cancel_upload():
        return rx.cancel_upload("my_upload")

    @rx.var
    def cmp_image(self) -> Image:
        return self.G.export_graph_img(self.selected_layout_real)

    def download_graph(self):
        self.G.export_csv_file()
        return rx.download(url="/names.csv", filename="graph_edges.csv")

    def reset_graph(self):
        self.G.reset_graph()

    def handle_layout_select(self, form_data: dict):
        selected_layout = str(form_data["selected_layout"])
        try:
            self.G.export_graph_img(selected_layout)
            self.selected_layout = selected_layout
            self.selected_layout_real = selected_layout
        except:
            match selected_layout:
                case "planar":
                    return rx.window_alert("Graph is not planar")
                case "graphviz":
                    return rx.window_alert("graphviz not installed")
                case "bfs_layout":
                    return rx.window_alert("nodes are not connected")
            return rx.window_alert("something went wrong")


@template(route="/pert_AoA", title="PERT AoA", image="/github.svg")
def graph():
    return rx.vstack(
        # plotly graph
        rx.image(src=pert_aoa_site.cmp_image),
        rx.divider(),
        rx.hstack(
            rx.box(
                rx.heading("Layout selection", size="1"),
                rx.form.root(
                    rx.vstack(
                        rx.select(
                            ["layer", "planar", "graphviz", "bfs_layout", "random"],#
                            default_value="layer",
                            value=pert_aoa_site.selected_layout,
                            on_change=pert_aoa_site.set_selected_layout,
                            name="selected_layout",
                        ),
                        rx.button("Submit layout", type="submit"),
                        width="100%",
                    ),
                    on_submit=pert_aoa_site.handle_layout_select,
                    reset_on_submit=True,
                    width="100%",
                ),
                width="20%"
            ),
            # edges form
            rx.box(
                rx.vstack(
                    rx.vstack(
                        rx.heading("Node creation", size="1"),
                        rx.form(
                            rx.hstack(
                                rx.input(placeholder="Add node name", name="node_name", size="1"),
                                rx.button("Submit", type="submit", size="1"),
                            ),
                            on_submit=pert_aoa_site.handle_node_addition,
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
            rx.box(
                rx.vstack(
                    rx.heading("Edge creation", size="1"),
                    rx.form(
                        rx.hstack(
                            rx.select.root(
                                rx.select.trigger(placeholder="Select predecessor node."),
                                rx.select.content(
                                    rx.select.group(
                                        rx.foreach(
                                            pert_aoa_site.nodes_list,
                                            lambda x: rx.select.item(
                                                x, value=x
                                            ),
                                        )
                                    ),
                                ),
                                value=pert_aoa_site.predecessor,
                                on_change=pert_aoa_site.set_predecessor,
                            ),
                            rx.select.root(
                                rx.select.trigger(placeholder="Select successor node."),
                                rx.select.content(
                                    rx.select.group(
                                        rx.foreach(
                                            pert_aoa_site.nodes_list,
                                            lambda x: rx.select.item(
                                                x, value=x
                                            ),
                                        )
                                    ),
                                ),
                                value=pert_aoa_site.successor,
                                on_change=pert_aoa_site.set_successor,
                            ),
                            rx.input(
                                placeholder="Most likely time.", size="2",
                                name="most_likely_time"),
                            rx.input(
                                placeholder="Optimistic time.", size="2",
                                name="optimistic_time"),
                            rx.input(
                                placeholder="Pessimistic time.", size="2",
                                name="pessimistic_time"),
                            rx.button(
                                "Add edge", type="submit", size="2")
                        ),
                        on_submit=pert_aoa_site.handle_edges_submit,
                        reset_on_submit=True,
                    ),
                ),
                width="50%",

            ),
            width="100%",
            align_items="start"
        ),
        rx.divider(),

        rx.hstack(
            # node deletion
            rx.box(
                rx.vstack(
                    rx.heading("Node deletion", size="1"),
                    rx.form(
                        rx.hstack(
                            rx.select.root(
                                rx.select.trigger(placeholder="Select node to delete."),
                                rx.select.content(
                                    rx.select.group(
                                        rx.foreach(
                                            pert_aoa_site.nodes_list,
                                            lambda x: rx.select.item(
                                                x, value=x
                                            ),
                                        )
                                    ),
                                ),
                                value=pert_aoa_site.node_to_delete,
                                on_change=pert_aoa_site.set_node_to_delete,
                            ),
                            rx.button(
                                "Delete node", type="submit"
                            )),
                        on_submit=pert_aoa_site.handle_node_deletion,
                        reset_on_submit=True,
                    )
                ),
                width="45%"
            ),
            rx.box(
                width="10%"
            ),
            # edge deletion
            rx.box(
                rx.vstack(
                    rx.heading("Edge deletion", size="1"),
                    rx.form(
                        rx.hstack(
                            rx.select.root(
                                rx.select.trigger(placeholder="Select edge to delete."),
                                rx.select.content(
                                    rx.select.group(
                                        rx.foreach(
                                            pert_aoa_site.edges_list,
                                            lambda x: rx.select.item(
                                                x, value=x
                                            ),
                                        )
                                    ),
                                ),
                                name="edge_del",
                                value=pert_aoa_site.edge_to_delete,
                                on_change=pert_aoa_site.set_edge_to_delete,
                            ),
                            rx.button(
                                "Delete edge", type="submit", size="1"
                            )),
                        on_submit=pert_aoa_site.handle_edge_deletion,
                        reset_on_submit=True,
                    ),
                ),
                width="45%"
            ),
            width="100%",
            align_items="start"
        ),
        rx.divider(),
        # dataframe
        rx.data_table(
            data=pert_aoa_site.pert_dataframe,
            pagination=True,
            search=True,
        ),
        rx.divider(),
        # graph io
        rx.hstack(
            # output
            rx.box(
                rx.heading("Graph output", size="1"),
                rx.button(
                    "Download graph", on_click=pert_aoa_site.download_graph
                ),
                width="20%"
            ),
            rx.box(
                rx.heading("Reset Graph", size="1"),
                rx.button(
                    "Reset graph", on_click=pert_aoa_site.reset_graph
                ),
                width="20%"
            ),
            rx.box(
                width="15%"
            ),
            # input
            rx.box(
                rx.heading("Graph input", size="1"),
                rx.upload(
                    rx.text(
                        "Drag and drop files here or click to select files"
                    ),
                    id="my_upload",
                    border="1px dotted rgb(107,99,246)",
                    padding="5em",
                    multiple=False,
                    accept={"text/csv": [".csv"]},
                    max_size=5000000,

                ),

                rx.button("Confirm file", on_click=pert_aoa_site.handle_upload(rx.upload_files(upload_id="my_upload"))),
                rx.button("Cancel upload", on_click=pert_aoa_site.cancel_upload),

                width="45%"
            ),
            width="100%",
            align_items="start"
        ),

    )
