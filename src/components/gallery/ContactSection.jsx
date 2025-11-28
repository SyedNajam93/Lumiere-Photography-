import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Instagram, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <section id="contact" className="py-24 lg:py-32 bg-[#1a1a1a] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-4 block">
                        Get in Touch
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl mb-6">
                        Let's Create Together
                    </h2>
                    <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
                        Have a project in mind? I'd love to hear about it. Let's discuss how
                        we can bring your vision to life.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg">
                                <Mail size={20} className="text-[#c9a962]" />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wide text-white/40 mb-1">
                                    Email
                                </h3>
                                <a
                                    href="mailto:hello@lumiere.photo"
                                    className="text-white hover:text-[#c9a962] transition-colors"
                                >
                                    hello@lumiere.photo
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg">
                                <Phone size={20} className="text-[#c9a962]" />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wide text-white/40 mb-1">
                                    Phone
                                </h3>
                                <a
                                    href="tel:+1234567890"
                                    className="text-white hover:text-[#c9a962] transition-colors"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/5 rounded-lg">
                                <MapPin size={20} className="text-[#c9a962]" />
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-wide text-white/40 mb-1">
                                    Location
                                </h3>
                                <p className="text-white">
                                    Los Angeles, California
                                    <br />
                                    <span className="text-white/50">Available Worldwide</span>
                                </p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-white/10">
                            <h3 className="text-sm uppercase tracking-wide text-white/40 mb-4">
                                Follow Along
                            </h3>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="group flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-[#c9a962] hover:bg-[#c9a962]/10 transition-all"
                                >
                                    <Instagram size={16} />
                                    <span className="text-sm">Instagram</span>
                                    <ArrowUpRight
                                        size={14}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">
                                        Your Name
                                    </label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder="John Doe"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a962] h-12"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">
                                        Email Address
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        placeholder="john@example.com"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a962] h-12"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">
                                    Subject
                                </label>
                                <Input
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subject: e.target.value })
                                    }
                                    placeholder="Project Inquiry"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a962] h-12"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">
                                    Message
                                </label>
                                <Textarea
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    placeholder="Tell me about your project..."
                                    rows={6}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a962] resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full md:w-auto px-10 py-6 bg-[#c9a962] hover:bg-[#d4b574] text-[#1a1a1a] font-medium tracking-wide group"
                            >
                                Send Message
                                <Send
                                    size={16}
                                    className="ml-2 group-hover:translate-x-1 transition-transform"
                                />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}