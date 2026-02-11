'use client'
import Link from 'next/link'
import './globals.css'

export default function NotFound() {
    return (
        <div style={{
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <section style={{
                backgroundColor: 'rgba(18, 18, 18, 0.85)',
                borderRadius: '12px',
                padding: '3rem 2rem',
                maxWidth: '600px',
                backdropFilter: 'blur(5px)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)'
            }}>
                <h1 style={{
                    fontSize: '5rem',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    lineHeight: 1
                }}>404</h1>
                <h2 style={{
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    fontWeight: 600
                }}>Nothing here — yet.</h2>
                <p style={{
                    color: 'var(--text-body)',
                    fontSize: '1.05rem',
                    marginBottom: '2rem',
                    lineHeight: '1.7',
                    maxWidth: '45ch',
                    margin: '0 auto 2rem'
                }}>
                    This page doesn&apos;t exist. It may have moved, or maybe it never was. Either way, let&apos;s get you back on track.
                </p>
                <Link
                    href="/"
                    className="btn"
                >
                    Back to Home
                </Link>
            </section>
        </div>
    );
}
