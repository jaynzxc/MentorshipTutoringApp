# MentorLinks — Browser Mobile Preview & DevTools Testing Guide

**Project Title:** MentorLinks — Mentorship & Tutoring Matching Mobile Application  
**Tagline:** *"Connect. Learn. Grow."*  
**Document Purpose:** Complete developer procedure for running, previewing, and debugging the mobile application inside desktop browsers using Developer Tools Device Mode (Inspect Tool), eliminating the need for heavy Android emulators during day-to-day coding.  
**Target Location:** `docs/browser_mobile_preview_guide.md`  
**Version:** 2.0  

---

## 1. Overview & Development Philosophy

Because MentorLinks is engineered strictly for mobile screen ergonomics ($360\text{px}$–$430\text{px}$ viewports, touch targets $\ge 44\text{px}$, sticky top header, and fixed 5-tab bottom navigation bar), you do **not** need to boot an Android Studio virtual emulator for rapid UI and feature development.

Using **Chrome / Edge / Brave Developer Tools (Device Toolbar)** gives you:
* Instant Hot Module Replacement (HMR) within $\approx 100\text{ms}$.
* Accurate pixel-perfect mobile screen simulation.
* Touch cursor emulation for swipe and tap gestures.
* Dual 5-tab testing for both Student and Mentor modes.
* Network throttling to test spotty campus Wi-Fi and offline detection.

---

## 2. Starting the Development Environment

Open your terminal in VS Code, Antigravity, or PowerShell inside the project root:

### Terminal 1: Start the Vite Hot-Reload Server
```bash
npm run dev
```
* **Output:**
  ```bash
  VITE v8.3.0  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  ```
* Vite will keep watching all files inside `src/`. Any edit to a component updates your browser screen instantly.

### Terminal 2: Real-Time Tailwind CSS Watcher
```bash
npm run watch:css
```
*(Whenever you edit `assets/css/input.css`, the Tailwind CLI will automatically recompile `assets/css/output.css`).*

---

## 3. How to Open the Mobile Device Inspector

1. Open your browser (**Google Chrome**, **Microsoft Edge**, or **Brave**) and navigate to:
   👉 **`http://localhost:5173`**
2. Open **Developer Tools**:
   * Press **`F12`** on your keyboard (or right-click anywhere on the webpage and select **Inspect**).
3. Toggle **Device Toolbar (Mobile Emulation)**:
   * Click the **Phone / Tablet icon** in the top-left corner of the DevTools window.
   * **Keyboard Shortcut:**
     * **Windows:** `Ctrl` + `Shift` + `M`
     * **Mac:** `Cmd` + `Shift` + `M`

---

## 4. Recommended Mobile Viewport Matrix

At the top of the browser viewport, click the **Dimensions** dropdown to select a device preset:

| Device Preset | Screen Dimensions | Viewport Category | Testing Focus |
| :--- | :--- | :--- | :--- |
| **Samsung Galaxy S8+ / S20** | **$360\text{px} \times 740\text{px}$** | Minimum Compact Android | Verify chips wrap cleanly without horizontal blowout. |
| **iPhone 12 / 13 / 14 Pro** | **$390\text{px} \times 844\text{px}$** | Standard Baseline | Baseline ergonomics; verify cards and avatar alignments. |
| **Google Pixel 7** | **$412\text{px} \times 915\text{px}$** | Standard Android | Default Android device size; verify 5-tab navigation height. |
| **iPhone 14 / 15 Pro Max** | **$430\text{px} \times 932\text{px}$** | Maximum Mobile Boundary | Confirm `max-w-md mx-auto` stays centered with clean margins. |

> [!TIP]
> Always set the **Zoom Dropdown** next to the dimensions to **`100%`** (not "Fit to window") to ensure UI text sizes and button heights appear at their true physical scale.

---

## 5. Dual 5-Tab Testing Checklist

When toggling between roles in the app header:

### A. Student 5-Tab Verification (`role = 'student'`)
1. `🏠 Home`: Verify quick metrics, upcoming session alert card, and recommended mentors carousel.
2. `🔍 Explore`: Test search query input, category pills, max hourly rate filter, and volunteer-only toggle.
3. `💬 Messages`: Test chat thread navigation, message bubbles, timestamp alignment, and input bar.
4. `📅 Sessions`: Test filter tabs (`Upcoming`, `Completed`, `Cancelled`), payment reference submission, and Virtual Classroom join button.
5. `👤 Profile`: Test learning progress indicator, saved mentors list, Help Center ticket modal, and role switcher.

### B. Mentor 5-Tab Verification (`role = 'mentor'`)
1. `🏠 Home`: Verify 2x2 metric cards (Earnings, Service Hours, Rating, Requests), incoming booking requests with Accept/Decline triggers.
2. `👥 Students`: Verify roster of mentees, search filter, and quick chat shortcut.
3. `💬 Messages`: Verify direct chat with students and embedded session reminder banner.
4. `📅 Sessions`: Verify filter tabs (`Upcoming`, `Requests`, `Completed`), decline modal with reason input, and classroom launch.
5. `👤 Profile`: Verify availability settings, subjects offered, and university service hours summary export.

---

## 6. Testing on Physical Smartphone via Local Wi-Fi

1. Ensure your computer and smartphone are connected to the **same Wi-Fi network**.
2. Start the dev server with the `--host` flag:
   ```bash
   npm run dev -- --host
   ```
3. Vite will display your local IP address:
   ```bash
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.50:5173/
   ```
4. Open your phone's browser (Chrome on Android or Safari on iOS) and navigate to the **Network URL** (e.g., `http://192.168.1.50:5173`).
5. You can now test touch targets, swipe gestures, and responsiveness directly on physical mobile hardware.
