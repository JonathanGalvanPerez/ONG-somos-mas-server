const app = require("./app");
const port = process.env.PORT ? process.env.PORT : 3000;

app.listen(port, () => {
  console.log("Running server at port: " + port);
});
