# Prática 04 — Simulador de Votação

Aplicativo React Native com Expo, desenvolvido com base no roteiro INF204 — PT04.

## Funcionalidades

- Contagem de votos para os candidatos A, B e C.
- Atualização segura dos votos com callback (`prev => prev + 1`).
- Cálculo do total de votos como dado derivado.
- Botão para zerar a urna.
- **Desafio extra:** cálculo da porcentagem de votos de cada candidato, incluindo tratamento para total igual a zero.
- **Desafio extra:** campo `TextInput` controlado para o nome do mesário, com atualização em tempo real.

## Como executar

Se ainda não tiver um projeto Expo, crie um projeto JavaScript em branco:

```bash
npx create-expo-app pratica-04 --template blank
cd pratica-04
```

Substitua o conteúdo do arquivo `App.js` pelo arquivo deste projeto. Depois execute:

```bash
npx expo start
```

Abra o projeto pelo Expo Go no celular ou em um emulador.

## Arquivo principal

- `App.js` — tela e lógica do simulador.

## Envio para o Git

A partir da branch principal do repositório:

```bash
git checkout main
git pull
git checkout -b feature/pratica-04
git add App.js README.md
git commit -m "feat: implementa simulador de votacao e desafios"
git push -u origin feature/pratica-04
```

Se a branch principal do seu repositório se chamar `master`, use `master` no lugar de `main`.

Adicione o professor ao repositório conforme solicitado no roteiro: `joaovasconcelos@univicosa.com.br`.
