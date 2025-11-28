import React, { useState } from "react";
import { Expand, Heart } from "lucide-react";

const photos = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        title: "Mountain Serenity",
        category: "Landscape",
        size: "large",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
        title: "Golden Hour",
        category: "Nature",
        size: "small",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1518173946687-a4c036bc3c9a?w=800&q=80",
        title: "Ocean Dreams",
        category: "Seascape",
        size: "medium",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
        title: "Waterfall Mist",
        category: "Nature",
        size: "small",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        title: "Foggy Valley",
        category: "Landscape",
        size: "medium",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        title: "Forest Light",
        category: "Nature",
        size: "large",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
        title: "Sunrise Peak",
        category: "Landscape",
        size: "small",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
        title: "Lake Reflection",
        category: "Landscape",
        size: "medium",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
        title: "Autumn Path",
        category: "Nature",
        size: "small",
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800&q=80",
        title: "Alpine Wonder",
        category: "Landscape",
        size: "large",
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        title: "Desert Dunes",
        category: "Landscape",
        size: "medium",
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
        title: "Starry Night",
        category: "Astrophotography",
        size: "small",
    },
];

export default function PhotoGrid({ onPhotoClick, savedPhotos = [] }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [filter, setFilter] = useState("All");
    
    const isPhotoSaved = (photoId) => savedPhotos.some(saved => saved.photo_id === photoId);

    const categories = ["All", ...new Set(photos.map((p) => p.category))];

    const filteredPhotos =
        filter === "All" ? photos : photos.filter((p) => p.category === filter);

    const getSizeClasses = (size) => {
        switch (size) {
            case "large":
                return "md:col-span-2 md:row-span-2";
            case "medium":
                return "md:col-span-2 md:row-span-1";
            default:
                return "md:col-span-1 md:row-span-1";
        }
    };

    return (
        <section id="gallery" className="py-24 lg:py-32 bg-[#fafafa]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-[#c9a962] text-xs tracking-[0.4em] uppercase mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] mb-6">
                        Selected Works
                    </h2>
                    <p className="text-[#1a1a1a]/60 max-w-xl mx-auto leading-relaxed">
                        A curated collection of moments frozen in time, each photograph
                        telling its own unique story through light and composition.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${
                                filter === category
                                    ? "bg-[#1a1a1a] text-white"
                                    : "bg-transparent text-[#1a1a1a]/60 hover:text-[#1a1a1a] border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                    {filteredPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className={`group relative overflow-hidden cursor-pointer ${getSizeClasses(
                                photo.size
                            )}`}
                            onMouseEnter={() => setHoveredId(photo.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => onPhotoClick(photo)}
                        >
                            {/* Image */}
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Saved Indicator */}
                            {isPhotoSaved(photo.id) && (
                                <div className="absolute top-4 right-4 z-10 p-2 bg-[#c9a962] rounded-full">
                                    <Heart size={14} className="text-white fill-white" />
                                </div>
                            )}

                            {/* Overlay */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                                    hoveredId === photo.id ? "opacity-100" : "opacity-0"
                                }`}
                            />

                            {/* Content */}
                            <div
                                className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                                    hoveredId === photo.id
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }`}
                            >
                                <span className="text-[#c9a962] text-xs tracking-widest uppercase mb-2">
                                    {photo.category}
                                </span>
                                <h3 className="font-display text-xl text-white mb-4">
                                    {photo.title}
                                </h3>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <Expand size={14} />
                                    <span>View Details</span>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div
                                className={`absolute top-4 right-4 w-8 h-8 border-t border-r border-[#c9a962] transition-all duration-500 ${
                                    hoveredId === photo.id
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-50"
                                }`}
                            />
                            <div
                                className={`absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#c9a962] transition-all duration-500 ${
                                    hoveredId === photo.id
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-50"
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}