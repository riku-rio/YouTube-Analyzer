# Youtube Analyzer — Tasks & Milestones (MVP)

> Goal: Break the project into ultra-clear, atomic tasks so any developer or model can execute step-by-step with minimal ambiguity.

---

## 🧭 Execution Rules

* Each task should take ≤ 30 minutes
* Every task must have a clear output
* Do not proceed unless Definition of Done (DoD) is met
* Use small, descriptive commits

---

# 🧩 Milestone 0: Project Setup

## 0.1 Initialize Project

* [X] Create root folder: `youtube-analyzer-extension`
* [X] Create files:

  * `manifest.json`
  * `popup.html`
  * `popup.css`
  * `popup.js`
  * `background.js`
  * `.env` (local only - not committed)

**DoD:** All files exist with no errors

---

## 0.2 Setup Chrome Extension Manifest (MV3)

* [X] Set `manifest_version: 3`
* [X] Add name, version, description
* [X] Add permissions:

  * `storage`
  * `activeTab`
* [X] Add action (popup)
* [X] Link popup.html
* [X] Add background service worker

**DoD:** Extension loads successfully in Chrome

---

# 🧩 Milestone 1: UI (Popup)

## 1.1 Build Basic Layout

* [X] Add input field for YouTube URL
* [X] Add "Analyze" button
* [X] Add results container
* [X] Add loading indicator

**DoD:** UI renders correctly

---

## 1.2 Styling

* [X] Add basic CSS (spacing, fonts)
* [X] Make results scrollable
* [X] Style buttons and inputs

**DoD:** Clean, usable UI

---

# 🧩 Milestone 2: URL Handling

## 2.1 Extract Video ID

* [X] Support standard YouTube URLs
* [X] Support shortened URLs (youtu.be)
* [X] Validate input

**DoD:** Correct video ID extracted from valid URLs

---

## 2.2 Error Handling

* [X] Show error for invalid URL

**DoD:** User sees clear error message

---

# 🧩 Milestone 2.5: API Key Configuration

## 2.5.1 Create Settings Page UI

* [X] Create settings.html
* [X] Add input fields for YouTube and Groq API keys
* [X] Add save button

**DoD:** Settings page renders correctly

---

## 2.5.2 Implement Key Storage

* [X] Create settings.js
* [X] Load keys from chrome.storage.local on page load
* [X] Save keys to chrome.storage.local on button click

**DoD:** Keys persist across extension sessions

---

## 2.5.3 Connect Settings to Extension

* [X] Update manifest.json with options_page
* [X] Add Settings link in popup.html
* [X] Update popup.js to detect missing API keys

**DoD:** User can navigate to settings and save keys

---

# 🧩 Milestone 3: YouTube API Integration

## 3.1 Setup API Call

* [X] Implement fetch to YouTube Data API
* [X] Use endpoint `/videos`
* [X] Include parts: snippet, statistics, contentDetails

**DoD:** API returns valid response

---

## 3.2 Parse Response

* [X] Extract:

  * title
  * description
  * tags
  * views
  * likes
  * comments
  * duration
  * publish date
  * channel

**DoD:** Data is correctly parsed into object

---

## 3.3 Normalize Data

* [X] Convert duration to readable format
* [X] Ensure numbers are integers

**DoD:** Clean structured JSON ready

---

# 🧩 Milestone 4: Groq API Integration

## 4.1 Setup API Request

* [X] Create POST request to Groq endpoint
* [X] Add headers (Authorization)
* [X] Add model: `openai/gpt-oss-120b`

**DoD:** API call succeeds

---

## 4.2 Build Prompt

* [X] Add system prompt enforcing structure
* [X] Inject video JSON into user prompt

**DoD:** Prompt is complete and consistent

---

## 4.3 Handle Response

* [X] Extract text output
* [X] Handle errors

**DoD:** AI response available in app

---

# 🧩 Milestone 5: Output Rendering

## 5.1 Display Results

* [X] Render response in UI
* [X] Preserve formatting (sections, bullets)

**DoD:** Output readable and structured

---

## 5.2 Improve Readability

* [X] Add section headers styling
* [X] Add spacing between sections

**DoD:** Clean structured output

---

# 🧩 Milestone 6: Loading & States

## 6.1 Loading State

* [X] Show spinner on analyze
* [X] Disable button while loading

**DoD:** User sees loading feedback

---

## 6.2 Error State

* [X] Handle API failures
* [X] Show retry option

**DoD:** Errors handled gracefully

---

# 🧩 Milestone 6.5: Markdown Rendering

## 6.5.1 Add Marked.js Library

* [X] Copy marked.umd.js to lib/marked.js
* [X] Update popup.html to load from local lib/
* [X] Load before popup.js

**DoD:** Library available in extension

---

## 6.5.2 Replace Custom Parser

* [X] Use marked.parse() in showResults()
* [X] Remove custom parseAnalysis() function

**DoD:** AI response renders as proper markdown HTML

---

## 6.5.3 Style Markdown Output

* [X] Add CSS for h1, h2, h3, ul, li, p, strong, a, code, blockquote
* [X] Ensure readable formatting

**DoD:** Output matches extension design system

---

# 🧩 Milestone 6.6: Persistent Analysis

## 6.6.1 Save Analysis to Storage

* [X] Add storage keys constant in popup.js
* [X] Save analysis to chrome.storage.local after rendering
* [X] Store video ID, analysis text, timestamp

**DoD:** Analysis persists in local storage

---

## 6.6.2 Load Analysis on Popup Open

* [X] Add loadSavedAnalysis() function
* [X] Check storage on DOMContentLoaded
* [X] Display saved analysis automatically

**DoD:** Previous analysis loads automatically

---

## 6.6.3 Clear on New Analysis

* [X] Remove saved analysis before new analysis begins
* [X] Prevent stale data display

**DoD:** New analysis replaces old one

---

# 🧩 Milestone 7: Environment Setup

## 7.1 Manage API Keys (Not Needed)

* Superseded by Settings page (Milestone 2.5)
* Keys now stored via Settings UI in chrome.storage.local
* .env approach abandoned in favor of user-configurable keys

**Note:** Task removed - Settings page handles API keys

---

# 🧩 Milestone 8: Final Testing

## 8.1 Functional Testing

* [X] Performance timing added to popup.js
* [X] Test checklist created in docs/TEST_CHECKLIST.md
* [X] Test with multiple video URLs
* [X] Test edge cases

**DoD:** No breaking bugs

---

## 8.2 Performance Testing

* [X] Console logging added for timing measurements
* [X] Ensure response < 10s

**DoD:** Meets performance goal

---

# 🧩 Milestone 9: Packaging

## 9.1 Prepare Build

* [X] Ensure `.env` is in `.gitignore`
* [X] Clean code

**DoD:** Ready for distribution

---

## 9.2 Load Extension

* [X] Load unpacked extension
* [X] Verify functionality

**DoD:** Fully working extension

---

# ✅ Final Definition of Done

* User inputs YouTube URL
* Data fetched successfully
* AI analysis generated
* Output is structured
* No major errors

---

## 🚀 Optional Enhancements (Post-MVP)

* Thumbnail analysis (vision model)
* Save history
* Export report
* Channel analytics
