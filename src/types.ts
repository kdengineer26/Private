export type ThemeColor = "rose" | "lavender" | "warm-vintage" | "sunset" | "peach";

export interface MemoryPhoto {
  id: string;
  url: string; // Base64 or object URL
  title: string;
  date: string;
  location: string;
  caption: string;
  tapeColor: "pink" | "yellow" | "washi-floral" | "teal" | "gold";
  rotation: number; // degrees e.g. -4 to 4
  frameStyle: "polaroid" | "vintage" | "film" | "floral" | "heart";
  stickers: string[]; // e.g. ['💖', '✨', '🏎️', '☕', '🌸']
  favorite?: boolean;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon name
  redeemed: boolean;
  redeemedDate?: string;
  code: string;
  color: string;
}

export interface ReasonItem {
  id: string;
  number: number;
  text: string;
  category: "sweet" | "funny" | "deep" | "cute";
  icon: string;
}

export interface BucketItem {
  id: string;
  title: string;
  category: "travel" | "date" | "cozy" | "adventure";
  completed: boolean;
  notes?: string;
}

export interface LoveLetter {
  title: string;
  content: string;
  girlfriendName: string;
  senderName: string;
  date: string;
}

export interface ScrapbookData {
  girlfriendName: string;
  senderName: string;
  anniversaryDate: string;
  passcode: string;
  theme: ThemeColor;
  bgMusicEnabled: boolean;
  photos: MemoryPhoto[];
  coupons: LoveCoupon[];
  reasons: ReasonItem[];
  bucketList: BucketItem[];
  letter: LoveLetter;
}
