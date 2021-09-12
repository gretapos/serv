let zmones = [];
let id;

async function getZmones() {
  try {
    const res = await fetch("/json/zmones");
    if (res.ok) {
      zmones = await res.json();
      showZmones();
    } else {
      alert("Klaida:" + res.status);
    }
  } catch (err) {
    alert("Klaida:" + err.message);
  }
}

async function deleteZmogus(event) {
  console.log("Trinam");
  console.log("/json/zmones/" + event.target.attributes.zmogusId);
  try {
    const res = await fetch("/json/zmones/" + event.target.attributes.zmogusId, {
      method: "DELETE"
    });
    if (res.ok) {
      getZmones();
    } else {
      alert("Klaida:" + res.status);
    }
  } catch (err) {
    alert("Klaida:" + err.message);
  }
}

function showZmones() {
  const zmonesDiv = document.getElementById("zmones");
  cleanNode(zmonesDiv);
  const ul = document.createElement("ul");
  for (const zmogus of zmones) {
    const li = document.createElement("li");
    const b = document.createElement("b");
    const vardas = document.createTextNode(
      zmogus.vardas + " " + zmogus.pavarde + " " + zmogus.alga,
    );
    b.appendChild(vardas);
    li.appendChild(b);
    const delButton = document.createElement("button");
    delButton.appendChild(document.createTextNode("X"));
    delButton.onclick = deleteZmogus;
    delButton.attributes.zmogusId = zmogus.id;
    li.appendChild(delButton);
    ul.appendChild(li);
  }
  zmonesDiv.appendChild(ul);
}

function cleanNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function addZmogus() {
  const zmonesDiv = document.getElementById("zmones");
  cleanNode(zmonesDiv);
  zmonesDiv.appendChild(document.createTextNode("Vardas: "));
  let input = document.createElement("input");
  input.id = "vardas";
  zmonesDiv.appendChild(input);
  zmonesDiv.appendChild(document.createElement("br"));
  zmonesDiv.appendChild(document.createTextNode("Pavarde: "));
  input = document.createElement("input");
  input.id = "pavarde";
  zmonesDiv.appendChild(input);
  zmonesDiv.appendChild(document.createElement("br"));
  zmonesDiv.appendChild(document.createTextNode("Alga: "));
  input = document.createElement("input");
  input.id = "alga";
  zmonesDiv.appendChild(input);
  zmonesDiv.appendChild(document.createElement("br"));
  const saveButton = document.createElement("button");
  saveButton.appendChild(document.createTextNode("Save"));
  saveButton.onclick = insertZmogus;
  zmonesDiv.appendChild(saveButton);
  zmonesDiv.appendChild(document.createElement("br"));
  const cancelButton = document.createElement("button");
  cancelButton.appendChild(document.createTextNode("Cancel"));
  cancelButton.onclick = showZmones;
  zmonesDiv.appendChild(cancelButton);
}

async function insertZmogus() {
  const vardas = document.getElementById("vardas").value;
  const pavarde = document.getElementById("pavarde").value;
  const alga = parseFloat(document.getElementById("alga").value);
  if (vardas.trim() === "" || pavarde.trim() === "" || isNaN(alga)) {
    alert("Blogi duomenys");
    return;
  }
  const zmogus = {
    vardas,
    pavarde,
    alga
  };
  try {
    const res = await fetch("/json/zmones/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(zmogus)
    });
    if (res.ok) {
      getZmones();
    } else {
      alert("Klaida:" + res.status);
    }
  } catch (err) {
    alert("Klaida:" + err.message);
  }
}
