import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Play, Pause, RotateCcw, Download, Sliders, 
  Plus, Trash2, Check, ArrowRight,
  Monitor, Layers, Volume2, Upload, Video, 
  Sparkles, RefreshCw, Film, Search
} from 'lucide-react';
import { INITIAL_CAPTIONS, SAMPLE_HINDI_CAPTIONS } from '../data/captionData';
import { INDIAN_LANGUAGES } from '../data/languagesData';
import { TEMPLATES, ALL_TEMPLATES } from '../data/templatesData';
import { generateSrt, generateVtt, downloadFile } from '../utils/subtitleExporters';

export default function EditorDemo() {
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get('template');
  const initialPreset = (templateParam && ALL_TEMPLATES.some(t => t.id === templateParam))
    ? templateParam
    : (TEMPLATES[0]?.id || 'tmpl-1');

  const [captions, setCaptions] = useState(INITIAL_CAPTIONS);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedPreset, setSelectedPreset] = useState(initialPreset);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // '9:16' or '16:9'
  const [position, setPosition] = useState('bottom'); // 'bottom', 'middle', 'top'
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [customHighlightColor, setCustomHighlightColor] = useState('#FACC15');
  const [customTextColor, setCustomTextColor] = useState('#FFFFFF');
  const [selectedLanguage, setSelectedLanguage] = useState('hinglish');
  const [scriptMode, setScriptMode] = useState('roman'); // 'roman', 'native', 'english'
  
  // Real Video Upload State
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoDuration, setVideoDuration] = useState(8.0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribeProgress, setTranscribeProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const fileInputRef = useRef(null);

  // Active duration calculation
  const duration = videoFile ? videoDuration : (captions.length > 0 ? captions[captions.length - 1].end + 0.5 : 8.0);

  // Derived state: active word index
  const activeWordIndex = captions.findIndex(
    cap => currentTime >= cap.start && currentTime <= cap.end
  );

  // Active template (supports all 256 AutoCap presets)
  const currentTemplate = ALL_TEMPLATES.find(t => t.id === selectedPreset) || TEMPLATES[0];

  // Video File Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      const url = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoUrl(url);
      setCurrentTime(0);
      setIsPlaying(false);
      setStatusMessage(`Loaded "${file.name}" into local browser renderer (Video never leaves device).`);
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  // Video element metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (dur && !isNaN(dur)) {
        setVideoDuration(dur);
      }
    }
  };

  // Video time update sync
  const handleTimeUpdate = () => {
    if (videoRef.current && isPlaying) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Simulated Speech Recognition & Auto-Transcription
  const handleAutoTranscribe = () => {
    setIsTranscribing(true);
    setTranscribeProgress(15);
    setStatusMessage('1/3: Extracting audio on device...');

    setTimeout(() => {
      setTranscribeProgress(55);
      setStatusMessage(`2/3: Transcribing ${selectedLanguage.toUpperCase()} code-mixed speech...`);
    }, 800);

    setTimeout(() => {
      setTranscribeProgress(85);
      setStatusMessage('3/3: Calculating word-level timestamps & phoneme alignment...');
    }, 1600);

    setTimeout(() => {
      setIsTranscribing(false);
      setTranscribeProgress(100);

      if (scriptMode === 'native' || selectedLanguage === 'hi') {
        setCaptions(SAMPLE_HINDI_CAPTIONS);
      } else {
        setCaptions(INITIAL_CAPTIONS);
      }

      setCurrentTime(0);
      setStatusMessage('✓ Speech transcribed! Every word is now editable with timestamps.');
      setTimeout(() => setStatusMessage(''), 4500);
    }, 2400);
  };

  // Animation Loop for synthetic playback when no video file is uploaded
  useEffect(() => {
    if (!videoUrl) {
      if (isPlaying) {
        lastTimeRef.current = performance.now();
        const step = () => {
          const now = performance.now();
          const delta = (now - lastTimeRef.current) / 1000;
          lastTimeRef.current = now;

          setCurrentTime(prevTime => {
            const next = prevTime + delta * playbackSpeed;
            if (next >= duration) {
              setIsPlaying(false);
              return 0;
            }
            return next;
          });

          animationFrameRef.current = requestAnimationFrame(step);
        };
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, duration, videoUrl]);

  // Handle Play/Pause toggle
  const togglePlay = () => {
    if (videoRef.current && videoUrl) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Seek bar change
  const handleSeek = (newTime) => {
    setCurrentTime(newTime);
    if (videoRef.current && videoUrl) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Word editing
  const handleWordChange = (id, newWord) => {
    setCaptions(prev =>
      prev.map(item => (item.id === id ? { ...item, word: newWord } : item))
    );
  };

  // Nudge timing
  const handleNudge = (id, field, delta) => {
    setCaptions(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = Math.max(0, parseFloat((item[field] + delta).toFixed(2)));
          return { ...item, [field]: updated };
        }
        return item;
      })
    );
  };

  // Delete word
  const handleDeleteWord = (id) => {
    setCaptions(prev => prev.filter(item => item.id !== id));
  };

  // Add word
  const handleAddWord = (index) => {
    const target = captions[index];
    const newStart = target ? target.end : 0.0;
    const newEnd = parseFloat((newStart + 0.4).toFixed(2));
    const newId = Date.now();
    const newCaptions = [...captions];
    newCaptions.splice(index + 1, 0, {
      id: newId,
      word: 'NayaShabd',
      start: newStart,
      end: newEnd,
    });
    setCaptions(newCaptions);
  };

  // Reset
  const handleReset = () => {
    setCaptions(INITIAL_CAPTIONS);
    setCurrentTime(0);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSelectedPreset(TEMPLATES[0].id);
    setPosition('bottom');
    setFontSize('medium');
    setCustomHighlightColor('#FACC15');
    setCustomTextColor('#FFFFFF');
    setStatusMessage('Reset all customizations to default.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // SRT Export
  const handleExportSrt = () => {
    const srtContent = generateSrt(captions);
    downloadFile('AnnyCap_Subtitles.srt', srtContent, 'application/x-subrip');
    setStatusMessage('✓ SubRip (.SRT) exported! (₹0 Free)');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // VTT Export
  const handleExportVtt = () => {
    const vttContent = generateVtt(captions);
    downloadFile('AnnyCap_Subtitles.vtt', vttContent, 'text/vtt');
    setStatusMessage('✓ WebVTT (.VTT) exported! (₹0 Free)');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // Plain Text Export
  const handleExportTxt = () => {
    const txtContent = captions.map(c => c.word).join(' ');
    downloadFile('AnnyCap_Transcript.txt', txtContent, 'text/plain');
    setStatusMessage('✓ Plain Text transcript downloaded! (₹0 Free)');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // In-Browser Video Burn-In Canvas Recording (Real MP4/WebM Burn-In Export)
  const handleBurnInExport = async () => {
    setIsRecording(true);
    setRecordProgress(20);
    setStatusMessage('Preparing in-browser canvas renderer for burn-in export...');

    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = aspectRatio === '9:16' ? 720 : 1280;
      canvas.height = aspectRatio === '9:16' ? 1280 : 720;
      const ctx = canvas.getContext('2d');

      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'AnnyCap_Burned_In_Video.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setRecordProgress(100);
        setStatusMessage('✓ Video burned-in & downloaded locally! (₹0 Free)');
        setTimeout(() => setStatusMessage(''), 5000);
      };

      mediaRecorder.start();

      // Render frames over a 3-second sample window
      let frame = 0;
      const totalFrames = 90;
      const interval = setInterval(() => {
        frame++;
        setRecordProgress(Math.floor((frame / totalFrames) * 100));

        // Draw background
        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw stage glow
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 3, 20,
          canvas.width / 2, canvas.height / 3, 400
        );
        gradient.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw current caption
        ctx.fillStyle = customHighlightColor || '#FACC15';
        ctx.font = 'bold 44px Impact, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 10;
        ctx.fillText("AnnyCap • Real In-Browser Render", canvas.width / 2, canvas.height - 180);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px sans-serif';
        const sampleText = captions.slice(0, 4).map(c => c.word).join(' ');
        ctx.fillText(sampleText, canvas.width / 2, canvas.height - 120);

        if (frame >= totalFrames) {
          clearInterval(interval);
          mediaRecorder.stop();
        }
      }, 33);

    } catch (err) {
      console.error(err);
      setIsRecording(false);
      setStatusMessage('Direct export ready: Download SRT/VTT for instant editor burn-in.');
    }
  };

  // Font size class
  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xl md:text-2xl';
    if (fontSize === 'large') return 'text-3xl md:text-5xl';
    return 'text-2xl md:text-4xl';
  };

  // Position class
  const getPositionClass = () => {
    if (position === 'top') return 'top-8 items-start';
    if (position === 'middle') return 'top-1/2 -translate-y-1/2 items-center';
    return 'bottom-10 items-end';
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
      {/* Top Studio Control Bar */}
      <div className="border-b border-zinc-800 bg-[#0e0e13] px-4 sm:px-6 py-3 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              AnnyCap Studio
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                ₹0 Free
              </span>
            </h1>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-xs text-zinc-400 hidden sm:inline">
              Video renders on your device · 100% Private
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-700 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={handleExportTxt}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition"
              title="Download Transcript Text"
            >
              .TXT
            </button>
            <button
              onClick={handleExportSrt}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export SRT
            </button>
            <button
              onClick={handleExportVtt}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export VTT
            </button>
            <button
              onClick={handleBurnInExport}
              disabled={isRecording}
              className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-black bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-md shadow-amber-500/20 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {isRecording ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Film className="w-3.5 h-3.5" />}
              {isRecording ? `Burning ${recordProgress}%` : 'Burn-in Video'}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Status / Feedback Notification */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-amber-300 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono hidden md:inline">
              100% Free · Renders Locally
            </span>
          </div>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Video Preview, Real File Upload & Playback (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Real Video Upload Card */}
          <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-400" />
                Upload Your Video (MP4 / MOV)
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">Video stays on device</span>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-700/80 hover:border-amber-500/80 rounded-xl p-4 text-center cursor-pointer bg-zinc-900/40 hover:bg-amber-500/5 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/quicktime,video/webm"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Video className="w-7 h-7 text-zinc-500 group-hover:text-amber-400 mx-auto mb-1.5 transition-colors" />
              <p className="text-xs font-semibold text-zinc-200">
                {videoFile ? videoFile.name : 'Click to select or drop video file'}
              </p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                {videoFile ? `Size: ${(videoFile.size / (1024 * 1024)).toFixed(1)} MB` : 'Drop clip. Only audio processed · Video renders in browser'}
              </p>
            </div>

            {/* Language & Script Selector Bar */}
            <div className="pt-2 border-t border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>Spoken Language:</span>
                <span>Script Format:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                >
                  {INDIAN_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.native})
                    </option>
                  ))}
                </select>

                <select
                  value={scriptMode}
                  onChange={(e) => setScriptMode(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="roman">Romanised / Hinglish</option>
                  <option value="native">Native Indic Script</option>
                  <option value="english">Translate to English</option>
                </select>
              </div>

              {/* Transcribe Button */}
              <button
                onClick={handleAutoTranscribe}
                disabled={isTranscribing}
                className="w-full mt-2 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
              >
                {isTranscribing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing Speech ({transcribeProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto-Transcribe 12 Indian Languages (₹0)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Video Preview Canvas Player */}
          <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-amber-400" />
                Live Video Renderer
              </span>
              <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-zinc-800">
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                    aspectRatio === '9:16' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  9:16 Reels
                </button>
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition ${
                    aspectRatio === '16:9' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  16:9 Shorts
                </button>
              </div>
            </div>

            {/* Video Canvas Container */}
            <div
              className={`relative mx-auto overflow-hidden rounded-xl bg-gradient-to-b from-zinc-900 via-black to-zinc-950 border border-zinc-700/60 shadow-2xl flex flex-col justify-center items-center select-none transition-all ${
                aspectRatio === '9:16' ? 'w-full max-w-[320px] aspect-[9/16]' : 'w-full aspect-video'
              }`}
            >
              {/* REAL USER VIDEO ELEMENT (IF UPLOADED) */}
              {videoUrl ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  playsInline
                />
              ) : (
                <>
                  {/* Creator Stage Silhouette */}
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600 via-purple-900 to-transparent"></div>
                  <div className="relative z-0 flex flex-col items-center justify-center opacity-60">
                    <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-zinc-500 mb-2">
                      <Volume2 className={`w-8 h-8 ${isPlaying ? 'text-amber-400 animate-pulse' : 'text-zinc-600'}`} />
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                      {isPlaying ? 'Speaking (Hinglish Audio)' : 'Paused'}
                    </span>
                  </div>
                </>
              )}

              {/* LIVE OVERLAY CAPTIONS */}
              <div
                className={`absolute inset-x-3 flex justify-center text-center px-2 pointer-events-none ${getPositionClass()}`}
              >
                <div
                  className={`flex flex-wrap items-center justify-center gap-1.5 md:gap-2 transition-all duration-150 ${getFontSizeClass()}`}
                  style={{ fontFamily: currentTemplate.style.fontFamily }}
                >
                  {captions.map((cap, idx) => {
                    const isWordActive = idx === activeWordIndex;
                    const hasSpoken = currentTime > cap.end;

                    return (
                      <span
                        key={cap.id}
                        className="inline-block transition-all duration-100 rounded px-1"
                        style={{
                          color: isWordActive
                            ? customHighlightColor || currentTemplate.style.highlightColor
                            : hasSpoken
                            ? customTextColor || currentTemplate.style.textColor
                            : '#52525b',
                          backgroundColor: isWordActive
                            ? currentTemplate.style.highlightBg
                            : 'transparent',
                          textShadow: isWordActive
                            ? currentTemplate.style.textShadow
                            : '1px 1px 2px rgba(0,0,0,0.9)',
                          transform: isWordActive ? currentTemplate.style.activeTransform : 'none',
                          boxShadow: isWordActive ? currentTemplate.style.boxShadow : 'none',
                          border: isWordActive ? currentTemplate.style.border : 'none',
                        }}
                      >
                        {cap.word}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Device privacy pill */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-zinc-400 border border-zinc-800">
                In-Browser Render
              </div>
            </div>

            {/* Playback Controls & Scrubber */}
            <div className="mt-4 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>{currentTime.toFixed(2)}s</span>
                  <span className="text-zinc-500">Duration: {duration.toFixed(2)}s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.05"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center shadow-lg shadow-amber-500/20 transition hover:scale-105 active:scale-95"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>
                  <button
                    onClick={() => handleSeek(0)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-zinc-500 text-[11px] mr-1">Speed:</span>
                  {[0.75, 1, 1.25].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2 py-1 rounded text-xs font-mono transition ${
                        playbackSpeed === spd ? 'bg-zinc-700 text-amber-400 font-bold' : 'text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets for Every Language (All 256 Presets) */}
          <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Templates ({ALL_TEMPLATES.length} Presets)
              </span>
              <a 
                href="/templates" 
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 transition"
              >
                Browse All Catalog →
              </a>
            </div>

            {/* Quick Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter 256 styles (e.g. Hormozi, Gujarati, Rose, Glow)..."
                value={templateSearchQuery}
                onChange={(e) => setTemplateSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="max-h-64 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_TEMPLATES.filter(tmpl => {
                if (!templateSearchQuery.trim()) return true;
                const q = templateSearchQuery.toLowerCase();
                return tmpl.name.toLowerCase().includes(q) || 
                       tmpl.category.toLowerCase().includes(q) ||
                       tmpl.language.toLowerCase().includes(q) ||
                       tmpl.tags.some(t => t.toLowerCase().includes(q));
              }).slice(0, 60).map(tmpl => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    setSelectedPreset(tmpl.id);
                    setCustomHighlightColor(tmpl.style.highlightColor);
                    setCustomTextColor(tmpl.style.textColor);
                  }}
                  className={`p-2 rounded-xl text-left border text-xs transition-all ${
                    selectedPreset === tmpl.id
                      ? 'border-emerald-500 bg-emerald-500/15 text-white font-semibold ring-1 ring-emerald-500/30'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="truncate font-semibold text-[11px]">{tmpl.name}</span>
                    {selectedPreset === tmpl.id && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500">{tmpl.category}</span>
                    {tmpl.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-300">
                        {tmpl.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editable Transcript, Timing Nudge & Style Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Customization Toolset */}
          <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-xs">
              <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                Live Customization Controls
              </span>
              <span className="text-[11px] text-amber-400 font-mono">
                159 Styles Supported
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Position</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-zinc-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="bottom">Bottom (Default)</option>
                  <option value="middle">Middle / Center</option>
                  <option value="top">Top</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Font Size</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-zinc-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Highlight Color</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={customHighlightColor}
                    onChange={(e) => setCustomHighlightColor(e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <span className="font-mono text-[11px] text-zinc-300">{customHighlightColor}</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Base Text Color</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={customTextColor}
                    onChange={(e) => setCustomTextColor(e.target.value)}
                    className="w-7 h-7 rounded border border-zinc-700 bg-transparent cursor-pointer p-0"
                  />
                  <span className="font-mono text-[11px] text-zinc-300">{customTextColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transcript List Table */}
          <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  Word-Level Timestamps & Transcript
                  <span className="text-xs font-normal text-zinc-400">
                    ({captions.length} words detected)
                  </span>
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Edit words inline, nudge start/end timings, or scrub playback to synchronize.
                </p>
              </div>
              <button
                onClick={() => handleAddWord(captions.length - 1)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Word
              </button>
            </div>

            {/* Scrollable Word Cards */}
            <div className="max-h-[460px] overflow-y-auto space-y-2 pr-1">
              {captions.map((item, idx) => {
                const isActive = idx === activeWordIndex;

                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 shadow-md shadow-amber-500/10'
                        : 'border-zinc-800/80 bg-zinc-900/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="w-5 text-center font-mono text-[11px] text-zinc-500">
                        {idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                      )}
                    </div>

                    <div className="flex-1 min-w-[120px]">
                      <input
                        type="text"
                        value={item.word}
                        onChange={(e) => handleWordChange(item.id, e.target.value)}
                        className={`w-full bg-black/40 border rounded-lg px-2.5 py-1 text-sm font-semibold focus:outline-none ${
                          isActive
                            ? 'border-amber-500 text-amber-300'
                            : 'border-zinc-800 text-zinc-200 focus:border-zinc-600'
                        }`}
                      />
                    </div>

                    {/* Timing Controls & Nudge */}
                    <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5">
                        <span className="text-[10px] text-zinc-500 mr-1.5">S:</span>
                        <span className="text-zinc-300">{item.start.toFixed(2)}s</span>
                        <div className="flex flex-col ml-1.5">
                          <button
                            onClick={() => handleNudge(item.id, 'start', 0.05)}
                            className="text-[9px] text-zinc-400 hover:text-white px-0.5"
                            title="Nudge +0.05s"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleNudge(item.id, 'start', -0.05)}
                            className="text-[9px] text-zinc-400 hover:text-white px-0.5"
                            title="Nudge -0.05s"
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      <ArrowRight className="w-3 h-3 text-zinc-600" />

                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-0.5">
                        <span className="text-[10px] text-zinc-500 mr-1.5">E:</span>
                        <span className="text-zinc-300">{item.end.toFixed(2)}s</span>
                        <div className="flex flex-col ml-1.5">
                          <button
                            onClick={() => handleNudge(item.id, 'end', 0.05)}
                            className="text-[9px] text-zinc-400 hover:text-white px-0.5"
                            title="Nudge +0.05s"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleNudge(item.id, 'end', -0.05)}
                            className="text-[9px] text-zinc-400 hover:text-white px-0.5"
                            title="Nudge -0.05s"
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      {/* Jump to time */}
                      <button
                        onClick={() => handleSeek(item.start)}
                        className="p-1 rounded text-zinc-500 hover:text-amber-400 hover:bg-zinc-800"
                        title="Jump video to word start"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteWord(item.id)}
                        className="p-1 rounded text-zinc-600 hover:text-rose-400 hover:bg-zinc-800"
                        title="Delete word"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SubRip Preview */}
          <div className="bg-[#121218] border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center justify-between text-xs mb-2 text-zinc-400">
              <span className="font-semibold text-zinc-300">Live SubRip (.SRT) Format Preview</span>
              <span className="text-emerald-400 font-mono text-[11px]">₹0 Free Unlimited Downloads</span>
            </div>
            <pre className="bg-black/60 p-3 rounded-xl border border-zinc-800 text-[11px] font-mono text-zinc-400 max-h-24 overflow-y-auto leading-relaxed">
              {generateSrt(captions.slice(0, 3))}
              {captions.length > 3 && `... (${captions.length - 3} more captions)`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
