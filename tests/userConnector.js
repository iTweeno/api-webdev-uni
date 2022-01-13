import { test } from "uvu";
import * as assert from "uvu/assert";
process.env.DATABASE_URL="postgresql://postgres:a@localhost:5432/webDb?schema=public"
import userConnector from "../src/connector/user_connector.js";

const user = {
  id: "cd13ac0e-7498-11ec-90d6-0242ac120003",
  first_name: "David",
  last_name: "Pinto",
  password: "a",
  phone_number: "934575689",
  email: "f@gmail.com",
  birthday: "2001-03-29",
  company: "CTT",
  profile_picture: "",
};
test("Add User", async () => {
  const result = await userConnector.addUser(user);
  assert.is(result, 1);
});
test("Find User", async () => {
  const result = await userConnector.getUser(user.id);
  assert.is(result.id, user.id);
});
test("Remove user", async () => {
  const result = await userConnector.deleteUser(user.id);
  assert.is(result, 1);
});
test.run();
