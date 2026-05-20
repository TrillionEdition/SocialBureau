import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Settings,
  Trash2,
  Edit3,
  ExternalLink,
  RefreshCw,
  X,
  Check,
  Mail,
  Lock,
  Hash,
  MessageSquare,
  List,
  AlertCircle,
  User
} from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/utils/urls';

axios.defaults.withCredentials = true;

const AdminClickupClients = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    clickupId: '',
    clickupListId: '',
    clickupChatViewId: '',
    clickupToken: '',
    role: 'client'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/user/team`);
      // Filter for users who have clickup fields or are 'client' role
      const clickupUsers = response.data.filter(u => u.clickupListId || u.role === 'client');
      setUsers(clickupUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't show password
        clickupId: user.clickupId || '',
        clickupListId: user.clickupListId || '',
        clickupChatViewId: user.clickupChatViewId || '',
        clickupToken: user.clickupToken || '',
        role: user.role || 'client'
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        clickupId: '',
        clickupListId: '',
        clickupChatViewId: '',
        clickupToken: '',
        role: 'client'
      });
    }
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    setSuccess('');

    try {
      if (selectedUser) {
        // Update
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        const response = await axios.put(`${BASE_URL}/user/${selectedUser._id || selectedUser.id}`, payload);
        setSuccess('Client updated successfully!');
      } else {
        // Create
        const response = await axios.post(`${BASE_URL}/user/register`, { ...formData, isEmployee: false });
        setSuccess('Client created successfully!');
      }
      fetchUsers();
      setTimeout(() => setIsModalOpen(false), 1500);
    } catch (err) {
      console.error("Operation failed:", err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this client? This action cannot be undone.")) return;

    try {
      await axios.delete(`${BASE_URL}/user/${userId}`);
      setSuccess('Client deleted successfully!');
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err.response?.data?.message || 'Failed to delete client');
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">ClickUp Client Management</h1>
            <p className="text-gray-500 font-medium">Provision and manage dedicated client strategy portals</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
          >
            <Plus size={20} /> Create New Client
          </button>
        </header>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
          <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Users size={20} />
              </div>
              <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Clients</span>
            </div>
            <span className="text-2xl font-bold">{users.length}</span>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Client Identity</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">ClickUp Config</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Access Role</th>
                  <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-8 py-6"><div className="h-10 w-48 bg-white/5 rounded-lg" /></td>
                      <td className="px-8 py-6"><div className="h-10 w-32 bg-white/5 rounded-lg" /></td>
                      <td className="px-8 py-6"><div className="h-6 w-20 bg-white/5 rounded-lg" /></td>
                      <td className="px-8 py-6"><div className="h-10 w-24 bg-white/5 rounded-lg ml-auto" /></td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-gray-600 italic">
                      No matching clients found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id || user.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                            {user.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-200">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400/80">
                            <List size={12} /> LIST: {user.clickupListId || 'NOT SET'}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400/80">
                            <MessageSquare size={12} /> CHAT: {user.clickupChatViewId || 'NOT SET'}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleOpenModal(user)}
                            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id || user.id)}
                            className="p-2.5 bg-red-500/5 border border-red-500/10 rounded-xl text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CREATE/EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#0a0a0c] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <header className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                      {selectedUser ? 'Edit Client Config' : 'Provision New Client'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Configure workspace parameters and credentials</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </header>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
                      <AlertCircle size={18} /> {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm flex items-center gap-3">
                      <Check size={18} /> {success}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Client Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Access Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                          placeholder="client@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">
                      {selectedUser ? 'Change Password (leave blank to keep current)' : 'Initial Password'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                      <input
                        type="text"
                        required={!selectedUser}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder={selectedUser ? "Enter new password to change" : "Strong initial password"}
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">ClickUp Integration Parameters</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">ClickUp List ID</label>
                        <div className="relative">
                          <List className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input
                            type="text"
                            value={formData.clickupListId}
                            onChange={(e) => setFormData({ ...formData, clickupListId: e.target.value })}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                            placeholder="901413612297"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Chat View ID</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                          <input
                            type="text"
                            value={formData.clickupChatViewId}
                            onChange={(e) => setFormData({ ...formData, clickupChatViewId: e.target.value })}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                            placeholder="8cn3v2y-28474"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Assignee ID (Required)</label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input
                          type="text"
                          required
                          value={formData.clickupId}
                          onChange={(e) => setFormData({ ...formData, clickupId: e.target.value })}
                          className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                          placeholder="88487129"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Personal Token (Optional Identity)</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                        <input
                          type="password"
                          value={formData.clickupToken}
                          onChange={(e) => setFormData({ ...formData, clickupToken: e.target.value })}
                          className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                          placeholder="pk_8848..."
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={formLoading}
                    className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {formLoading ? <RefreshCw className="animate-spin" size={20} /> : (selectedUser ? 'Save Configuration' : 'Provision Account')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminClickupClients;
