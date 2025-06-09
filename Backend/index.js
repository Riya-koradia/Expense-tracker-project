const dotenv = require("dotenv");
const express = require("express");
const middleware = require("./src/middleware/middleware");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const tokenVerifier = require("./src/middleware/tokenVerifiers.middleware");
const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const dbConfig = require("./src/config/db.config");
const expenseRoutes = require("./src/routes/expense.routes");
const categoryRoutes = require("./src/routes/category");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieparser());

process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("Shutting Down the Server");
  process.exit(1);
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: process.env.BODY_PARSER_LIMIT || "150mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));
app.use(middleware);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/expense", tokenVerifier, expenseRoutes);
app.use("/api/v1/category", tokenVerifier, categoryRoutes);

(async () => {
  try {
    await dbConfig.promise().query("SELECT 1");
    console.log("Connected to database!");
  } catch (err) {
    console.error("MySQL connection error:", err.message);
  }
})();

app.listen(process.env.PORT, () => {
  console.log("Started the server at " + process.env.PORT);
});
