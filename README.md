# Description

Ce projet est une application permettant à un utilisateur d'inserer des webhooks et les utiliser pour envoyer des messages à differents réseaux socieaux, les messages envoyés à travers cet application sont enregistgrés dans un base de données ce qui permet des les afficher en plus de leurs status.

# Installation du projet

## Prérequis

```JSON
  {
    "node": ">=14",
    "yarn": ">=1.20",
  }
```

## Installation

lancez la commande suivante pour installer les packages :

```bash
  yarn install
```

pour l'intergration de la base de données pour deves créer un ficher `.env` avec l'url de la base de données postgreSQL

```INI
DATABASE_URL="postgres://[user[:password]@][netloc][:port][/dbname]"
```

## lancement

Pour lancer le projet en mode developpement

```bash
yarn dev
```

Pour builder le projet

```bash
yarn build
```

Pour lancer le build

```bash
yarn start
```

# Choix techniques

- **Prisma**: Client postgreSQL qui permet d'abstraire des requetes à la base de données sans écrire d'SQL, ce client permet de créer le schema de la base de données et genere automatiquement les types TypesScript
- **express**: framework pour créer des API REST en Node.js
- **Vite**: bundler performant avec une configuration minimale
- **tailwind**: styling CSS
- **daisyui**: composants ui touts prets basées sur tailwind

# Améliorations:

## Login:

### Scope

Le login à l'application ce passe que coté front, les données des utilisateurs sont donc pas protégés. Ce qui pêut etre mis en place c'est un système de login qui fournit un token JWT au utilisateurs, ce token sera verifié à chaque requete à l'API. ce token permettera aussi d'avoir une notion de session coté client ce qui permettera de ne pas perdre sa session en rechargeant la page

### Password

Les mots de passes sont stoqués en dure dans la base de données ce qui est un grand rique de sécurité. Je pourrais mettre en place un système de chiffrement de mot de passe en utilisant des salts en plus pour que le chiffrement soit résistant aux collisions et à la première préimage

## Front:

La fonction qui envoie les messages à l'API des webhooks (onSendMessge de WebhookRow.tsx) n'est pas assez générique, J'ai effectué des tests qui avec l'API de discord. mais à priori les appels marcheront de la meme façon avec l'API webhooks de Slack et meme Twitter
