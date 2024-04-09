import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { applyDelta, Event, hydrateClientStorage, useEventLoop, refs } from "/utils/state.js"

export const initialState = {"state": {"is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}, "state.update_vars_internal_state": {}, "state.pert_site": {"G": {"edges_data": {"start": ["a", "b"], "a": ["c"], "b": ["c", "d"], "c": ["e"], "d": ["e", "f"], "e": ["finish"], "f": ["finish"], "finish": []}, "nodes_data": {"start": {"most_likely_time": 0.0, "optimistic_time": 0.0, "pessimistic_time": 0.0, "task_time": 0.0, "task_variance": 0.0}, "a": {"most_likely_time": 2.0, "optimistic_time": 1.0, "pessimistic_time": 0.0, "task_time": 1.5, "task_variance": 0.16666666666666666}, "b": {"most_likely_time": 5.0, "optimistic_time": 4.0, "pessimistic_time": 0.0, "task_time": 4.0, "task_variance": 0.6666666666666666}, "c": {"most_likely_time": 1.0, "optimistic_time": 0.5, "pessimistic_time": 0.0, "task_time": 0.75, "task_variance": 0.08333333333333333}, "d": {"most_likely_time": 6.0, "optimistic_time": 5.0, "pessimistic_time": 0.0, "task_time": 4.833333333333333, "task_variance": 0.8333333333333334}, "e": {"most_likely_time": 4.0, "optimistic_time": 3.0, "pessimistic_time": 0.0, "task_time": 3.1666666666666665, "task_variance": 0.5}, "f": {"most_likely_time": 2.0, "optimistic_time": 1.0, "pessimistic_time": 0.0, "task_time": 1.5, "task_variance": 0.16666666666666666}, "finish": {"most_likely_time": 0.0, "optimistic_time": 0.0, "pessimistic_time": 0.0, "task_time": 0.0, "task_variance": 0.0}}}, "cpm_dataframe": {"columns": ["Node name", "task_time", "early_start", "late_start", "critical", "slack_time", "most_likely_time", "optimistic_time", "pessimistic_time", "variance"], "data": [["start", 0.0, 0.0, 0.0, "X", 0.0, 0.0, 0.0, 0.0, 0.0], ["a", 1.5, 0.0, 6.58, false, 6.58, 2.0, 1.0, 0.0, -0.17], ["b", 4.0, 0.0, 0.0, "X", 0.0, 5.0, 4.0, 0.0, -0.67], ["c", 0.75, 4.0, 8.08, false, 4.08, 1.0, 0.5, 0.0, -0.08], ["d", 4.83, 4.0, 4.0, "X", 0.0, 6.0, 5.0, 0.0, -0.83], ["e", 3.17, 8.83, 8.83, "X", -0.0, 4.0, 3.0, 0.0, -0.5], ["f", 1.5, 8.83, 10.5, false, 1.67, 2.0, 1.0, 0.0, -0.17], ["finish", 0.0, 12.0, 12.0, "X", 0.0, 0.0, 0.0, 0.0, 0.0]]}, "cpm_json": "{\n \"Edges\": {\n  \"start\": [\n   \"a\",\n   \"b\"\n  ],\n  \"a\": [\n   \"c\"\n  ],\n  \"b\": [\n   \"c\",\n   \"d\"\n  ],\n  \"c\": [\n   \"e\"\n  ],\n  \"d\": [\n   \"e\",\n   \"f\"\n  ],\n  \"e\": [\n   \"finish\"\n  ],\n  \"f\": [\n   \"finish\"\n  ],\n  \"finish\": []\n },\n \"Nodes\": {\n  \"start\": {\n   \"task_time\": 0.0\n  },\n  \"a\": {\n   \"task_time\": 1.5\n  },\n  \"b\": {\n   \"task_time\": 4.0\n  },\n  \"c\": {\n   \"task_time\": 0.75\n  },\n  \"d\": {\n   \"task_time\": 4.833333333333333\n  },\n  \"e\": {\n   \"task_time\": 3.1666666666666665\n  },\n  \"f\": {\n   \"task_time\": 1.5\n  },\n  \"finish\": {\n   \"task_time\": 0.0\n  }\n }\n}", "cpm_plotly": [{"hoverinfo": "none", "line": {"color": "#000000", "width": 2}, "mode": "lines", "x": [-0.9247324318542524, -0.5752675681457476, null, -0.5752675681457476, -0.6151957068254061, null, -0.5752675681457476, -0.5973071630054079, null, -0.9247324318542524, -0.5752675681457476, null, -0.5752675681457476, -0.5973071630054079, null, -0.5752675681457476, -0.6151957068254061, null, -0.42175, -0.07824999999999999, null, -0.07824999999999999, -0.11289101615137753, null, -0.07824999999999999, -0.11289101615137753, null, -0.43002423343148005, -0.06997576656851995, null, -0.06997576656851995, -0.10861279962008269, null, -0.06997576656851995, -0.08032852837262078, null, -0.42175, -0.07824999999999999, null, -0.07824999999999999, -0.11289101615137753, null, -0.07824999999999999, -0.11289101615137753, null, 0.07824999999999999, 0.42175, null, 0.42175, 0.38710898384862247, null, 0.42175, 0.38710898384862247, null, 0.06997576656851995, 0.43002423343148005, null, 0.43002423343148005, 0.3913872003799173, null, 0.43002423343148005, 0.4196714716273792, null, 0.07824999999999999, 0.42175, null, 0.42175, 0.38710898384862247, null, 0.42175, 0.38710898384862247, null, 0.5752675681457476, 0.9247324318542524, null, 0.9247324318542524, 0.9026928369945921, null, 0.9247324318542524, 0.8848042931745939, null, 0.5752675681457476, 0.9247324318542524, null, 0.9247324318542524, 0.8848042931745939, null, 0.9247324318542524, 0.9026928369945921, null], "y": [0.03763378407287381, 0.21236621592712618, null, 0.21236621592712618, 0.21476282636229482, null, 0.21236621592712618, 0.1789857387222982, null, -0.03763378407287381, -0.21236621592712618, null, -0.21236621592712618, -0.1789857387222982, null, -0.21236621592712618, -0.21476282636229482, null, 0.25, 0.25, null, 0.25, 0.27, null, 0.25, 0.22999999999999998, null, -0.18002423343148005, 0.18002423343148005, null, 0.18002423343148005, 0.16967147162737922, null, 0.18002423343148005, 0.1413872003799173, null, -0.25, -0.25, null, -0.25, -0.23, null, -0.25, -0.27, null, 0.25, 0.25, null, 0.25, 0.27, null, 0.25, 0.22999999999999998, null, -0.18002423343148005, 0.18002423343148005, null, 0.18002423343148005, 0.16967147162737922, null, 0.18002423343148005, 0.1413872003799173, null, -0.25, -0.25, null, -0.25, -0.23, null, -0.25, -0.27, null, 0.21236621592712618, 0.03763378407287381, null, 0.03763378407287381, 0.0710142612777018, null, 0.03763378407287381, 0.035237173637705156, null, -0.21236621592712618, -0.03763378407287381, null, -0.03763378407287381, -0.035237173637705156, null, -0.03763378407287381, -0.0710142612777018, null], "type": "scatter"}, {"customdata": [[0, 0.0, 0.0, 0.0], [0, 1.5, 6.583333, 8.083333], [0, 4.0, 0.0, 4.0], [4.0, 4.75, 8.083333, 8.833333], [4.0, 8.833333, 4.0, 8.833333], [8.833333, 12.0, 8.833333, 12.0], [8.833333, 10.333333, 10.5, 12.0], [11.999999999999998, 11.999999999999998, 11.999999999999998, 11.999999999999998]], "hoverinfo": "text", "hovertemplate": "early_start: %{customdata[0]}<br>early_finish: %{customdata[1]}<br>late_start: %{customdata[2]}<br>late_finish: %{customdata[3]}", "marker": {"color": [1, 0, 1, 0, 1, 1, 0, 1], "showscale": false, "size": 20}, "mode": "markers+text", "name": "", "text": ["start", "a", "b", "c", "d", "e", "f", "finish"], "textposition": "top center", "x": [-1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0], "y": [0.0, 0.25, -0.25, 0.25, -0.25, 0.25, -0.25, 0.0], "type": "scatter"}], "edges_list": ["start->a", "start->b", "a->c", "b->c", "b->d", "c->e", "d->e", "d->f", "e->finish", "f->finish"], "form_node_placeholders": [], "input_json": "", "node_fields": [], "nodes_list": ["start", "a", "b", "c", "d", "e", "f", "finish"]}, "state.cpm_aoa_site": {"G": {"edges_data": {"start": ["a", "b"], "a": ["c"], "b": ["c", "d"], "c": ["e"], "d": ["e", "f"], "e": ["finish"], "f": ["finish"], "finish": []}, "nodes_data": {"start": {"task_time": 0}, "a": {"task_time": 2}, "b": {"task_time": 5}, "c": {"task_time": 1}, "d": {"task_time": 6}, "e": {"task_time": 4}, "f": {"task_time": 2}, "finish": {"task_time": 0}}}, "cpm_dataframe": {"columns": ["Node name", "task_time", "early_start", "late_start", "critical", "slack_time"], "data": [["start", 0, 0, 0, "X", 0], ["a", 2, 0, 8, false, 8], ["b", 5, 0, 0, "X", 0], ["c", 1, 5, 10, false, 5], ["d", 6, 5, 5, "X", 0], ["e", 4, 11, 11, "X", 0], ["f", 2, 11, 13, false, 2], ["finish", 0, 15, 15, "X", 0]]}, "cpm_json": "{\n \"Edges\": {\n  \"start\": [\n   \"a\",\n   \"b\"\n  ],\n  \"a\": [\n   \"c\"\n  ],\n  \"b\": [\n   \"c\",\n   \"d\"\n  ],\n  \"c\": [\n   \"e\"\n  ],\n  \"d\": [\n   \"e\",\n   \"f\"\n  ],\n  \"e\": [\n   \"finish\"\n  ],\n  \"f\": [\n   \"finish\"\n  ],\n  \"finish\": []\n },\n \"Nodes\": {\n  \"start\": {\n   \"task_time\": 0\n  },\n  \"a\": {\n   \"task_time\": 2\n  },\n  \"b\": {\n   \"task_time\": 5\n  },\n  \"c\": {\n   \"task_time\": 1\n  },\n  \"d\": {\n   \"task_time\": 6\n  },\n  \"e\": {\n   \"task_time\": 4\n  },\n  \"f\": {\n   \"task_time\": 2\n  },\n  \"finish\": {\n   \"task_time\": 0\n  }\n }\n}", "cpm_plotly": [{"hoverinfo": "none", "line": {"color": "#000000", "width": 2}, "mode": "lines", "x": [-0.9247324318542524, -0.5752675681457476, null, -0.5752675681457476, -0.6151957068254061, null, -0.5752675681457476, -0.5973071630054079, null, -0.9247324318542524, -0.5752675681457476, null, -0.5752675681457476, -0.5973071630054079, null, -0.5752675681457476, -0.6151957068254061, null, -0.42175, -0.07824999999999999, null, -0.07824999999999999, -0.11289101615137753, null, -0.07824999999999999, -0.11289101615137753, null, -0.43002423343148005, -0.06997576656851995, null, -0.06997576656851995, -0.10861279962008269, null, -0.06997576656851995, -0.08032852837262078, null, -0.42175, -0.07824999999999999, null, -0.07824999999999999, -0.11289101615137753, null, -0.07824999999999999, -0.11289101615137753, null, 0.07824999999999999, 0.42175, null, 0.42175, 0.38710898384862247, null, 0.42175, 0.38710898384862247, null, 0.06997576656851995, 0.43002423343148005, null, 0.43002423343148005, 0.3913872003799173, null, 0.43002423343148005, 0.4196714716273792, null, 0.07824999999999999, 0.42175, null, 0.42175, 0.38710898384862247, null, 0.42175, 0.38710898384862247, null, 0.5752675681457476, 0.9247324318542524, null, 0.9247324318542524, 0.9026928369945921, null, 0.9247324318542524, 0.8848042931745939, null, 0.5752675681457476, 0.9247324318542524, null, 0.9247324318542524, 0.8848042931745939, null, 0.9247324318542524, 0.9026928369945921, null], "y": [0.03763378407287381, 0.21236621592712618, null, 0.21236621592712618, 0.21476282636229482, null, 0.21236621592712618, 0.1789857387222982, null, -0.03763378407287381, -0.21236621592712618, null, -0.21236621592712618, -0.1789857387222982, null, -0.21236621592712618, -0.21476282636229482, null, 0.25, 0.25, null, 0.25, 0.27, null, 0.25, 0.22999999999999998, null, -0.18002423343148005, 0.18002423343148005, null, 0.18002423343148005, 0.16967147162737922, null, 0.18002423343148005, 0.1413872003799173, null, -0.25, -0.25, null, -0.25, -0.23, null, -0.25, -0.27, null, 0.25, 0.25, null, 0.25, 0.27, null, 0.25, 0.22999999999999998, null, -0.18002423343148005, 0.18002423343148005, null, 0.18002423343148005, 0.16967147162737922, null, 0.18002423343148005, 0.1413872003799173, null, -0.25, -0.25, null, -0.25, -0.23, null, -0.25, -0.27, null, 0.21236621592712618, 0.03763378407287381, null, 0.03763378407287381, 0.0710142612777018, null, 0.03763378407287381, 0.035237173637705156, null, -0.21236621592712618, -0.03763378407287381, null, -0.03763378407287381, -0.035237173637705156, null, -0.03763378407287381, -0.0710142612777018, null], "type": "scatter"}, {"customdata": [[0, 0, 0, 0], [0, 2, 8, 10], [0, 5, 0, 5], [5, 6, 10, 11], [5, 11, 5, 11], [11, 15, 11, 15], [11, 13, 13, 15], [15, 15, 15, 15]], "hoverinfo": "text", "hovertemplate": "early_start: %{customdata[0]}<br>early_finish: %{customdata[1]}<br>late_start: %{customdata[2]}<br>late_finish: %{customdata[3]}", "marker": {"color": [1, 0, 1, 0, 1, 1, 0, 1], "showscale": false, "size": 20}, "mode": "markers+text", "name": "", "text": ["start", "a", "b", "c", "d", "e", "f", "finish"], "textposition": "top center", "x": [-1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0], "y": [0.0, 0.25, -0.25, 0.25, -0.25, 0.25, -0.25, 0.0], "type": "scatter"}], "edges_list": ["start->a", "start->b", "a->c", "b->c", "b->d", "c->e", "d->e", "d->f", "e->finish", "f->finish"], "form_node_placeholders": [], "input_json": "", "node_fields": [], "nodes_list": ["start", "a", "b", "c", "d", "e", "f", "finish"]}, "state.cpm_site": {"G": {"edges_data": {"start": ["a", "b"], "a": ["c"], "b": ["c", "d"], "c": ["e"], "d": ["e", "f"], "e": ["finish"], "f": ["finish"], "finish": []}, "nodes_data": {"start": {"task_time": 0}, "a": {"task_time": 2}, "b": {"task_time": 5}, "c": {"task_time": 1}, "d": {"task_time": 6}, "e": {"task_time": 4}, "f": {"task_time": 2}, "finish": {"task_time": 0}}}, "cpm_dataframe": {"columns": ["Node name", "task_time", "early_start", "late_start", "critical", "slack_time"], "data": [["start", 0, 0, 0, "X", 0], ["a", 2, 0, 8, false, 8], ["b", 5, 0, 0, "X", 0], ["c", 1, 5, 10, false, 5], ["d", 6, 5, 5, "X", 0], ["e", 4, 11, 11, "X", 0], ["f", 2, 11, 13, false, 2], ["finish", 0, 15, 15, "X", 0]]}, "cpm_json": "{\n \"Edges\": {\n  \"start\": [\n   \"a\",\n   \"b\"\n  ],\n  \"a\": [\n   \"c\"\n  ],\n  \"b\": [\n   \"c\",\n   \"d\"\n  ],\n  \"c\": [\n   \"e\"\n  ],\n  \"d\": [\n   \"e\",\n   \"f\"\n  ],\n  \"e\": [\n   \"finish\"\n  ],\n  \"f\": [\n   \"finish\"\n  ],\n  \"finish\": []\n },\n \"Nodes\": {\n  \"start\": {\n   \"task_time\": 0\n  },\n  \"a\": {\n   \"task_time\": 2\n  },\n  \"b\": {\n   \"task_time\": 5\n  },\n  \"c\": {\n   \"task_time\": 1\n  },\n  \"d\": {\n   \"task_time\": 6\n  },\n  \"e\": {\n   \"task_time\": 4\n  },\n  \"f\": {\n   \"task_time\": 2\n  },\n  \"finish\": {\n   \"task_time\": 0\n  }\n }\n}", "cpm_plotly": [{"hoverinfo": "none", "line": {"color": "#000000", "width": 2}, "mode": "lines", "x": [-0.9247324318542524, -0.5752675681457476, null, -0.5752675681457476, -0.6151957068254061, null, -0.5752675681457476, -0.5973071630054079, null, -0.9247324318542524, -0.5752675681457476, null, -0.5752675681457476, -0.5973071630054079, null, -0.5752675681457476, -0.6151957068254061, null, -0.42175, -0.07824999999999999, null, -0.07824999999999999, -0.11289101615137753, null, -0.07824999999999999, -0.11289101615137753, null, -0.43002423343148005, -0.06997576656851995, null, -0.06997576656851995, -0.10861279962008269, null, -0.06997576656851995, -0.08032852837262078, null, -0.42175, -0.07824999999999999, null, -0.07824999999999999, -0.11289101615137753, null, -0.07824999999999999, -0.11289101615137753, null, 0.07824999999999999, 0.42175, null, 0.42175, 0.38710898384862247, null, 0.42175, 0.38710898384862247, null, 0.06997576656851995, 0.43002423343148005, null, 0.43002423343148005, 0.3913872003799173, null, 0.43002423343148005, 0.4196714716273792, null, 0.07824999999999999, 0.42175, null, 0.42175, 0.38710898384862247, null, 0.42175, 0.38710898384862247, null, 0.5752675681457476, 0.9247324318542524, null, 0.9247324318542524, 0.9026928369945921, null, 0.9247324318542524, 0.8848042931745939, null, 0.5752675681457476, 0.9247324318542524, null, 0.9247324318542524, 0.8848042931745939, null, 0.9247324318542524, 0.9026928369945921, null], "y": [0.03763378407287381, 0.21236621592712618, null, 0.21236621592712618, 0.21476282636229482, null, 0.21236621592712618, 0.1789857387222982, null, -0.03763378407287381, -0.21236621592712618, null, -0.21236621592712618, -0.1789857387222982, null, -0.21236621592712618, -0.21476282636229482, null, 0.25, 0.25, null, 0.25, 0.27, null, 0.25, 0.22999999999999998, null, -0.18002423343148005, 0.18002423343148005, null, 0.18002423343148005, 0.16967147162737922, null, 0.18002423343148005, 0.1413872003799173, null, -0.25, -0.25, null, -0.25, -0.23, null, -0.25, -0.27, null, 0.25, 0.25, null, 0.25, 0.27, null, 0.25, 0.22999999999999998, null, -0.18002423343148005, 0.18002423343148005, null, 0.18002423343148005, 0.16967147162737922, null, 0.18002423343148005, 0.1413872003799173, null, -0.25, -0.25, null, -0.25, -0.23, null, -0.25, -0.27, null, 0.21236621592712618, 0.03763378407287381, null, 0.03763378407287381, 0.0710142612777018, null, 0.03763378407287381, 0.035237173637705156, null, -0.21236621592712618, -0.03763378407287381, null, -0.03763378407287381, -0.035237173637705156, null, -0.03763378407287381, -0.0710142612777018, null], "type": "scatter"}, {"customdata": [[0, 0, 0, 0], [0, 2, 8, 10], [0, 5, 0, 5], [5, 6, 10, 11], [5, 11, 5, 11], [11, 15, 11, 15], [11, 13, 13, 15], [15, 15, 15, 15]], "hoverinfo": "text", "hovertemplate": "early_start: %{customdata[0]}<br>early_finish: %{customdata[1]}<br>late_start: %{customdata[2]}<br>late_finish: %{customdata[3]}", "marker": {"color": [1, 0, 1, 0, 1, 1, 0, 1], "showscale": false, "size": 20}, "mode": "markers+text", "name": "", "text": ["start", "a", "b", "c", "d", "e", "f", "finish"], "textposition": "top center", "x": [-1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0], "y": [0.0, 0.25, -0.25, 0.25, -0.25, 0.25, -0.25, 0.0], "type": "scatter"}], "edges_list": ["start->a", "start->b", "a->c", "b->c", "b->d", "c->e", "d->e", "d->f", "e->finish", "f->finish"], "form_node_placeholders": [], "input_json": "", "node_fields": [], "nodes_list": ["start", "a", "b", "c", "d", "e", "f", "finish"]}, "state.on_load_internal_state": {}}

export const defaultColorMode = "light"
export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {
  state: createContext(null),
  state__update_vars_internal_state: createContext(null),
  state__pert_site: createContext(null),
  state__cpm_aoa_site: createContext(null),
  state__cpm_site: createContext(null),
  state__on_load_internal_state: createContext(null),
}
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const state_name = "state"

// Theses events are triggered on initial load and each page navigation.
export const onLoadInternalEvent = () => {
    const internal_events = [];

    // Get tracked cookie and local storage vars to send to the backend.
    const client_storage_vars = hydrateClientStorage(clientStorage);
    // But only send the vars if any are actually set in the browser.
    if (client_storage_vars && Object.keys(client_storage_vars).length !== 0) {
        internal_events.push(
            Event(
                'state.update_vars_internal_state.update_vars_internal',
                {vars: client_storage_vars},
            ),
        );
    }

    // `on_load_internal` triggers the correct on_load event(s) for the current page.
    // If the page does not define any on_load event, this will just set `is_hydrated = true`.
    internal_events.push(Event('state.on_load_internal_state.on_load_internal'));

    return internal_events;
}

// The following events are sent when the websocket connects or reconnects.
export const initialEvents = () => [
    Event('state.hydrate'),
    ...onLoadInternalEvent()
]

export const isDevMode = true

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return (
    <UploadFilesContext.Provider value={[filesById, setFilesById]}>
      {children}
    </UploadFilesContext.Provider>
  )
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEvents, connectErrors] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectErrors]}>
      {children}
    </EventLoopContext.Provider>
  )
}

