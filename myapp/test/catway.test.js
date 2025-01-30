const {getCatwayById} = require('../services/catway');
const assert = require("assert"); // On utilise assert de Node.js à la place de chai

describe("Récupère un catway avec son id", ()=> {

  it("Le catway ayant pour id '677bd6728beb743e2a1c62d0' devrait retourner un catwayNumber = à 1 ", (done) => {
	const id = '677bd6728beb743e2a1c62d0';
	getCatwayById(id)
		.then((catway) => {
			assert.deepEqual(catway.catwayNumber,1);
			done();
		});
  });

  it("Le catway ayant un id inexistant devrait retourner une erreur ", (done) => {
	const id = '999bd6728beb743e2a1c62d0';
	getCatwayById(id)
		.then((message) => {
			assert.equal(message,'Error: catway_not_found');
			done(new Error("Un catway ne devrait pas être retourné"));
		})
		.catch((message) => {
			assert.equal(message,'Error: catway_not_found');
			done();
		});
  });
  
});
