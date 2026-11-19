import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function UrnaEletronica() {
  // Estados independentes para cada candidato
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);
  const [votosC, setVotosC] = useState(0);

  // Estado controlado do nome do mesário (desafio extra)
  const [nomeMesario, setNomeMesario] = useState("");

  // Dado derivado: não precisa de um useState separado
  const totalVotos = votosA + votosB + votosC;

  // Evita divisão por zero quando ainda não existem votos
  const calcularPorcentagem = (votos) => {
    if (totalVotos === 0) {
      return "0.0";
    }

    return ((votos / totalVotos) * 100).toFixed(1);
  };

  // Zera os estados dos três candidatos
  const zerarUrna = () => {
    setVotosA(0);
    setVotosB(0);
    setVotosC(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Painel de Votação</Text>

      {/* Desafio extra: TextInput controlado para o mesário */}
      <View style={styles.mesarioContainer}>
        <Text style={styles.rotuloMesario}>Nome do mesário</Text>
        <TextInput
          style={styles.inputMesario}
          placeholder="Digite o nome do mesário"
          value={nomeMesario}
          onChangeText={setNomeMesario}
          autoCapitalize="words"
        />
        <Text style={styles.mesarioAtual}>
          Mesário atual: {nomeMesario.trim() || "Não informado"}
        </Text>
      </View>

      {/* Candidato A */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato A: {votosA} votos ({calcularPorcentagem(votosA)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosA((prev) => prev + 1)}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Votar em A</Text>
        </TouchableOpacity>
      </View>

      {/* Candidato B */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato B: {votosB} votos ({calcularPorcentagem(votosB)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosB((prev) => prev + 1)}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Votar em B</Text>
        </TouchableOpacity>
      </View>

      {/* Candidato C */}
      <View style={styles.candidatoContainer}>
        <Text style={styles.nomeCandidato}>
          Candidato C: {votosC} votos ({calcularPorcentagem(votosC)}%)
        </Text>
        <TouchableOpacity
          style={styles.botaoVotar}
          onPress={() => setVotosC((prev) => prev + 1)}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Votar em C</Text>
        </TouchableOpacity>
      </View>

      {/* Rodapé com total e opção de zerar a urna */}
      <View style={styles.rodape}>
        <Text style={styles.totalTexto}>Total de Votos: {totalVotos}</Text>
        <TouchableOpacity
          style={styles.botaoZerar}
          onPress={zerarUrna}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Zerar Urna</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#14325A",
  },
  mesarioContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  rotuloMesario: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 8,
  },
  inputMesario: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  mesarioAtual: {
    marginTop: 10,
    fontSize: 15,
    color: "#333333",
  },
  candidatoContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  nomeCandidato: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#222222",
  },
  botaoVotar: {
    backgroundColor: "#0064A0",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  rodape: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#CCCCCC",
    paddingTop: 20,
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#14325A",
  },
  botaoZerar: {
    backgroundColor: "#808080",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
});
