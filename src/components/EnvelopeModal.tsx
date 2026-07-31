import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Heart, Lock, Sparkles, KeyRound } from "lucide-react";
import { soundManager } from "../utils/audio";

interface EnvelopeModalProps {
  girlfriendName: string;
  senderName: string;
  passcode?: string;
  onOpen: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  girlfriendName,
  senderName,
  passcode,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputPass, setInputPass] = useState("");
  const [passError, setPassError] = useState(false);

  const handleUnseal = () => {
    if (passcode && passcode.trim() !== "") {
      if (inputPass.toLowerCase().trim() !== passcode.toLowerCase().trim()) {
        setPassError(true);
        soundManager.playPop();
        return;
      }
    }

    setPassError(false);
    setIsOpen(true);
    soundManager.playSparkle();
    soundManager.playPaperFlip();

    // Trigger sweet heart confetti burst
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#ec4899", "#fb7185", "#ffd1dc", "#e11d48"],
        shapes: ["circle", "square"],
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2926] p-4 overflow-hidden select-none">
      {/* Background typographic accent watermark */}
      <div className="absolute inset-0 flex items-center justify-center text-[280px] font-serif font-bold text-white/5 pointer-events-none select-none">
        08.01
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-lg w-full text-center z-10"
      >
        {/* Top greeting badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF7F2]/10 border border-[#FAF7F2]/20 backdrop-blur-md text-[#FAF7F2] text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C85C5C]" />
          <span>NATIONAL GIRLFRIEND DAY SPECIAL • AUGUST 1ST</span>
        </div>

        {/* Envelope Container */}
        <div className="relative mx-auto w-full max-w-md bg-[#FAF7F2] border border-[#E9E1D6] p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Top Triangle Flap */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                exit={{ rotateX: 180, y: -60, opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute top-0 left-0 right-0 h-32 bg-[#F5EFEE] border-b border-[#E9E1D6] shadow-sm origin-top flex items-center justify-center clip-path-triangle"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            )}
          </AnimatePresence>

          {/* To & From Label */}
          <div className="relative z-10 pt-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#A89F91] font-bold block mb-2">
              CONFIDENTIAL & FOR HER EYES ONLY 💌
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#2D2926] font-bold tracking-tight">
              To: <span className="italic text-[#C85C5C]">{girlfriendName || "My Sweetheart"}</span>
            </h1>
            <p className="text-[#4A443F] text-sm italic font-serif mt-2">
              From: {senderName || "Bunny"}
            </p>
            <div className="h-[1px] w-16 bg-[#C85C5C] mx-auto my-4" />
          </div>

          {/* Passcode Input if enabled */}
          {passcode && passcode.trim() !== "" && !isOpen && (
            <div className="relative z-20 my-3 px-4">
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#4A443F] mb-1.5 flex items-center justify-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-[#C85C5C]" />
                Enter Secret Passcode:
              </label>
              <input
                type="password"
                value={inputPass}
                onChange={(e) => {
                  setInputPass(e.target.value);
                  setPassError(false);
                }}
                placeholder="Passcode..."
                className={`w-full text-center px-3 py-2 text-sm bg-white border ${
                  passError ? "border-[#C85C5C] text-[#C85C5C]" : "border-[#E9E1D6] text-[#2D2926]"
                } focus:outline-none focus:border-[#2D2926]`}
              />
              {passError && (
                <p className="text-xs text-[#C85C5C] font-bold mt-1.5">
                  Incorrect passcode. Please try again 💕
                </p>
              )}
            </div>
          )}

          {/* Wax Seal Button */}
          <div className="relative z-20 pt-2 pb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnseal}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase font-bold tracking-widest text-xs shadow-xl cursor-pointer overflow-hidden border border-[#C85C5C]"
            >
              <Heart className="w-4 h-4 text-white fill-white animate-bounce" />
              <span>
                {isOpen ? "Unsealing Scrapbook..." : "Break Wax Seal & Open 💖"}
              </span>
            </motion.button>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-[#A89F91] font-sans font-bold z-10 pt-2">
            Tap wax seal to unseal our memory scrapbook
          </p>
        </div>
      </motion.div>
    </div>
  );
};
