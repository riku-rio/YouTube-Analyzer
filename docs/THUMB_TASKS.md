# Thumbnail Analysis — Tasks & Milestones (V1.5)

> Goal: Implement thumbnail analysis using Groq Vision in a clean, modular, and non-breaking way.

---

## 🧭 Execution Rules

- Each task ≤ 30 minutes
- Do NOT break existing functionality
- Keep changes minimal and isolated
- Follow PRD strictly (THUMB_PRD.md)
- Prefer adding new code over modifying existing code
- Test after every milestone

---

# 🧩 Milestone 1: Extract Thumbnail URL

## 1.1 Locate YouTube Response
- [x] Open `popup.js`
- [x] Find `fetchYouTubeData()` function

---

## 1.2 Add Thumbnail Field
- [x] Extract:
  ```js
  item.snippet.thumbnails.high.url
  ```
- [x] Add to returned object:
  ```js
  thumbnail: item.snippet.thumbnails.high.url
  ```

---

## 1.3 Fallback Handling
- [x] If `high` not available:
  - [x] fallback to `medium`
  - [x] fallback to `default`

---

**DoD:** `videoData.thumbnail` always exists ✅

---

# 🧩 Milestone 2: Create Thumbnail Analysis Function

## 2.1 Create Function
- [x] Add new function:
  ```js
  async function analyzeThumbnail(thumbnailUrl)
  ```

---

## 2.2 Setup Groq Request
- [x] Endpoint:
  ```
  https://api.groq.com/openai/v1/chat/completions
  ```
- [x] Model: vision-capable (meta-llama/llama-4-scout-17b-16e-instruct)
- [x] Headers:
  - Authorization
  - Content-Type

---

## 2.3 Add Image Input
- [x] Send image as:
  - `image_url` inside messages

---

## 2.4 Handle Response
- [x] Extract `message.content`
- [x] Validate non-empty response
- [x] Throw error if invalid

---

**DoD:** Function returns thumbnail analysis text ✅

---

# 🧩 Milestone 3: Build Thumbnail Prompt

## 3.1 Create Prompt Builder
- [x] Add function:
  ```js
  function buildThumbnailPrompt()
  ```

---

## 3.2 Enforce Structure
- [x] Include EXACT 8 sections:
  - Visual Hook
  - Clarity
  - Text Readability
  - Emotional Appeal
  - CTR Strengths
  - CTR Weaknesses
  - Improvement Suggestions
  - Thumbnail Score

---

## 3.3 Add Rules
- [x] Force:
  - No skipped sections
  - Bullet points where needed
  - No hallucination

---

**DoD:** Prompt produces consistent structure ✅

---

# 🧩 Milestone 4: Parallel Execution

## 4.1 Modify Analyze Flow
- [x] Locate `handleAnalyze()`

---

## 4.2 Run in Parallel
- [x] Replace sequential calls with:
  ```js
  const [videoData, thumbnailAnalysis] = await Promise.all([
    fetchYouTubeData(videoId),
    analyzeThumbnail(thumbnailUrl)
  ]);
  ```

⚠️ Note:
- You need thumbnail URL first → so:
  - fetch videoData first
  - then parallel AI calls (see next step)

---

## 4.3 Correct Flow
- [x] Final structure:
  ```js
  const videoData = await fetchYouTubeData(videoId);

  const [mainAnalysis, thumbAnalysis] = await Promise.all([
    analyzeWithAI(videoData),
    analyzeThumbnail(videoData.thumbnail)
  ]);
  ```

---

**DoD:** Both analyses run in parallel ✅

---

# 🧩 Milestone 5: Merge Results

## 5.1 Combine Outputs
- [x] Append thumbnail analysis:
  ```js
  const finalOutput = mainAnalysis + "\n\n---\n\n" + thumbAnalysis;
  ```

---

## 5.2 Preserve Structure
- [x] Do NOT modify original 10 sections
- [x] Add thumbnail as new section (Section 11)

---

**DoD:** Final output includes thumbnail section ✅

---

# 🧩 Milestone 6: UI Rendering

## 6.1 Render Markdown
- [x] Ensure marked renders new section properly

---

## 6.2 Visual Separation
- [x] Add divider between sections

---

## 6.3 Highlight Score
- [x] Style Thumbnail Score if possible

---

**DoD:** Thumbnail analysis visible and readable ✅

---

# 🧩 Milestone 7: Error Handling

## 7.1 API Failure
- [X] If thumbnail analysis fails:
  - Continue without breaking main analysis

---

## 7.2 Fallback Output
- [X] Show:
  ```
  Thumbnail analysis unavailable
  ```

---

## 7.3 Logging
- [X] Log errors in console

---

**DoD:** Feature never breaks main flow

---

# 🧩 Milestone 8: Performance Optimization

## 8.1 Measure Timing
- [ ] Add logs:
  - Thumbnail API time

---

## 8.2 Ensure Speed
- [ ] Total delay ≤ +5 seconds

---

## 8.3 Avoid Blocking UI
- [ ] Loading state covers both calls

---

**DoD:** Smooth UX

---

# 🧩 Milestone 9: Final Testing

## 9.1 Test Cases
- [ ] High-quality thumbnails
- [ ] Low-quality thumbnails
- [ ] No text thumbnails
- [ ] Busy thumbnails

---

## 9.2 Edge Cases
- [ ] Missing thumbnail
- [ ] API failure
- [ ] Slow response

---

## 9.3 Output Validation
- [ ] Ensure 8 sections always exist

---

**DoD:** Stable across all cases

---

# 🧩 Milestone 10: Polish

## 10.1 Improve Prompt
- [ ] Adjust wording for better consistency

---

## 10.2 Improve UI
- [ ] Better spacing
- [ ] Clean section titles

---

## 10.3 Code Cleanup
- [ ] Remove logs (optional)
- [ ] Refactor small issues

---

**DoD:** Feature feels production-ready

---

# ✅ Final Definition of Done

- Thumbnail extracted correctly
- Vision API integrated
- Structured output (8 sections)
- Merged with main analysis
- UI displays correctly
- No crashes or blocking issues
- Performance acceptable

---

## 🚀 Stretch Goals (Optional)

- Detect faces / text automatically
- Add emoji or visual indicators
- Compare thumbnail quality vs competitors
- Add “Predicted CTR Level” (Low / Medium / High)
