import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    let res;
  
    if (search) {
      res = await API.get(`/notes/search?q=${search}`);
    } else {
      res = await API.get("/notes");
    }
  
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  const saveNote = async (e) => {
    e.preventDefault();
  
    if (editingId) {
      await API.put(`/notes/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/notes", form);
    }
  
    setForm({ title: "", content: "" });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Dashboard</h2>

        {/* Logout */}
        <button onClick={logout}>Logout</button>

 {/* Search Note */}
      <input
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      {/* Create Note */}
      <form onSubmit={saveNote}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button>Add Note</button>
      </form>

      {/* Notes List */}
      {notes.map((note) => (
        <div key={note._id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => {
  setForm({ title: note.title, content: note.content });
  setEditingId(note._id);
}}>
  Edit
</button>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;