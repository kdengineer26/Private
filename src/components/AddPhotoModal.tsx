import React, { useState } from "react";
import { MemoryPhoto } from "../types";
import { X, Upload, Sparkles, Plus, Image as ImageIcon } from "lucide-react";
import { soundManager } from "../utils/audio";

interface AddPhotoModalProps {
  onAddPhoto: (photo: MemoryPhoto) => void;
  onClose: () => void;
}

export const AddPhotoModal: React.FC<AddPhotoModalProps> = ({
  onAddPhoto,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("August 2026");
  const [location, setLocation] = useState("Our Special Spot");
  const [imageSrc, setImageSrc] = useState<string>("");
  const [stickers, setStickers] = useState<string[]>(["💖", "✨"]);

  const stickerOptions = ["🏎️", "☕", "🌸", "👑", "🖤", "☀️", "✌️", "💖", "🥂", "🕶️", "🌷", "💋", "🧸"];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target!.result as string);
          soundManager.playSparkle();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleSticker = (stk: string) => {
    soundManager.playPop();
    setStickers((prev) =>
      prev.includes(stk) ? prev.filter((s) => s !== stk) : [...prev, stk]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    soundManager.playSparkle();

    // Default SVG if no image uploaded
    const defaultImg = `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><rect width="600" height="750" fill="#fecdd3"/><text x="300" y="375" font-family="sans-serif" font-size="100" text-anchor="middle">💖</text></svg>`
    )}`;

    const newPhoto: MemoryPhoto = {
      id: "photo-" + Date.now(),
      url: imageSrc || defaultImg,
      title,
      caption,
      date,
      location,
      tapeColor: "pink",
      rotation: Math.floor(Math.random() * 6) - 3,
      frameStyle: "polaroid",
      stickers,
      favorite: true,
    };

    onAddPhoto(newPhoto);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] p-6 md:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-[#E9E1D6] relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#2D2926] hover:bg-black text-[#FAF7F2]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-[#E9E1D6] pb-3">
          <ImageIcon className="w-6 h-6 text-[#C85C5C]" />
          <h3 className="font-serif font-bold text-[#2D2926] text-xl">
            Add New Shared Memory 📸
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Box */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926]">Photo File</label>
            {imageSrc ? (
              <div className="relative aspect-[4/3] overflow-hidden border border-[#E9E1D6] group">
                <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-sans uppercase tracking-widest font-bold cursor-pointer transition-opacity">
                  <span>Change Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="border-2 border-dashed border-[#E9E1D6] p-6 flex flex-col items-center justify-center text-center bg-[#F5EFEE] hover:bg-[#E9E1D6]/50 transition-colors cursor-pointer space-y-2">
                <Upload className="w-8 h-8 text-[#C85C5C] animate-bounce" />
                <span className="text-xs font-sans uppercase tracking-widest font-bold text-[#2D2926]">
                  Click to Upload Photo From Device
                </span>
                <span className="text-[10px] text-[#A89F91] font-sans">
                  Select your favorite selfie, cafe date, or portrait
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
              Memory Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cafe Mirror Selfie with Peace Signs ✌️"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
              Heartfelt Caption
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Standing together in front of the mirror, matching fits..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
              />
            </div>
          </div>

          {/* Sticker choices */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
              Add Cute Stickers
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-[#E9E1D6]">
              {stickerOptions.map((stk) => {
                const selected = stickers.includes(stk);
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

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E9E1D6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-[#E9E1D6] text-[#2D2926] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C85C5C] text-white text-xs font-sans uppercase font-bold tracking-wider shadow-md hover:bg-[#b04b4b] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Memory To Wall</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
