import ElementData from "@/interfaces/PerryElementData"
import PerryStoreEvent from "@/interfaces/PerryStoreEvent"

export default interface PerryReport {
  title: string
  description: string
  screenshotUrl: string
  elementData: ElementData
  event: PerryStoreEvent
}
