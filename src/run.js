import express from "express";
import exphbs from "express-handlebars";

const PORT = 3000;
const WEB = "web";

let nextId = 1;
const zmones = [
  {
    id: nextId++,
    vardas: "Jonas",
    pavarde: "Jonaitis",
    alga: 7234.56,
  },
  {
    id: nextId++,
    vardas: "Petras",
    pavarde: "Petraitis",
    alga: 750,
  },
  {
    id: nextId++,
    vardas: "Antanas",
    pavarde: "Antanaitis",
    alga: 750,
  },
];

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static(WEB, {
  index: ["index.html"],
}));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

app.get("/zmones", async (req, res) => {
  res.render("zmones", { zmones });
});

app.get("/zmogusEdit", (req, res) => {
  let zmogus;
  if (req.query.id) {
    const id = parseInt(req.query.id);
    zmogus = zmones.find((e) => e.id === id);
    if (!zmogus) {
      res.redirect("/zmones");
      return;
    }
  }
  res.render("zmogus", { zmogus });
});

app.post("/zmogusSave", (req, res) => {
  let zmogus;
  if (req.body.id) {
    const id = parseInt(req.body.id);
    zmogus = zmones.find((e) => e.id === id);
    if (!zmogus) {
      res.redirect("/zmones");
      return;
    }
  }
  let klaidos = [];
  if (!req.body.vardas || req.body.vardas.trim() === "") {
    klaidos.push("Vardas negali buti tuscias");
  }
  if (!req.body.pavarde || req.body.pavarde.trim() === "") {
    klaidos.push("Pavarde negali buti tuscia");
  }
  let alga = parseFloat(req.body.alga);
  if (isNaN(alga)) {
    klaidos.push("Neteisingai ivesta alga");
  }
  if (klaidos.length > 0) {
    res.render("blogiDuomenys", { klaidos, zmogus });
  } else {
    if (zmogus) {
      zmogus.vardas = req.body.vardas;
      zmogus.pavarde = req.body.pavarde;
      zmogus.alga = req.body.alga;
    } else {
      zmones.push({
        id: nextId++,
        vardas: req.body.vardas,
        pavarde: req.body.pavarde,
        alga,
      });
    }
    res.redirect("/zmones");
  }
});

app.get("/zmogusDelete", (req, res) => {
  const id = parseInt(req.query.id);
  const index = zmones.findIndex((e) => e.id === id);
  if (index >= 0) {
    zmones.splice(index, 1);
  }
  res.redirect("/zmones");
});

app.get("/json/zmones", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(zmones));
});

app.delete("/json/zmones/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = zmones.findIndex((e) => e.id === id);
  if (index >= 0) {
    zmones.splice(index, 1);
  }
  res.status(204).end();
});

app.post("/json/zmones", (req, res) => {
  zmones.push({
    id: nextId++,
    vardas: req.body.vardas,
    pavarde: req.body.pavarde,
    alga: req.body.alga,
  });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
