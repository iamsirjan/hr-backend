import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_CONNECTION!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/department", require("./routes/departmentRoutes"));
app.use("/api/role", require("./routes/roleRoutes"));
app.use("/api/position", require("./routes/positionRoutes"));

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
