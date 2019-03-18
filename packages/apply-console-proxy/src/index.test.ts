import defaultOptions from "@perry/default-options";
import applyConsoleProxy from "./";

describe("Apply Console Proxy", () => {
  it("should return undefined", () => {
    expect(applyConsoleProxy(defaultOptions)).toBeUndefined();
  });
});
