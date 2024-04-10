/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getBackendURL, getRefValue, getRefValues, isTrue, set_val } from "/utils/state"
import { WifiOffIcon as LucideWifiOffIcon } from "lucide-react"
import { keyframes } from "@emotion/react"
import { Dialog as RadixThemesDialog, Text as RadixThemesText, Theme as RadixThemesTheme } from "@radix-ui/themes"
import env from "/env.json"
import { Box, Button, Center, Divider, Editable, EditablePreview, EditableTextarea, Heading, HStack, Image as ChakraImage, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, option, Select, Spacer, Text, Textarea, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import dynamic from "next/dynamic"
import "@radix-ui/themes/styles.css"
import "gridjs/dist/theme/mermaid.css"
import theme from "/utils/theme.js"
import { Grid as DataTableGrid } from "gridjs-react"
import { HamburgerIcon } from "@chakra-ui/icons"
import NextHead from "next/head"

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });


const pulse = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`


export function Box_e5eae12f273f40a3a69835904faef78d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_010fdf79b390b258c7d636c7691532d0 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.add_node_field", {new_nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_010fdf79b390b258c7d636c7691532d0}>
  <HStack>
  <Input name={`new_field`} placeholder={`Add node name`}/>
  <Button type={`submit`}>
  {`+`}
</Button>
</HStack>
</Box>
  )
}

export function Vstack_0f0a4090fd218c228a1abf85551ed2b8 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)



  return (
    <VStack>
  {state__cpm_site.node_fields.map((field, idx) => (
  <Input key={idx} name={field} placeholder={((state__cpm_site.form_node_placeholders.at(idx)) + (" node time"))}/>
))}
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
  )
}

export function Fragment_34f041f6aae0b1134e0b2a186d19d162 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    <Fragment>
  {isTrue(connectErrors.length >= 2) ? (
  <Fragment>
  <RadixThemesDialog.Root css={{"zIndex": 9999}} open={connectErrors.length >= 2}>
  <RadixThemesDialog.Content>
  <RadixThemesDialog.Title>
  {`Connection Error`}
</RadixThemesDialog.Title>
  <RadixThemesText as={`p`}>
  {`Cannot connect to server: `}
  {(connectErrors.length > 0) ? connectErrors[connectErrors.length - 1].message : ''}
  {`. Check if server is reachable at `}
  {getBackendURL(env.EVENT).href}
</RadixThemesText>
</RadixThemesDialog.Content>
</RadixThemesDialog.Root>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export function Select_73bfe285e44f647ad54cfe717cbd53e8 () {
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

export function Grid_ce4746415b41eeb5905e93eb00c8fc85 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)



  return (
    <DataTableGrid columns={state__cpm_site.cpm_dataframe.columns} data={state__cpm_site.cpm_dataframe.data} pagination={true} search={true}/>
  )
}

export function Button_8ba5ea546b1f02ee752567033e6d0587 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

  const on_click_289cc6c8a36f7ede63249de0b5de4b20 = useCallback((_e) => addEvents([Event("state.cpm_site.submit_input", {})], (_e), {}), [addEvents, Event])


  return (
    <Button onClick={on_click_289cc6c8a36f7ede63249de0b5de4b20} type={`submit`}>
  {`Confirm Input`}
</Button>
  )
}

export function Hstack_84a9c39c59adfdb98326bd425bc36583 () {
  const state = useContext(StateContexts.state)



  return (
    <HStack sx={{"background": isTrue((((state.router.page.path) === ("/pert")) || ((((state.router.page.path) === ("/")) && ("PERT")) === ("Home")))) ? `#F5EFFE` : `transparent`, "color": isTrue((((state.router.page.path) === ("/pert")) || ((((state.router.page.path) === ("/")) && ("PERT")) === ("Home")))) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingInlineStart": "1em", "paddingInlineEnd": "1em"}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`PERT`}
</Text>
</HStack>
  )
}

