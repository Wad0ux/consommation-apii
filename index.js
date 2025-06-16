/*const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let data = [];

app.get("/data", (req, res) => {
  res.json(data);
});

app.post("/add", (req, res) => {
  const { client, product, quantity } = req.body;
  if (!client || !product || !quantity || quantity <= 0) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const existing = data.find(e => e.client === client && e.product === product);
  if (existing) {
    existing.quantity += quantity;
  } else {
    data.push({ client, product, quantity });
  }

  res.json(data);
});

app.post("/reset", (req, res) => {
  data = [];
  res.json({ message: "Réinitialisé" });
});

app.listen(port, () => {
  console.log(`API de consommation lancée sur http://localhost:${port}`);
});
*/


await fetch(`${API_BASE}/add`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ client, product, quantity }),
});



app.post("/reset", (req, res) => {
  writeData([]);
  res.sendStatus(200);
});

// Protège l'accès à admin.html
app.get("/admin.html", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.post("/reset", (req, res) => {
  console.log("Requête de réinitialisation reçue");
  try {
    writeData([]);
    console.log("Fichier vidé avec succès");
    res.json({ message: "Données réinitialisées" });
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
*/

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

// Lire les données depuis le fichier JSON
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
  } catch (err) {
    console.error("Erreur lecture fichier :", err);
    return [];
  }
}

// Écrire les données dans le fichier JSON
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Erreur écriture fichier :", err);
  }
}

// Route pour ajouter une consommation
app.post("/add", (req, res) => {
  const { client, product, quantity } = req.body;
  if (!client || !product || typeof quantity !== "number") {
    return res.status(400).json({ error: "Données invalides" });
  }

  const data = readData();
  const existing = data.find(e => e.client === client && e.product === product);

  if (existing) {
    existing.quantity += quantity;
  } else {
    data.push({ client, product, quantity });
  }

  writeData(data);
  res.json({ message: "Ajout réussi" });
});

// Route pour lire les consommations
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});

// Route pour réinitialiser les consommations
app.post("/reset", (req, res) => {
  console.log("🔁 Réinitialisation demandée");
  try {
    writeData([]);
    console.log("✅ Données réinitialisées");
    res.json({ message: "Données réinitialisées" });
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Fallback pour éviter "Cannot GET"
app.get("/", (req, res) => {
  res.send("✅ API de consommation active !");
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
