const prisma = require("./utils/prisma_utils");

const startExpressInstance = require("./utils/express_utils");

(async () => {
  try {
    await startExpressInstance();
    console.log("Started http server");
  } catch (e) {
    console.log("Error Starting the API");
    console.error(e);
  }
})().finally(async () => {
  await prisma.$disconnect();
});
