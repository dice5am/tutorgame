# 🎈 Alphabet Pop & Learn! - Kids Educational Alphabet Hub 🎈

Welcome to **Alphabet Pop & Learn!**, a vibrant, interactive, and fully accessible educational web application designed to help toddlers and early children learn the alphabet (A-Z) through sound, sight, fine motor writing practice, and playful gamification!

---

## 🌟 10x Upgraded Features

### 1. 🤖 Animated Mascot: "Bippy the Bubble"
- Bippy is a cute, vector-based SVG bubble guide built entirely in HTML and CSS.
- **Micro-Animations:** Natural floating motion (`@keyframes float-mascot`), automatic blinking eyes (`@keyframes blink-eyes`), and high-energy victory spin jumps (`@keyframes spin-jump-anim`).
- **Synchronized Talking Mouth:** Speaks using high-pitched child-friendly Speech Synthesis vocalizations and opens/closes his mouth dynamically in sync with the spoken words!

### 2. 🎮 Three Educational Game Modes
For every single letter from A to Z, children can play three distinct games to earn progress stars:
1. **✍️ Trace & Draw (Writing & Fine Motor Skills):**
   - Traces the uppercase letter on an HTML5 canvas.
   - Guided by numbered circle stroke path markers with pulsing dots.
   - Plays pleasant musical chime sound frequencies (Web Audio synthesizer scale) as each node is successfully crossed.
2. **🔍 Sound Detective (Phonemic & Object Association):**
   - Bippy asks: *"Find the picture starting with the sound /b/! Can you find the Bear?"*
   - Features three large 3D perspective flip cards showing question marks.
   - Clicking a card triggers an ultra-smooth 3D flip animation. Correct cards trigger sparkles, incorrect cards play a warning buzz and describe the wrong card before flipping back.
3. **🎈 Upgraded Bubble Pop (Letter Recognition & Power-Ups):**
   - Standard letter pop game with floating physics, score HUD, and progress bar.
   - **Special Power-up Bubbles:**
     - ⭐️ *Star Bubble:* Pops with a shower of particles and triggers an explosion popping nearby targets.
     - 🌈 *Rainbow Bubble:* Triggers a rainbow hue-rotation filter, highlighting all correct letter targets with pulsing rings.
     - 🤖 *Bippy Bubble:* Pops with Bippy's giggle sound and awards extra points.

### 3. 🏆 Mastery Star System
- Progress is tracked dynamically (0/3 stars per letter) and stored locally using the browser's `localStorage` (saves state between sessions).
- Earning all three stars on a letter unlocks a **Mastery Certificate** template displaying the letter, golden stars, and Bippy wearing a graduation cap!

### 4. 🔊 Dynamic Web Audio Synthesizer
- Generates all sound effects in real-time using the native browser **Web Audio API** (zero heavy external audio downloads):
  - *Bubble Pop:* Sine wave sweep from `300Hz` to `1200Hz` + high-frequency triangle chime.
  - *Boing (Error/Mismatch):* Sweeping triangle wave with an `18Hz` LFO vibrato.
  - *Dot Chime:* Scales pitches dynamically (e.g. `C5` to `C6`).
  - *Bippy Giggle:* Multi-trigger sine wave sweeps.
  - *Win Fanfare:* Rapid arpeggio scale notes sequence (`C4`-`E4`-`G4`-`C5`-`E5`-`G5`).

---

## 📂 File Architecture
```text
c:\Users\cavin\Desktop\Antigravity test\Test_1/
├── index.html              # Restructured screens (Home, Dashboard, Trace Canvas, Match, HUD, Reward)
├── styles.css              # Dynamic theme hues, Bippy animations, 3D card flips, canvas wrapper styles
├── app.js                  # Star state manager, Canvas drawing logic, Card shuffling, sound synths, mouth sync
├── validate_project.py     # Python script to audit visual assets and reporting progress
└── assets/
    └── images/             # Visual resources (26 SVGs + 17 AI-generated PNGs)
        ├── a_apple.svg
        ├── a_apple.png
        ├── b_ball.svg
        ├── b_bear.png
        └── ... (up to z_zebra.png)
```

---

## 🚀 How to Host on GitHub Pages

You can host this project on **GitHub Pages** completely for free in minutes! Here are the two ways to do it.

---

### Option A: Drag-and-Drop (No Terminal Required)

1. **Log in to GitHub:** Open [github.com](https://github.com/) in your browser.
2. **Create a New Repository:**
   - Click the green **New** button.
   - Enter a name, such as `alphabet-pop-learn`.
   - Set the repository to **Public**.
   - Leave "Add a README file", ".gitignore", and "License" unchecked.
   - Click **Create repository**.
3. **Upload Files:**
   - Click the link that says **"uploading an existing file"** in the repository setup page.
   - Drag the following files and folders from your computer directly into the box:
     - `index.html`
     - `styles.css`
     - `app.js`
     - `validate_project.py`
     - `assets/` (make sure it includes `images/` inside it with all the images!)
   - Wait for the files to finish uploading.
   - Type a commit message (e.g., `"Initial upload of Alphabet game hub"`) and click **Commit changes**.
4. **Enable GitHub Pages:**
   - Click the **Settings** tab at the top right of your repository page.
   - On the left sidebar, click **Pages** (under the "Code and automation" category).
   - Under **Build and deployment**, find **Branch**. Change the dropdown from `None` to `main` (or `master`).
   - Leave the folder dropdown as `/ (root)`.
   - Click **Save**.
5. **Get your Link:**
   - Refresh the page after 1–2 minutes.
   - At the top of the **Pages** settings screen, you will see a banner: *"Your site is live at: https://username.github.io/repository-name/"*. Click it to play!

---

### Option B: Using the Command Line (Git CLI)

If you have Git installed on your computer, use these commands to initialize and deploy:

1. **Open terminal** inside the project folder (`c:\Users\cavin\Desktop\Antigravity test\Test_1\`).
2. **Initialize Git and Commit:**
   ```bash
   # Initialize repository
   git init

   # Add all project files
   git add index.html styles.css app.js validate_project.py assets/

   # Commit files
   git commit -m "feat: initial commit of kids alphabet pop and learn hub"
   ```
3. **Create the Remote Repository on GitHub:**
   - Go to [github.com/new](https://github.com/new) and create a repository named `alphabet-pop-learn`. Do **NOT** initialize it with README, .gitignore, or license.
   - Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/alphabet-pop-learn.git`).
4. **Push your Code:**
   ```bash
   # Rename the default branch to main
   git branch -M main

   # Link your local folder to GitHub
   git remote add origin https://github.com/YOUR_USERNAME/alphabet-pop-learn.git

   # Push files to the main branch
   git push -u origin main
   ```
5. **Enable Deployment:**
   - Go to your repository settings page on GitHub.
   - Select **Pages** on the left menu.
   - Select **Deploy from a branch** under Source.
   - Set Branch to `main` and folder to `/ (root)`.
   - Click **Save**. Within a minute, your game will be live at `https://YOUR_USERNAME.github.io/alphabet-pop-learn/`.

---

## 🛠️ Verification Script
To ensure that all assets are ready before deploying, execute the local audit script:
```bash
python validate_project.py
```
This prints a clean progress list showing which SVG files and PNG illustrations are loaded.
