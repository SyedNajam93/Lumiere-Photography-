import React from "react";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
    const scrollToGallery = () => {
        document.querySelector("#gallery")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <section className="relative h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
                    alt="Hero background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-12 h-px bg-[#c9a962]" />
                        <span className="text-[#c9a962] text-xs tracking-[0.4em] uppercase">
                            Est. 2024
                        </span>
                        <div className="w-12 h-px bg-[#c9a962]" />
                    </div>

                    {/* Main Title */}
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                        Where Light
                        <br />
                        <span className="italic text-[#c9a962]">Meets Art</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        Capturing the extraordinary in the ordinary. Every frame tells a story,
                        every moment becomes eternal through the lens.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToGallery}
                        className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm tracking-widest uppercase hover:bg-white hover:text-[#1a1a1a] transition-all duration-500"
                    >
                        Explore Gallery
                        <ArrowDown
                            size={16}
                            className="group-hover:translate-y-1 transition-transform"
                        />
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
                <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/50" />
            </div>

            {/* Side Text */}
            <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                <span className="text-white/30 text-xs tracking-[0.5em] uppercase">
                    Scroll to discover
                </span>
            </div>
        </section>
    );
}