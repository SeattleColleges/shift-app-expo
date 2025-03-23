import React from "react";
import { render } from "@testing-library/react-native";
import { HelloWave } from "../HelloWave";

// Mock Reanimated
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);

// Workaround for reanimated v3
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it
  Reanimated.default.call = () => {};

  return Reanimated;
});

describe("HelloWave Component", () => {
  it("renders the waving hand emoji inside Animated.View", () => {
    const { getByText } = render(<HelloWave />);
    const emoji = getByText("👋");
    expect(emoji).toBeTruthy();
  });
});
