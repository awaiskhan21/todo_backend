import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mainRouter from "./routes/index";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
