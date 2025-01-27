const UserService = require("../services/creating_user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const sinon = require("sinon");
const assert = require("assert"); // On utilise assert de Node.js à la place de chai

describe("UserService - Create User", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("devrait créer un utilisateur avec succès", async () => {
    // Données de test
    const userData = {
      email: "test@test.com",
      name: "Test",
      password: "password123",
    };

    // Simulation des appels
    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(bcrypt, "hash").resolves("hashedPassword123");
    sinon.stub(User, "create").resolves({
      _id: "123456789",
      email: userData.email,
      name: userData.name,
    });

    // Exécution
    const result = await UserService.createUser(userData);

    // Vérification avec assert au lieu de expect
    assert.deepStrictEqual(result, {
      userId: "123456789",
      message: "Utilisateur créé avec succès",
    });
  });
});
