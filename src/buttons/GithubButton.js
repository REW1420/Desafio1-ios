import { Button, Image, StyleSheet, Text, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../utils/firebase";
WebBrowser.maybeCompleteAuthSession();

export default function GithubButton() {
  const navigation = useNavigation();
  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint:
      "https://github.com/settings/connections/applications/70b30420d379388db4ca",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "70b30420d379388db4ca",
      scopes: ["identity", "user:email", "user:follow"],
      redirectUri: makeRedirectUri({
        scheme: "fb206141655792744",
      }),
    },
    discovery
  );
  useEffect(() => {
    handleResponse();
  }, [response]);

  async function handleResponse() {
    // Verify that everything went well
    if (response?.type === "success") {
      // Here we grab the code from the response
      const { code } = response.params;

      // And use this code to get the access_token
      await createTokenWithCode(code)
        .then((data) => {
          // Hacer algo con los datos (por ejemplo, guardar el token de acceso)
          console.log("Token de acceso:", data);
          GetInfo(data);
        })
        .catch((error) => {
          // Manejar el error
          console.error("Error:", error);
        });

      // Just in case we don't have the token return early
      //if (!access_token) return;

      // GithubAuthProvider is a class that we can import from 'firebase/auth'r
      // We pass the token and it returns a credential
      //

      // Finally we use that credential to register the user in Firebaser
      //
    }
  }

  // This function makes a POST request for the token
  async function createTokenWithCode(code) {
    const url =
      `https://github.com/login/oauth/access_token` +
      `?client_id=70b30420d379388db4ca` +
      `&client_secret=8c8d1c258bd54f33cf7ca6260d3f847fd7db6730` +
      `&code=${code}`; // 👈 we are passing the code here

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        return data.access_token; // Devuelve los datos como una promesa resuelta
      } else {
        throw new Error(`Error al obtener el token de acceso: ${res.status}`);
      }
    } catch (error) {
      return Promise.reject(error); // Devuelve un error como una promesa rechazada
    }
  }

  async function GetInfo(token) {
    const apiUrl = "https://api.github.com/user";

    await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Error al realizar la solicitud: ${response.status}`);
        }
      })
      .then((userData) => {
        // Hacer algo con los datos del usuario
        console.log("Datos del usuario:", userData);
        navigation.navigate("GithubHome", {
          userInfo: userData,
        });
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }
  return (
    <Button
      title="Iniciar sesion con Github"
      onPress={() => {
        promptAsync({ windowName: "Github UDB" });
      }}
    />
  );
}
