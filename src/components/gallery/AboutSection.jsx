import React from "react";
import { Camera, Award, Users } from "lucide-react";

export default function AboutSection() {
    const stats = [
        { icon: Camera, value: "500+", label: "Projects Completed" },
        { icon: Award, value: "15", label: "Awards Won" },
        { icon: Users, value: "200+", label: "Happy Clients" },
    ];

    return (
        <section id="about" className="py-24 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                                alt="Photographer at work"
                                className="w-full aspect-[4/5] object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[#c9a962]/30 -z-10" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#c9a962]/10 -z-10" />
                    </div>

                    {/* Content Side */}
                    <div className="lg:pl-8">
                        <span className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-4 block">
                            About the Artist
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-6">
                            The Story Behind
                            <br />
                            <span className="italic text-[#c9a962]">Every Frame</span>
                        </h2>
                        <div className="space-y-4 text-[#1a1a1a]/60 leading-relaxed mb-8">
                            <p>
                                With over a decade of experience capturing life's most precious
                                moments, I've developed a unique perspective that blends artistic
                                vision with technical excellence.
                            </p>
                            <p>
                                My journey began in the misty mountains of the Pacific Northwest,
                                where I first discovered the transformative power of natural light.
                                Today, I travel the world seeking those perfect moments where light,
                                subject, and emotion converge.
                            </p>
                            <p>
                                Every photograph I create is a collaboration between the moment and
                                the viewer—an invitation to see the world through a different lens.
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mb-12">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Autograph_of_Benjamin_Franklin.svg/320px-Autograph_of_Benjamin_Franklin.svg.png"
                                alt="Signature"
                                className="h-12 opacity-70 invert"
                            />
                            <p className="text-sm text-[#1a1a1a]/40 mt-2">
                                Lead Photographer & Creative Director
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#1a1a1a]/10">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <stat.icon
                                        size={24}
                                        className="mx-auto mb-3 text-[#c9a962]"
                                    />
                                    <div className="font-display text-2xl text-[#1a1a1a] mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-[#1a1a1a]/50 uppercase tracking-wide">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}