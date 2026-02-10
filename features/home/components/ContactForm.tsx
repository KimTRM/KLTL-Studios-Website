"use client"
import { useState, FormEvent } from "react";
import "../css/ContactSection.css";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ContactForm() {
    const contact = useQuery(api.siteMeta.getContact);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const email = contact?.email ?? "kimlabrador71@gmail.com";
    const heading = contact?.heading ?? "Let's Work Together";
    const subheading = contact?.subheading ?? "Have a project in mind or just want to say hi? Let's talk!";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');

        // Create mailto link as fallback
        const mailtoLink = `mailto:${email}?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

        try {
            // Open email client
            window.location.href = mailtoLink;
            setStatus('success');

            // Reset form after 2 seconds
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' });
                setStatus('idle');
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="contact">
            <div className="containerc">
                <h2>{heading}</h2>
                <p>{subheading}</p>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Tell me about your project..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Sending...' :
                            status === 'success' ? 'Sent!' :
                                status === 'error' ? 'Try Again' :
                                    'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p className="success-message">Message sent successfully! I&apos;ll get back to you soon.</p>
                    )}
                    {status === 'error' && (
                        <p className="error-message">Something went wrong. Please email me directly at {email}</p>
                    )}
                </form>

                <div className="contact-divider">or</div>

                <a href={`mailto:${email}`} className="btn">Email Me Directly</a>
            </div>
        </section>
    );
}
