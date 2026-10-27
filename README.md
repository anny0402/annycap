# AutoCap Educational Reconstruction (React + Vite + Tailwind CSS)

An independent educational reverse-engineering study clone of the [AutoCap](https://autocap.in/) website and caption workflow, built with **React 19, Vite 8, Tailwind CSS v4, Lucide React, and React Router**.

> **Educational Project Notice:** This project is an independent educational reconstruction created for study and reverse-engineering training. It is not affiliated with, endorsed by, or sponsored by AutoCap. 100% of all features included in this codebase cost **₹0**.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v24.13+ (or Node.js 22.19+)
- **npm**: v11+

### 2. Run the Development Server
```bash
cd autocap-study-clone
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 3. Production Build & Linting
```bash
npm run build    # Produces optimized production bundle in dist/
npm run lint     # Runs oxlint static analysis (0 warnings, 0 errors)
npm run preview  # Previews production build locally
```

---

## 🛠️ Architecture & Features

### 1. In-Browser Caption Editor (`/editor`)
- **Word-Level Precision**: Words are stored with individual millisecond timestamps (`start`, `end`, `word`).
- **Synchronized Karaoke Highlight**: Live audio/video playback simulation in 9:16 (Reels) or 16:9 (Shorts/Desktop) formats. Spoken words burst into active highlighted styles exactly when spoken.
- **Interactive Inline Editing**: Click and edit any word text in real time.
- **Timestamp Nudging**: Nudge start and end boundaries by `±0.05s` with dedicated controls.
- **Caption Styling Controls**: Font size (Small, Medium, Large), text colors, highlight colors, and screen positions (Top, Middle, Bottom).
- **SubRip (.SRT) & WebVTT (.VTT) Export**: 1-click clean export formatted according to international standards, ready for Adobe Premiere, DaVinci Resolve, Final Cut Pro, or CapCut.

### 2. Multi-Language Support (`/`)
- Built for **Hinglish** code-mixed speech (e.g. *"Basically yeh feature try karo, it actually works"*).
- Pre-configured dataset for **12 Indian regional languages**: Hindi, Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu, Urdu, and Indian English.

### 3. Preset Templates (`/templates`)
- Category filters (Dynamic, Viral Reels, Indic Special, Minimalist, Neon & Gaming).
- Instant live preview cards simulating word reveal.

### 4. Strict ₹0 Pricing Guarantee (`/pricing`)
- **100% FREE** for every included feature.
- Zero paywalls, zero subscriptions, zero credit card forms, and zero checkout mandates.

---

## 🤖 REA & Claude Desktop MCP Integration

REA (Reverse Engineering Anything) MCP server is configured for Claude Desktop on Windows 11:
- **MCP Server**: `rea-agents@6.8.0` / `6.7.0`
- **Config file**: `C:\Users\Anny\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\claude_desktop_config.json`
- **Verified status**: `healthy: true` (207+ tools available via stdio)
