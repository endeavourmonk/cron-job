const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const cron = require("node-cron");

console.log(`Job Started.`);

cron.schedule(" */5 * * * *", async () => {
  fetch(process.env.TOURNEST_API)
    .then((response) => {
      if (response.ok) {
        console.log(
          `API called at: ${new Date().toLocaleTimeString()}, Status code: ${
            response.status
          }`
        );
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => console.log(data))
    .catch((err) => console.error(`Error fetching data:  ${err}`));
});
