'use client';

import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
};

export default function CreateProjectPage() {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const headers = {
                ...getAuthHeaders(user),
                'Content-Type': 'application/json',
            };

            const res = await fetch('/api/projects', {
                method: 'POST',
                headers,
                body: JSON.stringify({ title }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create project');
            }

            await res.json();
            window.location.href = '/dashboard/mentor';
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRoles={['MENTOR']}>
            <div className="relative min-h-screen bg-[#05060f] text-white overflow-hidden font-sans selection:bg-purple-500/30">
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

                {/* Center Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[520px] h-[520px] bg-purple-600/20 blur-[180px] rounded-full opacity-80" />
                </div>

                {/* Back */}
                <div className="absolute top-8 left-8 z-20">
                    <Link href="/dashboard/mentor" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-white/5 transition-colors">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-medium">Back to Dashboard</span>
                    </Link>
                </div>

                {/* Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 flex min-h-screen items-center justify-center"
                >
                    <div className="w-full max-w-lg px-6">
                        <motion.span variants={item} className="inline-block text-xs font-bold tracking-[0.2em] text-purple-400 mb-4 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                            NEW WORKSPACE
                        </motion.span>

                        <motion.h1 variants={item} className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                            Create a Project
                        </motion.h1>

                        <motion.p variants={item} className="mt-4 text-base text-gray-400 leading-relaxed max-w-md">
                            Start a new collaborative environment for your students. Track progress,
                            assign tasks, and mentor efficiently.
                        </motion.p>

                        <form onSubmit={handleSubmit}>
                            <motion.div variants={item} className="mt-10">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-3 ml-1">
                                    Project Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Senior Capstone 2024"
                                    className="w-full rounded-xl bg-[#0b0d1a]/80 backdrop-blur-sm border border-purple-500/30 px-5 py-4 text-base outline-none transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 placeholder:text-gray-600 hover:border-purple-500/50"
                                    autoFocus
                                />
                            </motion.div>

                            {error && (
                                <motion.div variants={item} className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading || !title}
                                className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-sm font-semibold shadow-xl shadow-purple-700/20 hover:shadow-purple-700/40 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Project'}
                            </motion.button>
                        </form>

                        <motion.p variants={item} className="mt-6 text-center text-xs text-gray-500/70 font-medium">
                            Press <span className="text-gray-400">Enter</span> to create
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </ProtectedRoute>
    );
}
