import { h } from "preact"
import Box from "grid-styled/dist/Box"
import Flex from "grid-styled/dist/Flex"
import ButtonOutline from "rebass/dist/ButtonOutline";
import Provider from "rebass/dist/Provider";

export interface WidgetProps {
  credentials: object,
  log: boolean,
  warn: boolean,
  error: boolean,
  cookies: boolean,
  localStorage: boolean,
  sessionStorage: boolean,
};

const Widget = (props: WidgetProps) => (
  <Provider>
    <Flex
      alignItems="center"
      justifyContent="center"
    >
      <Box m={4}>
        <ButtonOutline>
          Bug Reporter Widget
        </ButtonOutline>
      </Box>
    </Flex>
  </Provider>
);

export default Widget;