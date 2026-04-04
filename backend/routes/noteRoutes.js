const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
} = require("../controllers/noteController");

// all routes protected
router.get("/search", protect, searchNotes);
router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;