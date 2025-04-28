import type React from "react";
import { useState } from "react";
import { Image, StyleSheet, View, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

type ProfileImageProps = {
  initialImageSource?: string; // Initial image URL or local path (optional)
  width?: number;
  height?: number;
  borderRadius?: number;
};

export const ProfileImage: React.FC<ProfileImageProps> = ({
  initialImageSource,
  width = 125, // Default width
  height = 125, // Default height
  borderRadius = 62.5, // Default to make it circular for the default size
}) => {
  const defaultImage = "https://via.placeholder.com/125"; // Replace with your default image URL
  const [imageSource, setImageSource] = useState<string>(initialImageSource || defaultImage);

  const verifyPermissions = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your media library to pick an image."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  };

  return (
    <Pressable onPress={pickImage}>
      <View style={[styles.container, { width, height, borderRadius }]}>
        <Image
          source={{ uri: imageSource }}
          style={[styles.image, { width: '100%', height: '100%' }]}
          onError={() => {
            Alert.alert("Image Load Error", "Failed to load the image. Reverting to default image.");
            setImageSource(defaultImage);
          }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ccc",
    overflow: "hidden", // Keep this for borderRadius to work
  },
  image: {
    resizeMode: "cover",
  },
});