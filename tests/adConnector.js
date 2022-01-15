import { test } from "uvu";
import * as assert from "uvu/assert";
import adConnector from "../src/connector/ad_connector.js";
import seedDatabase from "../src/databaseSeeding.js";
process.env.DATABASE_URL = "postgresql://postgres:a@postgres:5432/webDb?schema=public";

const ad = {
  id: "275f45cc-7630-11ec-90d6-0242ac120003",
  salary: 1600,
  currency: "€",
  last_time_updated: "2021-03-03",
  amount_of_times_visited: 0,
  description: "asd",
  title: "Angular Frontend Developer",
  owner: "e922a1de-b5cf-455f-9474-0da70bee623d",
  location: "Lisbon, Portugal",
  premium_until: null,
  ad_type: "paid",
};

test.before(async () => {
  await seedDatabase();
});

test("Add Ad", async () => {
  const result = await adConnector.addAd(ad);
  assert.is(result, 1);
});
test("Add ad with invalid currency", async () => {
  ad.currency = "€€";
  const result = await adConnector.addAd(ad);
  assert.is(result, 0);
});
test("Find Ad", async () => {
  const result = await adConnector.getAdById(ad.id);
  assert.is(result.id, ad.id);
});
test("Remove Ad", async () => {
  const result = await adConnector.deleteAd(ad.id);
  assert.is(result, 1);
});

test.run();
