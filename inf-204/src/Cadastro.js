
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

import api from "./services/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const cadastrarUtilizador = async () => {

    if (!nome || !email) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    // Dados enviados em formato JSON
    const payload = {
      name: nome,
      email: email,
    };

    try {
      const resposta = await api.post("/users", payload);

      Alert.alert(
        "Sucesso!",
        "Utilizador cadastrado com sucesso!"
      );

      setNome("");
      setEmail("");

    } catch (erro) {
      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o utilizador."
      );

      console.error("Erro no POST:", erro.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Cadastro de Utilizador
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        title="Cadastrar"
        onPress={cadastrarUtilizador}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#14325A",
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
});
