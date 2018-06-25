import Text from "rebass/dist/Text"
import Button from "rebass/dist/Button"

const buttonSize = 40

export const WidgetButton = Button.extend`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 2px;
  outline: none;
  height: ${buttonSize}px;
  width: ${buttonSize}px;
  padding: 7px;
  cursor: pointer;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  overflow: hidden;
  color: #444;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2) !important;
    display: flex;
    align-items: center;
    width: 180px;
  }

  &:active {
    box-shadow: none !important;
    border: 1px solid #ddd;
  }

  &:focus {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
    border: 1px solid #ddd;
  }
`

export const StyledLabel = Text.extend`
  transition: all 0.3s;
  color: #444;
  opacity: 0;
  white-space: nowrap;
  margin-right: 3px;
  font-size: 0.8em;

  ${WidgetButton}:hover & {
    opacity: 1;
  }
`
