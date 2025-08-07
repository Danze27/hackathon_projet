// template-register.js
const axios = require("axios");

// === CONFIGURATION GÉNÉRALE ===

// URL complète de l'endpoint d'inscription
const URL = "http://localhost:3000/register"; // ← Modifier ici

// Préfixes pour générer dynamiquement les utilisateurs
const baseUsername = "UseeeeaerTaeeezest";
const baseEmail = "usaeeaeeeeezer";
const domain = "example.com";

// Mot de passe utilisé pour tous les comptes
const password = "TestPassword123!";

// Nombre de comptes à créer
const total = 100;

// Temps d'attente entre chaque requête (en millisecondes)
const delayMs = 1000;

// === FONCTION D'ENVOI DE REQUÊTE D'INSCRIPTION ===

async function sendTestRequest(i) {
  const payload = {
    username: `${baseUsername}_${i}`,
    email: `${baseEmail}${i}@${domain}`,
    password: password,
  };

  try {
    const response = await axios.post(URL, payload);
    console.log(`[${i}] Réussite :`, response.status, response.data);
  } catch (error) {
    if (error.response) {
      console.error(
        `[${i}] Erreur HTTP :`,
        error.response.status,
        error.response.data
      );
    } else {
      console.error(`[${i}] Erreur réseau :`, error.message);
    }
  }
}

// === BOUCLE PRINCIPALE POUR ENVOYER LES REQUÊTES ===

const run = async () => {
  for (let i = 1; i <= total; i++) {
    await sendTestRequest(i);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
};

run();
