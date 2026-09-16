# MentorLink — Android Studio & Capacitor Build Guide

**Project Title:** MentorLink — Mentorship & Tutoring Matching Mobile Application  
**Runtime & Bridge:** Capacitor (`@capacitor/core`, `@capacitor/android`)  
**Native IDE:** Android Studio (Flamingo / Giraffe / Hedgehog / Iguana / Ladybug)  
**Target Output:** Standalone Installable Android Package (`MentorLink.apk`)  
**Target Location:** `docs/android_build_guide.md`  
**Version:** 1.0  

---

## 1. Pipeline Overview

MentorLink is engineered as a mobile-first web application that compiles directly into an Android APK without writing manual Java/Kotlin WebView wrappers. 

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NATIVE COMPILATION PIPELINE                            │
└─────────────────────────────────────────────────────────────────────────────┘

  [1. DEVELOPMENT]
       React.js UI + Tailwind CSS components built in src/
                                     │
                                     ▼ npm run build
  [2. COMPILED WEB ASSETS]
       Bundled, minified assets output to dist/ (base: './')
                                     │
                                     ▼ npx cap sync android
  [3. CAPACITOR BRIDGE SYNC]
       Web assets copied into android/app/src/main/assets/public/
                                     │
                                     ▼ npx cap open android
  [4. ANDROID STUDIO COMPILATION]
       Gradle builds project -> Compiles Java/Kotlin & Web assets
                                     │
                                     ▼ Build APK(s)
  [5. STANDALONE APK OUTPUT]
       Generates MentorLink.apk (Debug or Release)
                                     │
                                     ▼
  [6. COMPANION DOWNLOAD PAGE]
       Hosted on landing/index.html for direct mobile installation
```

---

## 2. Prerequisites & Environment Setup

Before building the Android APK, ensure the following tools are installed on your workstation:

### 2.1 Required Software
1. **Node.js:** v18.x or v20.x LTS (`node -v`).
2. **NPM:** v9.x or v10.x (`npm -v`).
3. **Android Studio:** Latest stable version installed with:
   * **Android SDK Platform:** Android 13.0 (Tiramisu - API 33) or Android 14.0 (UpsideDownCake - API 34).
   * **Android SDK Build-Tools:** Version 33.x or 34.x.
   * **Java Development Kit (JDK):** JDK 17 (bundled natively with modern Android Studio under `jbr/`).
4. **Android Test Device or Emulator:**
   * **Physical Android Phone:** Enable **Developer Options** and turn on **USB Debugging**.
   * **Android Emulator:** Configured via Android Studio Device Manager (e.g. Pixel 6 running API 33/34).

---

## 3. Step-by-Step Build Instructions

### Step 1 — Configure Vite for Relative Asset Resolution
Inside an Android APK, Capacitor loads files locally using a custom scheme (`http://localhost` or `capacitor://localhost`). If Vite compiles with the default absolute root path (`/assets/...`), the app will display a **blank white screen**.

Ensure [`vite.config.js`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/vite.config.js) specifies `base: './'`:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Ensures relative paths for Capacitor WebView
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
```

---

### Step 2 — Install & Initialize Capacitor
Install the Capacitor core libraries:

```bash
# 1. Install Capacitor dependencies
npm install @capacitor/core @capacitor/android
npm install -D @capacitor/cli

# 2. Build the web app first so dist/ exists
npm run build

# 3. Initialize Capacitor configuration
npx cap init "MentorLink" "com.mentorlink.app" --web-dir dist

# 4. Add the Android native platform
npx cap add android
```

This generates the native `android/` directory inside your project root.

---

### Step 3 — Capacitor Configuration File
Verify [`capacitor.config.json`](file:///c:/Users/jaync/Desktop/Mentorship%20Tutoring%20App/MentorshipTutoringApp/capacitor.config.json) contains:

```json
{
  "appId": "com.mentorlink.app",
  "appName": "MentorLink",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https",
    "cleartext": false
  },
  "android": {
    "allowMixedContent": false
  }
}
```

---

### Step 4 — Native Android Container Hardening
Open `android/app/src/main/AndroidManifest.xml` and enforce the following security and orientation rules:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Network Permissions for Supabase API & Realtime WebSockets -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="false"> <!-- CRITICAL: Blocks unencrypted HTTP traffic -->

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:screenOrientation="portrait" <!-- CRITICAL: Locks app to mobile portrait -->
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>
    </application>
</manifest>
```

---

### Step 5 — Sync Web Assets to Android
Whenever you modify React components, styles, or environment configs, run:

