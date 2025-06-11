const express = require("express");
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