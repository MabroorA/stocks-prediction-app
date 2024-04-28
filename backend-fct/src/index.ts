
import express from "express";
import router from "../routes/router";


// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// cors access
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use('/', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
