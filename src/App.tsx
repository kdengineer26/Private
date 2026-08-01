import React, { useState, useEffect } from "react";
import { ScrapbookData, MemoryPhoto, LoveCoupon, ReasonItem, BucketItem, LoveLetter } from "./types";
import { initialScrapbookData } from "./data/initialData";
import { EnvelopeModal } from "./components/EnvelopeModal";
import { Navigation, TabType } from "./components/Navigation";
import { ScrapbookCanvas } from "./components/ScrapbookCanvas";
import { PhotoDetailModal } from "./components/PhotoDetailModal";
import { AddPhotoModal } from "./components/AddPhotoModal";
import { LoveLetterSection } from "./components/LoveLetterSection";
import { LoveCouponsSection } from "./components/LoveCouponsSection";
import { ReasonsJar } from "./components/ReasonsJar";
import { BucketListSection } from "./components/BucketListSection";
import { SettingsModal } from "./components/SettingsModal";
import { soundManager } from "./utils/audio";
import { Heart, Sparkles, Share2, Check } from "lucide-react";

export default function App() {
  // Load state from localStorage or initial defaults
  const [data, setData] = useState<ScrapbookData>(() => {
    try {
      const saved = localStorage.getItem("gf_scrapbook_data_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.passcode = "Nishudu_2266";
        if (!parsed.senderName || parsed.senderName === "Your Boyfriend" || parsed.senderName === "Your Loving Boyfriend") {
          parsed.senderName = "Bunny";
        }
        if (parsed.letter && (!parsed.letter.senderName || parsed.letter.senderName === "Your Loving Boyfriend" || parsed.letter.senderName === "Your Boyfriend")) {
          parsed.letter.senderName = "Bunny";
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load saved state:", e);
    }
    return initialScrapbookData;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("photos");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Modals state
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem("gf_scrapbook_data_v1", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }, [data]);

  const handleToggleMusic = () => {
    const playing = soundManager.toggleBackgroundMusic();
    setIsMusicPlaying(playing);
  };

  // Photo handlers
  const handleSavePhoto = (updatedPhoto: MemoryPhoto) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p)),
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    }));
  };

  const handleDeletePhoto = (id: string) => {
    setData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));
  };

  const handleAddPhoto = (newPhoto: MemoryPhoto) => {
    setData((prev) => ({
      ...prev,
      photos: [newPhoto, ...prev.photos],
    }));
  };

  // Love Coupon handlers
  const handleToggleCouponRedeem = (couponId: string) => {
    setData((prev) => ({
      ...prev,
      coupons: prev.coupons.map((c) =>
        c.id === couponId
          ? {
              ...c,
              redeemed: !c.redeemed,
              redeemedDate: !c.redeemed ? new Date().toLocaleDateString() : undefined,
            }
          : c
      ),
    }));
  };

  const handleAddCoupon = (newCoupon: LoveCoupon) => {
    setData((prev) => ({
      ...prev,
      coupons: [newCoupon, ...prev.coupons],
    }));
  };

  // Reasons handlers
  const handleAddReason = (newReason: ReasonItem) => {
    setData((prev) => ({
      ...prev,
      reasons: [newReason, ...prev.reasons],
    }));
  };

  // Bucket list handlers
  const handleToggleBucketComplete = (id: string) => {
    setData((prev) => ({
      ...prev,
      bucketList: prev.bucketList.map((b) =>
        b.id === id ? { ...b, completed: !b.completed } : b
      ),
    }));
  };

  const handleAddBucketItem = (newItem: BucketItem) => {
    setData((prev) => ({
      ...prev,
      bucketList: [...prev.bucketList, newItem],
    }));
  };

  // Settings & Letter handlers
  const handleSaveSettings = (updatedPartial: Partial<ScrapbookData>) => {
    setData((prev) => ({
      ...prev,
      ...updatedPartial,
    }));
  };

  const handleReset = () => {
    setData(initialScrapbookData);
    localStorage.removeItem("gf_scrapbook_data_v1");
  };

  const handleShareApp = () => {
    soundManager.playSparkle();
    const publicUrl = "https://ais-pre-irxpabs2oidvjmepuyolnl-149225721923.asia-southeast1.run.app";
    
    if (navigator.share) {
      navigator.share({
        title: `${data.girlfriendName || "My Sweetheart"}'s Memory Scrapbook 💖`,
        text: `A digital keepsake created especially for ${data.girlfriendName || "My Sweetheart"} 💕`,
        url: publicUrl,
      }).catch((e) => {
        console.log("Native share cancelled or failed:", e);
      });
    } else {
      navigator.clipboard.writeText(publicUrl);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2926] font-sans selection:bg-[#C85C5C]/20 selection:text-[#C85C5C] pb-16">
      {/* Interactive Envelope Sealed Entrance */}
      {!isEnvelopeOpen && (
        <EnvelopeModal
          girlfriendName={data.girlfriendName}
          senderName={data.senderName}
          passcode={data.passcode}
          onOpen={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* Main App Content */}
      {isEnvelopeOpen && (
        <div className="animate-fade-in">
          {/* Header Navigation */}
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            onAddPhoto={() => setShowAddPhotoModal(true)}
            onOpenSettings={() => setShowSettingsModal(true)}
            girlfriendName={data.girlfriendName}
          />

          {/* Toast Notice */}
          {sharedToast && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#2D2926] text-[#FAF7F2] px-5 py-3 border border-[#C85C5C] shadow-2xl flex items-center gap-2 text-xs font-bold font-sans tracking-wide uppercase animate-bounce">
              <Check className="w-4 h-4 text-[#C85C5C]" />
              <span>Scrapbook Link Copied! Send it to your girlfriend 💕</span>
            </div>
          )}

          {/* Main Content Area */}
          <main className="max-w-6xl mx-auto px-4 py-8">
            {activeTab === "photos" && (
              <ScrapbookCanvas
                photos={data.photos}
                onSelectPhoto={(photo) => setSelectedPhoto(photo)}
                onAddPhotoClick={() => setShowAddPhotoModal(true)}
                onToggleFavorite={handleToggleFavorite}
                onDeletePhoto={handleDeletePhoto}
              />
            )}

            {activeTab === "letter" && (
              <LoveLetterSection
                letter={data.letter}
                onSaveLetter={(updatedLetter) =>
                  setData((prev) => ({ ...prev, letter: updatedLetter }))
                }
                girlfriendName={data.girlfriendName}
                senderName={data.senderName}
              />
            )}

            {activeTab === "coupons" && (
              <LoveCouponsSection
                coupons={data.coupons}
                onToggleRedeem={handleToggleCouponRedeem}
                onAddCoupon={handleAddCoupon}
                girlfriendName={data.girlfriendName}
              />
            )}

            {activeTab === "reasons" && (
              <ReasonsJar
                reasons={data.reasons}
                onAddReason={handleAddReason}
                girlfriendName={data.girlfriendName}
              />
            )}

            {activeTab === "bucket" && (
              <BucketListSection
                items={data.bucketList}
                onToggleComplete={handleToggleBucketComplete}
                onAddItem={handleAddBucketItem}
              />
            )}
          </main>

          {/* Bottom Share Floating Button */}
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={handleShareApp}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase tracking-widest text-xs font-bold shadow-xl transition-all cursor-pointer border border-[#C85C5C]"
            >
              <Share2 className="w-4 h-4" />
              <span>Share With Her</span>
            </button>
          </div>

          {/* Footer */}
          <footer className="text-center py-8 text-xs text-[#A89F91] uppercase tracking-[0.2em] font-sans font-bold border-t border-[#E9E1D6] max-w-4xl mx-auto mt-12">
            <p>DESIGNED FOR NATIONAL GIRLFRIEND DAY • AUGUST 1ST • FOREVER & ALWAYS</p>
          </footer>
        </div>
      )}

      {/* Modals */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onSavePhoto={handleSavePhoto}
          onDeletePhoto={handleDeletePhoto}
        />
      )}

      {showAddPhotoModal && (
        <AddPhotoModal
          onAddPhoto={handleAddPhoto}
          onClose={() => setShowAddPhotoModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal
          data={data}
          onSave={handleSaveSettings}
          onReset={handleReset}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}
