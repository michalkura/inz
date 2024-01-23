
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


export function Select_69dee95a2100e3675492c3eaabbfd2f9 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <Select name={`node_del`} placeholder={`Select node to delete.`} size={`xs`}>
  {state__cpm_site.nodes_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export function Editable_c6e44ada01aaf3859b128b489ae87c86 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_change_b4667367be6fc0e95ddabba8e72ddf90 = useCallback((_e0) => addEvents([Event("state.cpm_site.set_input_json", {input_json:_e0})], (_e0), {}), [addEvents, Event])

  return (
    <Editable onChange={on_change_b4667367be6fc0e95ddabba8e72ddf90} placeholder={`Paste your graph here...`} sx={{"width": "100%"}}>
  <EditablePreview/>
  <EditableTextarea/>
</Editable>
  )
}

export function Grid_ce4746415b41eeb5905e93eb00c8fc85 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <DataTableGrid columns={state__cpm_site.cpm_dataframe.columns} data={state__cpm_site.cpm_dataframe.data} pagination={true} search={true}/>
  )
}

export function Select_ae9d229daf1df5178be2eb4509661de8 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <Select name={`predecessor`} placeholder={`Select predecessor node.`} size={`xs`}>
  {state__cpm_site.nodes_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export function Plot_10a47ad0e2b2dc63eb1fc78c51e4cae1 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <Plot data={state__cpm_site.cpm_plotly} layout={{"showlegend": false, "hovermode": "closest", "margin": {"b": 20, "l": 5, "r": 5, "t": 40}, "xaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}, "yaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}}}/>
  )
}

export function Vstack_b872430667311c523949dc6bb83e81e3 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <VStack>
  {state__cpm_site.node_fields.map((field, idx) => (
  <Input key={idx} name={field} placeholder={(state__cpm_site.form_node_placeholders.at(idx) + " node time")} type={`text`}/>
))}
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
  )
}

export function Box_167d971ddd7ed84fbb555a61bfa7671e () {
  
    const handleSubmit_1547fa60ebe84e4e831963ded8b2c528 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_edges_submit", {new_edges:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_1547fa60ebe84e4e831963ded8b2c528}>
  <HStack>
  <Select_ae9d229daf1df5178be2eb4509661de8/>
  <Select_010d7ef94c867f806ab9073083393293/>
  <Button type={`submit`}>
  {`Add edge`}
</Button>
</HStack>
</Box>
  )
}

export function Box_102e6c40293b476ada74a43145942cc6 () {
  
    const handleSubmit_819788f77ac55ec0cefbd5240cf5e980 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_edge_deletion", {edge:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_819788f77ac55ec0cefbd5240cf5e980}>
  <HStack>
  <Select_6eba250587c946950903cdce1ad22230/>
  <Button type={`submit`}>
  {`Delete edge`}
</Button>
</HStack>
</Box>
  )
}

export function Box_9c7fafd01ffa28f87145ab3ff6a9e487 () {
  
    const handleSubmit_fcc2c71f519cfb2019ba131e83e1cf0d = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_nodes_submit", {nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_fcc2c71f519cfb2019ba131e83e1cf0d}>
  <Vstack_b872430667311c523949dc6bb83e81e3/>
</Box>
  )
}

export function Select_6eba250587c946950903cdce1ad22230 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <Select name={`edge_del`} placeholder={`Select edge to delete.`} size={`xs`}>
  {state__cpm_site.edges_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
  <option key={index_05754def86711a0e82b997b1b77b3df2} value={item}>
  {item}
</option>
))}
</Select>
  )
}

export function Textarea_3b8a5f2d57cd65201cb1c81a73180032 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <Textarea isReadOnly={true} value={state__cpm_site.cpm_json}/>
  )
}

export function Box_6ce658f2e4a6ded77653b1cc0b679280 () {
  
    const handleSubmit_f3c49764cb0c6cf1bf1a9215af5c5293 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_node_deletion", {node:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_f3c49764cb0c6cf1bf1a9215af5c5293}>
  <HStack>
  <Select_69dee95a2100e3675492c3eaabbfd2f9/>
  <Button type={`submit`}>
  {`Delete node`}
</Button>
</HStack>
</Box>
  )
}

export function Box_953667e84f059e981bc7b1151bef26d6 () {
  
    const handleSubmit_05b89430c1fc0237409fa19fe67b57fe = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.add_node_field", {new_nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_05b89430c1fc0237409fa19fe67b57fe}>
  <HStack>
  <Input name={`new_field`} placeholder={`Add node name`} type={`text`}/>
  <Button type={`submit`}>
  {`+`}
</Button>
</HStack>
</Box>
  )
}

export function Button_8ba5ea546b1f02ee752567033e6d0587 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_289cc6c8a36f7ede63249de0b5de4b20 = useCallback((_e) => addEvents([Event("state.cpm_site.submit_input", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_289cc6c8a36f7ede63249de0b5de4b20} type={`submit`}>
  {`Confirm Input`}
</Button>
  )
}

export function Select_010d7ef94c867f806ab9073083393293 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)


  return (
    <Select name={`successor`} placeholder={`Select successor node.`} size={`xs`}>
  {state__cpm_site.nodes_list.map((item, index_05754def86711a0e82b997b1b77b3df2) => (
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
  <Plot_10a47ad0e2b2dc63eb1fc78c51e4cae1/>
  <Divider/>
  <HStack alignItems={`start`} sx={{"width": "100%"}}>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <VStack>
  <Heading size={`md`}>
  {`Node creation`}
</Heading>
  <Box_953667e84f059e981bc7b1151bef26d6/>
  <Divider/>
  <Box_9c7fafd01ffa28f87145ab3ff6a9e487/>
</VStack>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge creation`}
</Heading>
  <Box_167d971ddd7ed84fbb555a61bfa7671e/>
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
  <Box_6ce658f2e4a6ded77653b1cc0b679280/>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge deletion`}
</Heading>
  <Box_102e6c40293b476ada74a43145942cc6/>
</VStack>
</Box>
</HStack>
  <Divider/>
  <Grid_ce4746415b41eeb5905e93eb00c8fc85/>
  <Divider/>
  <HStack alignItems={`start`} sx={{"width": "100%"}}>
  <Box sx={{"width": "45%"}}>
  <Heading size={`md`}>
  {`Graph output`}
</Heading>
  <Textarea_3b8a5f2d57cd65201cb1c81a73180032/>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <Heading size={`md`}>
  {`Graph input`}
</Heading>
  <Editable_c6e44ada01aaf3859b128b489ae87c86/>
  <Button_8ba5ea546b1f02ee752567033e6d0587/>
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
  {`CPM`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`/github.svg`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
