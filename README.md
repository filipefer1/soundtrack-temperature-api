# SoundtrackTemperature

Uma api responsável por retornar uma trilha sonora baseado na temperatura da cidade. Desenvolvido para o desafio do [ifood](https://github.com/ifood/vemproifood-backend).

## Instalação

Realize o clone desse repositório.

```bash
git clone https://github.com/filipefer1/soundtrack-temperature-api.git
```

Renomei o arquivo .env.example para .env e altere as variáveis de ambiente com as suas credencias do [spotify](https://developer.spotify.com/dashboard/) ou utilize essas credencias:

```
CLIENTID 9db5e5874c7f4ab8abc6c872fe7d3341

CLIENTSECRET 7420bbda67b04bad8a8b7e206e7a6b0e
```

No diretório raiz, utilizando o docker, crie a imagem do projeto.

```bash
docker build -t filipefer1/soundtrack-temperature .
```

Execute o docker-compose

```bash
docker-compose up
```

## Testes

Para realizar os testes faça o clone desse projeto e instale as dependências.

```bash
yarn ou  npm install
```

Execute o comando

```bash
yarn test ou npm run test
```

## API

A api possui dois endpoints:

- POST /soundtrack
- GET /soundtrack

### POST /soundtrack

Recurso responsável pela criação de uma nova soundtrack-temperature. É necessário que o corpo da requisição contenha o nome da cidade ou as coordenadas geográficas ou ambos.

Exemplos:

```json
{
  "cityName": "Brasília"
}
```

```json
{
  "coords": {
    "lon": -47.93,
    "lat": -15.78
  }
}
```

```json
{
  "cityName": "Brasília",
  "coords": {
    "lon": -47.93,
    "lat": -15.78
  }
}
```

Exemplo de resposta:

```json
{
  "soundtrack": {
    "artists": ["Famous Dex"],
    "spotify_link": "https://open.spotify.com/track/5PTG6rrL6EPFD9E2QMI2pl",
    "soundtrack": "JAPAN",
    "genre": "pop"
  },
  "temperature": {
    "coord": {
      "lon": -47.93,
      "lat": -15.78
    },
    "temp": 26.32,
    "name": "Brasília"
  },
  "createdAt": "2020-11-02T17:39:27.942Z",
  "id": "5fa0444f3741b1001125f250"
}
```

### GET /soundtrack

Recurso responável pela busca de todos os soundtrack-temperature cadastrados

## Construído com

- Node.js
- Typescript
- Express.js
- Mongoose
- Axios
- Eslint
- Spotify
- OpenWeatherMap
