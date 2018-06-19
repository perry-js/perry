import { h } from "preact";
import Box from "grid-styled/dist/Box";
import Flex from "grid-styled/dist/Flex";
import Button from "rebass/dist/Button";
import Text from "rebass/dist/Text";
import Provider from "rebass/dist/Provider";
import styled from "styled-components";
import BugIcon from "../BugIcon";

export interface WidgetProps {
  color?: string;
}

const WidgetButton = Button.extend`
  position: fixed;
  border: 1px solid #ddd;
  outline: none;
  bottom: 30px;
  right: 30px;
  width: 40px;
  padding: 7px 7px;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3) !important;
  height: 40px;
  transition: all 0.4s;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    box-shadow: 1px 3px 7px rgba(0, 0, 0, 0.2) !important;
    width: 130px;
    background: white;

    & > .wiget__label {
      opacity: 1;
    }
  }
`;

const WidgetLabel = Text.extend`
  color: #444;
  opacity: 0 !important;
`;

const Widget = (props: WidgetProps) => (
  <Provider>
    <Flex alignItems="center" justifyContent="center">
      <Box m={4}>
        <WidgetButton>
          <BugIcon />
          <WidgetLabel className="widget__label">Record bug</WidgetLabel>
        </WidgetButton>
      </Box>
    </Flex>
  </Provider>
);

export default Widget;
