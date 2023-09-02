import { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View, Linking } from "react-native";

import FacebookButton from "../buttons/FacebookButton";
import GithubButton from "../buttons/GithubButton";
import GoogleButton from "../buttons/GoogleButton";
export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={{ margin: 15, fontSize: 25 }}>
        Diferentes tipos de AuthProvider
      </Text>
      <View style={{margin:15}}>
        <FacebookButton />
        <GoogleButton />
        <GithubButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
