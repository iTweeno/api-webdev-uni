const values = {
  testResultsProcessor: "jest-sonar-reporter",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  coverageDirectory: "./.coverage",
};
export default values;
