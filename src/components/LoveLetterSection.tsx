import React, { useState } from "react";
import { motion } from "motion/react";
import { LoveLetter } from "../types";
import {
  Heart,
  Sparkles,
  Edit3,
  Copy,
  Check,
  Printer,
  Wand2,
  Send,
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface LoveLetterSectionProps {
  letter: LoveLetter;
  onSaveLetter: (updated: LoveLetter) => void;
  girlfriendName: string;
  senderName: string;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({
  letter,
  onSaveLetter,
  girlfriendName,
  senderName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(letter.content);
  const [editedTitle, setEditedTitle] = useState(letter.title);
  const [copied, setCopied] = useState(false);

  // AI Modal state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiVibe, setAiVibe] = useState("Sweet, romantic, heartfelt");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    soundManager.playSparkle();
    onSaveLetter({
      ...letter,
      title: editedTitle,
      content: editedContent,
    });
    setIsEditing(false);
  };

  const handleCopy = () => {
    soundManager.playPop();
    navigator.clipboard.writeText(`${letter.title}\n\n${letter.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateLetter = async () => {
    setIsGenerating(true);
    soundManager.playSparkle();
    try {
      const response = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          girlfriendName: girlfriendName || "My Love",
          senderName: senderName || "Bunny",
          vibe: aiVibe,
          relationshipHighlights: "Shared mirror selfies, cafe coffee dates, wearing matching outfits, and unconditional love.",
        }),
      });

      const data = await response.json();
      if (data.letter) {
        setEditedContent(data.letter);
        onSaveLetter({
          ...letter,
          content: data.letter,
        });
        setIsAiOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#F5EFEE] text-[#2D2926] p-8 border border-[#E9E1D6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85C5C]/10 border border-[#C85C5C]/30 text-[#C85C5C] text-[10px] font-sans uppercase tracking-[0.25em] font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#C85C5C]" />
            <span>NATIONAL GIRLFRIEND DAY SPECIAL LETTER</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">
            A Heartfelt Note For You <span className="italic text-[#C85C5C]">💌</span>
          </h2>
          <p className="text-xs uppercase tracking-wider text-[#A89F91] font-sans font-bold mt-1 max-w-lg">
            A letter written from the bottom of my heart, celebrating everything that makes you so special to me.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              soundManager.playSparkle();
              setIsAiOpen(true);
            }}
            className="px-4 py-2 bg-[#C85C5C] text-white hover:bg-[#b04b4b] font-sans uppercase font-bold text-xs tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-white" />
            <span>Love Letter Writer</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2.5 bg-white border border-[#E9E1D6] hover:bg-[#FAF7F2] text-[#2D2926] transition-all cursor-pointer"
            title="Copy Letter Text"
          >
            {copied ? <Check className="w-4 h-4 text-[#C85C5C]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Letter Stationary Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-[#FAF7F2] p-8 md:p-12 shadow-xl border border-[#E9E1D6] space-y-6 overflow-hidden"
      >
        {/* Top Wax Seal Graphic */}
        <div className="flex justify-between items-start border-b border-[#E9E1D6] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#C85C5C] text-white flex items-center justify-center shadow-md border border-[#E9E1D6]">
              <Heart className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A89F91] font-sans font-bold block">
                DATE: {letter.date || "AUGUST 1ST"}
              </span>
              <p className="text-xs text-[#4A443F] font-serif italic">
                Seal of Endless Affection
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="px-4 py-2 bg-[#2D2926] hover:bg-[#1f1c1a] text-[#FAF7F2] font-sans uppercase tracking-wider font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#C85C5C]" />
            <span>{isEditing ? "Save Letter" : "Edit Letter"}</span>
          </button>
        </div>

        {/* Letter Title & Body */}
        {!isEditing ? (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#2D2926]">
              {letter.title}
            </h3>

            <div className="font-serif text-base md:text-lg text-[#2D2926] leading-relaxed whitespace-pre-wrap space-y-4 font-normal tracking-wide">
              {letter.content}
            </div>

            <div className="pt-8 border-t border-[#E9E1D6] text-right">
              <p className="font-serif italic text-lg text-[#4A443F]">
                With all my love,
              </p>
              <p className="font-serif text-2xl font-bold text-[#2D2926] mt-1">
                {senderName || letter.senderName || "Bunny"} <span className="text-[#C85C5C]">💖</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Letter Title
              </label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-4 py-2 border border-[#E9E1D6] text-[#2D2926] font-serif text-lg font-bold bg-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Letter Message
              </label>
              <textarea
                rows={12}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-4 py-3 border border-[#E9E1D6] text-[#2D2926] font-serif text-base bg-white focus:outline-none focus:border-[#2D2926]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase tracking-widest text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* AI Love Letter Modal */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#FAF7F2] p-6 md:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-[#E9E1D6]">
            <div className="flex items-center justify-between border-b border-[#E9E1D6] pb-3">
              <div className="flex items-center gap-2 text-[#2D2926] font-serif font-bold text-lg">
                <Sparkles className="w-5 h-5 text-[#C85C5C]" />
                <span>Heartfelt Love Letter Generator</span>
              </div>
              <button
                onClick={() => setIsAiOpen(false)}
                className="text-[#A89F91] hover:text-[#2D2926] text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#4A443F]">
              Enter any special memories or thoughts to craft a sweet, personalized romantic letter for {girlfriendName || "your girlfriend"}!
            </p>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Tone / Vibe
              </label>
              <select
                value={aiVibe}
                onChange={(e) => setAiVibe(e.target.value)}
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
              >
                <option value="Sweet, romantic, heartfelt">Sweet, romantic, heartfelt 💕</option>
                <option value="Poetic, deeply passionate">Poetic & deeply passionate 📜</option>
                <option value="Playful, cute, cheerful">Playful, cute & cheerful 😜</option>
                <option value="Short & touching">Short & touching 💌</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Special Details / Memories to Include (Optional)
              </label>
              <textarea
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. mention our mirror selfies, our coffee dates, her smile, and how much I love her..."
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs focus:outline-none focus:border-[#2D2926] bg-white text-[#2D2926]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAiOpen(false)}
                className="px-4 py-2 bg-white border border-[#E9E1D6] text-[#2D2926] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateLetter}
                disabled={isGenerating}
                className="px-5 py-2 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase tracking-widest text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? "Writing Letter..." : "Generate Letter"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
