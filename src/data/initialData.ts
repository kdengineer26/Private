import { ScrapbookData } from "../types";

// High-quality SVG visual illustrations representing the 11 uploaded couple photos
const createPhotoPlaceholder = (title: string, color1: string, color2: string, emoji: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
      </filter>
    </defs>
    <rect width="600" height="750" fill="url(#grad)" />
    <!-- Decorative romantic elements -->
    <circle cx="150" cy="150" r="100" fill="white" opacity="0.1" />
    <circle cx="480" cy="620" r="120" fill="white" opacity="0.1" />
    <g transform="translate(300, 320)" text-anchor="middle" filter="url(#shadow)">
      <text font-size="110" y="0">${emoji}</text>
      <text font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="700" fill="#2d2d2d" y="100">${title}</text>
      <text font-family="'Playfair Display', serif" font-size="20" font-weight="500" fill="#555" y="140">Click 'Upload Real Photo' to replace!</text>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const initialScrapbookData: ScrapbookData = {
  girlfriendName: "My Sweetheart",
  senderName: "Bunny",
  anniversaryDate: "2024-08-01",
  passcode: "Nishudu_2266",
  theme: "rose",
  bgMusicEnabled: false,
  photos: [
    {
      id: "photo-1",
      url: createPhotoPlaceholder("Ferrari Sweatshirt Selfie", "#ffe4e6", "#fbcfe8", "🏎️"),
      title: "Iconic Ferrari Fit & Cheek Squeeze 🏎️",
      date: "Recent Date",
      location: "Mirror Selfie Moment",
      caption: "You rocking the Ferrari sweatshirt, me in my checkered shirt, and that cute face squeeze! Pure happiness.",
      tapeColor: "pink",
      rotation: -2,
      frameStyle: "polaroid",
      stickers: ["❤️", "🏎️", "✨"],
      favorite: true,
    },
    {
      id: "photo-2",
      url: createPhotoPlaceholder("Cafe Sitting Peace Sign", "#fef3c7", "#fde68a", "☕"),
      title: "Cafe Date & Peace Signs ✌️",
      date: "Cafe Afternoon",
      location: "Our Favorite Spot",
      caption: "Sitting together with coffee, art on the walls, and your beautiful smile brightening the whole room.",
      tapeColor: "yellow",
      rotation: 3,
      frameStyle: "floral",
      stickers: ["☕", "✌️", "🌸"],
      favorite: true,
    },
    {
      id: "photo-3",
      url: createPhotoPlaceholder("Floral Mirror Crochet", "#dbeafe", "#bfdbfe", "🌼"),
      title: "Knots & Co Crochet Flower Arch 💐",
      date: "Shopping Date",
      location: "Floral Mirror",
      caption: "Surrounded by colorful knitted flowers, but you are still the prettiest blossom in the room.",
      tapeColor: "washi-floral",
      rotation: -3,
      frameStyle: "vintage",
      stickers: ["🌼", "💖", "🌷"],
      favorite: true,
    },
    {
      id: "photo-4",
      url: createPhotoPlaceholder("Royal Blue Ethnic Kurti", "#e0e7ff", "#c7d2fe", "👑"),
      title: "Royal Blue & White Elegance 👑",
      date: "Festive Celebration",
      location: "Our Special Event",
      caption: "You in your royal blue embroidered kurti, me in my crisp white shirt. You looked like royalty!",
      tapeColor: "teal",
      rotation: 2,
      frameStyle: "heart",
      stickers: ["👑", "💙", "✨"],
      favorite: true,
    },
    {
      id: "photo-5",
      url: createPhotoPlaceholder("Maybach Rooftop B&W", "#f3f4f6", "#e5e7eb", "🥂"),
      title: "Black & White Rooftop Maybach 🖤",
      date: "Evening Out",
      location: "Maybach Rooftop Lounge",
      caption: "Black turtleneck, stylish cap, and rooftop lights. A classic black and white memory I'll treasure forever.",
      tapeColor: "gold",
      rotation: -1,
      frameStyle: "film",
      stickers: ["🖤", "🥂", "🌟"],
      favorite: true,
    },
    {
      id: "photo-6",
      url: createPhotoPlaceholder("Crochet Flower Mirror Stand", "#fef2f2", "#fecdd3", "🌺"),
      title: "Full Length Floral Mirror Pose 🌹",
      date: "Mall Afternoon",
      location: "Crochet Mirror Stand",
      caption: "Standing side by side, matching dark blue denim aesthetics. You have the best fashion sense!",
      tapeColor: "pink",
      rotation: 3,
      frameStyle: "polaroid",
      stickers: ["🌺", "🕶️", "💫"],
    },
    {
      id: "photo-7",
      url: createPhotoPlaceholder("Cafe Standing Hug", "#ecfdf5", "#a7f3d0", "🤍"),
      title: "Cafe Hugs & Playful Poses 😚",
      date: "Coffee & Chats",
      location: "Mural Wall Cafe",
      caption: "Peace sign in blue sweater while I stand right behind you holding you close. My happy place.",
      tapeColor: "washi-floral",
      rotation: -2,
      frameStyle: "polaroid",
      stickers: ["🤍", "☕", "🎀"],
    },
    {
      id: "photo-8",
      url: createPhotoPlaceholder("Sunny Outdoor Selfie", "#fffbeb", "#fde68a", "☀️"),
      title: "Sunny Outdoor Sunglasses Date ☀️",
      date: "Sunny Morning",
      location: "Garden Courtyard",
      caption: "Cool round sunglasses, green palm trees in the background, and your sunny smile warming my heart.",
      tapeColor: "yellow",
      rotation: 1,
      frameStyle: "vintage",
      stickers: ["☀️", "🕶️", "🌴"],
    },
    {
      id: "photo-9",
      url: createPhotoPlaceholder("Cozy Cafe Mirror Selfie", "#f5f3ff", "#ddd6fe", "💌"),
      title: "Cozy Seat & Mirror Click 📱",
      date: "Relaxed Afternoon",
      location: "Cafe Lounge",
      caption: "Sitting together, chatting about everything and nothing. Time always flies when I'm with you.",
      tapeColor: "pink",
      rotation: -3,
      frameStyle: "floral",
      stickers: ["💌", "✨", "🎀"],
    },
    {
      id: "photo-10",
      url: createPhotoPlaceholder("Wavy Frame Mirror Pose", "#ecfeff", "#a5f3fc", "🤳"),
      title: "Wavy Organic Mirror Selfie 🪞",
      date: "Weekend Hangout",
      location: "Designer Cafe Mirror",
      caption: "Full height mirror reflection! Denim button-down and striped shirt. Best outfit combination ever.",
      tapeColor: "teal",
      rotation: 2,
      frameStyle: "film",
      stickers: ["🪞", "💙", "🌟"],
    },
    {
      id: "photo-11",
      url: createPhotoPlaceholder("Close Up Mirror Kisses", "#fff1f2", "#fecdd3", "💋"),
      title: "Playful Cheek Pinch Selfie 😚",
      date: "Special Date",
      location: "The Mirror Wall",
      caption: "Pouting lips, silly hand gestures, and endless laughter. You make every ordinary day feel extraordinary.",
      tapeColor: "gold",
      rotation: -1,
      frameStyle: "heart",
      stickers: ["💋", "❤️", "🎈"],
    }
  ],
  coupons: [
    {
      id: "c1",
      title: "Unlimited Hugs Pass",
      description: "Entitles bearer to 1,000,000 warm, tight, squishy hugs on demand anywhere, anytime!",
      iconName: "Heart",
      redeemed: false,
      code: "HUG-ME-FOREVER",
      color: "from-rose-400 to-pink-500",
    },
    {
      id: "c2",
      title: "Movie Night of Her Choice",
      description: "She gets total control over movie selection, popcorn flavors, and cozy blanket distribution!",
      iconName: "Film",
      redeemed: false,
      code: "CINEMA-QUEEN",
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: "c3",
      title: "Late Night Coffee & Dessert Run",
      description: "Redeem for an impromptu late-night drive for iced coffee, cheesecake, or favorite treats!",
      iconName: "Coffee",
      redeemed: false,
      code: "LATE-NIGHT-CRAVING",
      color: "from-amber-400 to-orange-500",
    },
    {
      id: "c4",
      title: "Foot & Shoulder Massage",
      description: "30 minutes of relaxed foot and shoulder massage with scented lotion after a long day.",
      iconName: "Sparkles",
      redeemed: false,
      code: "RELAX-ROYALTY",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: "c5",
      title: "Solve Any Argument Instant Win",
      description: "Play this card during a debate to instantly win, no questions asked!",
      iconName: "Crown",
      redeemed: false,
      code: "SHE-IS-ALWAYS-RIGHT",
      color: "from-yellow-400 to-amber-500",
    },
    {
      id: "c6",
      title: "Surprise Gift Pass",
      description: "Redeem for a special mystery gift or cute surprise delivered to her door!",
      iconName: "Gift",
      redeemed: false,
      code: "SURPRISE-QUEEN",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: "c7",
      title: "Candlelight Dinner Date",
      description: "A romantic homemade or fine dining dinner with candles, music, and her favorite food.",
      iconName: "UtensilsCrossed",
      redeemed: false,
      code: "ROMANTIC-DINNER",
      color: "from-red-400 to-rose-600",
    },
    {
      id: "c8",
      title: "Shopping Spree Pass",
      description: "Redeem on our next mall trip for a cute dress or accessory of her choice!",
      iconName: "ShoppingBag",
      redeemed: false,
      code: "SHOPPING-QUEEN",
      color: "from-sky-400 to-blue-500",
    }
  ],
  reasons: [
    { id: "r1", number: 1, text: "The way your eyes light up when you see coffee or something sweet.", category: "cute", icon: "☕" },
    { id: "r2", number: 2, text: "How you always hold my hand or make cute poses in mirror selfies.", category: "sweet", icon: "🤳" },
    { id: "r3", number: 3, text: "Your incredible taste in clothes and how effortlessly stylish you look.", category: "cute", icon: "👗" },
    { id: "r4", number: 4, text: "Your sweet laughter that instantly cures my worst days.", category: "deep", icon: "💖" },
    { id: "r5", number: 5, text: "How you look stunning in everything from oversized sweatshirts to traditional kurtis.", category: "sweet", icon: "✨" },
    { id: "r6", number: 6, text: "How comfortable and safe I feel whenever I am with you.", category: "deep", icon: "🫂" },
    { id: "r7", number: 7, text: "Your goofy silly faces when taking photos together.", category: "funny", icon: "😜" },
    { id: "r8", number: 8, text: "How you always remember tiny details about what I like.", category: "sweet", icon: "💌" },
    { id: "r9", number: 9, text: "Your warm hugs that make time stand still.", category: "deep", icon: "🧸" },
    { id: "r10", number: 10, text: "How cute you look when wearing your glasses.", category: "cute", icon: "👓" },
    { id: "r11", number: 11, text: "Our endless cafe chats where hours feel like minutes.", category: "sweet", icon: "☕" },
    { id: "r12", number: 12, text: "Because you are my best friend and soulmate all in one.", category: "deep", icon: "👑" },
    { id: "r13", number: 13, text: "The adorable way you do the peace sign in every single photo.", category: "cute", icon: "✌️" },
    { id: "r14", number: 14, text: "How you make even simple errands feel like a fun romantic adventure.", category: "sweet", icon: "🌟" },
    { id: "r15", number: 15, text: "Your kindness and gentle heart towards everyone around you.", category: "deep", icon: "🌸" },
    { id: "r16", number: 16, text: "Because loving you is the easiest, sweetest thing I have ever done.", category: "deep", icon: "🌹" }
  ],
  bucketList: [
    { id: "b1", title: "Take a romantic road trip to the beach and watch sunset together", category: "travel", completed: false, notes: "Pack snacks & make a custom playlist!" },
    { id: "b2", title: "Recreate our first mirror selfie date in matching outfits", category: "date", completed: true, notes: "The Ferrari sweater & checkered shirt!" },
    { id: "b3", title: "Bake homemade cookies or pizza together from scratch", category: "cozy", completed: false, notes: "Flour fights allowed!" },
    { id: "b4", title: "Go stargazing on a clear night with hot cocoa", category: "adventure", completed: false },
    { id: "b5", title: "Visit a flower farm or botanical garden photoshoot", category: "travel", completed: false, notes: "Take lots of floral mirror pics!" },
    { id: "b6", title: "Attend a live music concert together", category: "date", completed: false }
  ],
  letter: {
    title: "Happy Girlfriend's Day, My Love! 💖",
    girlfriendName: "My Beautiful Girl",
    senderName: "Bunny",
    date: "August 1st, 2026",
    content: `To the most incredible, beautiful, and sweet girl in my life,

Happy Girlfriend Day! Every single day with you feels like a gift I never want to stop opening. Looking back through all our photos—from our silly cafe mirror selfies to dressing up in royal blue and crisp white—reminds me of how incredibly blessed I am to call you mine.

You bring so much joy, warmth, and laughter into my world. Your smile brightens up even the gloomiest days, and your hugs are my absolute favorite place in the universe. Whether we are driving around looking for late-night coffee, posing in front of floral mirrors, or just sitting side by side doing nothing at all, every moment with you is my favorite memory.

Thank you for being my best friend, my partner in crime, and my biggest comfort. I promise to keep making you smile, holding your hand, squeeze your cheeks, and loving you more with every passing day.

Forever & always yours,
Bunny 💖`
  }
};
