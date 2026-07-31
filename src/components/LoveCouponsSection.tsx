import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { LoveCoupon } from "../types";
import {
  Ticket,
  Heart,
  Sparkles,
  Coffee,
  Film,
  Crown,
  Gift,
  UtensilsCrossed,
  ShoppingBag,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface LoveCouponsSectionProps {
  coupons: LoveCoupon[];
  onToggleRedeem: (id: string) => void;
  onAddCoupon: (coupon: LoveCoupon) => void;
  girlfriendName: string;
}

export const LoveCouponsSection: React.FC<LoveCouponsSectionProps> = ({
  coupons,
  onToggleRedeem,
  onAddCoupon,
  girlfriendName,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return Heart;
      case "Film":
        return Film;
      case "Coffee":
        return Coffee;
      case "Crown":
        return Crown;
      case "Gift":
        return Gift;
      case "UtensilsCrossed":
        return UtensilsCrossed;
      case "ShoppingBag":
        return ShoppingBag;
      default:
        return Sparkles;
    }
  };

  const handleRedeem = (coupon: LoveCoupon) => {
    soundManager.playSparkle();
    onToggleRedeem(coupon.id);

    if (!coupon.redeemed) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#f43f5e", "#ec4899", "#a855f7", "#eab308"],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    soundManager.playSparkle();
    const created: LoveCoupon = {
      id: "coupon-" + Date.now(),
      title: newTitle,
      description: newDesc || "Redeem this special love coupon anytime!",
      iconName: "Heart",
      redeemed: false,
      code: "LOVE-" + Math.floor(1000 + Math.random() * 9000),
      color: "from-rose-400 to-pink-500",
    };

    onAddCoupon(created);
    setNewTitle("");
    setNewDesc("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#F5EFEE] text-[#2D2926] p-8 border border-[#E9E1D6] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C85C5C]/10 border border-[#C85C5C]/30 text-[#C85C5C] text-[10px] font-sans uppercase tracking-[0.25em] font-bold mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>VIP GIRLFRIEND PRIVILEGES</span>
          </div>
          <h2 className="font-serif text-3xl font-bold">
            Interactive Love Coupons <span className="italic text-[#C85C5C]">🎟️</span>
          </h2>
          <p className="text-xs uppercase tracking-wider text-[#A89F91] font-sans font-bold mt-1 max-w-lg">
            Non-expiring romantic coupons valid 24/7! Click "Redeem Coupon" whenever you want to claim your prize, {girlfriendName || "my love"}.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playPop();
            setShowAddModal(true);
          }}
          className="px-5 py-2.5 bg-[#C85C5C] hover:bg-[#b04b4b] text-white font-sans uppercase font-bold text-xs tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Custom Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => {
          const IconComponent = getIcon(coupon.iconName);
          return (
            <motion.div
              key={coupon.id}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-[#FAF7F2] p-6 shadow-md border overflow-hidden transition-all flex flex-col justify-between ${
                coupon.redeemed
                  ? "border-[#E9E1D6] opacity-75"
                  : "border-[#E9E1D6]"
              }`}
            >
              {/* Left Color Ribbon */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-2.5 ${coupon.redeemed ? "bg-[#A89F91]" : "bg-[#C85C5C]"}`}
              />

              <div className="pl-2">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-[#2D2926] text-[#FAF7F2] flex items-center justify-center shadow-md`}
                    >
                      <IconComponent className="w-6 h-6 text-[#C85C5C]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-[#C85C5C] bg-[#C85C5C]/10 px-2 py-0.5 border border-[#C85C5C]/30">
                        {coupon.code}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#2D2926] mt-1">
                        {coupon.title}
                      </h3>
                    </div>
                  </div>

                  {coupon.redeemed && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-sans tracking-wider font-bold text-[#2D2926] bg-[#E9E1D6] px-2.5 py-1 border border-[#A89F91]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C85C5C]" />
                      Redeemed!
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#4A443F] leading-relaxed">
                  {coupon.description}
                </p>
              </div>

              {/* Redeem Button */}
              <div className="mt-6 pt-4 border-t border-[#E9E1D6] flex items-center justify-between pl-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#A89F91]">
                  Valid Anytime • Lifetime Guarantee
                </span>

                <button
                  onClick={() => handleRedeem(coupon)}
                  className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                    coupon.redeemed
                      ? "bg-[#E9E1D6] text-[#2D2926] hover:bg-[#d9d0c2]"
                      : "bg-[#C85C5C] text-white hover:bg-[#b04b4b] shadow-xs"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{coupon.redeemed ? "Mark Unused" : "Redeem Now 💕"}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Custom Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <form
            onSubmit={handleCreateCoupon}
            className="bg-[#FAF7F2] p-6 max-w-md w-full space-y-4 shadow-2xl border border-[#E9E1D6]"
          >
            <h3 className="font-serif font-bold text-[#2D2926] text-xl border-b border-[#E9E1D6] pb-2">
              Create A Custom Love Coupon 🎟️
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Coupon Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1x Homemade Dinner of Her Choice"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 border border-[#E9E1D6] text-xs bg-white text-[#2D2926]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2926] mb-1">
                Description / Terms
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Valid for any day when she wants me to cook her favorite meal!"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
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
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
