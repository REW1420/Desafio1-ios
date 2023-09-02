import { Button, Image, StyleSheet, Text, View, Linking } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function GoogleHome() {
  const route = useRoute();
  const user = route.params?.userInfo;
  return (
    <View style={styles.profile}>
      <Image source={{ uri: user.picture }} style={styles.image} />
      <Text style={styles.name}>{user.given_name}</Text>
      <Text>Correo: {user.email}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
