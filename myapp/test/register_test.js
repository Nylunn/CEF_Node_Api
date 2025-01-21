import * as chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
import { expect } from "chai";

describe("POST /users/add", () => {
  it("should create a new user", async (done) => {
    this.timeout(10000);
    await request("https://localhost:3000/")
      .post("/users/add")
      .send({
        username: "john",
        password: "johndoe",
        email: "johndoe@gmail.com",
      })
      .end((err, res) => {
        if (err) return done(err), expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.equal("john");
        done();
      });
  });
});
