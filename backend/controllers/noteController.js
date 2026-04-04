const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      tags,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL NOTES
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH NOTES
exports.searchNotes = async (req, res) => {
  const keyword = req.query.q;

  try {
    const notes = await Note.find({
      user: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};