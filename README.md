# Digital Scrapbook for Girlfriend's Day 💕

A personalized, interactive digital memory scrapbook designed to celebrate special moments, share photos, redeem romantic coupons, and generate AI-crafted love letters.

---

## ✨ Features

- 💌 **Wax-Sealed Envelope**: An interactive opening experience protected by a customizable secret passcode.
- 📸 **Memory Gallery**: Interactive photo album cards with captions, date tags, and full-screen view modes.
- 🎟️ **Redeemable Love Coupons**: Interactive romantic coupons (e.g., late-night movie, tight hug, warm coffee date) that track redemption status.
- 🤖 **AI Love Letter Generator**: Server-side integration with Google's Gemini API to generate personalized romantic notes and messages.
- 🎵 **Atmospheric Audio & Sound Effects**: Subtle ambient music player and tactile UI sound triggers for actions.
- ⚙️ **Customization & Personalization**: Settings menu to update partner names, anniversary dates, memory photos, and secret passcode.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling & Animations**: [Tailwind CSS](https://tailwindcss.com/), [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / API**: [Express.js](https://expressjs.com/), [@google/genai SDK](https://www.npmjs.com/package/@google/genai)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/digital-scrapbook.git
   cd digital-scrapbook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Builds the application and compiles server bundle for production
- `npm run start` - Launches the production Express server
- `npm run lint` - Runs TypeScript type checking and validation

---

## 🔒 Passcode Configuration

The app includes an envelope passcode feature. The default passcode is configured in the app settings and can be changed in the **Settings Modal** (⚙️) on the top right corner of the scrapbook.

---

## 📄 License

This project is licensed under the MIT License.
