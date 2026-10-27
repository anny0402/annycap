/**
 * Formats seconds into SRT timestamp string: HH:MM:SS,mmm
 */
export function formatSrtTime(seconds) {
  const totalMs = Math.max(0, Math.floor(seconds * 1000));
  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  const pad = (n, width = 2) => String(n).padStart(width, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

/**
 * Formats seconds into WebVTT timestamp string: HH:MM:SS.mmm
 */
export function formatVttTime(seconds) {
  const totalMs = Math.max(0, Math.floor(seconds * 1000));
  const ms = totalMs % 1000;
  const totalSeconds = Math.floor(totalMs / 1000);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  const pad = (n, width = 2) => String(n).padStart(width, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

/**
 * Generates SubRip (.srt) string from word array
 */
export function generateSrt(captions) {
  if (!captions || captions.length === 0) return '';
  return captions
    .map((item, index) => {
      const idx = index + 1;
      const startTime = formatSrtTime(item.start);
      const endTime = formatSrtTime(item.end);
      return `${idx}\n${startTime} --> ${endTime}\n${item.word.trim()}\n`;
    })
    .join('\n');
}

/**
 * Generates WebVTT (.vtt) string from word array
 */
export function generateVtt(captions) {
  if (!captions || captions.length === 0) return 'WEBVTT\n';
  let vtt = 'WEBVTT - AutoCap Reconstruction Free Export\n\n';
  vtt += captions
    .map((item, index) => {
      const idx = index + 1;
      const startTime = formatVttTime(item.start);
      const endTime = formatVttTime(item.end);
      return `${idx}\n${startTime} --> ${endTime}\n${item.word.trim()}\n`;
    })
    .join('\n');
  return vtt;
}

/**
 * Triggers a client-side file download with text content
 */
export function downloadFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
