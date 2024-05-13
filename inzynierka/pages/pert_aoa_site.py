import csv

import pandas as pd
import reflex as rx
from PIL import Image

from inzynierka.pages.pert_aoa_graph import PERT_graph
from ..templates import template


class pert_aoa_site(rx.State):
    G: PERT_graph = PERT_graph()
    language: str = "PL"
    input_json: str
    predecessor: str = ""
    successor: str = ""
    node_to_delete: str = ""
    edge_to_delete: str = ""
    selected_layout: str = "layer"
    selected_layout_real: str = "layer"
    translations: dict[str, dict[str, str]] = {
        "alert_edge_submit": {
            "PL": "Wybierz poprzednika, następnika i podaj czasy czynności",
            "EN": "Select predecessor and successor and task time"
        },
        "alert_node_addition_character": {
            "PL": "Zdarzenie nie może zawierać znaku ->",
            "EN": "Node contains forbidden characters: '->'"
        },
        "alert_node_addition_no_name": {
            "PL": "Wprowadź najpierw nazwę zdarzenia",
            "EN": "Enter node name first"
        },
        "alert_node_delete_no_name": {
            "PL": "Wybierz najpierw zdarzenie do usunięcia",
            "EN": "Select node to delete first"
        },
        "alert_node_delete_no_nodes": {
            "PL": "Sieć musi mieć przynajmniej 1 zdarzenie",
            "EN": "Graph has to have at least 1 node"
        },
        "alert_edge_delete_no_edge": {
            "PL": "Wybierz najpierw czynność do usunięcia",
            "EN": "Select edge to delete first"
        },
        "alert_graph_upload": {
            "PL": "Wprowadzone dane są błędne",
            "EN": "Provided data is corrupted"
        },
        "alert_not_DAG": {
            "PL": "Wprowadzony graf nie jest acyklicznym grafem skierowanym",
            "EN": "Provided Graph is not directed acyclic graph"
        },
        "alert_planar_graph": {
            "PL": "Graf musi być planarny dla tego rozmieszczenia wierzchołków",
            "EN": "Graph is not planar"
        },
        "alert_graphviz": {
            "PL": "Biblioteka graphviz jest niezainstalowana",
            "EN": "graphviz not installed"
        },
        "alert_bfs": {
            "PL": "Zdarzenia muszą być połączone dla tego rozmieszczenia wierzchołków",
            "EN": "nodes are not connected"
        },
        "alert_something_wrong": {
            "PL": "Coś poszło nie tak",
            "EN": "something went wrong"
        },
        "layout_selection_title": {
            "PL": "Wybór rozmieszczenia wierzchołków",
            "EN": "Layout selection"
        },
        "submit": {
            "PL": "Zatwierdź",
            "EN": "Submit"
        },
        "node_addition_title": {
            "PL": "Dodawanie zdarzenia",
            "EN": "Node addition"
        },
        "node_addition_placeholder": {
            "PL": "Nazwa zdarzenia",
            "EN": "Node addition"
        },
        "edge_addition_title": {
            "PL": "Dodawanie czynności",
            "EN": "Edge creation"
        },
        "edge_addition_predecessor_placeholder": {
            "PL": "Wybierz poprzednika",
            "EN": "Select predecessor node."
        },
        "edge_addition_successor_placeholder": {
            "PL": "Wybierz następnika",
            "EN": "Select successor node."
        },
        "edge_addition_time_placeholder": {
            "PL": "Przewidywany czas",
            "EN": "Most likely edge time."
        },
        "edge_addition_optimistic_time_placeholder": {
            "PL": "Optymistyczny czas",
            "EN": "Enter optimistic edge time."
        },
        "edge_addition_pessimistic_time_placeholder": {
            "PL": "Pesymistyczny czas",
            "EN": "Enter pessimistic edge time."
        },
        "node_deletion_title": {
            "PL": "Usuwanie zdarzenia",
            "EN": "Node deletion"
        },
        "node_deletion_placeholder": {
            "PL": "Wybierz zdarzenie do usunięcia",
            "EN": "Select node to delete"
        },
        "edge_deletion_title": {
            "PL": "Usuwanie czynności",
            "EN": "Edge deletion"
        },
        "edge_deletion_placeholder": {
            "PL": "Wybierz czynność",
            "EN": "Select edge to delete"
        },
        "graph_output_title": {
            "PL": "Pobieranie sieci",
            "EN": "Graph output"
        },
        "graph_output_button": {
            "PL": "Pobierz sieć",
            "EN": "Download graph"
        },
        "graph_reset_title": {
            "PL": "Zresetuj sieć",
            "EN": "Reset Graph"
        },
        "graph_reset_button": {
            "PL": "Zresetuj sieć",
            "EN": "Reset Graph"
        },
        "graph_input_title": {
            "PL": "Wczytywanie sieci",
            "EN": "Graph input"
        },
        "graph_input_placeholder": {
            "PL": "Przesuń i upuść plik tutaj",
            "EN": "Drag and drop files"
        },
        "df_node_name": {
            "PL": "Nazwa zdarzenia",
            "EN": "Node name"
        },
        "df_node_early_start": {
            "PL": "NMT zdarzenia",
            "EN": "early start"
        },
        "df_node_late_start": {
            "PL": "NDT zdarzenia",
            "EN": "late start"
        },
        "df_node_slack_time": {
            "PL": "Luz czasowy zdarzenia",
            "EN": "slack time"
        }
    }

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
            return rx.window_alert(self.translations["alert_edge_submit"][self.language])

        self.set_default_layout()
        self.G.add_edge(predecessor, successor, most_likely_time, optimistic_time, pessimistic_time)
        self.predecessor = ""
        self.successor = ""

    def handle_node_addition(self, node: dict):
        node_name = str(node.get("node_name"))
        if "->" in node_name:
            return rx.window_alert(self.translations["alert_node_addition_character"][self.language])
        if not node_name:
            return rx.window_alert(self.translations["alert_node_addition_no_name"][self.language])

        self.set_default_layout()
        self.G.add_node(node_name)

    def handle_node_deletion(self, node: dict):
        node_to_del = self.node_to_delete
        if node_to_del == "":
            return rx.window_alert(self.translations["alert_node_delete_no_name"][self.language])
        if len(self.G.get_nodes_list()) == 1:
            return rx.window_alert(self.translations["alert_node_delete_no_nodes"][self.language])

        self.set_default_layout()
        self.G.remove_node(node_to_del)
        self.node_to_delete = ""

    def handle_edge_deletion(self, edge: dict):
        edge_to_del = str(edge.get("edge_del")).split("->")
        if self.edge_to_delete == "":
            return rx.window_alert(self.translations["alert_edge_delete_no_edge"][self.language])

        self.set_default_layout()
        self.G.remove_edge(edge_to_del[0], edge_to_del[1])
        self.edge_to_delete = ""

    @rx.var
    def pert_dataframe(self) -> pd.DataFrame:
        df = self.G.get_pd_dataframe()
        try:
            df.rename(columns={
                'index': self.translations["df_node_name"][self.language],
                'early_start': self.translations["df_node_early_start"][self.language],
                'late_start': self.translations["df_node_late_start"][self.language],
                'slack_time': self.translations["df_node_slack_time"][self.language]
            }, inplace=True)
            return df[[
                self.translations["df_node_name"][self.language],
                self.translations["df_node_early_start"][self.language],
                self.translations["df_node_late_start"][self.language],
                self.translations["df_node_slack_time"][self.language]
            ]]
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
                    return rx.window_alert(self.translations["alert_graph_upload"][self.language])
                except TypeError as e:
                    return rx.window_alert(self.translations["alert_graph_upload"][self.language])
            if H.is_directed_acyclic_graph():
                self.G = H
            else:
                return rx.window_alert(self.translations["alert_not_DAG"][self.language])

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
                    return rx.window_alert(self.translations["alert_planar_graph"][self.language])
                case "graphviz":
                    return rx.window_alert(self.translations["alert_graphviz"][self.language])
                case "bfs_layout":
                    return rx.window_alert(self.translations["alert_bfs"][self.language])
            return rx.window_alert(self.translations["alert_something_wrong"][self.language])


