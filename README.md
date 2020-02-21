# Desafio - Simple Map Frontend

Frontend para a aplicação SimpleMap

## Stacks utilizadas
- ReactJS (Framework frontend)
- Redux e Redux Saga (Gerenciamento de estado e operações assincronas)

## Arquitetura
- A arquitetura do serviço foi construida com ReactJs, Redux e Redux saga para facilitar a implementação e gerenciamento de estado dentro da aplicação. 

Os módulos do redux e redux saga foram separados da seguinte forma:
-Store
  - Root
      - actions
      - reducers
      - sagas
  - Maps
      ....
  index.js

## Instalação Local

Clonagem do diretório:
```
git clone https://github.com/robsonalvz/simple-map-front
```

Instale as dependencias do projeto
```
yarn install
```

## Configuração

Criação do arquivo de configuração local, altere as configurações da URL da api e do Google Maps API de acordo com suas credenciais.
```
cp .env.example .env
```

## Rodando o projeto
```
yarn start
```
