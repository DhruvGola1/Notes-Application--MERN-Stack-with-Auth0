import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import Note from "../models/Note.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.sub }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const newNote = new Note({
      text: req.body.text,
      user: req.user.sub,
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(400).json({ message: "Error saving note" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.sub,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(400).json({ message: "Error deleting note" });
  }
});

export default router;
