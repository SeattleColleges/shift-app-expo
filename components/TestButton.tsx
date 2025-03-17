import React from "react";
import { View, Button } from "react-native";

export default function TestButton() {
  return (
    <View>
      <Button
        title="Test Button"
        onPress={() => {
          console.log("Button pressed!");
          alert("Button pressed!");
        }}
      />
    </View>
  );
}
