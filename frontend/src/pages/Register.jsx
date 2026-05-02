import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await API.post("/auth/register", form);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
    };

    return (
        <div className="container">
            <h1 className="title">CloudNotes</h1>

            <div className="glass">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>

                    <input
                        placeholder="Name"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        required
                    />

                    <input
                        placeholder="Email"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        required
                    />

                    <button>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;