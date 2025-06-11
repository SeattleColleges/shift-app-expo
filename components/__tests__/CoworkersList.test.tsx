import React from "react";
import { render } from "@testing-library/react-native";
import CoworkersList from "../CoworkersList";
import {setMockCurrentUser} from "@/context/MockCurrentUser";


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
    // NOTE: This test is only meant to be used with the dummy coworker data
    // Any change to the coworker data set will likely break this test
    setMockCurrentUser(1,2,1);
    let { getAllByTestId } = render(<CoworkersList />);
    let coworkerItems = getAllByTestId(/coworker-/);
    expect(coworkerItems.length).toBe(5);
  });
});
