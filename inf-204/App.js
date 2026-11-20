
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "./src/services/api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [tela, setTela] = useState("lista");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [enviando, setEnviando] = useState(false);

  // BUSCAR UTILIZADORES
  const buscarDados = async () => {
    try {
      // Buscar dados da API
      const resposta = await api.get("/users");

      // Buscar cadastros armazenados no celular
      const dadosSalvos = await AsyncStorage.getItem("users");

      const cadastrados = dadosSalvos
        ? JSON.parse(dadosSalvos)
        : [];

      // Juntar os dados da API com os cadastros locais
      setUtilizadores([...resposta.data, ...cadastrados]);

    } catch (erro) {
      console.error("Erro ao buscar dados:", erro.message);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os utilizadores."
      );

      // Mesmo sem internet, mostrar os cadastros locais
      const dadosSalvos = await AsyncStorage.getItem("users");

      const cadastrados = dadosSalvos
        ? JSON.parse(dadosSalvos)
        : [];

      setUtilizadores(cadastrados);

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // CARREGAR AO ABRIR O APLICATIVO
  useEffect(() => {
    buscarDados();
  }, []);

  // PULL-TO-REFRESH
  const atualizarLista = () => {
    setRefreshing(true);
    buscarDados();
  };

  // CADASTRAR UTILIZADOR
  const cadastrarUtilizador = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos!"
      );
      return;
    }

    const payload = {
      name: nome.trim(),
      email: email.trim(),
    };

    try {
      setEnviando(true);

      // Enviar dados para a API
      const resposta = await api.post("/users", payload);

      // Criar utilizador para armazenamento local
      const novoUtilizador = {
        id: Date.now(),
        name: payload.name,
        email: payload.email,
      };

      // Recuperar cadastros existentes
      const dadosSalvos = await AsyncStorage.getItem("users");

      const listaAtual = dadosSalvos
        ? JSON.parse(dadosSalvos)
        : [];

      // Adicionar novo utilizador
      const novaLista = [...listaAtual, novoUtilizador];

      // Salvar no celular
      await AsyncStorage.setItem(
        "users",
        JSON.stringify(novaLista)
      );

      // Atualizar a lista na tela
      setUtilizadores((lista) => [...lista, novoUtilizador]);

      Alert.alert(
        "Sucesso!",
        "Utilizador cadastrado com sucesso!"
      );

      // Limpar formulário
      setNome("");
      setEmail("");

      // Voltar para a lista
      setTela("lista");

    } catch (erro) {
      console.error("Erro no cadastro:", erro.message);

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o utilizador."
      );

    } finally {
      setEnviando(false);
    }
  };

  // CARREGAMENTO INICIAL
  if (loading && tela === "lista") {
    return (
      <View style={styles.centro}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />

        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  // TELA DE CADASTRO
  if (tela === "cadastro") {
    return (
      <View style={styles.container}>

        <Text style={styles.titulo}>
          Cadastro de Utilizador
        </Text>

        <Text style={styles.label}>
          Nome
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          title={enviando ? "Cadastrando..." : "Cadastrar"}
          onPress={cadastrarUtilizador}
          disabled={enviando}
        />

        <View style={styles.botaoVoltar}>
          <Button
            title="Voltar para lista"
            color="#666"
            onPress={() => setTela("lista")}
          />
        </View>

      </View>
    );
  }

  // TELA PRINCIPAL - LISTA
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Utilizadores
      </Text>

      <View style={styles.botaoCadastro}>
        <Button
          title="+ Cadastrar Utilizador"
          onPress={() => setTela("cadastro")}
        />
      </View>

      <FlatList
        data={utilizadores}
        keyExtractor={(item) => String(item.id)}

        renderItem={({ item }) => (
          <View style={styles.cartao}>

            <Text style={styles.nome}>
              {item.name}
            </Text>

            <Text style={styles.email}>
              {item.email}
            </Text>

          </View>
        )}

        // PULL-TO-REFRESH
        refreshing={refreshing}
        onRefresh={atualizarLista}

        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum utilizador encontrado.
          </Text>
        }
      />

    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },

  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    color: "#666",
    marginTop: 5,
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#14325A",
  },

  botaoCadastro: {
    marginBottom: 20,
  },

  botaoVoltar: {
    marginTop: 15,
  },

  vazio: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },

});
