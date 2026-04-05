import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h1 className="title">CloudNotes</h1>

      <div className="glass">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;