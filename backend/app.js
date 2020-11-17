const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notesRouters = require("./routes/notesRoters");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(notesRouters);
const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://peter:swordfish@notes.j2ejn.mongodb.net/note",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log(`Server run on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
