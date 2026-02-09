'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import {
    User,
    Lock,
    Bell,
    Palette,
    ChevronLeft,
    Save,
    Moon,
    Sun,
    Shield,
    Mail,
    Smartphone
} from 'lucide-react';

// --- ANIMATION VARIANTS ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 300, damping: 24 } as const
    }
};

const tabContentVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 24 } as const
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: { duration: 0.2 }
    }
};

// --- SUB-COMPONENTS ---

const ProfileSection = () => (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
        <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    LS
                </div>
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-xs font-medium">Change</span>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800">Layasree S.</h3>
                <p className="text-slate-500">Student • Computer Science</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input type="text" defaultValue="Layasree S." className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" defaultValue="layasree@example.com" className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Bio</label>
                <textarea rows={4} defaultValue="Passionate about AI and Web Development." className="w-full p-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none" />
            </div>
        </div>
    </motion.div>
);

const SecuritySection = () => (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start gap-4">
            <Shield className="text-orange-500 shrink-0" size={24} />
            <div>
                <h4 className="font-semibold text-orange-800">Security Recommendation</h4>
                <p className="text-sm text-orange-700 mt-1">Enable 2-Factor Authentication to better protect your account.</p>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Change Password</h3>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-slate-200 outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-slate-200 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border border-slate-200 outline-none" />
                </div>
            </div>
        </div>
    </motion.div>
);

const NotificationsSection = () => (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Mail size={20} className="text-indigo-500" /> Email Notifications
            </h3>
            <div className="space-y-3">
                {['New task assignments', 'Project deadlines', 'Mentor feedback', 'Weekly digest'].map((item, idx) => (
                    <label key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                        <span className="text-slate-700 font-medium">{item}</span>
                        <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox" defaultChecked={idx < 3} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-500" style={{ right: idx < 3 ? 0 : 'auto', left: idx < 3 ? 'auto' : 0, borderColor: idx < 3 ? '#6366f1' : '#cbd5e1' }} />
                            <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${idx < 3 ? 'bg-indigo-500' : 'bg-slate-300'}`}></label>
                        </div>
                    </label>
                ))}
            </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Smartphone size={20} className="text-purple-500" /> Push Notifications
            </h3>
            <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-500 text-sm">
                Push notifications are currently managed by your browser settings.
            </div>
        </div>
    </motion.div>
);

const AppearanceSection = () => (
    <motion.div variants={tabContentVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-800">Theme Preference</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Light', 'Dark', 'System'].map((theme) => (
                <div key={theme} className={`p-4 rounded-xl border ${theme === 'Light' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-indigo-300'} cursor-pointer transition-all flex flex-col items-center gap-3`}>
                    <div className={`w-full h-24 rounded-lg ${theme === 'Dark' ? 'bg-slate-800' : 'bg-white border border-slate-100'} shadow-sm flex items-center justify-center`}>
                        {theme === 'Light' && <Sun className="text-orange-500" size={32} />}
                        {theme === 'Dark' && <Moon className="text-indigo-400" size={32} />}
                        {theme === 'System' && <Palette className="text-slate-400" size={32} />}
                    </div>
                    <span className={`font-medium ${theme === 'Light' ? 'text-indigo-700' : 'text-slate-600'}`}>{theme} Mode</span>
                </div>
            ))}
        </div>
    </motion.div>
);


// --- MAIN SETTINGS PAGE ---

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl mx-auto"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/student">
                            <motion.button
                                whileHover={{ x: -5 }}
                                className="p-2 rounded-full bg-white text-slate-600 shadow-sm hover:shadow-md transition-all"
                            >
                                <ChevronLeft size={24} />
                            </motion.button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                            <p className="text-slate-500">Manage your account preferences</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
                    >
                        <Save size={18} />
                        Save Changes
                    </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 space-y-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    whileHover={{ x: 5 }}
                                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${isActive
                                        ? 'bg-white text-indigo-600 shadow-md font-semibold'
                                        : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                                        }`}
                                >
                                    <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                                    {tab.label}
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Main Content Area */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-6 md:p-8 min-h-[500px]">
                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' && <ProfileSection key="profile" />}
                                {activeTab === 'security' && <SecuritySection key="security" />}
                                {activeTab === 'notifications' && <NotificationsSection key="notifications" />}
                                {activeTab === 'appearance' && <AppearanceSection key="appearance" />}
                            </AnimatePresence>

                            {/* Mobile Save Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="md:hidden w-full mt-8 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Save size={18} />
                                Save Changes
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
