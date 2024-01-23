
/** @jsxImportSource @emotion/react */import { Fragment, useContext } from "react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, isTrue } from "/utils/state"
import { HStack, Image as ChakraImage, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"
import { getEventURL } from "/utils/state.js"




export function Fragment_fd0e7cb8f9fb4669a6805377d925fba0 () {
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export function Hstack_64f60074debfa1fa62a17858ad720cb2 () {
  const state = useContext(StateContexts.state)


  return (
    <HStack sx={{"bg": isTrue((state.router.page.path === "/cpm") || (((state.router.page.path === "/") && "CPM") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/cpm") || (((state.router.page.path === "/") && "CPM") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`CPM`}
</Text>
</HStack>
  )
}

export function Hstack_ddaaa401ae3de063c77150b143673906 () {
  const state = useContext(StateContexts.state)


  return (
    <HStack sx={{"bg": isTrue((state.router.page.path === "/pert") || (((state.router.page.path === "/") && "PERT") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/pert") || (((state.router.page.path === "/") && "PERT") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <ChakraImage src={`/github.svg`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`PERT`}
</Text>
</HStack>
  )
}
