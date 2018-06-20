import { h } from "preact"
import Box from "grid-styled/dist/Box"
import Flex from "grid-styled/dist/Flex"
import Button from "rebass/dist/Button"
import Provider from "rebass/dist/Provider"
import styled from "styled-components"
import BugIcon from "../BugIcon"

export enum WidgetState {
  RECORDING,
  STOPPED,
  IDLE
}

export interface WidgetProps {
  state?: WidgetState
  credentials: object
  log: boolean
  warn: boolean
  error: boolean
  cookies: boolean
  localStorage: boolean
  sessionStorage: boolean
}

const size = 40

export const WidgetButton = Button.extend`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 2px;
  outline: none;
  height: ${size}px;
  width: ${size}px;
  padding: 7px;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 130px;
  }

  &:active {
    box-shadow: none;
  }
`

const Widget = (props: WidgetProps) => (
  <Provider>
    <WidgetButton>
      <BugIcon />
    </WidgetButton>
  </Provider>
)

export default Widget
