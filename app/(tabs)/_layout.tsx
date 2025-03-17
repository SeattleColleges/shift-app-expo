import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

interface TabLayoutProps {
  userRole: string; // Accepting userRole as a prop
}

const TabLayout: React.FC<TabLayoutProps> = ({ userRole }) => {
  console.log("Rendering TabLayout with userRole:", userRole);

  // Create the common tabs
  const commonTabs = [
    {
      name: "index",
      title: "Schedule",
      icon: "calendar-check-o",
    },
    {
      name: "coworkers",
      title: "Coworkers",
      icon: "users",
    },
    {
      name: "notifications",
      title: "Notifications",
      icon: "bell",
    },
    {
      name: "profileView",
      title: "Profile",
      icon: "user",
    },
  ];

  // Create the conditional tabs based on user role
  const conditionalTabs =
    userRole === "admin"
      ? [
          {
            name: "addShift",
            title: "Add Shift",
            icon: "calendar-plus-o",
          },
        ]
      : userRole === "user"
      ? [
          {
            name: "requestTimeOff",
            title: "Request Time Off",
            icon: "clock-o",
          },
        ]
      : [];

  // Combine common and conditional tabs
  const allTabs = [...commonTabs, ...conditionalTabs];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: { display: "flex" },
      }}
    >
      {allTabs.map((tab, index) => (
        <Tabs.Screen
          key={index}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name={tab.icon as any} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