```bash
# 1. Compile fresh web bundle
npm run build

# 2. Sync compiled assets and plugins into the Android project
npx cap sync android
```

---

### Step 6 — Compile APK in Android Studio

1. **Launch the project in Android Studio:**
   ```bash
   npx cap open android
   ```
2. Wait for Android Studio to complete the initial **Gradle Sync** (typically 1–2 minutes on first load).
3. **Option A: Build Debug APK (For Testing & Sideloading):**
   * Go to the top menu: **Build $\rightarrow$ Build Bundle(s) / APK(s) $\rightarrow$ Build APK(s)**.
   * When compilation completes, a notification will appear in the bottom right corner: *"APK(s) generated successfully"*.
   * Click **locate** to open the output folder.
   * **File Path:** `android/app/build/outputs/apk/debug/app-debug.apk`.
   * Rename this file to `MentorLink-debug.apk`.
4. **Option B: Generate Signed Release APK (For Production Distribution):**
   * Go to the top menu: **Build $\rightarrow$ Generate Signed Bundle / APK...**
   * Select **APK** and click **Next**.
   * Choose your Keystore path (or click *Create new...* to generate a `.jks` signing key).
   * Enter your key alias and passwords.
   * Select build variant **release**, check **V1 (Jar Signature)** and **V2 (Full APK Signature)**.
   * Click **Finish**.
   * **File Path:** `android/app/release/app-release.apk`.
   * Rename this file to `MentorLink.apk`.

---

## 4. Distributing via the Companion Download Page

To allow students and faculty to install MentorLink directly on their phones without requiring Google Play Store approval:

```
┌────────────────────────────────────────────────────────┐
│         COMPANION LANDING PAGE (landing/index.html)     │
├────────────────────────────────────────────────────────┤
│                                                        │
│   [MentorLink Logo]                                    │
│   Peer Mentorship & Tutoring Matching App              │
│                                                        │
│   ┌──────────────────────────────────────────────┐     │
│   │    📥 DOWNLOAD APK FOR ANDROID (v1.0.0)      │     │
│   └──────────────────────────────────────────────┘     │
│                                                        │
│   How to Install on Android:                           │
│   1. Tap the Download APK button above.                │
│   2. When prompted by Chrome, tap "Download anyway".   │
│   3. Open the downloaded MentorLink.apk file.          │
│   4. If prompted, tap "Settings" and toggle "Allow     │
│      from this source".                                │
│   5. Tap "Install" and launch MentorLink!              │
│                                                        │
└────────────────────────────────────────────────────────┘
```

1. Copy the compiled `MentorLink.apk` into your hosting directory or upload it to **Supabase Storage** (public bucket: `app-releases`) or **GitHub Releases**.
2. In `landing/index.html`, set the download anchor tag:
   ```html
   <a href="https://your-supabase-url.supabase.co/storage/v1/object/public/app-releases/MentorLink.apk"
      download="MentorLink.apk"
      class="bg-indigo-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all inline-flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
      </svg>
      Download APK for Android
   </a>
   ```

---

## 5. Troubleshooting & Common Pitfalls

| Symptom | Probable Cause | Exact Solution |
| :--- | :--- | :--- |
| **Blank White Screen on App Launch** | `vite.config.js` missing `base: './'`. Web assets loaded with absolute `/assets` which 404 in WebView. | Ensure `base: './'` is in `vite.config.js`, re-run `npm run build`, and run `npx cap sync android`. |
| **Gradle Sync Fails in Android Studio** | Android Studio using incompatible JDK version. | In Android Studio, go to **Settings $\rightarrow$ Build, Execution, Deployment $\rightarrow$ Build Tools $\rightarrow$ Gradle**. Ensure **Gradle JDK** is set to **Embedded JDK (JDK 17)**. |
| **API Calls Fail inside the App** | Device or WebView blocking HTTP traffic or missing Internet permission. | Verify `android:usesCleartextTraffic="false"` and `android.permission.INTERNET` exist in `AndroidManifest.xml`. Ensure Supabase URL is HTTPS. |
| **Hardware Back Button Exits App Immediately** | React Router not listening to Capacitor native back-button events. | In `src/App.jsx`, add `@capacitor/app` listener: `App.addListener('backButton', ({ canGoBack }) => { if (canGoBack) window.history.back(); else App.exitApp(); });`. |
| **Changes in React Code Not Showing in App** | Forgot to run `npx cap sync`. | Always run `npm run build && npx cap sync android` after editing frontend code before rebuilding in Android Studio. |
