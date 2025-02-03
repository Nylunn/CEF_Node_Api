const { getUserById } = require("../services/user");
const assert = require("assert"); // On utilise assert de Node.js à la place de chai

describe("Récupère un user avec son id", () => {
  it("l'utilisateur ayant pour id '67a09d0f7e82587ed0fff98a' devrait retourner name : john ", async () => {
    const id = "67a09d0f7e82587ed0fff98a";
    const user = await getUserById(id);
    getUserById(id).then((user) => {
      assert.deepEqual(user.name, "john");
      done();
    });
  });

  it("l'utilisateur ayant pour id '67a09d0f7e82587ed0fff98a' devrait retourner mail : nepassupprimer@dev.com ", async () => {
    const id = "67a09d0f7e82587ed0fff98a";
    const user = await getUserById(id);
    getUserById(id).then((user) => {
      assert.deepEqual(user.email, "nepassupprimer@dev.com");
      done();
    });
  });

  it("L'user ayant un id inexistant devrait retourner une erreur ", (done) => {
    const id = "999bd6728beb743e2a1c62d0";
    getUserById(id)
      .then((message) => {
        assert.equal(message, "Error: user_not_found");
        done(new Error("Un user ne devrait pas être retourné"));
      })
      .catch((message) => {
        assert.equal(message, "Error: user_not_found");
        done();
      });
  });
});
