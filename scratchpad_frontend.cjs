const fs = require('fs');
const path = 'c:/SocialBureau/SocialBureau/src/pages/AdminTeamDashboard/index.jsx';
let content = fs.readFileSync(path, 'utf8');

// Find the setEditingMember call in the roster map
const setEditingStart = content.indexOf('setEditingMember({', content.indexOf('activeView === "roster"'));
const setEditingEnd = content.indexOf('})', setEditingStart) + 2;

const newSetEditing = `setEditingMember({
                          ...member,
                          email: member.user?.email || "",
                          emp_id: member.user?.emp_id || "",
                          phone: member.user?.phone || "",
                          clickupId: member.user?.clickupId || "",
                          rate: member.user?.rate || "",
                          doj: member.user?.doj ? member.user.doj.split('T')[0] : "",
                          isEmployee: member.user?.isEmployee || false,
                          coverImage: member.user?.coverImage || "",
                          idCard: member.user?.idCard || "",
                          tools: member.user?.tools || [],
                          clients: member.user?.clients || [],
                          tags: member.tags || [],
                          category: member.category || [],
                          socials: member.socials || {
                            linkedin: "",
                            instagram: "",
                            twitter: "",
                          },
                        })`;

content = content.slice(0, setEditingStart) + newSetEditing + content.slice(setEditingEnd);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated frontend setEditingMember");
