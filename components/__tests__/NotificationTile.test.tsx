import React from "react";
import { render } from "@testing-library/react-native";
import { Animated } from "react-native";
import { NotificationTile } from "../NotificationTile"; 

describe("NotificationTile Component", () => {
  const mockNotification = {
    id: 1,
    message: "Test notification message",
    dateTime: "2025-03-23T12:34:00Z", 
  };

  const mockScrollSet = new Animated.Value(0);

  it("renders notification message and formatted date/time correctly", () => {
    const { getByText } = render(
      <NotificationTile
        notification={mockNotification}
        index={0}
        scrollSet={mockScrollSet}
      />
    );

    
    expect(getByText("Test notification message")).toBeTruthy();

    
    const date = new Date(mockNotification.dateTime).toDateString();
    const timeObj = new Date(mockNotification.dateTime).toLocaleTimeString("en-US");
    const formattedTime = timeObj.slice(0, -6) + " " + timeObj.slice(-2);

    
    expect(getByText(`${date} ${formattedTime}`)).toBeTruthy();
  });

  it("renders an Animated.View for the card", () => {
    const { UNSAFE_getAllByType } = render(
      <NotificationTile
        notification={mockNotification}
        index={0}
        scrollSet={mockScrollSet}
      />
    );

    const animatedViews = UNSAFE_getAllByType(Animated.View);
    expect(animatedViews.length).toBeGreaterThan(0);
  });
});
