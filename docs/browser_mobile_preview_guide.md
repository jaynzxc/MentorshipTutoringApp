# MentorLink — Browser Mobile Preview & DevTools Testing Guide

**Project Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application  
**Document Purpose:** Complete developer procedure for running, previewing, and debugging the mobile application inside desktop browsers using Developer Tools Device Mode (Inspect Tool), eliminating the need for heavy Android emulators during day-to-day coding.  
**Target Location:** `docs/browser_mobile_preview_guide.md`  
**Version:** 1.0  

---

## 1. Overview & Development Philosophy

Because MentorLink is engineered strictly for mobile screen ergonomics ($360\text{px}$–$430\text{px}$ viewports, touch targets $\ge 44\text{px}$, sticky top header, and fixed bottom navigation bar), you do **not** need to boot an Android Studio virtual emulator for rapid UI and feature development.

Using **Chrome / Edge / Brave Developer Tools (Device Toolbar)** gives you:
* Instant Hot Module Replacement (HMR) within $\approx 100\text{ms}$.
* Accurate pixel-perfect mobile screen simulation.
* Touch cursor emulation for swipe and tap gestures.
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

### Terminal 2 (Optional): Real-Time CSS Watcher
If you are actively modifying design tokens, custom safe-area rules, or animations in `assets/css/input.css`, open a second terminal tab and run:
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

At the top of the browser viewport, click the **Dimensions** dropdown to select a device preset. We recommend testing against these standard device categories:

| Device Preset | Screen Dimensions | Viewport Category | Testing Focus |
| :--- | :--- | :--- | :--- |
| **Samsung Galaxy S8+ / S20** | **$360\text{px} \times 740\text{px}$** | Minimum Compact Android | Verify subject chips and buttons wrap cleanly without horizontal blowout. |
| **iPhone 12 / 13 / 14 Pro** | **$390\text{px} \times 844\text{px}$** | Standard Baseline | Baseline ergonomics; verify card typography and avatar alignments. |
| **Google Pixel 7** | **$412\text{px} \times 915\text{px}$** | Standard Android | Default Android device size; verify bottom navigation height. |
| **iPhone 14 / 15 Pro Max** | **$430\text{px} \times 932\text{px}$** | Maximum Mobile Boundary | Confirm `max-w-md mx-auto` stays centered with clean margins. |

> [!TIP]
> Always set the **Zoom Dropdown** next to the dimensions to **`100%`** (not "Fit to window") to ensure UI text sizes and button heights appear at their true-to-life physical scale.

---

## 5. Simulating Native Mobile Touch Interactions

When Device Mode is enabled, DevTools alters your cursor and browser behaviors to match a smartphone:

1. **Touch Cursor (Circular Tap Dot):**
   * Your mouse cursor appears as a gray circle simulating a human finger.
   * Click and drag to simulate smooth finger scrolling.
2. **Horizontal Chip Scrolling:**
   * Test the subject filter chips (e.g. *Calculus I*, *College Physics*) by clicking and dragging horizontally to verify smooth scrolling without scrollbars (`.no-scrollbar`).
3. **Bottom Navigation Clearance Check:**
   * Scroll down to the bottom of every page.
   * Ensure that action buttons (like *"Book Mentorship Session"*) or form inputs are never hidden behind the fixed bottom navigation bar (`pb-24` clearance rule).
4. **Dual-Role Switcher:**
   * Tap the top-right pill button (**`🎓 Learner` $\leftrightarrow$ `💼 Mentor`**) to toggle role contexts in real time.

---

## 6. Network Throttling & Offline Testing

High school and college students frequently experience spotty campus Wi-Fi or depleted mobile data. You can simulate these conditions directly in DevTools:

### 6.1 Simulating Spotty Campus Wi-Fi (3G)
1. In DevTools, open the **Network** tab.
2. Click the **Throttling** dropdown (defaults to "No throttling").
3. Select **Fast 3G** or **Slow 3G**.
4. Test your screens:
   * Verify that `LoadingSkeleton` placeholder cards appear smoothly while data is being fetched.
   * Confirm that submit buttons show a loading spinner and disable duplicate taps.

### 6.2 Simulating Offline Mode
1. In the **Network** tab throttling dropdown, select **Offline**.
2. Trigger any action:
   * Verify that the app does not crash or throw unhandled exceptions.
   * Verify that the subtle top offline banner appears:  
     `⚠ You are offline. Changes will sync once reconnected.`
   * Verify error toasts cleanly display *"Network connection error. Please check your mobile data or Wi-Fi."*

---

## 7. Testing on Your Physical Smartphone via Wi-Fi

You can also run the web app directly on your physical smartphone over your local home/campus Wi-Fi without building an APK:

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
5. You can now tap, scroll, and test touch targets directly on physical mobile hardware!

---

## 8. Common DevTools Gotchas & Tips

| Problem | Cause | Solution |
| :--- | :--- | :--- |
| **Touch cursor disappeared** | Clicked outside the device container. | Re-toggle `Ctrl + Shift + M` or click inside the device frame. |
| **Fonts look tiny or blurry** | Zoom dropdown is set to "Fit to window" (e.g. 50%). | Change zoom to **100%**. |
| **Tailwind changes not showing** | `watch:css` process is not running. | Run `npm run watch:css` in a second terminal to recompile `assets/css/output.css`. |
| **Old cached styles stuck** | Browser hard cache. | Right-click the browser reload button while DevTools is open and select **Empty Cache and Hard Reload** (`Ctrl + F5`). |
| **Supabase session lost on refresh** | Browser in Private / Incognito mode. | Use a standard browser profile so `localStorage` persists your login token across reloads. |
