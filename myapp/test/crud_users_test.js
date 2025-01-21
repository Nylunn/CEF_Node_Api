const chai = require("chai");
const mongoose = require("mongoose");
const User = require("../models/User");

// Configuration de la connexion MongoDB
before((done) => {
  mongoose
    .connect("mongodb+srv://nodeapi:nodeapi@nodeapi.1bcic.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => done())
    .catch((err) => done(err));
});

// Suppression des données après les tests
after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(done);
  });
});

describe("CRUD Operations for User", () => {
  let userId;

  // CREATE
  it("should create a new user", (done) => {
    const user = new User({
      name: "John",
      email: "john.doe@example.com",
      password: "johndoe",
    });

    user
      .save()
      .then((savedUser) => {
        expect(savedUser).to.have.property("_id");
        expect(savedUser.name).to.equal("John");
        userId = savedUser._id;
        done();
      })
      .catch((err) => done(err));
  });

  // READ
  it("should read a user by ID", (done) => {
    User.findById(userId)
      .then((user) => {
        expect(user).to.exist;
        expect(user.name).to.equal("John");
        done();
      })
      .catch((err) => done(err));
  });

  // UPDATE
  it("should update a user's name", (done) => {
    User.findByIdAndUpdate(
      userId,
      { name: "Jane" },
      { new: true } // Pour obtenir l'utilisateur mis à jour
    )
      .then((updatedUser) => {
        expect(updatedUser).to.exist;
        expect(updatedUser.name).to.equal("Jane");
        done();
      })
      .catch((err) => done(err));
  });

  // DELETE
  it("should delete a user", (done) => {
    User.findByIdAndDelete(userId)
      .then((deletedUser) => {
        expect(deletedUser).to.exist;
        return User.findById(userId);
      })
      .then((user) => {
        expect(user).to.be.null;
        done();
      })
      .catch((err) => done(err));
  });
});
