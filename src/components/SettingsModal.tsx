import React, { useState } from "react";
import { ScrapbookData } from "../types";
import { X, Save, Lock, Heart, RefreshCw, KeyRound } from "lucide-react";
import { soundManager } from "../utils/audio";

interface SettingsModalProps {
  data: ScrapbookData;
  onSave: (updated: Partial<ScrapbookData>) => void;
  onReset: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  data,
  onSave,
  onReset,
  onClose,
}) => {
  const [gfName, setGfName] = useState(data.girlfriendName);
  const [sName, setSName] = useState(data.senderName);
  const [pass, setPass] = useState(data.passcode || "");
  const [anniv, setAnniv] = useState(data.anniversaryDate || "2024-08-01");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSparkle();
    onSave({
      girlfriendName: gfName,
      senderName: sName,
      passcode: pass,
      anniversaryDate: anniv,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-[#FAF7F2] p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-[#E9E1D6] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#2D2926] hover:bg-black text-[#FAF7F2]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-[#E9E1D6] pb-3">
          <Heart className="w-6 h-6 text-[#C85C5C] fill-[#C85C5C]" />
          <h3 className="font-serif font-bold text-[#2D2926] text-xl">Scrapbook Settings ⚙️</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
              Girlfriend's Name / Nickname
            </label>
            <input
              type="text"
              value={gfName}
              onChange={(e) => setGfName(e.target.value)}
              placeholder="e.g. My Love, Sweetheart, Her Name"
              className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
              Your Name (Bunny)
            </label>
            <input
              type="text"
              value={sName}
              onChange={(e) => setSName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#C85C5C]" />
              <span>Optional Secret Passcode for Envelope Lock</span>
            </label>
            <input
              type="text"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Leave blank for no password, or set e.g. 'august1'"
              className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
            />
            <p className="text-[10px] font-sans text-[#A89F91] mt-1">
              If set, she will need to enter this secret code to open the envelope!
            </p>
          </div>

          <div className="pt-4 border-t border-[#E9E1D6] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset scrapbook to initial sample state?")) {
                  onReset();
                  onClose();
                }
              }}
              className="px-3 py-1.5 text-[#C85C5C] hover:bg-[#C85C5C]/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Sample Memories</span>
            </button>

            <div className="flex gap-2">
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
                <Save className="w-3.5 h-3.5" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
