import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { ReasonItem } from "../types";
import { Heart, Sparkles, Shuffle, Plus, Gift, Check } from "lucide-react";
import { soundManager } from "../utils/audio";

interface ReasonsJarProps {
  reasons: ReasonItem[];
  onAddReason: (reason: ReasonItem) => void;
  girlfriendName: string;
}

export const ReasonsJar: React.FC<ReasonsJarProps> = ({
  reasons,
  onAddReason,
  girlfriendName,
}) => {
  const [selectedReason, setSelectedReason] = useState<ReasonItem | null>(null);
  const [drawnIds, setDrawnIds] = useState<string[]>([]);
  const [newText, setNewText] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const drawRandomReason = () => {
    soundManager.playSparkle();

    // Pick reason that hasn't been drawn yet if possible
    const available = reasons.filter((r) => !drawnIds.includes(r.id));
    const pool = available.length > 0 ? available : reasons;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];

    setSelectedReason(chosen);
    setDrawnIds((prev) => [...prev, chosen.id]);

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.5 },
        colors: ["#fb7185", "#f43f5e", "#fda4af"],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddReasonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    soundManager.playSparkle();
    const created: ReasonItem = {
      id: "reason-" + Date.now(),
      number: reasons.length + 1,
      text: newText,
      category: "sweet",
      icon: "💖",
    };

    onAddReason(created);
    setSelectedReason(created);
    setNewText("");
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Banner */}
      <div className="bg-[#F5EFEE] text-[#2D2926] p-8 border border-[#E9E1D6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85C5C]/10 border border-[#C85C5C]/30 text-[#C85C5C] text-[10px] font-sans uppercase tracking-[0.25em] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE MEMORY JAR OF AFFECTION</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">
            Reasons Why I Love You <span className="italic text-[#C85C5C]">🏺</span>
          </h2>
          <p className="text-xs uppercase tracking-wider text-[#A89F91] font-sans font-bold mt-1 max-w-lg">
            Tap the glass jar or click the button below to draw a sweet love note from our collection of reasons why you mean the world to me.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase font-bold text-xs tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Reason</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Animated Glass Love Jar Graphic */}
        <div className="flex flex-col items-center justify-center p-8 bg-[#F5EFEE] border border-[#E9E1D6] shadow-xs space-y-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={drawRandomReason}
            className="relative w-56 h-72 bg-[#FAF7F2] border-2 border-[#2D2926] shadow-xl p-4 flex flex-col justify-end items-center cursor-pointer overflow-hidden group"
          >
            {/* Jar Lid */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-44 h-8 bg-[#2D2926] text-[#FAF7F2] border border-[#2D2926] shadow-md flex items-center justify-center">
              <span className="text-[10px] font-sans font-bold text-[#FAF7F2] tracking-[0.25em] uppercase">
                JAR OF HEARTS
              </span>
            </div>

            {/* Glowing inner hearts in the jar */}
            <div className="w-full h-full flex flex-wrap content-end justify-center gap-2 p-2 opacity-90">
              {reasons.slice(0, 18).map((r, i) => (
                <motion.div
                  key={r.id}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-9 h-9 bg-[#C85C5C] text-white flex items-center justify-center text-sm shadow-sm border border-white/40"
                >
                  {r.icon || "💖"}
                </motion.div>
              ))}
            </div>

            {/* Shine overlay */}
            <div className="absolute top-0 right-0 bottom-0 left-2/3 bg-white/20 transform -skew-x-12 pointer-events-none" />
          </motion.div>

          {/* Draw Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={drawRandomReason}
            className="px-8 py-3.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase tracking-widest font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4 animate-spin-slow" />
            <span>Draw A Love Note 💕</span>
          </motion.button>
        </div>

        {/* Drawn Note Display Card */}
        <div>
          <AnimatePresence mode="wait">
            {selectedReason ? (
              <motion.div
                key={selectedReason.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="bg-[#FAF7F2] p-8 shadow-xl border border-[#E9E1D6] relative space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E9E1D6] pb-3">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#A89F91]">
                    REASON #{selectedReason.number || "SPECIAL"}
                  </span>
                  <span className="text-2xl">{selectedReason.icon || "💖"}</span>
                </div>

                <p className="font-serif text-xl md:text-2xl font-bold text-[#2D2926] leading-relaxed italic">
                  "{selectedReason.text}"
                </p>

                <div className="pt-4 flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider text-[#A89F91] border-t border-[#E9E1D6]">
                  <span>WITH ALL MY LOVE</span>
                  <span>AUGUST 1ST • GF DAY</span>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#FAF7F2] p-8 border border-dashed border-[#C85C5C]/50 text-center space-y-3 text-[#2D2926]">
                <Gift className="w-10 h-10 mx-auto text-[#C85C5C] animate-bounce" />
                <h3 className="font-serif font-bold text-lg text-[#2D2926]">
                  Tap The Glass Jar To Unfold A Note!
                </h3>
                <p className="text-xs text-[#4A443F]">
                  There are {reasons.length} handwritten reasons waiting inside the jar for {girlfriendName || "you"}.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Custom Reason Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form
            onSubmit={handleAddReasonSubmit}
            className="bg-[#FAF7F2] p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#E9E1D6]"
          >
            <h3 className="font-serif font-bold text-[#2D2926] text-xl border-b border-[#E9E1D6] pb-2">
              Add A Reason Why You Love Her 💖
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Your Reason
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Because her smile instantly makes my day 100x better..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-white border border-[#E9E1D6] text-[#2D2926] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#C85C5C] text-white text-xs font-sans uppercase font-bold tracking-wider shadow-md hover:bg-[#b04b4b] transition-all cursor-pointer"
              >
                Save To Jar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
