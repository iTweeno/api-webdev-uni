import { test } from "uvu";
import * as assert from "uvu/assert";
import reportConnector from "../src/connector/report_connector.js";

const report = {
  id: "4b508fca-7632-11ec-90d6-0242ac120003",
  user_reporting: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
  message_content: "Does not follow rules",
  ad_id: "3a48ad84-605c-11ec-8607-0242ac130004",
};

test("Add report", async () => {
  const result = await reportConnector.addReport(report);
  assert.is(result, 1);
});
test("Find report", async () => {
  const results = await reportConnector.getAllReports();
  assert.is(results.map((e) => e.id).includes(report.id), true);
});
test("Remove message", async () => {
  const result = await reportConnector.deleteReport(report.id);
  assert.is(result, 1);
});
