const fs = require('fs');
const path = 'c:/SocialBureau/SocialBureau/src/pages/AdminTeamDashboard/index.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Define image chunks
const addImageChunks = `
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                          Cover Image
                        </label>
                        <div className="relative h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                          {uploading.coverImage ? (
                            <Loader2 className="animate-spin text-brand-pink" size={24} />
                          ) : newMember.coverImage ? (
                            <>
                              <img src={newMember.coverImage} className="w-full h-full object-cover" alt="Cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button type="button" onClick={() => triggerUpload("coverImage")} className="p-3 bg-brand-pink rounded-full hover:scale-110 transition-transform"><Camera size={18} /></button>
                                <button type="button" onClick={() => setNewMember((prev) => ({...prev, coverImage: ""}))} className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition-colors"><X size={18} /></button>
                              </div>
                            </>
                          ) : (
                            <button type="button" onClick={() => triggerUpload("coverImage")} className="flex flex-col items-center gap-2 group/btn">
                              <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={24} />
                              <span className="text-[8px] font-black tracking-widest text-white/20">UPLOAD COVER IMAGE</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase ml-1">
                          ID Card Image
                        </label>
                        <div className="relative h-40 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group/card flex items-center justify-center">
                          {uploading.idCard ? (
                            <Loader2 className="animate-spin text-brand-pink" size={24} />
                          ) : newMember.idCard ? (
                            <>
                              <img src={newMember.idCard} className="w-full h-full object-cover" alt="ID Card" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button type="button" onClick={() => triggerUpload("idCard")} className="p-3 bg-brand-pink rounded-full hover:scale-110 transition-transform"><Camera size={18} /></button>
                                <button type="button" onClick={() => setNewMember((prev) => ({...prev, idCard: ""}))} className="p-3 bg-white/10 rounded-full hover:bg-red-500 transition-colors"><X size={18} /></button>
                              </div>
                            </>
                          ) : (
                            <button type="button" onClick={() => triggerUpload("idCard")} className="flex flex-col items-center gap-2 group/btn">
                              <Upload className="text-white/40 group-hover/btn:text-brand-pink" size={24} />
                              <span className="text-[8px] font-black tracking-widest text-white/20">UPLOAD ID CARD</span>
                            </button>
                          )}
                        </div>
                      </div>
`;

const editImageChunks = addImageChunks.replace(/newMember/g, 'editingMember').replace(/setNewMember/g, 'setEditingMember');

// Inject into Add Form
const addAnchor = 'UPLOAD DETAIL IMAGE\\n                              </span>\\n                            </button>\\n                          )}\\n                        </div>\\n                      </div>';
const addIdx = content.indexOf('UPLOAD DETAIL IMAGE');
if (addIdx !== -1) {
  const endDivIdx = content.indexOf('</div>', content.indexOf('</div>', content.indexOf('</div>', addIdx) + 6) + 6) + 6;
  content = content.slice(0, endDivIdx) + '\\n' + addImageChunks + content.slice(endDivIdx);
}

// Inject into Edit Form
const editIdx = content.indexOf('Upload Profile', addIdx + 100);
if (editIdx !== -1) {
  const endDivIdxEdit = content.indexOf('</div>', content.indexOf('</div>', content.indexOf('</div>', editIdx) + 6) + 6) + 6;
  content = content.slice(0, endDivIdxEdit) + '\\n' + editImageChunks + content.slice(endDivIdxEdit);
}

// 2. Define handler functions for Edit Modal
const editHandlers = `
  const handleEditToolFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      tools: [...(prev.tools || []), { toolName: "", url: "", icon: "", description: "" }]
    }));
  };

  const handleEditToolFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const tools = [...(prev.tools || [])];
      tools[index] = { ...tools[index], [field]: value };
      return { ...prev, tools };
    });
  };

  const handleEditToolFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      tools: (prev.tools || []).filter((_, i) => i !== index)
    }));
  };

  const handleEditClientFieldAdd = () => {
    setEditingMember((prev) => ({
      ...prev,
      clients: [...(prev.clients || []), { name: "", companyName: "", email: "", website: "", logo: "", status: "active", notes: "" }]
    }));
  };

  const handleEditClientFieldChange = (index, field, value) => {
    setEditingMember((prev) => {
      const clients = [...(prev.clients || [])];
      clients[index] = { ...clients[index], [field]: value };
      return { ...prev, clients };
    });
  };

  const handleEditClientFieldRemove = (index) => {
    setEditingMember((prev) => ({
      ...prev,
      clients: (prev.clients || []).filter((_, i) => i !== index)
    }));
  };
`;

const handlerAnchor = 'const handleRemoveClientField = (index) => {';
const handlerEndIdx = content.indexOf('};', content.indexOf(handlerAnchor)) + 2;
content = content.slice(0, handlerEndIdx) + '\\n' + editHandlers + content.slice(handlerEndIdx);

// 3. Extract Tools and Clients section from Add Form
const toolsStart = content.indexOf('{/* Tools Section */}');
const clientsEnd = content.indexOf('</section>', content.indexOf('{/* Clients Section */}')) + 10;
let editToolsClients = content.substring(toolsStart, clientsEnd);

editToolsClients = editToolsClients
        .replace(/newMember/g, 'editingMember')
        .replace(/handleAddToolField/g, 'handleEditToolFieldAdd')
        .replace(/handleToolFieldChange/g, 'handleEditToolFieldChange')
        .replace(/handleRemoveToolField/g, 'handleEditToolFieldRemove')
        .replace(/handleAddClientField/g, 'handleEditClientFieldAdd')
        .replace(/handleClientFieldChange/g, 'handleEditClientFieldChange')
        .replace(/handleRemoveClientField/g, 'handleEditClientFieldRemove');

// Inject into Edit Form right after DEPARTMENT section
const editDeptStart = content.indexOf('DEPARTMENT', clientsEnd);
const editDeptEnd = content.indexOf('</section>', editDeptStart) + 10;
content = content.slice(0, editDeptEnd) + '\\n\\n' + editToolsClients + content.slice(editDeptEnd);

fs.writeFileSync(path, content, 'utf8');
console.log("Done updating AdminTeamDashboard");
