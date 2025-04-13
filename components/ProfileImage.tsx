import React, { useState } from "react";
import { Image, StyleSheet, View, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

type ProfileImageProps = {
  initialImageSource: string; // Initial image URL or local path
};

export const ProfileImage: React.FC<ProfileImageProps> = ({ initialImageSource }) => {
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
    // Verify permissions before proceeding
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Crop the image to a square
      quality: 1, // Highest quality
    });

    if (!result.canceled) {
      setImageSource(result.assets[0].uri); // Update the image source with the selected image
    }
  };

  return (
    <Pressable onPress={pickImage}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageSource }}
          style={styles.image}
          onError={() => {
            Alert.alert("Image Load Error", "Failed to load the image. Reverting to default image.");
            setImageSource(defaultImage); // Fallback to default image on error
          }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});