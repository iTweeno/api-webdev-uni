import { test } from "uvu";
import * as assert from "uvu/assert";
import messageConnector from "../src/connector/message_connector.js";

const message = {
  id: "7d736ee0-fb96-44ac-afe8-39db06914009",
  messenger: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
  receiver: "e922a1de-b5cf-455f-9474-0da70bee623d",
  message_content: "Hi, is this spot still available? 123",
  ad_id: "3a48ad84-605c-11ec-8607-0242ac130004",
};

test("Add message", async () => {
  const result = await messageConnector.addMessage(message);
  assert.is(result, 1);
});
test("Find message", async () => {
  const result = await messageConnector.getMessageById(message.id);
  assert.is(result.id, message.id);
});
test("Remove message", async () => {
  const result = await messageConnector.deleteMessage(message.id);
  assert.is(result, 1);
});
