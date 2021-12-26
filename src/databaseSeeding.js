import fs from "fs";
import path from "path";
import adConnector from "./connector/ad_connector.js";
import userConnector from "./connector/user_connector.js";
import messageConnector from "./connector/message_connector.js";
import reportConnector from "./connector/report_connector.js";

const users = [
  {
    id: "e922a1de-b5cf-455f-9474-0da70bee623d",
    first_name: "David",
    last_name: "Pinto",
    password: "a",
    phone_number: "934575689",
    email: "b@gmail.com",
    birthday: "2001-03-29",
    company: "CTT",
    profile_picture: "f237237668834822291a2f9a00448f6d",
  },
  {
    id: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
    first_name: "Antonio",
    last_name: "Sousa",
    password: "c",
    phone_number: "934575689",
    email: "d@gmail.com",
    birthday: "2001-03-29",
    company: "Globoaldata",
    profile_picture: "8f99c22a5b377fe34ce362bf91ea4981",
  },
];

const ads = [
  {
    id: "3a48ad84-605c-11ec-8607-0242ac130004",
    salary: 2500,
    currency: "€",
    last_time_updated: "2021-03-03",
    amount_of_times_visited: 0,
    description:
      "Job description/specification\nWe are looking for Junior Software Engineers to be part of our R&D Development teams and to work in one of the fields: TV/PBX platforms middleware, TV portal and Cloud Signage, Hub Integration software and Mobile Applications. It is a great opportunity to work with state of the art software development technology in a great team environment. The positions opened are:\nFull Stack / Backend Developer\n\nFrameworks: NodeJS, DJango;\nLanguage: Python, Typescript, SQL, C/C++\nDatabases: MySql, ElasticSearch, Redis\nFrontend Developer\nFrameworks: Angular, VueJS;\nWebkit development: HTML, CSS, Javascript\nPlatform / OS Developer / Network Software Developer\n\nOS: Android, Linux;\nLanguages: C/C++, Python, Perl, Bash scripting;\nNetworking frameworks: Mikrotik, openWRT, PFSense, Asterix, FreePBX, IPtables; Apache, NGinx",
    title: "Node.JS Developer",
    owner: "e922a1de-b5cf-455f-9474-0da70bee623d",
    location: "Porto, Portugal",
    premium_until: null,
    ad_type: "paid",
  },
  {
    salary: 1200,
    currency: "€",
    last_time_updated: "2021-03-03",
    amount_of_times_visited: 0,
    description:
      "'Responsibility\nReview and moderate online content, posted on the Portuguese market; Ensure that all information uploaded by users follow the guidelines based on client’s policies; Become and remain knowledgeable about policies and community standards; Provide and follow best practices used to better achieve client’s KPI’s; Use the learned knowledge to propose improvement ideas either internal or external.\nYour Profile\nNative level of written and verbal communication skills in Portuguese (mandatory); Natural fast learner so you can develop your skills within a short period of time; Fluency in English (minimum level B2); Resilient to stress; Ability to distinguish self-beliefs from moderated content and policies; Empathic; Motivated and with a positive attitude; Attention to detail; Experience in dealing with high volumes of online content; Availability to work in 24/7 rotating shifts, from Monday to Sunday (mandatory)\n'",
    title: "Portuguese speaker Content moderator for Social Media",
    owner: "e922a1de-b5cf-455f-9474-0da70bee623d",
    location: "Lisbon, Portugal",
    premium_until: null,
    ad_type: "paid",
  },
  {
    salary: 1600,
    currency: "€",
    last_time_updated: "2021-03-03",
    amount_of_times_visited: 0,
    description:
      "Ability to understand requirements from people with and without a IT background\nLocation\nAlfragide / Remote\nWhat do we have to offer you?\nOur employees have an on-boarding process in the organization, defined by the talent management team.\nThe definition of goals, the elaboration of a career plan, training, certifications and other fringe benefits are part of your journey as WINNER. Apply for this position and discover all the benefits we have available.\nAll applications will be treated with confidentiality under the GDPR. By submitting your application, you agree to the treatment of your information as part of recruitment and its inclusion in our candidate’s database. If you do not consent to the treatment of this data, please do not apply for this announcement.\nDo you want to know more about WINNING?",
    title: "Angular Frontend Developer",
    owner: "e922a1de-b5cf-455f-9474-0da70bee623d",
    location: "Lisbon, Portugal",
    premium_until: null,
    ad_type: "paid",
  },
];

const messages = [
  {
    messenger: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
    receiver: "e922a1de-b5cf-455f-9474-0da70bee623d",
    message_content: "Hi, is this spot still available?",
    ad_id: "3a48ad84-605c-11ec-8607-0242ac130004",
  },
];

const reports = [
  {
    user_reporting: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
    message_content: "Does not follow rules",
    ad_id: "3a48ad84-605c-11ec-8607-0242ac130004",
  },
];

const timeout = (ms) => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

const seedDatabase = async () => {
  users.forEach(async (user, index) => {
    await userConnector.addUser(user, {
      filename: index === 0 ? "8f99c22a5b377fe34ce362bf91ea4981" : "f237237668834822291a2f9a00448f6d",
    });
  });
  await timeout(2000);
  ads.forEach(async (ad) => {
    await adConnector.addAd(ad);
  });
  await timeout(2000);
  messages.forEach(async (message) => {
    await messageConnector.addMessage(message);
  });
  reports.forEach(async (report) => {
    await reportConnector.addReport(report);
  });
  const returnstring = JSON.stringify({ dbSeeded: true });

  fs.writeFileSync(path.join(process.cwd(), `config.json`), returnstring);
};

export default seedDatabase;
