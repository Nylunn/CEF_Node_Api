process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../express_app/app");

const expect = chai.expect;
chai.use(chaiHttp);

describe("/First test", () => {
  it("should render the index page", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
