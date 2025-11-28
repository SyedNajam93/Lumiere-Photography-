import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Download, Heart, Check, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function PhotoModal({ photo, onClose, onNext, onPrev, savedPhotos = [], onSaveToggle }) {
    const [downloading, setDownloading] = useState(false);
    const [saving, setSaving] = useState(false);
    
    const isSaved = savedPhotos.some(saved => saved.photo_id === photo?.id);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext?.();
            if (e.key === "ArrowLeft") onPrev?.();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, onNext, onPrev]);

    const handleDownload = async () => {
        setDownloading(true);
        const imageUrl = photo.src.replace("w=800", "w=1920");
        
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${photo.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setDownloading(false);
        toast.success("Image downloaded successfully!");
    };

    const handleSave = async () => {
        setSaving(true);
        
        if (isSaved) {
            const savedPhoto = savedPhotos.find(saved => saved.photo_id === photo.id);
            if (savedPhoto) {
                await base44.entities.SavedPhoto.delete(savedPhoto.id);
                toast.success("Removed from saved photos");
            }
        } else {
            await base44.entities.SavedPhoto.create({
                photo_id: photo.id,
                title: photo.title,
                src: photo.src,
                category: photo.category
            });
            toast.success("Photo saved to your collection!");
        }
        
        onSaveToggle?.();
        setSaving(false);
    };

    if (!photo) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#1a1a1a]/95 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-3 text-white/70 hover:text-white transition-colors group"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Navigation Buttons */}
            {onPrev && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    className="absolute left-4 md:left-8 z-50 p-4 text-white/50 hover:text-white transition-all hover:scale-110"
                >
                    <ChevronLeft size={40} />
                </button>
            )}
            {onNext && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-4 md:right-8 z-50 p-4 text-white/50 hover:text-white transition-all hover:scale-110"
                >
                    <ChevronRight size={40} />
                </button>
            )}

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-4 animate-in zoom-in-95 duration-300">
                <div className="relative">
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-black/20">
                        <img
                            src={photo.src.replace("w=800", "w=1600")}
                            alt={photo.title}
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />

                        {/* Decorative Frame */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#c9a962]/50" />
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#c9a962]/50" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#c9a962]/50" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#c9a962]/50" />
                    </div>

                    {/* Info Bar */}
                    <div className="bg-[#1a1a1a] border-t border-white/10 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <span className="text-[#c9a962] text-xs tracking-[0.3em] uppercase block mb-2">
                                    {photo.category}
                                </span>
                                <h2 className="font-display text-2xl md:text-3xl text-white">
                                    {photo.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={handleSave}
                                    disabled={saving}
                                    className={`flex items-center gap-2 px-5 py-2.5 border transition-all text-sm ${
                                        isSaved 
                                            ? "border-[#c9a962] text-[#c9a962] bg-[#c9a962]/10" 
                                            : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
                                    }`}
                                >
                                    {saving ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : isSaved ? (
                                        <Check size={16} />
                                    ) : (
                                        <Heart size={16} />
                                    )}
                                    <span>{isSaved ? "Saved" : "Save"}</span>
                                </button>
                                <button 
                                    onClick={handleDownload}
                                    disabled={downloading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#c9a962] text-[#1a1a1a] hover:bg-[#d4b574] transition-all text-sm font-medium disabled:opacity-50"
                                >
                                    {downloading ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Download size={16} />
                                    )}
                                    <span>{downloading ? "Downloading..." : "Download"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-8">
                            <div>
                                <span className="text-white/40 text-xs uppercase tracking-wide block mb-1">
                                    Camera
                                </span>
                                <span className="text-white/80 text-sm">Sony A7R IV</span>
                            </div>
                            <div>
                                <span className="text-white/40 text-xs uppercase tracking-wide block mb-1">
                                    Lens
                                </span>
                                <span className="text-white/80 text-sm">24-70mm f/2.8</span>
                            </div>
                            <div>
                                <span className="text-white/40 text-xs uppercase tracking-wide block mb-1">
                                    Exposure
                                </span>
                                <span className="text-white/80 text-sm">1/250s · f/8 · ISO 100</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyboard Hints */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/30 text-xs">
                <span>ESC to close</span>
                <span>← → to navigate</span>
            </div>
        </div>
    );
}