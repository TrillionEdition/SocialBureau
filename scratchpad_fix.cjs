const fs = require('fs');
const path = 'c:/SocialBureau/SocialBureau/src/pages/AdminTeamDashboard/index.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.split('\\n\\n').join('\n\n');
content = content.split('\\n').join('\n');

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed literal newlines");
