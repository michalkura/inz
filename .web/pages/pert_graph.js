
/** @jsxImportSource @emotion/react */import { Fragment, useCallback, useContext } from "react"
import { Fragment_fd0e7cb8f9fb4669a6805377d925fba0, Hstack_64f60074debfa1fa62a17858ad720cb2, Hstack_ddaaa401ae3de063c77150b143673906 } from "/utils/stateful_components"
import { Box, Button, Center, Divider, Editable, EditablePreview, EditableTextarea, Heading, HStack, Image as ChakraImage, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, option, Select, Spacer, Text, Textarea, VStack } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"
import "gridjs/dist/theme/mermaid.css"
import NextLink from "next/link"
import dynamic from "next/dynamic"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getRefValue, getRefValues, set_val } from "/utils/state"
import { Grid as DataTableGrid } from "gridjs-react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NextHead from "next/head"

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


export function Box_5b6ddbb9bb444b64f404994083139292 () {
  
    const handleSubmit_5c94cfaa7e27b9ea0ec5157ab0628191 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_node_deletion", {node:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_5c94cfaa7e27b9ea0ec5157ab0628191}>
  <HStack>
  <Select_ea4d06f5ff39f94640f82b0aeccf21ae/>
  <Button type={`submit`}>
  {`Delete node`}
</Button>
</HStack>
</Box>
  )
}

export function Box_b32636e2868f591e4e6348c61603da6e () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  
    const handleSubmit_da4dc6d8e5ac4117c7cc4b7ab7481417 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_nodes_submit", {nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    


  return (
    <Box as={`form`} onSubmit={handleSubmit_da4dc6d8e5ac4117c7cc4b7ab7481417}>
  <Vstack_ffa9eeb46d538d67a238a02fc887096a/>
</Box>
  )
}

export function Textarea_886feac8bd743d12719266e53c842f56 () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <Textarea isReadOnly={true} value={state__pert_site.cpm_json}/>
  )
}

export function Box_620107cbc750cbc3bd284668b16c3a30 () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  
    const handleSubmit_69f030e700f570bc34ec8f993bd1f471 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_edge_deletion", {edge:form_data})])

        if (true) {
            $form.reset()
        }
    })
    


  return (
    <Box as={`form`} onSubmit={handleSubmit_69f030e700f570bc34ec8f993bd1f471}>
  <HStack>
  <Select_c9ba930e76895aa76e3475062f30711d/>
  <Button type={`submit`}>
  {`Delete edge`}
</Button>
</HStack>
</Box>
  )
}

export function Select_c9ba930e76895aa76e3475062f30711d () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <Select name={`edge_del`} placeholder={`Select edge to delete.`} size={`xs`}>
  {state__pert_site.edges_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export function Select_515dc1e66b71177f23bcbb7303c087ac () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <Select name={`successor`} placeholder={`Select successor node.`} size={`xs`}>
  {state__pert_site.nodes_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export function Grid_908cbcd01e197c24159fab70cd5671e5 () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <DataTableGrid columns={state__pert_site.cpm_dataframe.columns} data={state__pert_site.cpm_dataframe.data} pagination={true} search={true}/>
  )
}

export function Box_b0b0c22cbc7a19734d06f8b39728d813 () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  
    const handleSubmit_e7f535891c33677367ded0322eba0b23 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_edges_submit", {new_edges:form_data})])

        if (true) {
            $form.reset()
        }
    })
    


  return (
    <Box as={`form`} onSubmit={handleSubmit_e7f535891c33677367ded0322eba0b23}>
  <HStack>
  <Select_64ebab49ff0c29c11d8aa3d43b8090fe/>
  <Select_515dc1e66b71177f23bcbb7303c087ac/>
  <Button type={`submit`}>
  {`Add edge`}
</Button>
</HStack>
</Box>
  )
}

export function Button_1889fcb4148afdaf100de7d9f1a051ae () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_8646e0fd3341ba6f0e2ba520f5bec0c8 = useCallback((_e) => addEvents([Event("state.pert_site.submit_input", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_8646e0fd3341ba6f0e2ba520f5bec0c8} type={`submit`}>
  {`Confirm Input`}
</Button>
  )
}

export function Box_d2611b7d2862c3ae6d80ec409ae5acca () {
  
    const handleSubmit_900ef092476ebacf40dbf7ce43cc3fdb = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.add_node_field", {new_nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_900ef092476ebacf40dbf7ce43cc3fdb}>
  <HStack>
  <Input name={`new_field`} placeholder={`Add node name`} type={`text`}/>
  <Button type={`submit`}>
  {`+`}
</Button>
</HStack>
</Box>
  )
}

export function Editable_de2c96ca8479da966a0de72009ce0d84 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_change_e6e64ba84dd4bd479b3a6551fbaa8ca8 = useCallback((_e0) => addEvents([Event("state.pert_site.set_input_json", {input_json:_e0})], (_e0), {}), [addEvents, Event])

  return (
    <Editable onChange={on_change_e6e64ba84dd4bd479b3a6551fbaa8ca8} placeholder={`Paste your data here...`} sx={{"width": "100%"}}>
  <EditablePreview/>
  <EditableTextarea/>
</Editable>
  )
}

export function Vstack_ffa9eeb46d538d67a238a02fc887096a () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <VStack>
  {state__pert_site.node_fields.map((field, idx) => (
  <HStack key={idx}>
  <Input name={(field + "_most_likely")} placeholder={(state__pert_site.form_node_placeholders.at(idx) + " most likely time")} type={`text`}/>
  <Input name={(field + "_pessimistic_time")} placeholder={(state__pert_site.form_node_placeholders.at(idx) + " pessimistic time")} type={`text`}/>
  <Input name={(field + "_optimistic_time")} placeholder={(state__pert_site.form_node_placeholders.at(idx) + " optimistic time")} type={`text`}/>
</HStack>
))}
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
  )
}

