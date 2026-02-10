'use client';

import { useState, FormEvent } from 'react';
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { FolderPlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProjectPage() {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
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
            // Redirect back to mentor dashboard and force reload to show new project
            window.location.href = '/dashboard/mentor';
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred during project creation');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <ProtectedRoute allowedRoles={['MENTOR']}>
            <div className="min-h-screen w-full bg-[#0f172a] relative overflow-hidden flex items-center justify-center p-6">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />

                <div className="w-full max-w-2xl relative z-10">
                    <Link href="/dashboard/mentor" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group pl-1">
                        <div className="p-2 rounded-full bg-slate-800/50 group-hover:bg-slate-800 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Back to Dashboard</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/10">

                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                                    <FolderPlus className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Create New Project</h1>
                                <p className="text-slate-400 text-lg max-w-md">
                                    Launch a new collaborative workspace for your students in seconds.
                                </p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                                >
                                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                    <p className="text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label htmlFor="title" className="block text-sm font-semibold text-slate-300 uppercase tracking-wider ml-1">
                                        Project Title
                                    </label>
                                    <div className="relative group">
                                        <input
                                            id="title"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Full Stack Development Portfolio"
                                            className="w-full px-6 py-4 bg-slate-950/50 border border-slate-700 rounded-2xl text-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300 group-hover:border-slate-600"
                                            required
                                            autoFocus
                                            autoComplete="off"
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-purple-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                                    </div>
                                    <p className="text-slate-500 text-sm ml-1">
                                        You can invite students and add tasks after creating the project.
                                    </p>
                                </div>

                                <div className="flex flex-col-reverse md:flex-row gap-4 pt-4">
                                    <Link href="/dashboard/mentor" className="flex-1">
                                        <button
                                            type="button"
                                            className="w-full h-14 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-[2] h-14 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg hover:from-purple-500 hover:to-indigo-500 focus:ring-4 focus:ring-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Creating Project...</span>
                                            </div>
                                        ) : (
                                            'Create Project'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
