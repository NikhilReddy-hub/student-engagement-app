'use client';

import { useState, FormEvent } from 'react';
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CreateProjectPage() {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);

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
            setError(err instanceof Error ? err.message : 'An error occurred during project creation');
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    return (
        <ProtectedRoute allowedRoles={['MENTOR']}>
            <div className="min-h-screen w-full bg-[#030712] text-slate-200 flex flex-col relative overflow-hidden">

                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/50 to-[#030712]"></div>

                <div className="relative z-10 flex-1 flex flex-col p-6 md:p-12 max-w-5xl mx-auto w-full">

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/dashboard/mentor" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                            <div className="p-2 rounded-full border border-slate-800 bg-slate-900/50 group-hover:border-slate-600 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium tracking-wide">Back to Dashboard</span>
                        </Link>
                    </motion.div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="w-full max-w-2xl"
                        >
                            <motion.div variants={itemVariants} className="text-center mb-12">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-6">
                                    <Sparkles className="w-3 h-3" />
                                    New Workspace
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                                    Create a Project.
                                </h1>
                                <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">
                                    Start a new collaborative environment for your students. Track progress, assign tasks, and mentor efficiently.
                                </p>
                            </motion.div>

                            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto flex flex-col gap-10">
                                <div className={`
                                    relative group rounded-2xl bg-slate-900/50 border transition-all duration-300
                                    ${isFocused ? 'border-purple-500/50 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]' : 'border-slate-800 hover:border-slate-700'}
                                `}>
                                    <div className="relative">
                                        <input
                                            id="title"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            className="w-full bg-transparent text-2xl text-white font-medium focus:outline-none placeholder-transparent px-8 py-6 rounded-2xl"
                                            placeholder="Project Title"
                                            autoComplete="off"
                                            autoFocus
                                        />
                                        <label
                                            htmlFor="title"
                                            className={`absolute left-6 px-2 bg-[#030712] transition-all duration-200 pointer-events-none rounded
                                                ${isFocused || title
                                                    ? 'text-sm text-purple-400 -top-3'
                                                    : 'text-xl text-slate-500 top-6'}
                                            `}
                                        >
                                            Project Title
                                        </label>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isLoading || !title}
                                    type="submit"
                                    className="w-full h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xl hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20 flex items-center justify-center gap-3 transition-all duration-200"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Create Project
                                            <Layout className="w-6 h-6" />
                                        </>
                                    )}
                                </motion.button>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute -bottom-20 left-0 right-0 text-center"
                                        >
                                            <p className="text-red-400 text-sm font-medium bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full inline-block">
                                                {error}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.form>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-center text-slate-600 text-sm"
                    >
                        Press <kbd className="font-sans px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Enter</kbd> to create
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
