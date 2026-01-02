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
                    fontSize: '6rem',
                    color: '#dc143c',
                    marginBottom: '1rem',
                    fontWeight: 'bold'
                }}>404</h1>
                <h2 style={{
                    color: '#ffffff',
                    fontSize: '2rem',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>Page Not Found</h2>
                <p style={{
                    color: '#dddddd',
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                }}>
                    Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
                </p>
                <Link
                    href="/"
                    style={{
                        display: 'inline-block',
                        background: '#dc143c',
                        color: 'white',
                        padding: '0.8rem 2rem',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        transition: 'background 0.2s ease',
                        fontFamily: "'Courier New', monospace"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#ff3259'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#dc143c'}
                >
                    Return Home
                </Link>
            </section>
        </div>
    );
}
