import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MemoryPhoto } from "../types";
import {
  Heart,
  MapPin,
  Calendar,
  Sparkles,
  Edit3,
  Trash2,
  Maximize2,
  Upload,
  Plus,
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface ScrapbookCanvasProps {
  photos: MemoryPhoto[];
  onSelectPhoto: (photo: MemoryPhoto) => void;
  onAddPhotoClick: () => void;
  onToggleFavorite: (id: string) => void;
  onDeletePhoto: (id: string) => void;
}

export const ScrapbookCanvas: React.FC<ScrapbookCanvasProps> = ({
  photos,
  onSelectPhoto,
  onAddPhotoClick,
  onToggleFavorite,
  onDeletePhoto,
}) => {
  const [filter, setFilter] = useState<"all" | "favorite">("all");

  const filteredPhotos = photos.filter((p) => {
    if (filter === "favorite") return p.favorite;
    return true;
  });

  const getTapeStyle = (color: MemoryPhoto["tapeColor"]) => {
    switch (color) {
      case "pink":
        return "bg-rose-300/80 border-rose-400/50";
      case "yellow":
        return "bg-amber-200/90 border-amber-300/60";
      case "washi-floral":
        return "bg-pink-200/90 border-pink-300/80 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:8px_8px]";
      case "teal":
        return "bg-teal-200/90 border-teal-300/60";
      case "gold":
        return "bg-yellow-300/90 border-yellow-400/80";
      default:
        return "bg-rose-300/80 border-rose-400/50";
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Bold Typography Hero Banner */}
      <div className="relative bg-[#F5EFEE] p-8 md:p-10 border border-[#E9E1D6] shadow-xs flex flex-col md:flex-row items-stretch justify-between gap-6 overflow-hidden">
        {/* Large Background Date Watermark */}
        <div className="absolute top-[-20px] right-[-10px] text-[180px] md:text-[220px] font-serif font-bold text-[#E9E1D6]/40 leading-none select-none pointer-events-none z-0">
          08.01
        </div>

        <div className="relative z-10 max-w-xl flex flex-col justify-center">
          <div className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-[#A89F91] mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C85C5C]" />
            <span>A DIGITAL KEEPSAKE • {photos.length} MOMENTS SAVED</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D2926] leading-[0.95] tracking-tight mb-3">
            HAPPY <span className="text-[#C85C5C] italic">GF DAY</span> MY LOVE.
          </h2>
          
          <div className="h-[1px] w-24 bg-[#C85C5C] my-3" />

          <p className="font-serif italic text-base md:text-lg text-[#4A443F] leading-relaxed">
            "A digital scrapbooking vault of our favorite mirror selfies, coffee shop dates, matching outfits, and cherished everyday memories together."
          </p>
        </div>

        {/* Filter Controls & Stats */}
        <div className="relative z-10 flex flex-col justify-between items-start md:items-end gap-4 border-t md:border-t-0 md:border-l border-[#E9E1D6] pt-4 md:pt-0 md:pl-6">
          <div className="text-left md:text-right">
            <span className="text-3xl font-serif italic text-[#2D2926] block">August 1st</span>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#A89F91]">
              National Girlfriend Day
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/90 p-1.5 border border-[#E9E1D6]">
            <button
              onClick={() => {
                soundManager.playPop();
                setFilter("all");
              }}
              className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#2D2926] text-[#FAF7F2] shadow-xs"
                  : "text-[#4A443F] hover:bg-[#FAF7F2]"
              }`}
            >
              All ({photos.length})
            </button>
            <button
              onClick={() => {
                soundManager.playPop();
                setFilter("favorite");
              }}
              className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === "favorite"
                  ? "bg-[#C85C5C] text-white shadow-xs"
                  : "text-[#4A443F] hover:bg-[#FAF7F2]"
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-[#C85C5C] text-[#C85C5C]" />
              <span>Starred ({photos.filter((p) => p.favorite).length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scrapbook Grid Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-1">
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              style={{ rotate: `${photo.rotation || 0}deg` }}
              className="group relative bg-[#FAF7F2] p-4 pb-6 shadow-md hover:shadow-xl hover:scale-103 border border-[#E9E1D6] transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              onClick={() => {
                soundManager.playPaperFlip();
                onSelectPhoto(photo);
              }}
            >
              {/* Paper Washi Tape Overlay at Top */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 ${getTapeStyle(
                  photo.tapeColor
                )} border shadow-xs opacity-90 rotate-[-1deg] z-10 pointer-events-none`}
              />

              {/* Photo Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E5E1DA] border border-[#E9E1D6] shadow-inner group-hover:brightness-102">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Quick Delete Memory Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playPop();
                    if (confirm(`Delete "${photo.title}" from your memory wall?`)) {
                      onDeletePhoto(photo.id);
                    }
                  }}
                  title="Delete Memory"
                  className="absolute top-2 left-2 p-2 bg-white/90 text-[#C85C5C] shadow-md hover:bg-red-600 hover:text-white transition-all cursor-pointer z-20 opacity-90 sm:opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Favorite Star Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playPop();
                    onToggleFavorite(photo.id);
                  }}
                  title="Toggle Favorite"
                  className="absolute top-2 right-2 p-2 bg-white/90 text-[#C85C5C] shadow-md hover:bg-white transition-all cursor-pointer z-20"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      photo.favorite ? "fill-[#C85C5C] text-[#C85C5C]" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Stickers floating */}
                {photo.stickers && photo.stickers.length > 0 && (
                  <div className="absolute bottom-2 left-2 flex gap-1 z-10 pointer-events-none">
                    {photo.stickers.map((stk, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-lg filter drop-shadow-md transform hover:scale-125 transition-transform"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Polaroid Caption Footer */}
              <div className="mt-4 px-1 space-y-2">
                <h3 className="font-serif font-bold text-[#2D2926] text-lg leading-tight group-hover:text-[#C85C5C] transition-colors">
                  {photo.title}
                </h3>

                <p className="font-sans text-xs text-[#4A443F] leading-relaxed line-clamp-2">
                  {photo.caption}
                </p>

                <div className="pt-2 flex items-center justify-between text-[10px] uppercase tracking-wider font-sans text-[#A89F91] font-bold border-t border-[#E9E1D6]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C85C5C]" />
                    <span>{photo.date}</span>
                  </div>

                  {photo.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C85C5C]" />
                      <span className="truncate max-w-[110px]">{photo.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Memory Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            soundManager.playPop();
            onAddPhotoClick();
          }}
          className="border-2 border-dashed border-[#C85C5C]/50 p-8 flex flex-col items-center justify-center text-center bg-[#F5EFEE]/50 hover:bg-[#F5EFEE] text-[#2D2926] transition-all cursor-pointer min-h-[320px] gap-3"
        >
          <div className="w-12 h-12 bg-[#C85C5C] text-white flex items-center justify-center shadow-sm">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <p className="font-serif font-bold text-lg text-[#2D2926]">Add A New Memory</p>
            <p className="text-xs text-[#4A443F] mt-1 max-w-xs">
              Upload your photo, write a caption, pick stickers, and pin it to the board!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
