const catwayId = require("../services/getCatwaysById");
const catway = require("../models/catways");
const assert = require("assert"); // On utilise assert de Node.js à la place de chai

describe("Récupère un catway avec son id", () => {
  it("Devrais afficher Catways1 en nom", () => {
    const catwayId = {
      name: "Catways1",
    };
    assert(catway.name, "Catway1");
  });
});
