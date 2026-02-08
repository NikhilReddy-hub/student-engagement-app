'use client';

/**
 * ============================================
 * LOGOUT PAGE
 * Clean, Simple, Functional
 * Tech Stack: Next.js App Router, CSS Modules
 * ============================================
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Loader2 } from 'lucide-react';
import styles from './logout.module.css';

export default function LogoutPage() {
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    /**
     * Handles the logout process using AuthContext
     */
    const handleLogout = async () => {
        setIsLoading(true);
        setError('');

        try {
            await logout();
            setSuccess(true);
        } catch (err: any) {
            console.error('Logout Error:', err);
            setError(err.message || 'An unexpected error occurred');
            setIsLoading(false);
        }
    };

    /**
     * Cancel logout and return to previous page
     */
    const handleCancel = () => {
        window.history.back();
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                {/* Icon */}
                <div className={styles.iconWrapper}>
                    <LogOut size={32} />
                </div>

                {/* Content */}
                <h1 className={styles.title}>
                    Are you sure you want to logout?
                </h1>

                <p className={styles.subtitle}>
                    You will need to log in again to access your dashboard.
                </p>

                {/* Status Messages */}
                {error && <div className={styles.error}>{error}</div>}

                {success && (
                    <div className={styles.success}>
                        Success! Redirecting to login...
                    </div>
                )}

                {/* Actions */}
                <div className={styles.buttonGroup}>
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButton}
                        disabled={isLoading || success}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className={styles.spinner} size={18} />
                                Logging out...
                            </>
                        ) : (
                            'Logout'
                        )}
                    </button>

                    <button
                        onClick={handleCancel}
                        className={styles.cancelButton}
                        disabled={isLoading || success}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
