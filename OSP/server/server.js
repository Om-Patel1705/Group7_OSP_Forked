const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const scholarshipRoutes = require("./Routes/scholarshipRoutes");
const resetPassRoute = require("./Routes/resetPassRoute");

const port = process.env.PORT || 8080;

dotenv.config();
 
app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://group7-osp-forked.vercel.app",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/scholarship", scholarshipRoutes);
app.use("/api/passwordreset", resetPassRoute);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
