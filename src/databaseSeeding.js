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
    last_time_updated: null,
    amount_of_times_visited: 0,
    description:
      "Job description/specification\nWe are looking for Junior Software Engineers to be part of our R&D Development teams and to work in one of the fields: TV/PBX platforms middleware, TV portal and Cloud Signage, Hub Integration software and Mobile Applications. It is a great opportunity to work with state of the art software development technology in a great team environment. The positions opened are:\nFull Stack / Backend Developer\n\nFrameworks: NodeJS, DJango;\nLanguage: Python, Typescript, SQL, C/C++\nDatabases: MySql, ElasticSearch, Redis\nFrontend Developer\nFrameworks: Angular, VueJS;\nWebkit development: HTML, CSS, Javascript\nPlatform / OS Developer / Network Software Developer\n\nOS: Android, Linux;\nLanguages: C/C++, Python, Perl, Bash scripting;\nNetworking frameworks: Mikrotik, openWRT, PFSense, Asterix, FreePBX, IPtables; Apache, NGinx",
    title: "Node.JS Developer",
    owner: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
    location: "Porto, Portugal",
    premium_until: null,
    ad_type: "paid",
  },
  {
    salary: 1200,
    currency: "€",
    last_time_updated: null,
    amount_of_times_visited: 0,
    description:
      "'Responsibility\nReview and moderate online content, posted on the Portuguese market; Ensure that all information uploaded by users follow the guidelines based on client’s policies; Become and remain knowledgeable about policies and community standards; Provide and follow best practices used to better achieve client’s KPI’s; Use the learned knowledge to propose improvement ideas either internal or external.\nYour Profile\nNative level of written and verbal communication skills in Portuguese (mandatory); Natural fast learner so you can develop your skills within a short period of time; Fluency in English (minimum level B2); Resilient to stress; Ability to distinguish self-beliefs from moderated content and policies; Empathic; Motivated and with a positive attitude; Attention to detail; Experience in dealing with high volumes of online content; Availability to work in 24/7 rotating shifts, from Monday to Sunday (mandatory).\nOur Offer\nExcellent work opportunity in a dynamic leading multinational company; Stable work and career progression; Investment in training and personal development; Modern, centrally located buildings with canteen facilities and an excellent public transportation connection; Free healthy meals in the cafeterias, such as soup, bread, salad and fruit; Health Insurance since day one in the company; Free company events and activities; Floor animation activities, with prizes every month.\n'",
    title: "Portuguese speaker Content moderator for Social Media",
    owner: "e922a1de-b5cf-455f-9474-0da70bee622d",
    location: "Lisbon, Portugal",
    premium_until: null,
    ad_type: "paid",
  },
  {
    salary: 1600,
    currency: "€",
    last_time_updated: null,
    amount_of_times_visited: 0,
    description:
      "Who are we?\nWe are a Portuguese consulting company that provides consulting, training, staffing and research services. We support our clients in the search for innovative and sustainable solutions, from the application of scientific knowledge in the resolution of complex management problems to the digital and technological transformation within organizations.\nTo reinforce our teams, we are recruiting an Angular Developer.\nWhat profile are we looking for to join our team?\n+2 years experience with Angular (not AngularJS);\nExperience developing with JavaScript;\nExperience with the paradigms of frontend development;\nUnderstanding of SPA paradigms;\nExperience with frontend development technologies (HTML, CSS, JSON, etc);\nUnderstanding of interface protocols (HTTP, REST, SOAP, etc);\nBasic understanding of Docker, Kubernetes, Helm;\nExperience with dev tools (GIT, GitLab, SonarQube, Jenkins, etc) is a plus;\nFamiliar with Agile methodology;\nBusiness-fluent in English (speaking and writing);\nWhat will be your responsibilities and main challenges?\nTechnical design of functional and non-functional Change Requests\nImplementation of functional and non-functional Change Requests\nIncident as well as problem analysis and bug-fixing\nAbility to understand requirements from people with and without a IT background\nLocation\nAlfragide / Remote\nWhat do we have to offer you?\nOur employees have an on-boarding process in the organization, defined by the talent management team.\nThe definition of goals, the elaboration of a career plan, training, certifications and other fringe benefits are part of your journey as WINNER. Apply for this position and discover all the benefits we have available.\nAll applications will be treated with confidentiality under the GDPR. By submitting your application, you agree to the treatment of your information as part of recruitment and its inclusion in our candidate’s database. If you do not consent to the treatment of this data, please do not apply for this announcement.\nDo you want to know more about WINNING?\nOur VISION: We are a team with consolidated experience in the national and international market in consulting, training, staffing and research services. Our vision is that each client and each employee finds in WINNING the way to their success. BECOME WINNERS. TOGETHER.\nOur MISSION: To act scientifically with our clients, adjusting their business model in order to create permanent competitive advantages. WE DELIVER COMPLEX PROBLEM SOLVING.\nOur VALUES: We are guided by values of passion for what we do, always putting the maximum of our know-how, expertise and commitment in each challenge, always giving place to everyone to participate and get engaged, within a posture of maximum professionalism, respect and equity.\nIf you want to know more about us, consult our website",
    title: "Angular Frontend Developer",
    owner: "e922a1de-b5cf-455f-9474-0da70bee622d",
    location: "Lisbon, Portugal",
    premium_until: null,
    ad_type: "paid",
  },
];

const messages = [
  {
    messenger: "e922a1de-b5cf-455f-9474-0da70bee622d",
    receiver: "eac2d0a3-5104-484e-8310-2b0da54c4e23",
    message_content: "Hi, is this spot still available?",
    ad_id: "3a48ad84-605c-11ec-8607-0242ac130002",
  },
];

const reports = [
  {
    user_reporting: "e922a1de-b5cf-455f-9474-0da70bee622d",
    message_content: "Does not follow rules",
    ad_id: "3a48ad84-605c-11ec-8607-0242ac130002",
  },
];

const seedDatabase = async () => {
  const promises = [];
  users.forEach((user) => {
    promises.push(userConnector.addUser(user));
  });
  ads.forEach((ad) => {
    promises.push(adConnector.addAd(ad));
  });
  messages.forEach((message) => {
    promises.push(messageConnector.addMessage(message));
  });
  reports.forEach((report) => {
    promises.push(reportConnector.addReport(report));
  });
  await Promise.all(promises);
  const returnstring = JSON.stringify({ dbSeeded: true });

  fs.writeFileSync(path.join(process.cwd(), `config.json`), returnstring);
};

export default seedDatabase;
