import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

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
        <div className="container">
            <h1 className="title">CloudNotes</h1>

            <button onClick={logout} className="logout">
                Logout
            </button>

            <input
                className="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="glass">
                <form onSubmit={saveNote}>
                    <input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        required
                    />

                    <input
                        placeholder="Content"
                        value={form.content}
                        onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                        }
                        required
                    />

                    <button>Add / Update</button>
                </form>
            </div>

            {notes.map((note) => (
                <motion.div
                    key={note._id}
                    className="glass note"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>

                    <button onClick={() => {
                        setForm(note);
                        setEditingId(note._id);
                    }}>
                        Edit
                    </button>

                    <button onClick={() => {
                        deleteNote(note._id);
                    }}>
                        Delete
                    </button>
                </motion.div>
            ))}
        </div>
    );
}

export default Dashboard;