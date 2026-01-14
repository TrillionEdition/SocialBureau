import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    clickupId: "",
    name: "",
    email: "",
    password: "",
    role: "",
    emp_id: "",
    doj: "",
    rate: "",
    isEmployee: true,
    tools: [],
  });

  const [files, setFiles] = useState({
    coverImage: null,
    idCard: null,
  });

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setForm({
          clickupId: data.clickupId || "",
          name: data.name || "",
          email: data.email || "",
          password: "",
          role: data.role || "",
          emp_id: data.emp_id || "",
          doj: data.doj?.split("T")[0] || "",
          rate: data.rate || "",
          isEmployee: data.isEmployee ?? true,
          tools: (data.tools || []).map(t => ({
            toolName: t.toolName,
            url: t.url || "",
            description: t.description || "",
            iconFile: null,
          })),
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFiles({ ...files, [e.target.name]: file });
  };

  const handleToolChange = (i, field, value) => {
    const tools = [...form.tools];
    tools[i][field] = value;
    setForm({ ...form, tools });
  };

  const handleToolFile = (i, file) => {
    if (!file) return;
    const tools = [...form.tools];
    tools[i].iconFile = file;
    setForm({ ...form, tools });
  };

  const addTool = () =>
    setForm({
      ...form,
      tools: [...form.tools, { toolName: "", url: "", description: "", iconFile: null }],
    });

  const removeTool = (i) =>
    setForm({ ...form, tools: form.tools.filter((_, index) => index !== i) });

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key !== "tools" && key !== "password") {
          formData.append(key, value ?? "");
        }
      });

      if (form.password) formData.append("password", form.password);

      const toolsData = form.tools
        .filter(t => t.toolName.trim())
        .map(t => ({
          toolName: t.toolName,
          url: t.url,
          description: t.description,
        }));

      formData.append("tools", JSON.stringify(toolsData));

      form.tools.forEach(t => t.iconFile && formData.append("toolIcons", t.iconFile));
      files.coverImage && formData.append("coverImage", files.coverImage);
      files.idCard && formData.append("idCard", files.idCard);

      const res = await fetch(`${BASE_URL}/user/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("User updated successfully ✅");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-20 px-4 space-y-4">
        <h1 className="text-3xl font-bold text-center">Edit Team Member</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <input className="input" name="clickupId" value={form.clickupId} onChange={handleChange} placeholder="ClickUp ID" />
        <input className="input" name="emp_id" value={form.emp_id} onChange={handleChange} placeholder="Employee ID" />
        <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input className="input" name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        <input className="input" type="date" name="doj" value={form.doj} onChange={handleChange} />
        <input className="input" type="number" name="rate" value={form.rate} onChange={handleChange} placeholder="Rate" />
        <input className="input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password (optional)" />

        <input type="file" name="coverImage" onChange={handleFile} />
        <input type="file" name="idCard" onChange={handleFile} />

        <h3 className="font-semibold mt-6">Tools</h3>

        {form.tools.map((tool, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
            <input className="input" value={tool.toolName} onChange={e => handleToolChange(i, "toolName", e.target.value)} placeholder="Tool Name" />
            <input className="input" value={tool.url} onChange={e => handleToolChange(i, "url", e.target.value)} placeholder="Tool URL" />
            <input type="file" onChange={e => handleToolFile(i, e.target.files[0])} />
            <button type="button" onClick={() => removeTool(i)} className="text-red-500 text-sm">
              Remove Tool
            </button>
          </div>
        ))}

        <button type="button" onClick={addTool} className="text-blue-400">
          + Add Tool
        </button>

        <button disabled={loading} className="w-full py-3 bg-red-600 rounded font-semibold">
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default EditUser;
