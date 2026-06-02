import { useState, useEffect } from "react";

// ─── Persistent Storage via localStorage (in-memory fallback for artifacts) ───
const store = (() => {
  let _forms = {};
  let _responses = [];
  return {
    getForms: () => _forms,
    setForms: (f) => { _forms = f; },
    getResponses: () => _responses,
    addResponse: (r) => { _responses = [..._responses, r]; },
  };
})();

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10);

const QUESTION_TYPES = [
  { value: "text",     label: "Short Text" },
  { value: "textarea", label: "Long Text" },
  { value: "number",   label: "Number" },
  { value: "email",    label: "Email" },
  { value: "phone",    label: "Phone" },
  { value: "select",   label: "Dropdown" },
  { value: "radio",    label: "Radio (single choice)" },
  { value: "checkbox", label: "Checkboxes (multi-choice)" },
  { value: "date",     label: "Date" },
  { value: "rating",   label: "Rating (1–5)" },
];

const hasOptions = (type) => ["select", "radio", "checkbox"].includes(type);

// ─── Seed Data ────────────────────────────────────────────────────────────────
const seedForm = {
  id: "demo",
  slug: "demo",
  title: "Product Enquiry",
  description: "Tell us what you need.",
  questions: [
    { id: "q1", label: "Your Name", type: "text", placeholder: "John Doe", required: true, options: [] },
    { id: "q2", label: "Email", type: "email", placeholder: "john@example.com", required: true, options: [] },
    { id: "q3", label: "Product Interest", type: "select", placeholder: "", required: true, options: ["Widget A", "Widget B", "Widget C"] },
    { id: "q4", label: "Message", type: "textarea", placeholder: "Describe your requirement...", required: false, options: [] },
  ],
  createdAt: new Date().toISOString(),
};
store.setForms({ demo: seedForm });

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ClientEnquiry() {
  const [editFormId, setEditFormId] = useState(null);
const getInitialRoute = () => {
    const hash = window.location.hash.replace("#", "");
    return hash || "admin";
  };

  const [route, setRoute] = useState(getInitialRoute);

  const navigate = (r) => {
    window.location.hash = r;
    setRoute(r);
  };

  // Listen for back/forward navigation
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setRoute(hash || "admin");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  if (route === "admin") return <AdminHome navigate={navigate} setEditFormId={setEditFormId} />;
  if (route === "builder") return <FormBuilder formId={editFormId} navigate={navigate} />;
  if (route === "dashboard") return <Dashboard navigate={navigate} />;
  if (route.startsWith("form/")) {
    const slug = route.split("/")[1];
    return <FormView slug={slug} navigate={navigate} />;
  }
  return <div className="p-8 text-red-500">404 – Unknown route</div>;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN HOME – list all forms
// ═══════════════════════════════════════════════════════════════════════════════
function AdminHome({ navigate, setEditFormId }) {
  const [forms, setForms] = useState({ ...store.getForms() });

  const refresh = () => {
    // prefer backend source
    fetch("/api/forms")
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(f => { map[f.id || f._id || f.slug] = f; });
        store.setForms(map);
        setForms({ ...map });
      })
      .catch(() => setForms({ ...store.getForms() }));
  };

  useEffect(() => { refresh(); }, []);

  const newForm = () => {
    setEditFormId(null);
    navigate("builder");
  };

  const editForm = (id) => {
    setEditFormId(id);
    navigate("builder");
  };

  const deleteForm = async (id) => {
  if (!window.confirm("Delete this form?")) return;
  const form = store.getForms()[id];
  await fetch(`/api/forms/${form.slug}`, { method: "DELETE" });
  refresh();
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Form Builder – Admin" extra={
        <div className="flex gap-2">
          <Btn onClick={newForm} color="blue">+ New Form</Btn>
          <Btn onClick={() => navigate("dashboard")} color="gray">Dashboard</Btn>
        </div>
      } />

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {Object.values(forms).length === 0 && (
          <p className="text-gray-500 text-sm">No forms yet. Create one.</p>
        )}
        {Object.values(forms).map((form) => (
          <div key={form.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{form.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                /{form.slug} · {form.questions.length} questions
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <Btn onClick={() => navigate(`form/${form.slug}`)} color="gray" small>Preview</Btn>
              <Btn onClick={() => {
                const url = `${window.location.origin}/form/${form.slug}`; // ← remove the #
                navigator.clipboard?.writeText(url);
                alert("Link copied!\n" + url);
                }} color="gray" small>Copy Link</Btn>
              <Btn onClick={() => editForm(form.id)} color="yellow" small>Edit</Btn>
              <Btn onClick={() => deleteForm(form.id)} color="red" small>Delete</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FORM BUILDER – create / edit a form and its questions
// ═══════════════════════════════════════════════════════════════════════════════
function FormBuilder({ formId, navigate }) {
  const existing = formId ? store.getForms()[formId] : null;

  const [title, setTitle] = useState(existing?.title || "");
  const [desc, setDesc] = useState(existing?.description || "");
  const [slug, setSlug] = useState(existing?.slug || "");
  const [questions, setQuestions] = useState(existing?.questions ? JSON.parse(JSON.stringify(existing.questions)) : []);
  const [error, setError] = useState("");

  const addQuestion = () => {
    setQuestions([...questions, {
      id: uid(), label: "", type: "text", placeholder: "", required: false, options: [],
    }]);
  };

  const updateQ = (idx, patch) => {
    setQuestions(questions.map((q, i) => i === idx ? { ...q, ...patch } : q));
  };

  const deleteQ = (idx) => setQuestions(questions.filter((_, i) => i !== idx));

  const moveQ = (idx, dir) => {
    const arr = [...questions];
    const swap = idx + dir;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    setQuestions(arr);
  };

  const save = async () => {
    if (!title.trim()) return setError("Form title is required.");
    if (!slug.trim()) return setError("Slug is required.");
    if (!/^[a-z0-9-]+$/.test(slug)) return setError("Slug: lowercase letters, numbers, hyphens only.");
    const forms = store.getForms();
    // slug uniqueness check (ignore current)
    const conflict = Object.values(forms).find(f => f.slug === slug && f.id !== (existing?.id));
    if (conflict) return setError("Slug already taken.");
    if (questions.some(q => !q.label.trim())) return setError("All questions need a label.");
    setError("");
    const form = {
    id: existing?.id || uid(),
    slug,
    title,
    description: desc,
    questions,
    createdAt: existing?.createdAt || new Date().toISOString(),
  };

  try {
    if (existing) {
      await fetch(`/api/forms/${existing.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    navigate("admin");
  } catch (err) {
    setError("Failed to save form. Check your connection.");
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={existing ? "Edit Form" : "New Form"} extra={
        <div className="flex gap-2">
          <Btn onClick={() => navigate("admin")} color="gray">← Back</Btn>
          <Btn onClick={save} color="blue">Save Form</Btn>
        </div>
      } />

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">{error}</div>}

        {/* Form Meta */}
        <Section title="Form Details">
          <Field label="Form Title *">
            <input
  className={`${input()} placeholder:text-black`}
  value={title}
  onChange={e => setTitle(e.target.value)}
  placeholder="e.g. Product Enquiry"
/>
          </Field>
          <Field label="Description">
            <textarea className={input()} rows={2} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional description shown to users" />
          </Field>
          <Field label="Slug (URL path) *">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">…/form/</span>
              <input className={input()} value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s/g, "-"))} placeholder="product-enquiry" />
            </div>
          </Field>
        </Section>

        {/* Questions */}
        <Section title="Questions">
          {questions.length === 0 && <p className="text-sm text-gray-400">No questions yet.</p>}
          {questions.map((q, idx) => (
            <QuestionEditor
              key={q.id}
              q={q}
              idx={idx}
              total={questions.length}
              onUpdate={(patch) => updateQ(idx, patch)}
              onDelete={() => deleteQ(idx)}
              onMove={(dir) => moveQ(idx, dir)}
            />
          ))}
          <Btn onClick={addQuestion} color="blue">+ Add Question</Btn>
        </Section>
      </div>
    </div>
  );
}

function QuestionEditor({ q, idx, total, onUpdate, onDelete, onMove }) {
  const [optionInput, setOptionInput] = useState("");

  const addOption = () => {
    if (!optionInput.trim()) return;
    onUpdate({ options: [...q.options, optionInput.trim()] });
    setOptionInput("");
  };

  const removeOption = (i) => onUpdate({ options: q.options.filter((_, idx) => idx !== i) });

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400">Q{idx + 1}</span>
        <div className="flex gap-1">
          <BtnIcon onClick={() => onMove(-1)} disabled={idx === 0} title="Move up">↑</BtnIcon>
          <BtnIcon onClick={() => onMove(1)} disabled={idx === total - 1} title="Move down">↓</BtnIcon>
          <BtnIcon onClick={onDelete} title="Delete" danger>✕</BtnIcon>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Question Label *">
          <input className={input()} value={q.label} onChange={e => onUpdate({ label: e.target.value })} placeholder="e.g. Your Name" />
        </Field>
        <Field label="Answer Type">
          <select className={input()} value={q.type} onChange={e => onUpdate({ type: e.target.value, options: [] })}>
            {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </Field>
      </div>

      {!hasOptions(q.type) && (
        <Field label="Placeholder">
          <input className={input()} value={q.placeholder} onChange={e => onUpdate({ placeholder: e.target.value })} placeholder="Hint text inside the input" />
        </Field>
      )}

      {hasOptions(q.type) && (
        <Field label="Options">
          <div className="space-y-1">
            {q.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-700">{opt}</span>
                <BtnIcon onClick={() => removeOption(i)} danger>✕</BtnIcon>
              </div>
            ))}
            <div className="flex gap-2 mt-1">
              <input className={input()} value={optionInput} onChange={e => setOptionInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addOption()} placeholder="Option label, press Enter" />
              <Btn onClick={addOption} color="gray" small>Add</Btn>
            </div>
          </div>
        </Field>
      )}

      <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
        <input type="checkbox" checked={q.required} onChange={e => onUpdate({ required: e.target.checked })} />
        Required
      </label>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FORM VIEW – end user fills the form
// ═══════════════════════════════════════════════════════════════════════════════
export function FormView({ slug, navigate }) {
   const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});       // ← move up
  const [errors, setErrors] = useState({});       // ← move up
  const [submitted, setSubmitted] = useState(false); // ← move up

  useEffect(() => {
    // Try local store first
    const local = Object.values(store.getForms()).find(f => f.slug === slug);
    if (local) {
      setForm(local);
      setLoading(false);
      return;
    }
    // Fallback to backend
    fetch(`/api/forms/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          const forms = store.getForms();
          forms[data.id] = data;
          store.setForms(forms);
          setForm(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading form...</p>
    </div>
  );

  if (!form) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-700">Form not found</p>
        <p className="text-gray-400 text-sm mt-1">/{slug}</p>
        <Btn onClick={() => navigate("admin")} color="blue" className="mt-4">Go Home</Btn>
      </div>
    </div>
  );

  const setValue = (qid, val) => setValues(v => ({ ...v, [qid]: val }));

  const validate = () => {
    const errs = {};
    form.questions.forEach(q => {
      const v = values[q.id];
      if (q.required) {
        if (q.type === "checkbox") {
          if (!v || v.length === 0) errs[q.id] = "This field is required.";
        } else {
          if (!v || String(v).trim() === "") errs[q.id] = "This field is required.";
        }
      }
      if (q.type === "email" && v && !/\S+@\S+\.\S+/.test(v)) errs[q.id] = "Invalid email.";
      if (q.type === "phone" && v && !/^[+\d\s()-]{6,15}$/.test(v)) errs[q.id] = "Invalid phone.";
    });
    return errs;
  };

  const submit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    const payload = {
      id: uid(),
      formId: form.id,
      formTitle: form.title,
      data: { ...values },
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`/api/forms/${form.slug}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
    } catch (err) {
      // fallback to in-memory store
      store.addResponse({ ...payload, slug: form.slug });
    }

    setSubmitted(true);
  };

  if (submitted) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-sm border border-gray-100">
        <div className="text-4xl mb-3">✅</div>
        <h2 className="text-xl font-bold text-gray-800">Thank you!</h2>
        <p className="text-gray-500 mt-1 text-sm">Your response has been recorded.</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Btn onClick={() => { setValues({}); setSubmitted(false); }} color="gray" small>Submit another</Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">{form.title}</h1>
            {form.description && <p className="text-gray-500 text-sm mt-1">{form.description}</p>}
          </div>
          <div style={{width:40}} />
        </div>

        <div className="space-y-5">
          {form.questions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {q.label} {q.required && <span className="text-red-500">*</span>}
              </label>
              <QuestionInput q={q} value={values[q.id]} onChange={(v) => setValue(q.id, v)} />
              {errors[q.id] && <p className="text-xs text-red-500 mt-1">{errors[q.id]}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Btn onClick={submit} color="blue">Submit</Btn>
        </div>
      </div>
    </div>
  );
}

function QuestionInput({ q, value, onChange }) {
  const cls = input();

  if (q.type === "textarea")
    return <textarea className={cls} rows={4} placeholder={q.placeholder} value={value || ""} onChange={e => onChange(e.target.value)} />;

  if (q.type === "select")
    return (
      <select className={cls} value={value || ""} onChange={e => onChange(e.target.value)}>
        <option value="">-- Select --</option>
        {q.options.map((o, i) => <option key={i} value={o}>{o}</option>)}
      </select>
    );

  if (q.type === "radio")
    return (
      <div className="space-y-1">
        {q.options.map((o, i) => (
          <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" name={q.id} value={o} checked={value === o} onChange={() => onChange(o)} />
            {o}
          </label>
        ))}
      </div>
    );

  if (q.type === "checkbox")
    return (
      <div className="space-y-1">
        {q.options.map((o, i) => {
          const checked = Array.isArray(value) && value.includes(o);
          return (
            <label className="text-black flex items-center gap-2">
  <input
    type="checkbox"
    checked={checked}
    onChange={() => {
      const arr = Array.isArray(value) ? [...value] : [];
      onChange(checked ? arr.filter(x => x !== o) : [...arr, o]);
    }}
  />
  {o}
</label>
          );
        })}
      </div>
    );

  if (q.type === "rating")
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded border text-sm font-semibold transition-colors
              ${value === n ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:border-blue-400"}`}>
            {n}
          </button>
        ))}
      </div>
    );

  return (
    <input className={cls} type={q.type} placeholder={q.placeholder} value={value || ""} onChange={e => onChange(e.target.value)} />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD – all responses across all forms
// ═══════════════════════════════════════════════════════════════════════════════
function Dashboard({ navigate }) {
  const [responses, setResponses] = useState([]);
  const [forms, setForms] = useState({});        // ← add this
  const [filterSlug, setFilterSlug] = useState("all");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // Fetch both responses and forms together
    Promise.all([
      fetch("/api/forms/responses/all").then(r => r.json()),
      fetch("/api/forms").then(r => r.json()),
    ])
      .then(([responsesData, formsData]) => {
        setResponses(responsesData);
        // Build a map of formId → form
        const map = {};
        formsData.forEach(f => {
          map[f.id] = f;
        });
        setForms(map);
      })
      .catch(() => {
        setResponses([...store.getResponses()]);
        setForms(store.getForms());
      });
  }, []);
  const fetchResponses = () => {
    fetch("/api/forms/responses/all")
      .then(r => r.json())
      .then(data => setResponses(data))
      .catch(() => setResponses([...store.getResponses()]));
  };

  const refresh = () => fetchResponses();

  const slugs = [...new Set(responses.map(r => r.slug))];

  const filtered = filterSlug === "all" ? responses : responses.filter(r => r.slug === filterSlug);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Response Dashboard" extra={
        <div className="flex gap-2 items-center">
          <select className="text-sm border border-gray-200 rounded px-2 py-1 bg-white"
            value={filterSlug} onChange={e => setFilterSlug(e.target.value)}>
            <option value="all">All Forms</option>
            {slugs.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Btn onClick={refresh} color="gray" small>Refresh</Btn>
          <Btn onClick={() => navigate("admin")} color="gray">← Admin</Btn>
        </div>
      } />

      <div className="max-w-5xl mx-auto p-6">
        <p className="text-sm text-gray-500 mb-4">{filtered.length} response(s)</p>

        {filtered.length === 0 && <p className="text-gray-400 text-sm">No responses yet.</p>}

        <div className="space-y-3">
          {[...filtered].reverse().map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpanded(expanded === r.id ? null : r.id)}
              >
                <div>
                  <span className="font-medium text-gray-800 text-sm">{r.formTitle}</span>
                  <span className="ml-2 text-xs text-gray-400">/{r.slug}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{new Date(r.submittedAt).toLocaleString()}</span>
                  <span className="text-gray-400 text-xs">{expanded === r.id ? "▲" : "▼"}</span>
                </div>
              </div>

              {expanded === r.id && (
                <div className="border-t border-gray-100 px-4 py-3 space-y-2">
                    {Object.entries(r.data).map(([qid, val]) => {
                    const form = forms[r.formId];
                    const question = form?.questions?.find(q => q.id === qid);
                    const label = question?.label || qid; // fallback to id if not found
                    return (
                        <div key={qid} className="text-sm">
                        <span className="font-medium text-gray-600">{label}: </span>
                        <span className="text-gray-800">
                            {Array.isArray(val) ? val.join(", ") : String(val)}
                        </span>
                        </div>
                    );
                    })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  SHARED UI ATOMS
// ═══════════════════════════════════════════════════════════════════════════════
function Header({ title, extra }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <h1 className="font-semibold text-gray-800 text-sm">{title}</h1>
      {extra}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wide border-b border-gray-100 pb-2">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

function Btn({ onClick, color, children, small, disabled, className = "" }) {
  const colors = {
    blue:   "bg-blue-600 hover:bg-blue-700 text-white",
    gray:   "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
    red:    "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
    yellow: "bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded font-medium transition-colors ${small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${colors[color] || colors.gray} disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

function BtnIcon({ onClick, children, disabled, danger, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`w-6 h-6 rounded text-xs flex items-center justify-center transition-colors
        ${danger ? "hover:bg-red-100 text-red-400" : "hover:bg-gray-100 text-gray-400"}
        disabled:opacity-30`}
    >
      {children}
    </button>
  );
}

const input = () =>
  "w-full border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-white text-gray-700 placeholder:text-gray-500";