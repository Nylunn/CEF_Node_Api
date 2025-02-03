const { getReservationById } = require("../services/reservation");
const assert = require("assert");

/** Ici je viens récupérer grâce à l'id présent dans la bdd les informations ci-dessous pour les test, je m'appuie sur les models créer au préalable afin d'avoir les informations correcte */
describe("Récupère un reservation avec son id", () => {
  it("la reservation ayant pour id '677be464b20b5c2c472d6b09' devrait retourner clientName : Simon ", async () => {
    const id = "677be464b20b5c2c472d6b09";
    const reservation = await getReservationById(id);
    getReservationById(id).then((reservation) => {
      assert.deepEqual(reservation.clientName, "Simon");
      done();
    });
  });

  it("la reservation ayant pour id '677be464b20b5c2c472d6b09' devrait retourner catwayNumber : 677be464b20b5c2c472d6b09 ", async () => {
    const id = "677be464b20b5c2c472d6b09";
    const reservation = await getReservationById(id);
    getReservationById(id).then((reservation) => {
      assert.deepEqual(reservation.catwayNumber, "677be464b20b5c2c472d6b09");
      done();
    });
  });

  it("la reservation ayant pour id '677be464b20b5c2c472d6b09' devrait retourner boatName : catamaran ", async () => {
    const id = "677be464b20b5c2c472d6b09";
    const reservation = await getReservationById(id);
    getReservationById(id).then((reservation) => {
      assert.deepEqual(reservation.boatName, "catamaran");
      done();
    });
  });

  it("la reservation ayant pour id '677be464b20b5c2c472d6b09' devrait retourner checkIn : Wed Jan 08 2025 01:00:00 GMT+0100 (heure normale d’Europe centrale) ", async () => {
    const id = "677be464b20b5c2c472d6b09";
    const reservation = await getReservationById(id);
    getReservationById(id).then((reservation) => {
      assert.deepEqual(
        reservation.checkIn,
        "Wed Jan 08 2025 01:00:00 GMT+0100 (heure normale d’Europe centrale)"
      );
      done();
    });
  });

  it("la reservation ayant pour id '677be464b20b5c2c472d6b09' devrait retourner checkOut : Fri Jan 24 2025 01:00:00 GMT+0100 (heure normale d’Europe centrale)", async () => {
    const id = "677be464b20b5c2c472d6b09";
    const reservation = await getReservationById(id);
    getReservationById(id).then((reservation) => {
      assert.deepEqual(
        reservation.checkOut,
        "Fri Jan 24 2025 01:00:00 GMT+0100 (heure normale d’Europe centrale)"
      );
      done();
    });
  });

  it("La reservation ayant un id inexistant devrait retourner une erreur ", (done) => {
    const id = "999bd6728beb743e2a1c62d0";
    getReservationById(id)
      .then((message) => {
        assert.equal(message, "Error: reservation_not_found");
        done(new Error("Un reservation ne devrait pas être retourné"));
      })
      .catch((message) => {
        assert.equal(message, "Error: reservation_not_found");
        done();
      });
  });
});
