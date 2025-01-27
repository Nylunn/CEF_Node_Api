const UserService = require("../services/read_user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sinon = require("sinon");
const assert = require("assert"); // On utilise assert de Node.js à la place de chai

describe("UserService - Create User", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("devrait get un utilisateur avec succès", async () => {
    // Données de test
    const userData = {
      id: "67445dcd57b2cf998d005d2e",
    };

    // Simulation des appels
    sinon.stub(User, "findOne").resolves({
      id: "67445dcd57b2cf998d005d2e",
    });

    // Exécution
    const result = await UserService.getUser(userData);

    // Vérification avec assert au lieu de expect
    assert.deepStrictEqual(result, {
      userId: "67445dcd57b2cf998d005d2e",
      message: "Utilisateur obtenu avec succès",
    });
  });
});
