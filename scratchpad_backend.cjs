const fs = require('fs');
const path = 'c:/SocialBureau/SocialBureau-backend/routes/teamRoutes.js';
let content = fs.readFileSync(path, 'utf8');

// 1. Update GET /admin/members to populate everything
const populateRegex = /\.populate\("user", "email name role isEmployee"\)/g;
content = content.replace(populateRegex, 
  `.populate({
      path: "user",
      select: "email name role isEmployee emp_id clickupId phone doj rate tools clients coverImage idCard",
      populate: [
        { path: 'tools', select: 'toolName icon url description' },
        { path: 'clients', select: 'name companyName email website logo status notes' }
      ]
    })`
);

// 2. Rewrite PUT /admin/member/:id route completely
const putRouteStart = content.indexOf('router.put("/admin/member/:id",');
const putRouteEnd = content.indexOf('});', putRouteStart) + 3;

const newPutRoute = `router.put("/admin/member/:id", userAuthentication, require("../middlewares/isAdmin"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const TeamMember = require("../models/teamMemberModel");
    const User = require("../models/userModel");
    const Tool = require("../models/Tool");
    const Client = require("../models/Client");
    const bcrypt = require("bcrypt");

    const profile = await TeamMember.findById(id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    const {
      email, password, emp_id, phone, doj, rate, clickupId, isEmployee, tools, clients, coverImage, idCard,
      ...teamMemberData
    } = updateData;

    if (profile.user) {
      const userUpdate = {};
      if (email !== undefined) userUpdate.email = email;
      if (password && password.trim() !== '') {
        userUpdate.password = await bcrypt.hash(password, 10);
      }
      if (emp_id !== undefined) userUpdate.emp_id = emp_id;
      if (phone !== undefined) userUpdate.phone = phone;
      if (doj !== undefined) userUpdate.doj = doj ? new Date(doj) : null;
      if (rate !== undefined) userUpdate.rate = rate;
      if (clickupId !== undefined) userUpdate.clickupId = clickupId;
      if (isEmployee !== undefined) userUpdate.isEmployee = isEmployee;
      if (coverImage !== undefined) userUpdate.coverImage = coverImage;
      if (idCard !== undefined) userUpdate.idCard = idCard;

      if (tools !== undefined) {
        let toolIds = [];
        let parsedTools = tools;
        if (typeof tools === 'string') {
          try { parsedTools = JSON.parse(tools); } catch (e) { parsedTools = []; }
        }
        if (parsedTools && Array.isArray(parsedTools)) {
          for (const tool of parsedTools) {
            const { toolName, url, icon, description } = tool || {};
            if (!toolName) continue;
            const updatedTool = await Tool.findOneAndUpdate(
              { toolName },
              { $set: { url: url || "", icon: icon || "", description: description || "" } },
              { new: true, upsert: true }
            );
            toolIds.push(updatedTool._id);
          }
        }
        userUpdate.tools = [...new Set(toolIds.map(id => id.toString()))];
      }

      if (clients !== undefined) {
        let clientIds = [];
        let parsedClients = clients;
        if (typeof clients === 'string') {
          try { parsedClients = JSON.parse(clients); } catch (e) { parsedClients = []; }
        }
        if (parsedClients && Array.isArray(parsedClients)) {
          for (const clientData of parsedClients) {
            const { name: cName, companyName, email: cEmail, phone: cPhone, website, logo, status, notes } = clientData || {};
            if (!cName) continue;
            const idQuery = {
              $or: [
                cEmail ? { email: cEmail } : null,
                website ? { website } : null,
                { name: cName }
              ].filter(Boolean)
            };
            const client = await Client.findOneAndUpdate(
              idQuery,
              { $set: { name: cName, companyName: companyName || "", email: cEmail || "", phone: cPhone || "", website: website || "", logo: logo || "", notes: notes || "", status: status || "active" } },
              { new: true, upsert: true }
            );
            clientIds.push(client._id);
          }
        }
        userUpdate.clients = [...new Set(clientIds.map(id => id.toString()))];
      }

      await User.findByIdAndUpdate(profile.user, { $set: userUpdate }, { new: true, runValidators: true });
    }

    const updatedProfile = await TeamMember.findByIdAndUpdate(
      id,
      teamMemberData,
      { new: true, runValidators: true }
    ).populate({
      path: "user",
      select: "email name role isEmployee emp_id clickupId phone doj rate tools clients coverImage idCard",
      populate: [
        { path: 'tools', select: 'toolName icon url description' },
        { path: 'clients', select: 'name companyName email website logo status notes' }
      ]
    });

    res.status(200).json({
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});`;

content = content.slice(0, putRouteStart) + newPutRoute + content.slice(putRouteEnd);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated teamRoutes.js");
