document.addEventListener('DOMContentLoaded', () => {
  const youtubeInput = document.getElementById('youtubeApiKey');
  const groqInput = document.getElementById('groqApiKey');
  const saveBtn = document.getElementById('saveBtn');
  const successMessage = document.getElementById('successMessage');
  const youtubeStatus = document.getElementById('youtubeStatus');
  const groqStatus = document.getElementById('groqStatus');
  const youtubeError = document.getElementById('youtubeError');
  const groqError = document.getElementById('groqError');
  const showFullAnalysisToggle = document.getElementById('showFullAnalysisToggle');
  const showThumbnailToggle = document.getElementById('showThumbnailToggle');

  const YOUTUBE_KEY = 'youtube_api_key';
  const GROQ_KEY = 'groq_api_key';
  const SHOW_FULL_ANALYSIS_KEY = 'showFullAnalysis';
  const SHOW_THUMBNAIL_KEY = 'showThumbnail';

  loadKeys();

  youtubeInput.addEventListener('input', () => validateYoutubeKey(youtubeInput.value));
  groqInput.addEventListener('input', () => validateGroqKey(groqInput.value));

  saveBtn.addEventListener('click', saveKeys);
  showFullAnalysisToggle.addEventListener('change', saveSettingsPref);
  showThumbnailToggle.addEventListener('change', saveSettingsPref);

  function loadKeys() {
    chrome.storage.local.get([YOUTUBE_KEY, GROQ_KEY, SHOW_FULL_ANALYSIS_KEY, SHOW_THUMBNAIL_KEY], (result) => {
      if (result[YOUTUBE_KEY]) {
        youtubeInput.value = result[YOUTUBE_KEY];
        validateYoutubeKey(result[YOUTUBE_KEY]);
      }
      if (result[GROQ_KEY]) {
        groqInput.value = result[GROQ_KEY];
        validateGroqKey(result[GROQ_KEY]);
      }
      showFullAnalysisToggle.checked = result[SHOW_FULL_ANALYSIS_KEY] !== false;
      showThumbnailToggle.checked = result[SHOW_THUMBNAIL_KEY] !== false;
    });
  }

  function validateYoutubeKey(key) {
    youtubeInput.classList.remove('valid', 'invalid');
    youtubeStatus.classList.remove('valid', 'invalid', 'empty');
    youtubeError.classList.remove('show');

    if (!key) {
      youtubeStatus.textContent = '';
      return false;
    }

    const isValid = key.length >= 20 && key.startsWith('AIza');
    
    if (isValid) {
      youtubeInput.classList.add('valid');
      youtubeStatus.textContent = '✓ Valid format';
      youtubeStatus.classList.add('valid');
    } else {
      youtubeInput.classList.add('invalid');
      youtubeStatus.textContent = '⚠ Invalid format';
      youtubeStatus.classList.add('invalid');
      youtubeError.textContent = 'YouTube API key should start with "AIza" and be at least 20 characters';
      youtubeError.classList.add('show');
    }
    
    return isValid;
  }

  function validateGroqKey(key) {
    groqInput.classList.remove('valid', 'invalid');
    groqStatus.classList.remove('valid', 'invalid', 'empty');
    groqError.classList.remove('show');

    if (!key) {
      groqStatus.textContent = '';
      return false;
    }

    const isValid = key.length >= 20;
    
    if (isValid) {
      groqInput.classList.add('valid');
      groqStatus.textContent = '✓ Valid format';
      groqStatus.classList.add('valid');
    } else {
      groqInput.classList.add('invalid');
      groqStatus.textContent = '⚠ Invalid format';
      groqStatus.classList.add('invalid');
      groqError.textContent = 'Groq API key should be at least 20 characters';
      groqError.classList.add('show');
    }
    
    return isValid;
  }

  function saveKeys() {
    const youtubeKey = youtubeInput.value.trim();
    const groqKey = groqInput.value.trim();

    const youtubeValid = validateYoutubeKey(youtubeKey);
    const groqValid = validateGroqKey(groqKey);

    if (!youtubeKey || !groqKey) {
      if (!youtubeKey) {
        youtubeError.textContent = 'Please enter a YouTube API key';
        youtubeError.classList.add('show');
      }
      if (!groqKey) {
        groqError.textContent = 'Please enter a Groq API key';
        groqError.classList.add('show');
      }
      return;
    }

    if (!youtubeValid || !groqValid) {
      return;
    }

    const data = {};
    data[YOUTUBE_KEY] = youtubeKey;
    data[GROQ_KEY] = groqKey;
    data[SHOW_FULL_ANALYSIS_KEY] = showFullAnalysisToggle.checked;
    data[SHOW_THUMBNAIL_KEY] = showThumbnailToggle.checked;

    chrome.storage.local.set(data, () => {
      showSuccess();
    });
  }

  function saveSettingsPref() {
    const data = {};
    data[SHOW_FULL_ANALYSIS_KEY] = showFullAnalysisToggle.checked;
    data[SHOW_THUMBNAIL_KEY] = showThumbnailToggle.checked;

    chrome.storage.local.set(data);
  }

  function showSuccess() {
    successMessage.classList.add('show');
    saveBtn.textContent = 'Saved!';
    saveBtn.disabled = true;

    setTimeout(() => {
      successMessage.classList.remove('show');
      saveBtn.textContent = 'Save Settings';
      saveBtn.disabled = false;
    }, 2000);
  }
});
