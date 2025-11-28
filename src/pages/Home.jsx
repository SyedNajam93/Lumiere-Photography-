import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/gallery/HeroSection";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import PhotoModal from "@/components/gallery/PhotoModal";
import AboutSection from "@/components/gallery/AboutSection";
import ContactSection from "@/components/gallery/ContactSection";
import { Toaster } from "sonner";

const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", title: "Mountain Serenity", category: "Landscape", size: "large" },
    { id: 2, src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80", title: "Golden Hour", category: "Nature", size: "small" },
    { id: 3, src: "https://images.unsplash.com/photo-1518173946687-a4c036bc3c9a?w=800&q=80", title: "Ocean Dreams", category: "Seascape", size: "medium" },
    { id: 4, src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80", title: "Waterfall Mist", category: "Nature", size: "small" },
    { id: 5, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", title: "Foggy Valley", category: "Landscape", size: "medium" },
    { id: 6, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", title: "Forest Light", category: "Nature", size: "large" },
    { id: 7, src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80", title: "Sunrise Peak", category: "Landscape", size: "small" },
    { id: 8, src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", title: "Lake Reflection", category: "Landscape", size: "medium" },
    { id: 9, src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80", title: "Autumn Path", category: "Nature", size: "small" },
    { id: 10, src: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800&q=80", title: "Alpine Wonder", category: "Landscape", size: "large" },
    { id: 11, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", title: "Desert Dunes", category: "Landscape", size: "medium" },
    { id: 12, src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80", title: "Starry Night", category: "Astrophotography", size: "small" },
];

export default function Home() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const queryClient = useQueryClient();

    const { data: savedPhotos = [] } = useQuery({
        queryKey: ["savedPhotos"],
        queryFn: () => base44.entities.SavedPhoto.list(),
    });

    const handleSaveToggle = () => {
        queryClient.invalidateQueries({ queryKey: ["savedPhotos"] });
    };

    const currentIndex = selectedPhoto
        ? photos.findIndex((p) => p.id === selectedPhoto.id)
        : -1;

    const handleNext = () => {
        if (currentIndex < photos.length - 1) {
            setSelectedPhoto(photos[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setSelectedPhoto(photos[currentIndex - 1]);
        }
    };

    return (
        <div className="bg-[#fafafa]">
            <Toaster position="top-center" richColors />
            <HeroSection />
            <PhotoGrid onPhotoClick={setSelectedPhoto} savedPhotos={savedPhotos} />
            <AboutSection />
            <ContactSection />

            {selectedPhoto && (
                <PhotoModal
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    onNext={currentIndex < photos.length - 1 ? handleNext : null}
                    onPrev={currentIndex > 0 ? handlePrev : null}
                    savedPhotos={savedPhotos}
                    onSaveToggle={handleSaveToggle}
                />
            )}
        </div>
    );
}