export function StateProvider({ children }) {
  const [state, dispatch_state] = useReducer(applyDelta, initialState["state"])
  const [state__update_vars_internal_state, dispatch_state__update_vars_internal_state] = useReducer(applyDelta, initialState["state.update_vars_internal_state"])
  const [state__pert_site, dispatch_state__pert_site] = useReducer(applyDelta, initialState["state.pert_site"])
  const [state__cpm_aoa_site, dispatch_state__cpm_aoa_site] = useReducer(applyDelta, initialState["state.cpm_aoa_site"])
  const [state__cpm_site, dispatch_state__cpm_site] = useReducer(applyDelta, initialState["state.cpm_site"])
  const [state__on_load_internal_state, dispatch_state__on_load_internal_state] = useReducer(applyDelta, initialState["state.on_load_internal_state"])
  const dispatchers = useMemo(() => {
    return {
      "state": dispatch_state,
      "state.update_vars_internal_state": dispatch_state__update_vars_internal_state,
      "state.pert_site": dispatch_state__pert_site,
      "state.cpm_aoa_site": dispatch_state__cpm_aoa_site,
      "state.cpm_site": dispatch_state__cpm_site,
      "state.on_load_internal_state": dispatch_state__on_load_internal_state,
    }
  }, [])

  return (
    <StateContexts.state.Provider value={ state }>
    <StateContexts.state__update_vars_internal_state.Provider value={ state__update_vars_internal_state }>
    <StateContexts.state__pert_site.Provider value={ state__pert_site }>
    <StateContexts.state__cpm_aoa_site.Provider value={ state__cpm_aoa_site }>
    <StateContexts.state__cpm_site.Provider value={ state__cpm_site }>
    <StateContexts.state__on_load_internal_state.Provider value={ state__on_load_internal_state }>
      <DispatchContext.Provider value={dispatchers}>
        {children}
      </DispatchContext.Provider>
    </StateContexts.state__on_load_internal_state.Provider>
    </StateContexts.state__cpm_site.Provider>
    </StateContexts.state__cpm_aoa_site.Provider>
    </StateContexts.state__pert_site.Provider>
    </StateContexts.state__update_vars_internal_state.Provider>
    </StateContexts.state.Provider>
  )
}