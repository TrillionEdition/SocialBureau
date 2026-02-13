import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";
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
    if (!id) return; // Skip if adding new user

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
          doj: data.doj ? data.doj.split("T")[0] : "",
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

      const url = id ? `${BASE_URL}/user/${id}` : `${BASE_URL}/user/register`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(id ? "User updated successfully ✅" : "User created successfully ✅");
      // setTimeout(() => navigate("/"), 1500); // Optional: redirect back to list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-black text-white">

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-20 px-4 space-y-4">
        <h1 className="text-3xl font-bold text-center">{id ? "Edit Team Member" : "Add Team Member"}</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" name="clickupId" value={form.clickupId} onChange={handleChange} placeholder="ClickUp ID" />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" name="emp_id" value={form.emp_id} onChange={handleChange} placeholder="Employee ID" />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" name="role" value={form.role} onChange={handleChange} placeholder="Role" />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" type="date" name="doj" value={form.doj} onChange={handleChange} />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" type="number" name="rate" value={form.rate} onChange={handleChange} placeholder="Rate" />
          <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" type="password" name="password" value={form.password} onChange={handleChange} placeholder={id ? "New Password (optional)" : "Password"} required={!id} />
        </div>
        
        <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
                <input type="checkbox" name="isEmployee" checked={form.isEmployee} onChange={handleChange} />
                Is Employee?
            </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label>Cover Image</label>
            <input type="file" name="coverImage" onChange={handleFile} className="w-full text-gray-400" />
          </div>
          <div className="space-y-2">
            <label>ID Card</label>
            <input type="file" name="idCard" onChange={handleFile} className="w-full text-gray-400" />
          </div>
        </div>

        <h3 className="font-semibold mt-6 text-xl border-b pb-2">Tools</h3>

        {form.tools.map((tool, i) => (
          <div key={i} className="border border-gray-700 p-4 rounded space-y-2 bg-gray-900">
            <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" value={tool.toolName} onChange={e => handleToolChange(i, "toolName", e.target.value)} placeholder="Tool Name" />
            <input className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-white" value={tool.url} onChange={e => handleToolChange(i, "url", e.target.value)} placeholder="Tool URL" />
            <div className="flex justify-between items-center">
                <input type="file" onChange={e => handleToolFile(i, e.target.files[0])} className="text-sm text-gray-400" />
                <button type="button" onClick={() => removeTool(i)} className="text-red-500 text-sm hover:underline">
                Remove Tool
                </button>
            </div>
          </div>
        ))}

        <button type="button" onClick={addTool} className="text-blue-400 hover:text-blue-300">
          + Add Tool
        </button>

        <button disabled={loading} className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition-colors">
          {loading ? "Saving..." : (id ? "Update User" : "Create User")}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
