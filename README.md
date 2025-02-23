# 🚀 Voici notre projet MERN Stack

Ceci est notre projet full stack MERN contruit avec **React** en frontend et **Node.js** (avec Express) pour backend et **mongodb** comme bqse de données. Elle offre une expérience utilisateur fluide pour gérer et afficher des fruits,  avec des fonctionnalités telles que la recherche, la catégorisation et l'ajout de nouveaux fruits et gestion d'utilisateur.

---

## 📋 Table des matières

1. [Aperçu du projet](#-aperçu-du-projet)
2. [Fonctionnalités](#-fonctionnalités)
3. [Technologies utilisées](#-technologies-utilisées)
4. [Instructions d'installation](#-instructions-dinstallation)
5. [Lancer l'application](#-lancer-lapplication)
6. [Points de terminaison de l'API](#-points-de-terminaison-de-lapi)
7. [Contributeurs](#-contributeurs)
8. [Licence](#-licence)

---

## 🌟 Aperçu du projet

Ce projet est une application full-stack qui permet aux utilisateurs de :
- Parcourir une liste de fruits.
- Rechercher des fruits par nom ou ID.
- Voir les fruits par catégorie (par exemple, Agrumes, Tropicaux, Baies).
- Ajouter de nouveaux fruits à la base de données.

Le frontend est construit avec **React**, et le backend est alimenté par **Node.js** et **Express**. L'application utilise une API RESTful pour communiquer entre le frontend et le backend.

---

## ✨ Fonctionnalités

- **Frontend** :
  - Interface utilisateur réactive et conviviale.
  - Fonctionnalité de recherche dynamique.
  - Affichage des fruits par catégorie.
  - Formulaire pour ajouter de nouveaux fruits.

- **Backend** :
  - API RESTful pour les opérations CRUD.
  - MongoDB pour le stockage des données.
  - Redis pour le caching
  - Jwt pour l'authentification
  - Gestion des erreurs et validation.

---

## 🛠️ Technologies utilisées

### Frontend
- **React** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **React Router** : Pour la navigation côté client.
- **CSS Modules** : Pour styliser les composants.

### Backend
- **Node.js** : Environnement d'exécution JavaScript pour le backend.
- **Express** : Framework web pour construire l'API.
- **MongoDB** : Base de données NoSQL pour stocker les données des fruits.
- **Mongoose** : ODM pour MongoDB.
- **Redis** : pour le cache backend.
- **jwt webtoken** : pour l'authentification.

### Outils
- **insomnia** : Pour tester les points de terminaison de l'API.
- **Git** : Pour le contrôle de version.
- **VSCode** : Éditeur de code.

---

## 🚀 Instructions d'installation

### Prérequis
- **Node.js** (v16 ou supérieure)
- **npm** (v8 ou supérieure)
- **MongoDB** (instance locale ou cloud)

### Étapes

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/votre-nom-utilisateur/votre-nom-de-dépôt.git
   cd votre-nom-de-dépôt

2. **Installer les dépendances** :
   cd BackEnd
   npm instal
   cd FrontEnd
   npm install

2. **Configurer les variables d'environnement** :
   Accéder au fichier .env et s'assurer que mongo démarre sur le même port

2. **🖥️ Lancer l'application** :
   Démarrer le serveur redis et mongo
   Démarrer le serveur backend
   cd BackEnd
   npm start
   cd ../FrontEnd
   npm start

## 🌐 Points de terminaison de l'API

**URL de base :** `http://localhost:5000/`

| Méthode | Point de terminaison | Description                          |
|---------|----------------------|--------------------------------------|
| GET     | `/fruits`            | Obtenir tous les fruits.             |
| GET     | `/fruits/:id`        | Obtenir un fruit par son ID.         |
| POST    | `/fruits`            | Ajouter un nouveau fruit.            |
| PUT     | `/fruits/:id`        | Mettre à jour un fruit par son ID.   |
| DELETE  | `/fruits/:id`        | Supprimer un fruit par son ID.       |
| POST    | `/users/signup`      | Créer un utilisateur (rôle client)   |
| GET     | `/auth/login`        | Se connecter                         |

Perspectives: limiter la suppremiser aux utilisateurs ayant le rôle admin et permettre à un utilisateur
superadmin de gérer les utilisateurs!
i.e: les routes GET et PUT `/fruits/:id` seront interdit d'accès pour un users 'client' 
## 👥 Contributeurs

- **[Gloire Bekoutou Belem ](https://github.com/Gloireski)** : développement full-stack.
- **[Paul Sode](https://github.com/PaulSode)** : Développement frontend.
- **[Omomene Iwelomen](https://github.com/Omomene)** : Développement frontend.
- **[Clément PERRET](https://github.com/perret)** : Développement frontend.

---

## 🙏 Remerciements

- Merci à [MongoDB](https://www.mongodb.com/) pour fournir une excellente solution de base de données.
- Un grand merci aux communautés **React** et **Node.js** pour leurs outils et bibliothèques incroyables.
- Merci à monsieur Luigi Menez pour le module mern stack.
