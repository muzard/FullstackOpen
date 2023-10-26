const mongoose = require("mongoose");

const url = `mongodb+srv://arttukokki:${encodeURIComponent(
  "##"
)}@cluster0.rjhgcn1.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "CSS can be hard",
  important: true,
});

/*
note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
}); */

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});