/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import express, { Application } from "express";
const cors = require("cors");
const schoolCategoryRoutes = require('./routes/schoolCategory.routes')
const sequelize = require("./domain/db/connect");

const app: Application = express();

const PORT = process.env.PORT || 5004;
const corsOption = {
  origin: ["*"],
};

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// enable cors
app.use(cors());

app.use("/school-category", schoolCategoryRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to database: ", error);
  });

app.listen(5001, () => {
  console.log(`App running on http://localhost:${PORT}`);
});