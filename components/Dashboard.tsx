import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ListTodo, 
  Settings, 
  LogOut, 
  Plus, 
  Bot, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle
} from 'lucide-react';
import StatsChart from './StatsChart';
import { Task, DashboardView } from '../types';
import { generateTasksFromGoal } from '../services/geminiService';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review Q1 Analytics', description: 'Analyze user growth trends.', priority: 'High', status: 'In Progress', estimatedHours: 2 },
    { id: '2', title: 'Update Landing Page', description: 'Fix typo in hero section.', priority: 'Low', status: 'Done', estimatedHours: 0.5 },
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const newTasks = await generateTasksFromGoal(prompt);
      setTasks(prev => [...newTasks, ...prev]);
      setShowAiModal(false);
      setPrompt('');
    } catch (e) {
      alert("Error generating tasks. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'Done': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'In Progress': return <Clock className="w-5 h-5 text-indigo-400" />;
      default: return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-slate-700 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            NexTask
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setCurrentView('overview')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${currentView === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Overview
          </button>
          <button 
            onClick={() => setCurrentView('tasks')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${currentView === 'tasks' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          >
            <ListTodo className="w-5 h-5 mr-3" />
            Tasks
          </button>
          <button 
            onClick={() => setCurrentView('settings')}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${currentView === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={onLogout} className="flex items-center w-full px-4 py-2 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-6 md:px-10">
          <div className="md:hidden font-bold text-xl text-white">NexTask</div>
          <div className="flex items-center space-x-4 ml-auto">
            <button 
              onClick={() => setShowAiModal(true)}
              className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-full shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105"
            >
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {currentView === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Stats Cards */}
                  <div className="p-6 rounded-2xl bg-surface border border-slate-700 shadow-xl">
                    <div className="text-slate-400 text-sm font-medium mb-1">Total Tasks</div>
                    <div className="text-3xl font-bold text-white">{tasks.length}</div>
                    <div className="text-emerald-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">↑</span> 12% from last week
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-surface border border-slate-700 shadow-xl">
                    <div className="text-slate-400 text-sm font-medium mb-1">Pending</div>
                    <div className="text-3xl font-bold text-white">{tasks.filter(t => t.status !== 'Done').length}</div>
                    <div className="text-indigo-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">●</span> Active now
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-surface border border-slate-700 shadow-xl">
                    <div className="text-slate-400 text-sm font-medium mb-1">Productivity</div>
                    <div className="text-3xl font-bold text-white">84%</div>
                    <div className="text-purple-400 text-xs mt-2 flex items-center">
                      <span className="mr-1">⚡</span> On track
                    </div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="p-6 rounded-2xl bg-surface border border-slate-700 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Weekly Productivity</h3>
                  </div>
                  <StatsChart />
                </div>

                {/* Recent Tasks */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Recent Tasks</h3>
                  {tasks.slice(0, 3).map(task => (
                    <div key={task.id} className="group p-4 rounded-xl bg-surface border border-slate-700 hover:border-indigo-500/50 transition-all flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="text-slate-400 hover:text-indigo-400 transition-colors">
                          {getStatusIcon(task.status)}
                        </button>
                        <div>
                          <div className="text-white font-medium group-hover:text-indigo-300 transition-colors">{task.title}</div>
                          <div className="text-slate-500 text-sm">{task.description}</div>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentView === 'tasks' && (
              <div className="animate-fade-in space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">All Tasks</h2>
                    <button 
                      onClick={() => setShowAiModal(true)}
                      className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </button>
                 </div>
                 <div className="grid gap-4">
                  {tasks.map(task => (
                    <div key={task.id} className="p-5 rounded-xl bg-surface border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start md:items-center space-x-4">
                        <div className="mt-1 md:mt-0">{getStatusIcon(task.status)}</div>
                        <div>
                          <h4 className="text-lg font-medium text-white">{task.title}</h4>
                          <p className="text-slate-400 text-sm">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 pl-9 md:pl-0">
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="w-4 h-4 mr-1.5" />
                          {task.estimatedHours}h
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                 </div>
              </div>
            )}

            {currentView === 'settings' && (
              <div className="animate-fade-in flex items-center justify-center h-64 text-slate-500">
                <div className="text-center">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Settings panel is under construction.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Modal Overlay */}
        {showAiModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface border border-slate-600 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
              <div className="p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">AI Project Planner</h3>
                      <p className="text-indigo-200 text-sm">Describe your goal, I'll build the plan.</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Launch a new coffee brand on Instagram..."
                  className="w-full bg-dark/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
                />
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className={`flex items-center px-6 py-2.5 rounded-lg font-medium transition-all ${
                      isGenerating 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                        : 'bg-white text-indigo-900 hover:bg-indigo-50'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mr-2" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        Generate Tasks
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4 bg-dark/50 text-xs text-slate-500 border-t border-slate-700">
                Powered by Gemini 2.5 Flash. Results may vary.
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Mobile FAB for AI */}
      <button 
        onClick={() => setShowAiModal(true)}
        className="md:hidden absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center text-white z-40"
      >
        <Bot className="w-6 h-6" />
      </button>
    </div>
  );
};

// Helper icon
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default Dashboard;