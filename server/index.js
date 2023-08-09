const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const auth = require("./routes/authRoute");
const user = require("./routes/userRoute");
const post = require("./routes/postRoute")

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected to MongoDB")
);
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);
app.use("/api/user", user);
app.use("/api/posts", post);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
