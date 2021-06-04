const app = require('./app');
const port = process.env.PORT ? process.env.PORT : 3000;
const { sequelize } = require("./models");

const runServer = async () => {
  try {
    await sequelize.authenticate();

    console.log('DB Connection has been established successfully.');

    app.listen(port, () => {
      console.log('Running server at port: ' + port);
    });
  } catch (error) {
    console.error('DB Unable to connect to the database:', error);
  }
};

runServer();
