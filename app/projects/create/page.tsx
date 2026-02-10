'use client';

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProject() {
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
            <div className="min-h-screen bg-[#05060f] text-white flex items-center justify-center relative overflow-hidden">
                {/* Animated Grid Background */}
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Glow */}
                <motion.div
                    className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[160px] rounded-full"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                />

                {/* Back Link - Added for usability to get back to dashboard */}
                <div className="absolute top-8 left-8 z-20">
                    <Link href="/dashboard/mentor" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </Link>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 max-w-xl w-full px-10"
                >
                    <motion.span
                        className="text-xs tracking-widest text-purple-400 font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        NEW WORKSPACE
                    </motion.span>

                    <motion.h1
                        className="text-5xl font-bold mt-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Create a Project.
                    </motion.h1>

                    <motion.p
                        className="text-gray-400 mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 }}
                    >
                        Start a new collaborative environment for your students.
                        Track progress, assign tasks, and mentor efficiently.
                    </motion.p>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <label className="text-sm text-purple-400">Project Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Senior Capstone 2024"
                                className="mt-2 w-full rounded-xl bg-[#0b0d1a] border border-purple-500/40 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder-gray-600"
                                autoFocus
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={isLoading || !title}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Project'}
                        </motion.button>
                    </form>

                    <motion.p
                        className="text-center text-xs text-gray-500 mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        Press Enter to create
                    </motion.p>
                </motion.div>
            </div>
        </ProtectedRoute>
    );
}
