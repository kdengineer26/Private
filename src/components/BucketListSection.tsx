import React, { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { BucketItem } from "../types";
import { Plane, CheckCircle2, Circle, Plus, Sparkles } from "lucide-react";
import { soundManager } from "../utils/audio";

interface BucketListSectionProps {
  items: BucketItem[];
  onToggleComplete: (id: string) => void;
  onAddItem: (item: BucketItem) => void;
}

export const BucketListSection: React.FC<BucketListSectionProps> = ({
  items,
  onToggleComplete,
  onAddItem,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const handleToggle = (item: BucketItem) => {
    soundManager.playSparkle();
    onToggleComplete(item.id);

    if (!item.completed) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#818cf8", "#c084fc", "#f43f5e"],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    soundManager.playSparkle();
    const created: BucketItem = {
      id: "bucket-" + Date.now(),
      title,
      category: "adventure",
      completed: false,
      notes: notes.trim() ? notes : undefined,
    };

    onAddItem(created);
    setTitle("");
    setNotes("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-[#F5EFEE] text-[#2D2926] p-8 border border-[#E9E1D6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85C5C]/10 border border-[#C85C5C]/30 text-[#C85C5C] text-[10px] font-sans uppercase tracking-[0.25em] font-bold mb-2">
            <Plane className="w-3.5 h-3.5" />
            <span>FUTURE TOGETHER</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">
            Our Relationship Bucket List <span className="italic text-[#C85C5C]">✈️</span>
          </h2>
          <p className="text-xs uppercase tracking-wider text-[#A89F91] font-sans font-bold mt-1 max-w-lg">
            All the adventures, cozy dates, and unforgettable memories we are going to create together!
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase font-bold text-xs tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Bucket List Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => handleToggle(item)}
            className={`p-4 md:p-5 border transition-all cursor-pointer flex items-start gap-4 ${
              item.completed
                ? "bg-[#E9E1D6]/40 border-[#E9E1D6] opacity-80"
                : "bg-[#FAF7F2] border-[#E9E1D6] shadow-xs hover:border-[#2D2926]"
            }`}
          >
            <button className="mt-0.5 text-[#A89F91] hover:text-[#C85C5C] transition-colors">
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-[#C85C5C] fill-[#C85C5C]/20" />
              ) : (
                <Circle className="w-6 h-6 text-[#E9E1D6]" />
              )}
            </button>

            <div className="flex-1">
              <h3
                className={`font-serif font-bold text-base md:text-lg ${
                  item.completed ? "text-[#4A443F] line-through" : "text-[#2D2926]"
                }`}
              >
                {item.title}
              </h3>

              {item.notes && (
                <p className="text-xs text-[#4A443F] mt-1 italic">Note: {item.notes}</p>
              )}
            </div>

            {item.completed && (
              <span className="text-[10px] uppercase font-sans tracking-wider font-bold text-[#2D2926] bg-[#E9E1D6] px-2.5 py-1 border border-[#A89F91] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C85C5C]" />
                Done!
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Bucket Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#FAF7F2] p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#E9E1D6]"
          >
            <h3 className="font-serif font-bold text-[#2D2926] text-xl border-b border-[#E9E1D6] pb-2">
              Add To Couple Bucket List ✈️
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Goal / Dream Task
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Travel to Japan during cherry blossom season"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Notes / Ideas (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Take lots of photos together!"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
