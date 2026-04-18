# AGENTS.md - YouTube Analyzer Extension

## Project Type
Chrome Extension (Manifest V3)

## Build & Run
1. Load unpacked in Chrome: `chrome://extensions` → Developer mode → Load unpacked → select `youtube-analyzer-extension/`
2. Click extension icon to open popup
3. Configure API keys via Settings page (⚙️ link in popup)

## Architecture
- **Popup** (`popup.js`) - Main UI logic, API calls, storage
- **Settings** (`settings.js`) - API key configuration page
- **Storage**: Keys stored in `chrome.storage.local` as `youtube_api_key`, `groq_api_key`
- **Persistence**: Last analysis saved to `lastVideoId`, `lastAnalysis`, `lastAnalyzedAt`, `lastThumbnail`, `lastThumbnailAnalysis`, `lastVideoUrl`, `lastFinalSummary`, `showFullAnalysis`, `showThumbnail`

## OpenCode Config
- MCP for Chrome DevTools available via `.opencode/opencode.json` (run `npx -y chrome-devtools-mcp@latest`)

## API Integration
- **YouTube Data API**: `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id={VIDEO_ID}&key={API_KEY}`
- **Groq API**: `https://api.groq.com/openai/v1/chat/completions`
  - Video analysis: model `openai/gpt-oss-20b` (line 256)
  - Thumbnail analysis: model `meta-llama/llama-4-scout-17b-16e-instruct` (line 409, vision-enabled)

## Output Formats (Required)

### Video Analysis (10 sections)
```
1. Summary
2. Performance Evaluation
3. Strengths
4. Weaknesses
5. Why It Succeeded / Failed
6. Title Analysis
7. Thumbnail Assumptions
8. SEO Analysis
9. Improvement Suggestions
10. Final Score
```

### Thumbnail Analysis (8 sections)
```
1. Visual Hook
2. Clarity
3. Text Readability
4. Emotional Appeal
5. CTR Strengths
6. CTR Weaknesses
7. Improvement Suggestions
8. Thumbnail Score
```

## Key Code Locations (popup.js)
- Video ID extraction: line 179 (`extractVideoId`)
- YouTube API call: line 194 (`fetchYouTubeData`)
- Groq API call (video): line 243 (`analyzeWithAI`)
- Groq API call (thumbnail): line 398 (`analyzeThumbnail`)
- Video prompt builder (10-section): line 448 (`buildAnalysisPrompt`)
- Thumbnail prompt builder (8-section): line 513 (`buildThumbnailPrompt`)
- `formatDuration` regex: line 556
- `getApiKey` function: line 570
- Markdown rendering: line 605 (`marked.parse()`)

## Critical Requirements
- AI response MUST follow exactly 10 sections for video, 8 for thumbnail - never skip or merge sections
- Duration from YouTube API (`PT10M30S`) converted via regex at line 556 (`formatDuration` function)
- API keys loaded from `chrome.storage.local` at runtime (NOT .env)
- Both analyses run in parallel, results combined with `showResults` + `showThumbnailResults`

## Testing
- Manual test checklist: `docs/TEST_CHECKLIST.md`
- Test URL formats: standard watch, youtu.be, shorts, embed, with timestamps/playlists
- Console logs `[PERF]` for timing: YouTube API, Groq API, Total
