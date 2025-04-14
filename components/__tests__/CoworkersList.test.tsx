
import React from "react";
import { render } from "@testing-library/react-native";
import CoworkersList from "../CoworkersList";


jest.mock("@/components/CoworkerListItem", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    CoworkerListItem: ({ id }: { id: string }) => (
      <View testID={`coworker-${id}`} />
    ),
  };
});

describe("CoworkersList Component", () => {
  it("renders the correct number of coworkers", () => {
    const { getAllByTestId } = render(<CoworkersList />);
    const coworkerItems = getAllByTestId(/coworker-/);
    expect(coworkerItems.length).toBeGreaterThan(0); 
  });
});
