import { h } from "preact"
import Box from "grid-styled/dist/Box"
import Flex from "grid-styled/dist/Flex"
import ButtonOutline from "rebass/dist/ButtonOutline";
import Provider from "rebass/dist/Provider";

import WidgetProps from '../../interfaces/WidgetProps';

const Widget = (props: WidgetProps) => (
  <Provider>
    <Flex
      alignItems="center"
      justifyContent="center"
    >
      <Box m={4}>
        <ButtonOutline onClick={props.onSubmit}>
          Bug Reporter Widget
        </ButtonOutline>
      </Box>
    </Flex>
  </Provider>
);

export default Widget;