@template(route="/pert_AoA", title="PERT AoA", image="/github.svg")
def graph():
    return rx.vstack(
        # plotly graph
        rx.image(src=pert_aoa_site.cmp_image),
        rx.divider(),
        rx.hstack(
            rx.box(
                rx.heading(pert_aoa_site.translations["layout_selection_title"][pert_aoa_site.language], size='1'),
                rx.form.root(
                    rx.vstack(
                        rx.hstack(
                            rx.select(
                                ["layer", "planar", "graphviz", "bfs_layout", "random"],  #
                                default_value="layer",
                                value=pert_aoa_site.selected_layout,
                                on_change=pert_aoa_site.set_selected_layout,
                                name="selected_layout",
                                size='1',
                            ),
                            rx.button(pert_aoa_site.translations["submit"][pert_aoa_site.language],
                                      type="submit", size='1'),
                        ),
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
                        rx.heading(pert_aoa_site.translations["node_addition_title"][pert_aoa_site.language], size='1'),
                        rx.form(
                            rx.hstack(
                                rx.input(placeholder=pert_aoa_site.translations["node_addition_placeholder"][
                                    pert_aoa_site.language], name="node_name", size='1'),
                                rx.button(pert_aoa_site.translations["submit"][pert_aoa_site.language], type="submit",
                                          size='1'),
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
                    rx.heading(pert_aoa_site.translations["edge_addition_title"][pert_aoa_site.language], size='1'),
                    rx.form(
                        rx.hstack(
                            rx.select.root(
                                rx.select.trigger(
                                    placeholder=pert_aoa_site.translations["edge_addition_predecessor_placeholder"][
                                        pert_aoa_site.language]),
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
                                size='1'
                            ),
                            rx.select.root(
                                rx.select.trigger(
                                    placeholder=pert_aoa_site.translations["edge_addition_successor_placeholder"][
                                        pert_aoa_site.language]),
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
                                size='1'
                            ),
                            rx.input(
                                placeholder=pert_aoa_site.translations["edge_addition_time_placeholder"][
                                    pert_aoa_site.language], size="1", name="most_likely_time"),
                            rx.input(
                                placeholder=pert_aoa_site.translations["edge_addition_optimistic_time_placeholder"][
                                    pert_aoa_site.language], size="1", name="optimistic_time"),
                            rx.input(
                                placeholder=pert_aoa_site.translations["edge_addition_pessimistic_time_placeholder"][
                                    pert_aoa_site.language], size="1", name="pessimistic_time"),
                            rx.button(
                                pert_aoa_site.translations["submit"][pert_aoa_site.language], type="submit", size='1')
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
                    rx.heading(pert_aoa_site.translations["node_deletion_title"][pert_aoa_site.language], size='1'),
                    rx.form(
                        rx.hstack(
                            rx.select.root(
                                rx.select.trigger(placeholder=pert_aoa_site.translations["node_deletion_placeholder"][
                                    pert_aoa_site.language]),
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
                                size='1'
                            ),
                            rx.button(
                                pert_aoa_site.translations["submit"][pert_aoa_site.language], type="submit", size='1'
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
                    rx.heading(pert_aoa_site.translations["edge_deletion_title"][pert_aoa_site.language], size='1'),
                    rx.form(
                        rx.hstack(
                            rx.select.root(
                                rx.select.trigger(placeholder=pert_aoa_site.translations["edge_deletion_placeholder"][
                                    pert_aoa_site.language], size='1'),
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
                                size='1'
                            ),
                            rx.button(
                                pert_aoa_site.translations["submit"][pert_aoa_site.language], type="submit", size="1"
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
                rx.heading(pert_aoa_site.translations["graph_output_title"][pert_aoa_site.language], size='1'),
                rx.button(
                    pert_aoa_site.translations["graph_output_button"][pert_aoa_site.language],
                    on_click=pert_aoa_site.download_graph,
                    size='1'
                ),
                width="20%"
            ),
            rx.box(
                rx.heading(pert_aoa_site.translations["graph_reset_title"][pert_aoa_site.language], size='1'),
                rx.button(
                    pert_aoa_site.translations["graph_reset_button"][pert_aoa_site.language],
                    on_click=pert_aoa_site.reset_graph,
                    size='1'
                ),
                width="20%"
            ),
            rx.box(
                width="15%"
            ),
            # input
            rx.box(
                rx.heading(pert_aoa_site.translations["graph_input_title"][pert_aoa_site.language], size='1'),
                rx.upload(
                    rx.text(
                        pert_aoa_site.translations["graph_input_placeholder"][pert_aoa_site.language],
                        size='1'
                    ),
                    id="my_upload",
                    border="1px dotted rgb(107,99,246)",
                    padding="1em",
                    multiple=False,
                    accept={"text/csv": [".csv"]},
                    max_size=5000000,

                ),

                rx.button(pert_aoa_site.translations["submit"][pert_aoa_site.language],
                          on_click=pert_aoa_site.handle_upload(rx.upload_files(upload_id="my_upload"))),
                rx.button("Cancel", on_click=pert_aoa_site.cancel_upload),

                width="45%"
            ),
            width="100%",
            align_items="start"
        ),

    )
