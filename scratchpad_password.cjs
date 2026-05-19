const fs = require('fs');
const path = 'c:/SocialBureau/SocialBureau/src/pages/AdminTeamDashboard/index.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Eye and EyeOff to imports
if (!content.includes('Eye,')) {
    content = content.replace(/Cpu,\n} from "lucide-react";/, 'Cpu,\n  Eye,\n  EyeOff,\n} from "lucide-react";');
}

// 2. Add state variables
if (!content.includes('showAddPassword')) {
    const stateAnchor = 'const [tagInput, setTagInput] = useState("");';
    content = content.replace(stateAnchor, stateAnchor + '\n  const [showAddPassword, setShowAddPassword] = useState(false);\n  const [showEditPassword, setShowEditPassword] = useState(false);');
}

// 3. Update Add Form Password Input
const addPasswordInputRegex = /(<label className="text-\[10px\] font-bold tracking-\[0\.2em\] text-white\/40 uppercase ml-1">\s*Password \(min 5 chars\)[^*]*\*\s*<\/label>\s*)(<input[\s\S]*?name="password"[\s\S]*?placeholder="••••••••"\s*\/>)/;

content = content.replace(addPasswordInputRegex, (match, label, input) => {
    let modifiedInput = input.replace(/type="password"/, 'type={showAddPassword ? "text" : "password"}');
    return `${label}
                      <div className="relative">
                        ${modifiedInput}
                        <button
                          type="button"
                          onClick={() => setShowAddPassword(!showAddPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                          {showAddPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>`;
});

// 4. Update Edit Modal Password Input
// Wait, the Edit Modal password input might not have the placeholder "••••••••" if it was copied. 
// Let's use a more robust regex for the Edit Modal.
const editPasswordInputRegex = /(<label className="text-\[10px\] font-bold tracking-\[0\.2em\] text-white\/40 uppercase ml-1">\s*Password \(min 5 chars\)[^*]*\*\s*<\/label>\s*)(<input[^>]*name="password"[^>]*\/>)/g;

let count = 0;
content = content.replace(editPasswordInputRegex, (match, label, input) => {
    count++;
    // First match is Add form (if the placeholder matched or if it missed it above), second is Edit form.
    // Actually the above replace might have already replaced the Add form. 
    // We can just use the state variable based on whether it's editingMember or newMember.
    
    const isEditing = input.includes('editingMember');
    const stateVar = isEditing ? 'showEditPassword' : 'showAddPassword';
    const setter = isEditing ? 'setShowEditPassword' : 'setShowAddPassword';
    
    let modifiedInput = input.replace(/type="password"/, `type={${stateVar} ? "text" : "password"}`);
    
    // Ensure we don't nest it multiple times if run twice
    if (input.includes('type={')) return match;
    
    return `${label}
                      <div className="relative">
                        ${modifiedInput}
                        <button
                          type="button"
                          onClick={() => ${setter}(!${stateVar})}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                          {${stateVar} ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>`;
});

fs.writeFileSync(path, content, 'utf8');
console.log("Updated password fields with eye toggle");
