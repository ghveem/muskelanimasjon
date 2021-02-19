import { useEffect, useState } from 'react';

const doc = document;

const changeEvent = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'mozfullscreenchange',
].find(name => `on${name}` in doc);

const fullscreenEnabled =
  doc.fullscreenEnabled !== false &&
  doc.webkitFullscreenEnabled !== false &&
  doc.mozFullScreenEnabled !== false &&
  changeEvent;

const requestFullscreen = (el = doc.documentElement) => {
  const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
  if (req) {
    req.call(el);
  }
};

const exitFullscreen = () => {
  const exit = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen;
  if (exit) {
    exit.call(doc);
  }
};

const isBrowserFullscreen = () =>
  !!(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitIsFullScreen ||
    doc.mozFullScreen
  );

const toggleFullscreen = el => {
  if (isBrowserFullscreen()) {
    console.log('exitFullscreen')
    exitFullscreen();
  } else {
    console.log('requestFullscreen')
    requestFullscreen(el);
  }
};

export default function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(isBrowserFullscreen());
  useEffect(() => {
    console.log('enabled', fullscreenEnabled)
    if (!fullscreenEnabled) return;
    const handleFullscreenChange = () => setIsFullscreen(isBrowserFullscreen());
    doc.addEventListener(changeEvent, handleFullscreenChange);
    return () => {
      doc.removeEventListener(changeEvent, handleFullscreenChange);
    };
  }, []);
  return [isFullscreen, fullscreenEnabled ? toggleFullscreen : undefined];
}