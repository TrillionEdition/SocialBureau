import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Activity, 
  Download, 
  Plus, 
  Search, 
  Bell, 
  User, 
  Clock, 
  Calendar,
  ChevronRight,
  Send,
  MoreVertical,
  ExternalLink,
  RefreshCw,
  X,
  Paperclip
} from 'lucide-react';
import { getClickUpTasks, getTaskActivity, getClickUpChat, postClickUpChat, getClickUpTask, uploadClickUpAttachment } from '@/services/clickupServices';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';




// --- MOCK DATA ---
const MOCK_REPORTS = [
  { id: 1, title: 'Q2 Content Strategy', date: '2026-05-01', type: 'PDF', size: '2.4 MB', version: 'v2.1' },
  { id: 2, title: 'Social Media Growth Plan', date: '2026-04-15', type: 'PDF', size: '1.8 MB', version: 'v1.0' },
  { id: 3, title: 'SEO Audit & Keyword Research', date: '2026-04-02', type: 'PDF', size: '4.2 MB', version: 'v1.2' },
  { id: 4, title: 'Brand Identity Guidelines', date: '2026-03-20', type: 'PDF', size: '8.5 MB', version: 'v3.0' },
];

const MOCK_TASKS = [
  { id: 'cu-1', title: 'Optimize Landing Page Hero Section', status: 'In Progress', deadline: '2026-05-10', priority: 'High', assignee: 'Alex R.' },
  { id: 'cu-2', title: 'Weekly Analytics Report Generation', status: 'To Do', deadline: '2026-05-12', priority: 'Medium', assignee: 'Sarah M.' },
  { id: 'cu-3', title: 'Email Newsletter Design', status: 'Review', deadline: '2026-05-08', priority: 'High', assignee: 'Alex R.' },
  { id: 'cu-4', title: 'Competitor Backlink Analysis', status: 'Completed', deadline: '2026-05-01', priority: 'Low', assignee: 'John D.' },
];


const MOCK_ACTIVITY = [
  { id: 1, user: 'Alex R.', action: 'uploaded a new report', target: 'Q2 Content Strategy', time: '2 hours ago' },
  { id: 2, user: 'Sarah M.', action: 'completed task', target: 'Competitor Backlink Analysis', time: '5 hours ago' },
  { id: 3, user: 'System', action: 'synced tasks from', target: 'ClickUp', time: '1 day ago' },
  { id: 4, user: 'John D.', action: 'added a comment to', target: 'Landing Page Hero', time: '1 day ago' },
];

// --- STYLES (Glassmorphism & Premium feel) ---
const styles = {
  container: "flex h-screen w-full bg-[#0a0a0c] text-white overflow-hidden font-sans",
  sidebar: "w-72 bg-[#111114] border-r border-white/5 flex flex-col p-6 gap-8",
  main: "flex-1 flex flex-col overflow-hidden relative",
  navItem: "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300",
  navItemActive: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20",
  navItemInactive: "text-gray-400 hover:bg-white/5 hover:text-white",
  card: "bg-[#16161a] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-500",
  badge: "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
  input: "bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-all",
  buttonPrimary: "bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95",
  glassOverlay: "absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none",
};

const CDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskActivity, setTaskActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [modalTab, setModalTab] = useState('Overview');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const CHAT_VIEW_ID = "8cn3v2y-28474"; // Extracted from your ClickUp chat URL
  const [stats, setStats] = useState({
    milestones: [
      { name: 'Phase 1: Discovery', progress: 0 },
      { name: 'Phase 2: Strategy Design', progress: 0 },
      { name: 'Phase 3: Implementation', progress: 0 }
    ],
    velocity: 0,
    overallProgress: 0,
    activeTasks: 0,
    statusBreakdown: {}
  });



  useEffect(() => {
    if (selectedTask) {
      fetchActivity(selectedTask.id);
      setModalTab('Overview');
    }
  }, [selectedTask]);


  const fetchActivity = async (taskId) => {
    try {
      setLoadingActivity(true);
      const response = await getTaskActivity(taskId);
      if (response.success) {
        setTaskActivity(response);
      }
    } catch (error) {
      console.error("Failed to fetch task activity:", error);
    } finally {
      setLoadingActivity(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMessages();
  }, []);

  useEffect(() => {
    if (activeTab === 'Channels') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await getClickUpChat(CHAT_VIEW_ID);
      if (response.success) {
        // Map ClickUp comments to our message format
        const mappedMessages = response.comments.map(comment => ({
          id: comment.id,
          sender: comment.user?.username || 'Unknown',
          content: (comment.comment_text || '').trim(),
          attachments: comment.attachments || [],
          time: new Date(parseInt(comment.date)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: ['Alex R.', 'You', 'Web Asst'].includes(comment.user?.username) || comment.user?.id === 88487129
        }));
        console.log("Mapped messages:", mappedMessages);
        setMessages(mappedMessages);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleOpenTask = async (taskId) => {
    try {
      setLoadingActivity(true);
      const response = await getClickUpTask(taskId);
      if (response.success) {
        setSelectedTask(response.task);
        // Also fetch activity for this task
        const activityResponse = await getTaskActivity(taskId);
        if (activityResponse.success) {
          setTaskActivity(activityResponse.activity);
        }
      }
    } catch (error) {
      console.error("Failed to open task from chat:", error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      console.log("📤 Starting file upload:", file.name);
      setLoadingMessages(true);
      const response = await uploadClickUpAttachment(CHAT_VIEW_ID, file);
      console.log("✅ Upload response:", response);
      if (response.success) {
        fetchMessages();
      }
    } catch (error) {
      console.error("❌ Failed to upload file:", error.response?.data || error.message);
      alert("Failed to send file. Please ensure the backend is running and supports uploads.");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await postClickUpChat(CHAT_VIEW_ID, newMessage);
      if (response.success) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };


  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const response = await getClickUpTasks();
      if (response.success) {
        setTasks(response.tasks);
        if (response.stats) {
          setStats(response.stats);
        }
      }

    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoadingTasks(false);
    }
  };


  const tabs = [
    { id: 'Overview', icon: LayoutDashboard },
    { id: 'Reports', icon: FileText },
    { id: 'Tasks', icon: CheckSquare },
    { id: 'Channels', icon: MessageSquare },
    { id: 'Activity', icon: Activity },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.glassOverlay} />
      
      {/* --- SIDEBAR --- */}
      <aside className={styles.sidebar}>
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-xl">
            S
          </div>
          <span className="text-xl font-bold tracking-tight">SocialBureau</span>
        </div>

        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.navItemActive : styles.navItemInactive}`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.id}</span>
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <User size={20} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Premium Client</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Enterprise Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className={styles.main}>
        {/* TOP BAR */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0c]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-2 text-gray-400">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search everything..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 w-64"
              />
            </div>
            <button 
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0c]" />
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'Overview' && <OverviewTab setActiveTab={setActiveTab} tasks={tasks} loadingTasks={loadingTasks} stats={stats} messages={messages} />}
              {activeTab === 'Reports' && <ReportsTab />}
              {activeTab === 'Tasks' && <TasksTab tasks={tasks} loadingTasks={loadingTasks} onRefresh={fetchTasks} onSelectTask={setSelectedTask} stats={stats} />}

              {activeTab === 'Channels' && (
                <ChannelsTab 
                  messages={messages} 
                  loading={loadingMessages} 
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  onSendMessage={handleSendMessage}
                  onRefresh={fetchMessages}
                  onOpenTask={handleOpenTask}
                  onFileUpload={handleFileUpload}
                />
              )}
              {activeTab === 'Activity' && <ActivityTab />}

            </motion.div>

          </AnimatePresence>
        </div>

        {/* TASK DETAILS MODAL */}
        <AnimatePresence>
          {selectedTask && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTask(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl bg-[#16161a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="p-8 border-b border-white/5 flex justify-between items-start text-white">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{ backgroundColor: `${selectedTask.statusColor}20`, color: selectedTask.statusColor }}
                      >
                        {selectedTask.status}
                      </span>
                      <span className="text-gray-500 text-xs">{selectedTask.id}</span>
                    </div>
                    <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedTask(null)}
                    className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="p-8 space-y-8 text-white">
                  {/* MODAL TABS */}
                  <div className="flex gap-6 border-b border-white/5 pb-4">
                    {['Overview', 'Activity'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setModalTab(t)}
                        className={`text-sm font-bold tracking-wider uppercase pb-2 transition-all relative ${
                          modalTab === t ? 'text-indigo-400' : 'text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {t}
                        {modalTab === t && (
                          <motion.div layoutId="modalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                        )}
                      </button>
                    ))}
                  </div>

                  {modalTab === 'Overview' && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Total Time Spent</p>
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                              <Clock size={24} />
                            </div>
                            <span className="text-3xl font-bold">{selectedTask.timeSpent}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Team Assigned</p>
                          <div className="flex -space-x-2">
                            {selectedTask.assignees.map((a, i) => (
                              <div 
                                key={i} 
                                className="w-10 h-10 rounded-full border-2 border-[#16161a] flex items-center justify-center text-xs font-bold shadow-lg"
                                style={{ backgroundColor: a.color }}
                                title={a.name}
                              >
                                {a.initials}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Work Completed / Description</p>
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-gray-300 text-sm leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                          {selectedTask.description ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedTask.description.replace(/\n/g, '<br />') }} />
                          ) : (
                            "No detailed breakdown provided for this task yet."
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {modalTab === 'Activity' && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      {loadingActivity ? (
                        <div className="flex flex-col items-center py-12 gap-4">
                          <RefreshCw size={24} className="animate-spin text-indigo-500" />
                          <p className="text-gray-500 text-sm font-medium tracking-wide">Syncing project feed...</p>
                        </div>
                      ) : (
                        <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                          {/* COMBINED FEED */}
                          
                          {/* FILES GALLERY - HIGHER CLARITY */}
                          {taskActivity?.attachments.length > 0 && (
                            <div className="space-y-4">
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Deliverables & Files</p>
                              <div className="grid grid-cols-1 gap-4">
                                {taskActivity.attachments.map((file) => (
                                  <a 
                                    key={file.id} 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all"
                                  >
                                    <div className="aspect-video relative overflow-hidden bg-black/40">
                                      {file.thumbnail_large || file.thumbnail_small ? (
                                        <img 
                                          src={file.thumbnail_large || file.thumbnail_small} 
                                          alt={file.title} 
                                          className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700" 
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-indigo-400/30">
                                          <FileText size={64} />
                                        </div>
                                      )}
                                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink size={18} />
                                      </div>
                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                      <div>
                                        <p className="text-sm font-bold">{file.title}</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Uploaded to ClickUp</p>
                                      </div>
                                      <button className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold">
                                        View Full Size
                                      </button>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* TIME LOGS & COMMENTS MIXED */}
                          <div className="space-y-6">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Activity Timeline</p>
                            
                            {[
                              ...(taskActivity?.timeEntries.map(e => ({ ...e, type: 'time', dateObj: new Date(e.start) })) || []),
                              ...(taskActivity?.comments.map(c => ({ ...c, type: 'comment', dateObj: new Date(c.date) })) || [])
                            ].sort((a, b) => b.dateObj - a.dateObj).map((item, idx) => (
                              <div key={idx} className="relative pl-8 border-l border-white/5 pb-6 last:pb-0">
                                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                
                                {item.type === 'time' ? (
                                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-xs font-bold text-emerald-400">Time Logged</span>
                                      <span className="text-[10px] text-gray-500">{item.start}</span>
                                    </div>
                                    <p className="text-sm">
                                      <span className="font-bold">{item.user}</span> worked for <span className="text-indigo-400 font-bold">{item.duration}</span>
                                    </p>
                                  </div>
                                ) : (
                                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-xs font-bold text-indigo-400">Comment / Update</span>
                                      <span className="text-[10px] text-gray-500">{item.date}</span>
                                    </div>
                                    <p className="text-sm font-bold mb-1">{item.user}</p>
                                    <p className="text-sm text-gray-400 leading-relaxed italic">"{item.text}"</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          {!taskActivity?.attachments.length && !taskActivity?.timeEntries.length && !taskActivity?.comments.length && (
                            <div className="text-center py-20 text-gray-500">
                              No activity records found for this task.
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
                      Request Status Update
                    </button>
                    <button 
                      onClick={() => window.open(`https://app.clickup.com/t/${selectedTask.id}`, '_blank')}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
                    >
                      View full ClickUp thread
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
};

// --- SUB-COMPONENTS (TABS) ---

const OverviewTab = ({ setActiveTab, tasks, loadingTasks, stats, messages }) => (

  <div className="flex flex-col gap-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Client</h1>
        <p className="text-gray-400">Here's what's happening with your project today.</p>
      </div>
      <button className={styles.buttonPrimary} onClick={() => setActiveTab('Reports')}>
        <Plus size={18} className="inline mr-2" /> New Strategy Request
      </button>
    </div>

    {/* STATS ROW */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Active Tasks', value: loadingTasks ? '...' : (stats.activeTasks || 0), icon: CheckSquare, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Pending Reports', value: '03', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Unread Messages', value: '05', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-400/10' },
        { label: 'Project Progress', value: loadingTasks ? '...' : `${stats.velocity}%`, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
      ].map((stat, i) => (


        <div key={i} className={styles.card}>
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <MoreVertical size={18} className="text-gray-600" />
          </div>
          <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
          <h3 className="text-2xl font-bold">{stat.value}</h3>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* RECENT ACTIVITY PREVIEW */}
      <div className={styles.card}>
        <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
          Recent Activity
          <span className="text-sm font-normal text-indigo-400 cursor-pointer hover:underline" onClick={() => setActiveTab('Activity')}>View all</span>
        </h3>
        <div className="space-y-6">
          {MOCK_ACTIVITY.slice(0, 3).map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500" />
              <div>
                <p className="text-sm text-gray-300">
                  <span className="font-bold text-white">{item.user}</span> {item.action} <span className="text-indigo-400 font-medium">"{item.target}"</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK CHAT PREVIEW */}
      <div className={styles.card}>
        <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
          Recent Messages
          <span className="text-sm font-normal text-indigo-400 cursor-pointer hover:underline" onClick={() => setActiveTab('Channels')}>Open channel</span>
        </h3>
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.slice(-2).map((msg) => (
              <div key={msg.id} className={`p-4 rounded-xl ${msg.isMe ? 'bg-indigo-600/10 border border-indigo-500/20 ml-8' : 'bg-white/5 border border-white/5 mr-8'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-indigo-400">{msg.sender}</span>
                  <span className="text-[10px] text-gray-500">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2">{msg.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-600 text-sm italic">
              No recent activity in channels.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

const ReportsTab = () => (
  <div className="flex flex-col gap-8">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Strategy Reports</h1>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
          Request Revision
        </button>
        <button className={styles.buttonPrimary}>
          Upload Asset
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {MOCK_REPORTS.map((report) => (
        <div key={report.id} className={styles.card + " group"}>
          <div className="mb-6 flex justify-between items-start">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-red-400">
              <FileText size={24} />
            </div>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full font-bold">{report.version}</span>
          </div>
          <h3 className="font-bold mb-2 group-hover:text-indigo-400 transition-colors">{report.title}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-2 mb-6">
            <Calendar size={12} /> {report.date} • {report.size}
          </p>
          <button className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
            <Download size={16} /> Download {report.type}
          </button>
        </div>
      ))}
    </div>

    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6">Archived & Record Keeping</h3>
      <div className="bg-white/5 rounded-2xl p-8 border border-dashed border-white/10 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
          <Clock size={24} />
        </div>
        <p className="text-gray-400 max-w-xs mx-auto">All historical versions of your reports are stored here for easy record keeping.</p>
      </div>
    </div>
  </div>
);

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  
  // Pull the slice out slightly for the "explosion" effect
  const sx = cx + (outerRadius * 0.1) * cos;
  const sy = cy + (outerRadius * 0.1) * sin;

  return (
    <g>
      <Sector
        cx={sx}
        cy={sy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0px 0px 10px ${fill}80)` }}
      />
    </g>
  );
};

const TasksTab = ({ tasks, loadingTasks, onRefresh, onSelectTask, stats }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">


      <h1 className="text-3xl font-bold">Project Tasks <span className="text-sm font-normal text-gray-500 ml-2">Synced with ClickUp</span></h1>
      <div className="flex gap-4">
        <button 
          onClick={onRefresh}
          disabled={loadingTasks}
          className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw size={20} className={loadingTasks ? 'animate-spin' : ''} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/20 text-[#7B68EE] border border-[#7B68EE]/30 rounded-xl text-sm font-bold hover:bg-[#7B68EE]/30 transition-all">
          <ExternalLink size={16} /> View in ClickUp
        </button>
      </div>
    </div>

    <div className="bg-[#111114] border border-white/5 rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 bg-white/5">
            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest pl-8">Task Name</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Assignee</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Priority</th>
            <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest pr-8 text-right">Deadline</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {loadingTasks ? (
            <tr>
              <td colSpan="5" className="p-20 text-center">
                <div className="flex flex-col items-center gap-4">
                  <RefreshCw size={32} className="animate-spin text-indigo-500" />
                  <p className="text-gray-500 font-medium">Fetching real-time tasks from ClickUp...</p>
                </div>
              </td>
            </tr>
          ) : tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-20 text-center text-gray-500">
                No tasks found in the connected ClickUp list.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr 
                key={task.id} 
                onClick={() => onSelectTask(task)}
                className="hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <td className="p-4 pl-8">

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.statusColor }} />
                    <span className="font-medium group-hover:text-indigo-400 transition-colors">{task.title}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {task.assignees.length > 0 ? (
                      task.assignees.map((assignee, idx) => (
                        <div 
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-[#111114] flex items-center justify-center text-[10px] font-bold"
                          style={{ backgroundColor: assignee.color || '#6366f1' }}
                          title={assignee.name}
                        >
                          {assignee.initials}
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-600">Unassigned</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span 
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter"
                    style={{ backgroundColor: `${task.statusColor}20`, color: task.statusColor }}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-4">
                  <span 
                    className="text-xs font-medium capitalize"
                    style={{ color: task.priorityColor }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="p-4 pr-8 text-right text-sm text-gray-500">
                  {task.deadline}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    {/* LIVE PROGRESS SECTION */}
    <div className="mt-4">
      <div className={styles.card}>
        <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
          Task Status Distribution
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-md">100% Progress Graph</span>
        </h3>
        
        {(() => {
          const rawBreakdown = stats.statusBreakdown || {};
          // Filter out empty statuses so they don't clutter the graph or legend
          const breakdown = Object.fromEntries(Object.entries(rawBreakdown).filter(([_, data]) => data.count > 0));
          const total = Object.values(breakdown).reduce((sum, s) => sum + s.count, 0) || 1;

          
          return (
            <div className="space-y-8">
              {/* RECHARTS PIE GRAPH */}
              <div className="flex flex-col items-center justify-center h-80 w-full relative pt-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={Object.entries(breakdown).map(([key, data]) => {
                        const truePercent = total > 0 ? (data.count / total) * 100 : 0;
                        return {
                          name: data.name,
                          value: data.count,
                          actualCount: data.count,
                          truePercent: truePercent,
                          color: data.color
                        };
                      })}

                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      label={({ name, truePercent }) => `${name.toUpperCase()} ${truePercent.toFixed(2)}%`}
                      labelLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
                    >
                      {Object.entries(breakdown).map(([key, data], index) => (
                        <Cell key={`cell-${index}`} fill={data.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#16161a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      formatter={(value, name, props) => [`${props.payload.actualCount} tasks`, name.toUpperCase()]}
                    />

                  </PieChart>
                </ResponsiveContainer>
              </div>


              {/* DETAILED LEGEND GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {Object.entries(breakdown).map(([key, data]) => {
                  const perc = (data.count / total) * 100;
                  return (
                    <motion.div 
                      key={key} 
                      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col gap-3 bg-white/5 border border-white/5 p-5 rounded-2xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3.5 h-3.5 rounded-full shadow-lg" 
                          style={{ backgroundColor: data.color, boxShadow: `0 0 12px ${data.color}80` }} 
                        />
                        <p className="text-xs text-gray-400 uppercase tracking-widest truncate font-medium">{data.name}</p>
                      </div>
                      <div className="flex items-end justify-between mt-2">
                        <p className="text-3xl font-bold text-white">{data.count}</p>
                        <div className="text-right">
                          <p className="text-sm font-bold" style={{ color: data.color }}>
                            {Math.round(perc)}%
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  </div>
  );
};

const ChannelsTab = ({ messages, loading, newMessage, setNewMessage, onSendMessage, onRefresh, onOpenTask, onFileUpload }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Channel Section</h1>
          <p className="text-gray-400 mt-2">Direct communication channel synced with your ClickUp team.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => window.open('https://app.clickup.com/9014733918/chat/r/8cn3v2y-28474', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-[#7B68EE]/20 text-[#7B68EE] border border-[#7B68EE]/30 rounded-xl text-sm font-bold hover:bg-[#7B68EE]/30 transition-all"
          >
            <ExternalLink size={16} /> Open in ClickUp
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#111114] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
        {/* Messages List Area */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-6">
          {loading && messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4">
              <RefreshCw size={32} className="animate-spin text-indigo-500" />
              <p className="text-gray-500 font-medium">Loading channel data...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p>No messages found in this channel yet.</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-md">Live Channel Feed</span>
              </div>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-baseline gap-2 mb-1 px-1">
                    <span className={`text-xs font-bold ${msg.isMe ? 'text-indigo-400' : 'text-gray-400'}`}>{msg.sender}</span>
                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                  </div>
                  <div className={`p-4 max-w-[80%] rounded-2xl shadow-sm ${msg.isMe ? 'bg-indigo-600 text-white rounded-br-sm shadow-indigo-900/20' : 'bg-[#16161a] text-gray-200 border border-white/5 rounded-bl-sm'}`}>
                    {msg.content && <p className="text-sm leading-relaxed mb-2">{msg.content}</p>}
                    
                    {/* ATTACHMENTS RENDERING (WhatsApp Style) */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2">
                        {msg.attachments.map((file) => {
                          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(file.extension?.toLowerCase());
                          const rawUrl = file.thumbnail_large || file.thumbnail_small || file.url;
                          const proxiedUrl = `${BASE_URL}/clickup/image-proxy?url=${encodeURIComponent(rawUrl)}`;
                          
                          return (
                            <div key={file.id} className="relative rounded-lg overflow-hidden bg-black/20 group">
                              {isImage ? (
                                <div className="relative">
                                  <img 
                                    src={proxiedUrl} 
                                    alt={file.title} 
                                    className="max-h-[300px] w-full object-cover rounded-lg cursor-pointer transition-transform hover:scale-[1.01]"
                                    onClick={() => window.open(file.url, '_blank')}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                    <span className="text-[10px] text-white/80 truncate flex-1">{file.title}</span>
                                    <Download size={14} className="text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); window.open(file.url, '_blank'); }} />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer" onClick={() => window.open(file.url, '_blank')}>
                                  <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                    <FileText size={20} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate text-white">{file.title}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{(file.extension || 'file').toUpperCase()}</p>
                                  </div>
                                  <Download size={16} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/5 flex items-center gap-4 backdrop-blur-sm">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={loading}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Type your message..." 
            className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-white placeholder-gray-500"
          />
          <button 
            onClick={onSendMessage}
            disabled={!newMessage.trim() || loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityTab = () => (
  <div className="flex flex-col gap-8">
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Activity & Updates</h1>
      <button className="text-sm text-indigo-400 hover:underline">Mark all as read</button>
    </div>

    <div className="relative max-w-2xl">
      {/* VERTICAL LINE */}
      <div className="absolute left-6 top-2 bottom-2 w-px bg-white/5" />

      <div className="space-y-12">
        {MOCK_ACTIVITY.concat(MOCK_ACTIVITY).map((item, i) => (
          <div key={i} className="relative flex gap-8 group">
            {/* ICON CIRCLE */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-[#111114] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
              {item.action.includes('report') ? <FileText size={18} /> : 
               item.action.includes('task') ? <CheckSquare size={18} /> : <Activity size={18} />}
            </div>
            
            <div className="flex-1 pt-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm">
                  <span className="font-bold text-white hover:text-indigo-400 cursor-pointer">{item.user}</span> {item.action} 
                  <span className="text-indigo-400 font-medium ml-1 cursor-pointer hover:underline">"{item.target}"</span>
                </p>
                <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
              </div>
              <p className="text-xs text-gray-500">Live update via {item.user === 'System' ? 'API Integration' : 'Dashboard'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CDashboard;