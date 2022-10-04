const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes")
const {notFound,errorHandler} = require("./middlewares/http-error")

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/user",userRoutes);

app.use(notFound);
app.use(errorHandler);

const url = process.env.DB_URL;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connected");
  }
);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
