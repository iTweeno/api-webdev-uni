import request from "supertest";
import app from "../src/utils/express_utils.js";
import prisma from "../src/utils/prisma_utils.js";
const user = {
  id: "e922a1de-b5cf-455f-9474-0da70bee623d",
  first_name: "David",
  last_name: "Pinto",
  password: "a",
  phone_number: "934575689",
  email: "k@gmail.com",
  birthday: "2001-03-29",
  company: "CTT",
  profile_picture: "",
};
describe("Api testing", () => {
  it("Insert user", async () => {
    request(app).post("/api/user").send(user).expect(200);
  });

  it("Find User", async () => {
    request(app)
      .post(`/api/user?userId=${user.id}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.id).toEqual(user.id);
      });
  });

  it("Remove user", async () => {
    request(app).delete(`/api/user?userId=${user.id}`).expect(200);
  });
});
afterAll((done) => {
  done();
});