export function Plot_e15c860e2b9245a632aaf379db84a2bb () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <Plot data={state__pert_site.cpm_plotly} layout={{"showlegend": false, "hovermode": "closest", "margin": {"b": 20, "l": 5, "r": 5, "t": 40}, "xaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}, "yaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}}}/>
  )
}

export function Select_ea4d06f5ff39f94640f82b0aeccf21ae () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <Select name={`node_del`} placeholder={`Select node to delete.`} size={`xs`}>
  {state__pert_site.nodes_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export function Select_64ebab49ff0c29c11d8aa3d43b8090fe () {
  const state__pert_site = useContext(StateContexts.state__pert_site)


  return (
    <Select name={`predecessor`} placeholder={`Select predecessor node.`} size={`xs`}>
  {state__pert_site.nodes_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_fd0e7cb8f9fb4669a6805377d925fba0/>
  <HStack alignItems={`flex-start`} sx={{"transition": "left 0.5s, width 0.5s", "position": "relative"}}>
  <Box sx={{"display": ["none", "none", "block"], "minWidth": "20em", "height": "100%", "position": "sticky", "top": "0px", "borderRight": "1px solid #F4F3F6"}}>
  <VStack sx={{"height": "100dvh"}}>
  <HStack sx={{"width": "100%", "borderBottom": "1px solid #F4F3F6", "padding": "1em"}}>
  <ChakraImage src={`/icon.svg`} sx={{"height": "2em"}}/>
  <Spacer/>
  <Link as={NextLink} href={`https://github.com/reflex-dev/reflex`}>
  <Center sx={{"boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "bg": "transparent", "borderRadius": "0.375rem", "_hover": {"bg": "#F5EFFE"}}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "3em", "padding": "0.5em"}}/>
</Center>
</Link>
</HStack>
  <VStack alignItems={`flex-start`} sx={{"width": "100%", "overflowY": "auto", "padding": "1em"}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  <Hstack_64f60074debfa1fa62a17858ad720cb2/>
</Link>
  <Link as={NextLink} href={`/pert_graph`} sx={{"width": "100%"}}>
  <Hstack_ddaaa401ae3de063c77150b143673906/>
</Link>
</VStack>
  <Spacer/>
  <HStack sx={{"width": "100%", "borderTop": "1px solid #F4F3F6", "padding": "1em"}}>
  <Spacer/>
  <Link as={NextLink} href={`https://reflex.dev/docs/getting-started/introduction/`}>
  <Text>
  {`Docs`}
</Text>
</Link>
  <Link as={NextLink} href={`https://reflex.dev/blog/`}>
  <Text>
  {`Blog`}
</Text>
</Link>
</HStack>
</VStack>
</Box>
  <Box sx={{"paddingTop": "5em", "paddingX": ["auto", "2em"], "flex": "1"}}>
  <Box sx={{"alignItems": "flex-start", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "borderRadius": "0.375rem", "padding": "1em", "marginBottom": "2em"}}>
  <VStack>
  <Plot_e15c860e2b9245a632aaf379db84a2bb/>
  <Divider/>
  <HStack alignItems={`start`} sx={{"width": "100%"}}>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <VStack>
  <Heading size={`md`}>
  {`Node creation`}
</Heading>
  <Box_d2611b7d2862c3ae6d80ec409ae5acca/>
  <Divider/>
  <Box_b32636e2868f591e4e6348c61603da6e/>
</VStack>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge creation`}
</Heading>
  <Box_b0b0c22cbc7a19734d06f8b39728d813/>
</VStack>
</Box>
</HStack>
  <Divider/>
  <HStack alignItems={`start`} sx={{"width": "100%"}}>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Node deletion`}
</Heading>
  <Box_5b6ddbb9bb444b64f404994083139292/>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge deletion`}
</Heading>
  <Box_620107cbc750cbc3bd284668b16c3a30/>
</VStack>
</Box>
</HStack>
  <Divider/>
  <Grid_908cbcd01e197c24159fab70cd5671e5/>
  <Divider/>
  <HStack alignItems={`start`} sx={{"width": "100%"}}>
  <Box sx={{"width": "45%"}}>
  <Heading size={`md`}>
  {`Data output`}
</Heading>
  <Textarea_886feac8bd743d12719266e53c842f56/>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <Heading size={`md`}>
  {`Data input`}
</Heading>
  <Editable_de2c96ca8479da966a0de72009ce0d84/>
  <Button_1889fcb4148afdaf100de7d9f1a051ae/>
</Box>
</HStack>
</VStack>
</Box>
</Box>
  <Box sx={{"position": "fixed", "right": "1.5em", "top": "1.5em", "zIndex": "500"}}>
  <Menu>
  <MenuButton sx={{"width": "3em", "height": "3em", "backgroundColor": "white", "border": "1px solid #F4F3F6", "borderRadius": "0.375rem"}}>
  <HamburgerIcon sx={{"size": "4em", "color": "black"}}/>
</MenuButton>
  <MenuList>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  {`CPM`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/pert_graph`} sx={{"width": "100%"}}>
  {`PERT`}
</Link>
</MenuItem>
  <MenuDivider/>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`https://github.com/reflex-dev`} sx={{"width": "100%"}}>
  {`About`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`mailto:founders@=reflex.dev`} sx={{"width": "100%"}}>
  {`Contact`}
</Link>
</MenuItem>
</MenuList>
</Menu>
</Box>
</HStack>
  <NextHead>
  <title>
  {`PERT`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`/github.svg`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
