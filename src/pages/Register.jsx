import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingTools, setUploadingTools] = useState(false);

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
    tools: [
  {
    toolName: "",
    url: "",
    icon: "",
    description: "",
  },
],

  });

  const [files, setFiles] = useState({
    coverImage: null,
    idCard: null,
  });

  // ✅ Upload image to Cloudinary
  // const uploadToCloudinary = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "your_upload_preset"); // Replace with your preset

  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace cloud_name
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const data = await response.json();
  //     if (data.secure_url) {
  //       return data.secure_url;
  //     }
  //     throw new Error("Image upload failed");
  //   } catch (err) {
  //     console.error("Cloudinary upload error:", err);
  //     throw err;
  //   }
  // };

  const handleToolChange = (index, field, value) => {
  const updatedTools = form.tools.map((tool, i) =>
    i === index ? { ...tool, [field]: value } : tool
  );
  setForm({ ...form, tools: updatedTools });
};


//   const handleToolFile = async (index, file) => {
//   if (!file) return;

//   try {
//     setUploadingTools(true);

//     const iconUrl = await uploadToCloudinary(file);

//     const updatedTools = form.tools.map((tool, i) =>
//       i === index ? { ...tool, icon: iconUrl } : tool
//     );

//     setForm({ ...form, tools: updatedTools });
//     setError("");
//   } catch (err) {
//     setError("Failed to upload tool icon");
//   } finally {
//     setUploadingTools(false);
//   }
// };
const handleToolFile = (index, file) => {
  if (!file) return;

  // Validate file
  if (file.size > 5 * 1024 * 1024) {
    setError("Tool icon must be less than 5MB");
    return;
  }

  const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!validImageTypes.includes(file.type)) {
    setError("Please upload only image files (JPEG, PNG, JPG, WEBP)");
    return;
  }

  // ✅ Store file reference for later append
  const updatedTools = form.tools.map((tool, i) =>
    i === index 
      ? { 
          ...tool, 
          iconFile: file,  // ✅ Store file object
          icon: URL.createObjectURL(file)  // ✅ Show preview locally
        } 
      : tool
  );

  setForm({ ...form, tools: updatedTools });
  setError("");
};

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${e.target.name} file size should be less than 5MB`);
        e.target.value = "";
        return;
      }

      const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!validImageTypes.includes(file.type)) {
        setError("Please upload only image files (JPEG, PNG, JPG, WEBP)");
        e.target.value = "";
        return;
      }

      setFiles({ ...files, [e.target.name]: file });
      setError("");
    }
  };

  const validateForm = () => {
    const requiredFields = ["clickupId", "name", "email", "password", "role", "doj"];
    for (const field of requiredFields) {
      if (!form[field]?.trim()) {
        throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
      }
    }

    if (!files.coverImage || !files.idCard) {
      throw new Error("Cover image and ID card are required");
    }

    if (form.clickupId.length !== 8) {
      throw new Error("ClickUp ID must be exactly 8 characters");
    }

    if (form.emp_id && (form.emp_id.length < 10 || form.emp_id.length > 12)) {
      throw new Error("Employee ID must be between 10 and 12 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      throw new Error("Please enter a valid email address");
    }

    if (form.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    if (form.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    const selectedDate = new Date(form.doj);
    const today = new Date();
    if (selectedDate > today) {
      throw new Error("Date of joining cannot be in the future");
    }
  };

// ✅ FIXED: Frontend Register Component - Proper Tool Handling
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   if (loading) return;

//   setError("");
//   setSuccess("");

//   try {
//     setLoading(true);
//     validateForm();

//     const formData = new FormData();

//     formData.append("clickupId", form.clickupId);
//     formData.append("name", form.name);
//     formData.append("email", form.email);
//     formData.append("password", form.password);
//     formData.append("role", form.role);
//     formData.append("emp_id", form.emp_id);
//     formData.append("doj", form.doj);
//     formData.append("rate", form.rate);
//     formData.append("phone", form.phone || "");
//     formData.append("isEmployee", "true");

//     // ✅ FIXED: Filter tools that have BOTH name AND url
//     // Only include tools that are complete (have name, url, and ideally imageUrl)
//     const toolsData = form.tools
//   .filter(tool => tool.toolName?.trim()) // ONLY toolName is required
//   .map(tool => ({
//     toolName: tool.toolName.trim(),
//     url: tool.url?.trim() || undefined,
//     icon: tool.icon || undefined,
//     description: tool.description?.trim() || undefined,
//   }));

// console.log("Tools being sent to backend:", toolsData);
// formData.append("tools", JSON.stringify(toolsData));


//     console.log("Tools being sent to backend:", toolsData); // Debug log

//     // ✅ Send as JSON string (backend will parse it)
//     formData.append("tools", JSON.stringify(toolsData));

//     if (files.coverImage) formData.append("coverImage", files.coverImage);
//     if (files.idCard) formData.append("idCard", files.idCard);

//     console.log("Complete FormData being submitted:");
//     for (let [key, value] of formData.entries()) {
//       if (key === "tools") {
//         console.log(key, JSON.parse(value)); // Parse and log tools
//       } else {
//         console.log(key, typeof value === "object" ? value.name : value);
//       }
//     }
// console.log("Form",formData);

//     const response = await fetch(`${BASE_URL}/user/register`, {
//       method: "POST",
//       body: formData,
//       credentials: "include",
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(
//         data.message || `Registration failed (Status: ${response.status})`
//       );
//     }

//     setSuccess("Employee registered successfully! ✅");

//     // Reset form
//     setForm({
//       clickupId: "",
//       name: "",
//       email: "",
//       password: "",
//       role: "",
//       emp_id: "",
//       doj: "",
//       rate: "",
//       isEmployee: true,
//       tools: [{ name: "", url: "", image: null, imageUrl: "" }],
//     });

//     setFiles({ coverImage: null, idCard: null });
//     document.querySelectorAll("input[type='file']").forEach((input) => {
//       input.value = "";
//     });

//     setTimeout(() => {
//       navigate("/");
//     }, 1500);
//   } catch (err) {
//     setError(err.message || "An error occurred during registration");
//     console.error("Registration error:", err);
//   } finally {
//     setLoading(false);
//   }
// };
const handleSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (loading) return;

  setError("");
  setSuccess("");

  try {
    setLoading(true);
    validateForm();

    const formData = new FormData();

    formData.append("clickupId", form.clickupId);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("role", form.role);
    formData.append("emp_id", form.emp_id);
    formData.append("doj", form.doj);
    formData.append("rate", form.rate);
    formData.append("phone", form.phone || "");
    formData.append("isEmployee", "true");

    // ✅ FIX: Filter and prepare tools data - DO NOT include icon (let backend use uploaded file)
    const toolsData = form.tools
      .filter(tool => tool.toolName?.trim())  // Only require toolName
      .map(tool => ({
        toolName: tool.toolName.trim(),
        url: tool.url?.trim() || undefined,
        // ❌ DO NOT send icon - backend will use the uploaded file instead
        description: tool.description?.trim() || undefined,
      }));

    console.log("Tools being sent to backend:", toolsData);

    // ✅ FIXED: Append ONCE as JSON string (NOT TWICE!)
    formData.append("tools", JSON.stringify(toolsData));

    // ✅ Append tool icon files in FILTERED order (match toolsData order)
    const filteredTools = form.tools.filter(tool => tool.toolName?.trim());
    filteredTools.forEach((tool, index) => {
      if (tool.iconFile) {  // Only if file was selected
        formData.append("toolIcons", tool.iconFile);
      }
    });

    if (files.coverImage) formData.append("coverImage", files.coverImage);
    if (files.idCard) formData.append("idCard", files.idCard);

    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Registration failed (Status: ${response.status})`
      );
    }

    setSuccess("Employee registered successfully! ✅");

    // Reset form
    setForm({
      clickupId: "",
      name: "",
      email: "",
      password: "",
      role: "",
      emp_id: "",
      doj: "",
      rate: "",
      isEmployee: true,
      tools: [{ toolName: "", url: "", icon: "", description: "", iconFile: null }],
    });

    setFiles({ coverImage: null, idCard: null });
    document.querySelectorAll("input[type='file']").forEach((input) => {
      input.value = "";
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  } catch (err) {
    setError(err.message || "An error occurred during registration");
    console.error("Registration error:", err);
  } finally {
    setLoading(false);
  }
};

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const addTool = () => {
  setForm({
    ...form,
    tools: [
      ...form.tools,
      { toolName: "", url: "", icon: "", description: "", iconFile: null },
    ],
  });
};


  const removeTool = (index) => {
    const updatedTools = form.tools.filter((_, i) => i !== index);
    setForm({ ...form, tools: updatedTools });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <div
        className="absolute inset-0 z-0 bg-radial-gradient from-red-500/15 from-0% via-transparent to-transparent"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 0%, rgba(255, 0, 0, 0.15) 0%, transparent 50%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute w-5 h-5 bg-red-500 rounded-full opacity-20 animate-float"
          style={{ top: "10%", left: "10%", animationDelay: "0s" }}
        />
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full opacity-15 animate-float"
          style={{ top: "80%", left: "85%", animationDelay: "1s" }}
        />
        <div
          className="absolute w-6 h-6 bg-red-500 rounded-full opacity-20 animate-float"
          style={{ top: "5%", left: "70%", animationDelay: "2s" }}
        />
      </div>

      <div
        className="absolute w-12 h-12 border-6 border-red-500 opacity-15 animate-spin-slow rounded-full"
        style={{ top: "5%", left: "15%" }}
      />
      <div
        className="absolute w-6 h-6 border-2 border-red-500 opacity-10 animate-spin-slow rounded-full"
        style={{ top: "85%", left: "80%", animationDuration: "2s" }}
      />

      <div className="relative z-10">
        <div className="relative z-10 flex items-center justify-center pt-20 pb-8">
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              JOIN
            </h1>
            <img src="/assets/logo.webp" alt="Logo" className="w-35 md:w-50 object-contain" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
          <div className="relative bg-neutral-950/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 space-y-10 shadow-2xl overflow-hidden shadow-red-500/40 ring-1 ring-red-900/30">
            <div className="absolute inset-0 rounded-3xl p-[2px] pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-red-600 via-70% to-transparent animate-slideRight bg-[length:200%_100%]"></div>
              <div className="absolute inset-[2px] rounded-3xl bg-neutral-950/80" />
            </div>

            <div className="relative z-10">
              {error && (
                <div className="mb-6 p-4 bg-red-950/30 border border-red-700/50 rounded-lg">
                  <p className="text-red-400 text-center font-medium">{error}</p>
                </div>
              )}
              {success && (
                <div className="mb-6 p-4 bg-green-950/30 border border-green-700/50 rounded-lg">
                  <p className="text-green-400 text-center font-medium">{success}</p>
                </div>
              )}

              <section className="relative pt-4">
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text bg-[length:200%_100%] animate-shimmer uppercase tracking-wide">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    name="clickupId"
                    label="ClickUp ID"
                    type="number"
                    required
                    onChange={handleChange}
                    value={form.clickupId}
                    maxLength={8}
                    minLength={8}
                    placeholder="Exactly 8 characters"
                  />
                  <Input
                    name="emp_id"
                    label="Employee ID"
                    onChange={handleChange}
                    value={form.emp_id}
                    maxLength={12}
                    minLength={10}
                    placeholder="10-12 characters"
                  />
                  <Input
                    name="name"
                    label="Full Name"
                    required
                    onChange={handleChange}
                    value={form.name}
                    minLength={2}
                    placeholder="At least 2 characters"
                  />
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    value={form.email}
                    placeholder="example@domain.com"
                  />
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    value={form.password}
                    minLength={6}
                    placeholder="At least 6 characters"
                  />
                  <Input
                    name="role"
                    label="Role / Designation"
                    required
                    onChange={handleChange}
                    value={form.role}
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text bg-[length:200%_100%] animate-shimmer uppercase tracking-wide">
                  Work Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <Input
                    name="doj"
                    label="Date of Joining"
                    type="date"
                    required
                    onChange={handleChange}
                    value={form.doj}
                    max={getTodayDate()}
                  />
                  <Input
                    name="rate"
                    label="Rate"
                    type="number"
                    onChange={handleChange}
                    value={form.rate}
                    min="0"
                    step="0.01"
                    placeholder="Hourly rate"
                  />
                </div>
              </section>

              <section className="relative">
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text animate-shimmer uppercase tracking-wide">
                  Tools
                </h2>

                <div className="space-y-6">
                  {form.tools?.map((tool, index) => (
                    <div
                      key={index}
                      className="relative rounded-2xl border border-red-900/30 bg-neutral-950/70 backdrop-blur-xl p-6 md:p-8 shadow-lg shadow-red-900/30"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <Input
  label="Tool Name"
  value={tool.toolName}
  onChange={(e) =>
    handleToolChange(index, "toolName", e.target.value)
  }
/>
<Input
  label="Tool URL"
  placeholder="https://example.com"
  value={tool.url}
  onChange={(e) =>
    handleToolChange(index, "url", e.target.value)
  }
/>

                        <FileInput
                          label="Tool Image"
                          onChange={(e) => handleToolFile(index, e.target.files[0])}
                          helperText="Max 5MB, JPEG, PNG, WEBP"
                          disabled={uploadingTools}
                        />
                      </div>

                      {/* Show uploaded image URL */}
                      {tool.imageUrl && (
                        <p className="text-xs text-green-400 mt-3">✓ Image uploaded</p>
                      )}

                      {form.tools.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTool(index)}
                          className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={addTool}
                    disabled={uploadingTools}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg shadow-red-900/40 transition-all active:scale-[0.97] disabled:opacity-50"
                  >
                    <span className="text-lg">＋</span>
                    Add Tool
                  </button>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text bg-[length:200%_100%] animate-shimmer uppercase tracking-wide">
                  Identity & Assets
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileInput
                    label="Cover Image (Required)"
                    name="coverImage"
                    required
                    onChange={handleFile}
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    helperText="Max 5MB, JPEG, PNG, WEBP"
                  />
                  <FileInput
                    label="ID Card (Required)"
                    name="idCard"
                    required
                    onChange={handleFile}
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    helperText="Max 5MB, JPEG, PNG, WEBP"
                  />
                </div>
              </section>

              <div className="pt-6 border-t border-red-900/30 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || uploadingTools}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-red-900/50 active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating User...
                    </span>
                  ) : (
                    "Create Team Member"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideRight {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-slideRight {
          animation: slideRight 3s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 text-sm text-gray-400">
      {label}
      {props.required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      {...props}
      className="w-full p-3 rounded-lg bg-black text-white border border-red-900/30 focus:border-red-500 focus:outline-none focus:shadow-lg focus:shadow-red-900/20 transition-all duration-300 placeholder-gray-600 disabled:opacity-50"
    />
  </div>
);

const FileInput = ({ label, helperText, disabled, ...props }) => (
  <div className="border border-dashed border-red-900/30 rounded-xl p-6 hover:border-red-500 hover:bg-red-950/10 transition-all duration-300 cursor-pointer">
    <label className="block mb-2 text-sm text-gray-400 cursor-pointer">
      {label}
      {props.required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type="file"
      disabled={disabled}
      {...props}
      className="w-full text-sm text-gray-500 mb-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-900/30 file:text-red-400 hover:file:bg-red-900/50 cursor-pointer disabled:opacity-50"
    />
    {helperText && <p className="text-xs text-gray-500 mt-2">{helperText}</p>}
  </div>
);