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

export function Plot_e15c860e2b9245a632aaf379db84a2bb () {
  const state__pert_site = useContext(StateContexts.state__pert_site)



  return (
    <Plot data={state__pert_site.cpm_plotly} layout={{"showlegend": false, "hovermode": "closest", "margin": {"b": 20, "l": 5, "r": 5, "t": 40}, "xaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}, "yaxis": {"showgrid": false, "zeroline": false, "showticklabels": false}}}/>
  )
}

export function Textarea_886feac8bd743d12719266e53c842f56 () {
  const state__pert_site = useContext(StateContexts.state__pert_site)



  return (
    <Textarea isReadOnly={true} value={state__pert_site.cpm_json}/>
  )
}

export function Button_1889fcb4148afdaf100de7d9f1a051ae () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

  const on_click_8646e0fd3341ba6f0e2ba520f5bec0c8 = useCallback((_e) => addEvents([Event("state.pert_site.submit_input", {})], (_e), {}), [addEvents, Event])


  return (
    <Button onClick={on_click_8646e0fd3341ba6f0e2ba520f5bec0c8} type={`submit`}>
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

export function Select_22048cd63d8c66cc592dc078c6364a54 () {
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

export function Box_222b6ef693d3ac1dd62e2e6475b9f122 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_d3e9df48758ffb4479d0e2fee214a5af = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.add_node_field", {new_nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_d3e9df48758ffb4479d0e2fee214a5af}>
  <HStack>
  <Input name={`new_field`} placeholder={`Add node name`}/>
  <Button type={`submit`}>
  {`+`}
</Button>
</HStack>
</Box>
  )
}

export function Box_a2cde2a685066dd13690201d63e620e4 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_1897bcee2cdeb9f2ae15e13c4579ce10 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_edge_deletion", {edge:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_1897bcee2cdeb9f2ae15e13c4579ce10}>
  <HStack>
  <Select_05035282e9c7f4fedbea2d4a52d58ed2/>
  <Button type={`submit`}>
  {`Delete edge`}
</Button>
</HStack>
</Box>
  )
}

export function Box_45dac557339476a3c1540076b8df08b2 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_992da245026fa173ccab04b2430bf1b5 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_node_deletion", {node:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_992da245026fa173ccab04b2430bf1b5}>
  <HStack>
  <Select_7e82c2cc7d57cc171c56034dbac9b3d3/>
  <Button type={`submit`}>
  {`Delete node`}
</Button>
</HStack>
</Box>
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

export function Select_7e82c2cc7d57cc171c56034dbac9b3d3 () {
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

export function Box_596a4e64039fc931bb166422c966b544 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_b2e2964835ef351a29175264f92c941a = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_nodes_submit", {nodes:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_b2e2964835ef351a29175264f92c941a}>
  <Vstack_717ff217ae3752c35f25715600c94c4f/>
</Box>
  )
}

export function Grid_908cbcd01e197c24159fab70cd5671e5 () {
  const state__pert_site = useContext(StateContexts.state__pert_site)



  return (
    <DataTableGrid columns={state__pert_site.cpm_dataframe.columns} data={state__pert_site.cpm_dataframe.data} pagination={true} search={true}/>
  )
}

export function Editable_de2c96ca8479da966a0de72009ce0d84 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

  const on_change_e6e64ba84dd4bd479b3a6551fbaa8ca8 = useCallback((_e0) => addEvents([Event("state.pert_site.set_input_json", {input_json:_e0})], (_e0), {}), [addEvents, Event])


  return (
    <Editable onChange={on_change_e6e64ba84dd4bd479b3a6551fbaa8ca8} placeholder={`Paste your data here...`} sx={{"width": "100%"}}>
  <EditablePreview/>
  <EditableTextarea/>
</Editable>
  )
}

export function Box_4c029da6e3200f43ac9a92e3040a480d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);


  
    const handleSubmit_9e2ff6115dcc6078f1a68d39891efc85 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.pert_site.handle_edges_submit", {new_edges:form_data})])

        if (true) {
            $form.reset()
        }
    })
    

  return (
    <Box as={`form`} onSubmit={handleSubmit_9e2ff6115dcc6078f1a68d39891efc85}>
  <HStack>
  <Select_e082fdad5a728ee845ff1bd5610946ad/>
  <Select_22048cd63d8c66cc592dc078c6364a54/>
  <Button type={`submit`}>
  {`Add edge`}
</Button>
</HStack>
</Box>
  )
}

export function Select_05035282e9c7f4fedbea2d4a52d58ed2 () {
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

export function Select_e082fdad5a728ee845ff1bd5610946ad () {
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

export function Vstack_717ff217ae3752c35f25715600c94c4f () {
  const state__pert_site = useContext(StateContexts.state__pert_site)



  return (
    <VStack>
  {state__pert_site.node_fields.map((field, idx) => (
  <HStack key={idx}>
  <Input name={((field) + ("_most_likely"))} placeholder={((state__pert_site.form_node_placeholders.at(idx)) + (" most likely time"))}/>
  <Input name={((field) + ("_pessimistic_time"))} placeholder={((state__pert_site.form_node_placeholders.at(idx)) + (" pessimistic time"))}/>
  <Input name={((field) + ("_optimistic_time"))} placeholder={((state__pert_site.form_node_placeholders.at(idx)) + (" optimistic time"))}/>
</HStack>
))}
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
  )
}

const pulse = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`


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
  <Plot_e15c860e2b9245a632aaf379db84a2bb/>
  <Divider/>
  <HStack alignItems={`start`} sx={{"width": "100%"}}>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <VStack>
  <Heading size={`md`}>
  {`Node creation`}
</Heading>
  <Box_222b6ef693d3ac1dd62e2e6475b9f122/>
  <Divider/>
  <Box_596a4e64039fc931bb166422c966b544/>
</VStack>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge creation`}
</Heading>
  <Box_4c029da6e3200f43ac9a92e3040a480d/>
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
  <Box_45dac557339476a3c1540076b8df08b2/>
</VStack>
</Box>
  <Box sx={{"width": "10%"}}/>
  <Box sx={{"width": "45%"}}>
  <VStack>
  <Heading size={`md`}>
  {`Edge deletion`}
</Heading>
  <Box_a2cde2a685066dd13690201d63e620e4/>
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
  {`PERT`}
</title>
  <meta content={`/github.svg`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
