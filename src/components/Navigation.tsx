import React from "react";
import {
  Camera,
  Heart,
  Ticket,
  Sparkles,
  Plane,
  Volume2,
  VolumeX,
  PlusCircle,
  Settings,
  Share2,
} from "lucide-react";
import { soundManager } from "../utils/audio";

export type TabType = "photos" | "letter" | "coupons" | "reasons" | "bucket";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onAddPhoto: () => void;
  onOpenSettings: () => void;
  girlfriendName: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  isMusicPlaying,
  onToggleMusic,
  onAddPhoto,
  onOpenSettings,
  girlfriendName,
}) => {
  const tabs = [
    { id: "photos" as TabType, label: "Memory Wall", icon: Camera },
    { id: "letter" as TabType, label: "Love Letter", icon: Heart },
    { id: "coupons" as TabType, label: "Love Coupons", icon: Ticket },
    { id: "reasons" as TabType, label: "Why I Love You", icon: Sparkles },
    { id: "bucket" as TabType, label: "Bucket List", icon: Plane },
  ];

  const handleTabChange = (tabId: TabType) => {
    soundManager.playPaperFlip();
    setActiveTab(tabId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E9E1D6] px-4 py-3 shadow-2xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C85C5C] text-white flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 fill-white text-[#C85C5C]" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#A89F91]">
              A DIGITAL KEEPSAKE &copy; 2026
            </div>
            <h1 className="font-serif text-lg md:text-xl font-bold text-[#2D2926] flex items-center gap-2">
              <span className="italic">{girlfriendName || "My Sweetheart"}'s Scrapbook</span>
              <span className="text-[10px] uppercase tracking-widest font-sans px-2 py-0.5 bg-[#C85C5C]/10 text-[#C85C5C] border border-[#C85C5C]/30 font-bold">
                08.01
              </span>
            </h1>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <nav className="flex items-center bg-[#E5E1DA]/60 p-1 border border-[#E9E1D6] overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-sans tracking-wide transition-all whitespace-nowrap cursor-pointer uppercase ${
                  isActive
                    ? "bg-[#2D2926] text-[#FAF7F2] font-bold shadow-xs"
                    : "text-[#4A443F] hover:text-[#2D2926] hover:bg-white/50 font-medium"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C85C5C]" : "text-[#A89F91]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Background Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? "Mute Barbaad (Saiyaara)" : "Play Barbaad (Saiyaara)"}
            className={`p-2 text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
              isMusicPlaying
                ? "bg-[#C85C5C] text-white border-[#C85C5C] shadow-xs animate-pulse"
                : "bg-white text-[#2D2926] border-[#E9E1D6] hover:bg-[#FAF7F2]"
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="hidden lg:inline text-xs font-sans tracking-wider uppercase font-bold">Barbaad • Saiyaara</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden lg:inline text-xs font-sans tracking-wider uppercase">Play Barbaad</span>
              </>
            )}
          </button>

          {/* Add Photo Button */}
          <button
            onClick={onAddPhoto}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white text-xs uppercase font-bold tracking-wider shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Memory</span>
          </button>

          {/* Settings Modal Button */}
          <button
            onClick={onOpenSettings}
            title="Edit Names, Passcode & Letter"
            className="p-2 bg-white text-[#2D2926] border border-[#E9E1D6] hover:bg-[#FAF7F2] text-xs transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
