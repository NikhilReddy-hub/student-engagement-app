'use client';

import { useState, FormEvent } from 'react';
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { FolderPlus, ArrowLeft } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
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
            <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4">
                <div className="w-full max-w-xl">
                    <Link href="/dashboard/mentor" className="inline-block mb-8 group">
                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Dashboard</span>
                        </div>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                    <FolderPlus className="w-8 h-8 text-purple-400" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-1">Create New Project</h1>
                                    <p className="text-slate-400 text-sm">Start a collaborative space for your students</p>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-slate-300 ml-1">
                                        Project Name
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Web Development Bootcamp 2024"
                                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <Link href="/dashboard/mentor" className="flex-1">
                                        <button
                                            type="button"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 transition-all duration-200"
                                    >
                                        {isLoading ? 'Creating...' : 'Create Project'}
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
