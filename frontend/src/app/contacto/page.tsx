"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { AnimatedSection } from "@/components/AnimatedSection";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="CONTACTO" showBack={false} />
        <main className="pt-20 pb-28 px-5 max-w-lg mx-auto flex items-center justify-center min-h-[calc(100vh-7rem)]">
          <AnimatedSection className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">
                check_circle
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-on-background">Thank You!</h2>
              <p className="text-on-surface-variant text-sm max-w-[280px] mx-auto">
                We&apos;ve received your message and will get back to you soon.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", message: "" });
              }}
              className="px-6 py-3 rounded-full bg-primary-container text-white text-sm font-semibold hover:bg-primary-container/90 transition-colors"
            >
              Send another message
            </button>
          </AnimatedSection>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="CONTACTO" showBack />

      <main className="pt-20 pb-28 px-5 max-w-lg mx-auto">
        <AnimatedSection>
          <div className="text-center py-8 space-y-2">
            <h2 className="text-2xl font-bold text-on-background">Get in Touch</h2>
            <p className="text-on-surface-variant text-sm">
              We&apos;d love to hear from you
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100} className="space-y-4 mb-8">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white shadow-lg shadow-primary-container/30">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                WhatsApp
              </p>
              <p className="text-xs text-on-surface-variant">Chat with us directly</p>
            </div>
            <span className="material-symbols-outlined text-xl text-outline group-hover:text-primary transition-colors">
              arrow_forward_ios
            </span>
          </a>

          <a
            href="https://instagram.com/mariasclothing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-white shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                Instagram
              </p>
              <p className="text-xs text-on-surface-variant">@mariasclothing</p>
            </div>
            <span className="material-symbols-outlined text-xl text-outline group-hover:text-primary transition-colors">
              arrow_forward_ios
            </span>
          </a>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="pt-4 pb-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-outline-variant to-transparent" />
              <span className="text-xs uppercase tracking-wider text-outline">or</span>
              <div className="flex-1 h-px bg-gradient-to-l from-outline-variant to-transparent" />
            </div>

            <h3 className="text-lg font-semibold text-on-background mb-4">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3.5 rounded-xl bg-surface-container text-on-surface placeholder-on-surface-variant/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
                    errors.name ? "ring-2 ring-red-500/50" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3.5 rounded-xl bg-surface-container text-on-surface placeholder-on-surface-variant/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50 ${
                    errors.email ? "ring-2 ring-red-500/50" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={4}
                  className={`w-full px-4 py-3.5 rounded-xl bg-surface-container text-on-surface placeholder-on-surface-variant/50 outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/50 resize-none ${
                    errors.message ? "ring-2 ring-red-500/50" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-primary-container text-white font-semibold active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-container/30 hover:bg-primary-container/90 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="material-symbols-outlined text-lg">send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
