const fs = require('fs');
const path = 'c:/SocialBureau/SocialBureau/src/pages/AdminTeamDashboard/index.jsx';
let content = fs.readFileSync(path, 'utf8');

// Extract the AUTHENTICATION & HR DETAILS section from Add Form
const authSectionStart = content.indexOf('{/* Authentication & HR Details */}');
const authSectionEnd = content.indexOf('</section>', authSectionStart) + 10;
let authSection = content.substring(authSectionStart, authSectionEnd);

// Replace state variables and handlers
authSection = authSection
    .replace(/newMember\.clickupId/g, 'editingMember.clickupId || ""')
    .replace(/newMember\.emp_id/g, 'editingMember.emp_id || ""')
    .replace(/newMember\.email/g, 'editingMember.email || ""')
    .replace(/newMember\.password/g, 'editingMember.password || ""')
    .replace(/newMember\.phone/g, 'editingMember.phone || ""')
    .replace(/newMember\.doj/g, 'editingMember.doj || ""')
    .replace(/newMember\.rate/g, 'editingMember.rate || ""')
    .replace(/newMember\.isEmployee/g, 'editingMember.isEmployee')
    .replace(/handleNewMemberChange/g, 'handleInputChange')
    .replace(/setNewMember/g, 'setEditingMember');

// Also remove required from password in edit mode so it's not forced to be changed
authSection = authSection.replace(/name="password"\n\s+required/g, 'name="password"');

// Inject into Edit Modal
const editLeftColumnStart = content.indexOf('{/* Left Column */}', content.indexOf('Edit Member Profile'));
// Find the first section after Left Column
const insertPoint = content.indexOf('<section', editLeftColumnStart);

content = content.slice(0, insertPoint) + authSection + '\n\n                      ' + content.slice(insertPoint);

fs.writeFileSync(path, content, 'utf8');
console.log("Injected Authentication & HR Details into Edit Modal");
