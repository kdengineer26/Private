import React, { useState } from "react";
import { motion } from "motion/react";
import { MemoryPhoto } from "../types";
import {
  X,
  Upload,
  Sparkles,
  Heart,
  Trash2,
  Calendar,
  MapPin,
  Tag,
  Check,
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface PhotoDetailModalProps {
  photo: MemoryPhoto;
  onClose: () => void;
  onSavePhoto: (updated: MemoryPhoto) => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoDetailModal: React.FC<PhotoDetailModalProps> = ({
  photo,
  onClose,
  onSavePhoto,
  onDeletePhoto,
}) => {
  const [editedPhoto, setEditedPhoto] = useState<MemoryPhoto>({ ...photo });
  const [isEditing, setIsEditing] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const stickerOptions = ["🏎️", "☕", "🌸", "👑", "🖤", "☀️", "✌️", "💖", "🥂", "🕶️", "🌷", "💋", "🧸"];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditedPhoto((prev) => ({
            ...prev,
            url: event.target!.result as string,
          }));
          soundManager.playSparkle();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleSticker = (sticker: string) => {
    soundManager.playPop();
    setEditedPhoto((prev) => {
      const current = prev.stickers || [];
      if (current.includes(sticker)) {
        return { ...prev, stickers: current.filter((s) => s !== sticker) };
      } else {
        return { ...prev, stickers: [...current, sticker] };
      }
    });
  };

  const handleAiCaption = async () => {
    setIsGeneratingAi(true);
    soundManager.playSparkle();
    try {
      const response = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoTopic: editedPhoto.title,
          memoryDetails: editedPhoto.caption || aiPrompt || "Cute memory with my girlfriend",
          style: "caption",
        }),
      });

      const data = await response.json();
      if (data.caption) {
        setEditedPhoto((prev) => ({ ...prev, caption: data.caption }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSave = () => {
    soundManager.playPop();
    onSavePhoto(editedPhoto);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-3xl w-full bg-[#FAF7F2] border border-[#E9E1D6] shadow-2xl overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-[#2D2926] hover:bg-black text-[#FAF7F2] transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
          {/* Photo Preview Column */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#2D2926] border border-[#E9E1D6] shadow-lg group">
              <img
                src={editedPhoto.url}
                alt={editedPhoto.title}
                className="w-full h-full object-cover"
              />

              {/* Upload Overlay */}
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer p-4 text-center">
                <Upload className="w-8 h-8 mb-2 animate-bounce text-[#C85C5C]" />
                <span className="text-xs font-sans uppercase tracking-widest font-bold">Click to Replace Photo</span>
                <span className="text-[10px] text-gray-300 mt-1">Upload high-res picture from device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Sticker overlay */}
              {editedPhoto.stickers && editedPhoto.stickers.length > 0 && (
                <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                  {editedPhoto.stickers.map((stk, idx) => (
                    <span key={idx} className="text-2xl filter drop-shadow-md">
                      {stk}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Upload Button */}
            <label className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-[#E9E1D6] text-[#2D2926] text-xs font-sans uppercase tracking-wider font-bold hover:bg-[#F5EFEE] shadow-xs transition-all cursor-pointer">
              <Upload className="w-4 h-4 text-[#C85C5C]" />
              <span>Replace Photo File</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Details / Editor Column */}
          <div className="flex flex-col justify-between space-y-4">
            {!isEditing ? (
              // View Mode
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E9E1D6] pb-3">
                  <h3 className="font-serif text-2xl font-bold text-[#2D2926]">
                    {editedPhoto.title}
                  </h3>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      onSavePhoto({ ...editedPhoto, favorite: !editedPhoto.favorite });
                      setEditedPhoto((prev) => ({ ...prev, favorite: !prev.favorite }));
                    }}
                    className="p-2 hover:bg-[#E9E1D6] text-[#C85C5C] transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        editedPhoto.favorite ? "fill-[#C85C5C] text-[#C85C5C]" : "text-[#A89F91]"
                      }`}
                    />
                  </button>
                </div>

                <p className="text-xs text-[#2D2926] leading-relaxed font-sans whitespace-pre-wrap bg-white p-4 border border-[#E9E1D6]">
                  {editedPhoto.caption || "No caption added yet."}
                </p>

                <div className="space-y-2 text-xs text-[#4A443F] font-bold font-sans uppercase tracking-wider pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C85C5C]" />
                    <span>Date: {editedPhoto.date || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C85C5C]" />
                    <span>Location: {editedPhoto.location || "Special Place"}</span>
                  </div>
                </div>

                {/* AI Caption Generator Quick Action */}
                <div className="bg-[#F5EFEE] p-4 border border-[#E9E1D6] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#2D2926] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C85C5C]" />
                      Romantic Caption with Gemini AI
                    </span>
                  </div>
                  <button
                    onClick={handleAiCaption}
                    disabled={isGeneratingAi}
                    className="w-full py-2 px-3 bg-[#C85C5C] hover:bg-[#b04b4b] text-white text-xs font-sans uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isGeneratingAi ? "Crafting Caption..." : "Write Romantic Caption"}</span>
                  </button>
                </div>
              </div>
            ) : (
              // Edit Mode Form
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                <h4 className="font-serif font-bold text-[#2D2926] text-lg border-b border-[#E9E1D6] pb-2">
                  Edit Memory Details
                </h4>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">Title</label>
                  <input
                    type="text"
                    value={editedPhoto.title}
                    onChange={(e) => setEditedPhoto({ ...editedPhoto, title: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                    Heartfelt Caption
                  </label>
                  <textarea
                    rows={3}
                    value={editedPhoto.caption}
                    onChange={(e) => setEditedPhoto({ ...editedPhoto, caption: e.target.value })}
                    className="w-full px-3 py-1.5 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">Date</label>
                    <input
                      type="text"
                      value={editedPhoto.date}
                      onChange={(e) => setEditedPhoto({ ...editedPhoto, date: e.target.value })}
                      className="w-full px-3 py-1.5 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editedPhoto.location}
                      onChange={(e) =>
                        setEditedPhoto({ ...editedPhoto, location: e.target.value })
                      }
                      className="w-full px-3 py-1.5 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
                    />
                  </div>
                </div>

                {/* Stickers selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                    Stickers
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-[#E9E1D6]">
                    {stickerOptions.map((stk) => {
                      const selected = editedPhoto.stickers?.includes(stk);
                      return (
                        <button
                          key={stk}
                          type="button"
                          onClick={() => handleToggleSticker(stk)}
                          className={`p-1.5 text-lg transition-transform cursor-pointer ${
                            selected ? "bg-[#E9E1D6] border border-[#2D2926] scale-110" : "hover:bg-[#FAF7F2]"
                          }`}
                        >
                          {stk}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between border-t border-[#E9E1D6] pt-4 gap-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  if (confirm("Are you sure you want to remove this photo memory?")) {
                    onDeletePhoto(photo.id);
                    onClose();
                  }
                }}
                className="p-2 text-[#C85C5C] hover:bg-[#C85C5C]/10 transition-colors cursor-pointer text-xs flex items-center gap-1 font-bold uppercase tracking-wider"
              >
                <Trash2 className="w-4 h-4" />
                <span className="inline">Delete Memory</span>
              </button>

              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-white border border-[#E9E1D6] text-[#2D2926] font-bold uppercase tracking-wider text-xs hover:bg-[#FAF7F2] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Tag className="w-3.5 h-3.5 text-[#C85C5C]" />
                    <span>Edit Details</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#C85C5C] text-white font-bold uppercase tracking-wider text-xs hover:bg-[#b04b4b] transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#E9E1D6] text-[#2D2926] font-bold uppercase tracking-wider text-xs hover:bg-[#d9d0c2] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
