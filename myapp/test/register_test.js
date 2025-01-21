import * as chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import app from "../express_app/app.js";

chai.use(chaiHttp);

describe("User Registration", () => {
  it("should register a new user successfully", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "securePassword123",
    };

    const res = await chai.request(app).post("/users/add").send(user);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property(
      "message",
      "User registered successfully"
    );
  });
});