export function Box_a1ccf330e4c40ef9cc49d0aa61576486 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_1818a70fbaa179d36f70fe9b441ed50f = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_edges_submit", {new_edges:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_1818a70fbaa179d36f70fe9b441ed50f}>
  <HStack>
  <Select_4d9f512ad39b2c493c981c3a026b9d9f/>
  <Select_9ca0d3fc50aa295b994ab7776edfec20/>
  <Button type={`submit`}>
  {`Add edge`}
</Button>
</HStack>
</Box>
  )
}

export function Select_32c13c7b76e63786b3695052c71d1644 () {
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

export function Fragment_3ea1a0318ded176a3888f943242093c6 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);



  return (
    <Fragment>
  {isTrue(connectErrors.length > 0) ? (
  <Fragment>
  <LucideWifiOffIcon css={{"color": "crimson", "zIndex": 9999, "position": "fixed", "bottom": "30px", "right": "30px", "animation": `${pulse} 1s infinite`}} size={32}/>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export function Select_9ca0d3fc50aa295b994ab7776edfec20 () {
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

export function Hstack_c79ea6062abcf717b3bd6cad03600478 () {
  const state = useContext(StateContexts.state)



  return (
    <HStack sx={{"background": isTrue((((state.router.page.path) === ("/cpm")) || ((((state.router.page.path) === ("/")) && ("CPM")) === ("Home")))) ? `#F5EFFE` : `transparent`, "color": isTrue((((state.router.page.path) === ("/cpm")) || ((((state.router.page.path) === ("/")) && ("CPM")) === ("Home")))) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingInlineStart": "1em", "paddingInlineEnd": "1em"}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`CPM`}
</Text>
</HStack>
  )
}

export function Textarea_3b8a5f2d57cd65201cb1c81a73180032 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)



  return (
    <Textarea isReadOnly={true} value={state__cpm_site.cpm_json}/>
  )
}

export function Select_4d9f512ad39b2c493c981c3a026b9d9f () {
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

export function Box_2bb6bb83840cad8065d635170fe55964 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_8df258c6c30a877d8767b802f7ab6b08 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_edge_deletion", {edge:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_8df258c6c30a877d8767b802f7ab6b08}>
  <HStack>
  <Select_73bfe285e44f647ad54cfe717cbd53e8/>
  <Button type={`submit`}>
  {`Delete edge`}
</Button>
</HStack>
</Box>
  )
}

export function Editable_c6e44ada01aaf3859b128b489ae87c86 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

  const on_change_b4667367be6fc0e95ddabba8e72ddf90 = useCallback((_e0) => addEvents([Event("state.cpm_site.set_input_json", {input_json:_e0})], (_e0), {}), [addEvents, Event])


  return (
    <Editable onChange={on_change_b4667367be6fc0e95ddabba8e72ddf90} placeholder={`Paste your graph here...`} sx={{"width": "100%"}}>
  <EditablePreview/>
  <EditableTextarea/>
</Editable>
  )
}

export function Plot_10a47ad0e2b2dc63eb1fc78c51e4cae1 () {
  const state__cpm_site = useContext(StateContexts.state__cpm_site)



  return (
    <Plot data={state__cpm_site.cpm_plotly} layout={{"showlegend": false, "hovermode": "closest", "margin": {"b": 20, "l": 5, "r": 5, "t": 40}, "xaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}, "yaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}}}/>
  )
}

export function Hstack_08d061ff7d68b9dc0044e5bcedc5be88 () {
  const state = useContext(StateContexts.state)



  return (
    <HStack sx={{"background": isTrue((((state.router.page.path) === ("/cpm aoa")) || ((((state.router.page.path) === ("/")) && ("CPM AoA")) === ("Home")))) ? `#F5EFFE` : `transparent`, "color": isTrue((((state.router.page.path) === ("/cpm aoa")) || ((((state.router.page.path) === ("/")) && ("CPM AoA")) === ("Home")))) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingInlineStart": "1em", "paddingInlineEnd": "1em"}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`CPM AoA`}
</Text>
</HStack>
  )
}

export function Box_04869af1b1364982a46eb36850e03bbb () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_059747424201efbbbb366a919e010fe5 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_node_deletion", {node:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_059747424201efbbbb366a919e010fe5}>
  <HStack>
  <Select_32c13c7b76e63786b3695052c71d1644/>
  <Button type={`submit`}>
  {`Delete node`}
</Button>
</HStack>
</Box>
  )
}

export function Box_7d1e5d876a9b7b2c92b4012887db22a6 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_83fb8c857df5a808cca0f18c637ff25a = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.cpm_site.handle_nodes_submit", {nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_83fb8c857df5a808cca0f18c637ff25a}>
  <Vstack_0f0a4090fd218c228a1abf85551ed2b8/>
</Box>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment>
  <div css={{"position": "fixed", "width": "100vw", "height": "0"}}>
  <Fragment_3ea1a0318ded176a3888f943242093c6/>
</div>
  <Fragment_34f041f6aae0b1134e0b2a186d19d162/>
</Fragment>
  <HStack alignItems={`flex-start`} sx={{"transition": "left 0.5s, width 0.5s", "position": "relative"}}>
  <Box sx={{"display": ["none", "none", "block"], "minWidth": "20em", "height": "100%", "position": "sticky", "top": "0px", "borderRight": "1px solid #F4F3F6"}}>
  <VStack sx={{"height": "100dvh"}}>
  <HStack sx={{"width": "100%", "borderBottom": "1px solid #F4F3F6", "padding": "1em"}}>
  <ChakraImage src={`/icon.svg`} sx={{"height": "2em"}}/>
  <Spacer/>
  <Link as={NextLink} href={`https://github.com/reflex-dev/reflex`}>
  <Center sx={{"boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "background": "transparent", "borderRadius": "0.375rem", "_hover": {"background": "#F5EFFE"}}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "3em", "padding": "0.5em"}}/>
</Center>
</Link>
</HStack>
  <VStack alignItems={`flex-start`} sx={{"width": "100%", "overflowY": "auto", "padding": "1em"}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  <Hstack_c79ea6062abcf717b3bd6cad03600478/>
</Link>
  <Link as={NextLink} href={`/cpm_AoA`} sx={{"width": "100%"}}>
  <Hstack_08d061ff7d68b9dc0044e5bcedc5be88/>
</Link>
  <Link as={NextLink} href={`/pert_graph`} sx={{"width": "100%"}}>
  <Hstack_84a9c39c59adfdb98326bd425bc36583/>
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
  <Box sx={{"paddingTop": "5em", "paddingInlineStart": ["auto", "2em"], "paddingInlineEnd": ["auto", "2em"], "flex": "1"}}>
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
  <Box_e5eae12f273f40a3a69835904faef78d/>
  <Divider/>
  <Box_7d1e5d876a9b7b2c92b4012887db22a6/>
</VStack>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge creation`}
</Heading>
  <Box_a1ccf330e4c40ef9cc49d0aa61576486/>
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
  <Box_04869af1b1364982a46eb36850e03bbb/>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge deletion`}
</Heading>
  <Box_2bb6bb83840cad8065d635170fe55964/>
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
  <MenuItem sx={{"_hover": {"background": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  {`CPM`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"background": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/cpm_AoA`} sx={{"width": "100%"}}>
  {`CPM AoA`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"background": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/pert_graph`} sx={{"width": "100%"}}>
  {`PERT`}
</Link>
</MenuItem>
  <MenuDivider/>
  <MenuItem sx={{"_hover": {"background": "#F5EFFE"}}}>
  <Link as={NextLink} href={`https://github.com/reflex-dev`} sx={{"width": "100%"}}>
  {`About`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"background": "#F5EFFE"}}}>
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
  <meta content={`/github.svg`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
