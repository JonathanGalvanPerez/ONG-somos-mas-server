const app = require("./app");
const port = process.env.DB_PORT ? process.env.DB_PORT : 3000;

app.listen(port, () => {
  console.log("Running server at port: " + port);
});
