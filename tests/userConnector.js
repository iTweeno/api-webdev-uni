import { test } from "uvu";
import * as assert from "uvu/assert";
import userConnector from "../src/connector/user_connector.js";

const user = {
  id: "32b76048-7631-11ec-90d6-0242ac120003",
  first_name: "sf",
  last_name: "gdf",
  password: "ag",
  phone_number: "dfg",
  email: "f@gmail.com",
  birthday: "2001-03-29",
  company: "da",
  profile_picture: "gg",
};
test("Add User", async () => {
  const result = await userConnector.addUser(user);
  assert.is(result, 1);
});
test("Add User with invalid email", async () => {
  const invalidUser = { ...user };
  invalidUser.email = "fgmail.com";
  invalidUser.id = "275f45cc-7630-11ec-90d6-0242ac120003";
  const result = await userConnector.addUser(invalidUser);
  assert.is(result, 0);
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
