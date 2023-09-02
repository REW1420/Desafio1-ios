import { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View, Linking } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function FacebookButton() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "206141655792744",
  });

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      fetch(
        `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
      )
        .then((userInfoResponse) => {
          if (userInfoResponse.status === 200) {
            return userInfoResponse.json();
          } else {
            throw new Error(
              `Error al obtener la información del usuario: ${userInfoResponse.status}`
            );
          }
        })
        .then((userInfo) => {
          setUser(userInfo);
          console.log(JSON.stringify(userInfo, null, 2));
        })
        .then(() => {
          navigation.navigate("Home", {
            userInfo: user,
          });
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };
  return (
    <Button
      title="Iniciar sesion con Facebook"
      onPress={handlePressAsync}
      style={{ margin: 10 }}
    />
  );
}
