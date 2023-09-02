import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Button } from "react-native";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
export default function GoogleButton() {
  const navigation = useNavigation();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "74125960166-195klhhs9uu5r0uefbrlmt1tbfhkgo8d.apps.googleusercontent.com",
    iosClientId:
      "74125960166-gs87aloakvvsd71iab928b85cv2ocdup.apps.googleusercontent.com",
    expoClientId:
      "74125960166-nnhav8ji0g1lbuib8te9d7fg7toga3on.apps.googleusercontent.com",
    webClientId:
      "74125960166-nnhav8ji0g1lbuib8te9d7fg7toga3on.apps.googleusercontent.com",
  });

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      getUserData(response.authentication.accessToken);
    } else if (response?.type === "error") {
      console.log(response.error?.description);
    }
  }, [response]);

  const getUserData = async (accessToken) => {
    return fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((userInfoResponse) => {
        if (userInfoResponse.status === 200) {
          return userInfoResponse.json();
        } else {
          throw new Error(
            `Error al obtener la información del usuario: ${userInfoResponse.status}`
          );
        }
      })
      .then((data) => {
        console.log(data);
        navigation.navigate("GoogleHome", {
          userInfo: data,
        });
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <Button title={"Iniciar sesion con Google"} onPress={() => promptAsync()} />
  );
}
