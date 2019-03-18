import { IPerryStore } from "@perry/perry-interfaces";
import defaultOptions from "../default-options";
import applyConsoleProxy from "./";

const fakeStore: IPerryStore = {
  clear: jest.fn(),
  write: jest.fn(),
};

describe("Apply Console Proxy", () => {
  it("should return undefined", () => {
    expect(applyConsoleProxy(defaultOptions, fakeStore)).toBeUndefined();
  });
});
