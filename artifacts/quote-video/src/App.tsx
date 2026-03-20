import { useState, useEffect } from 'react';
import VideoTemplate from "@/components/video/VideoTemplate";
import VideoControls from "@/components/VideoControls";

export default function App() {
  const [mode, setMode] = useState<'controls' | 'record'>('controls');
  const [aspect, setAspect] = useState<'square' | 'portrait'>('square');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('record')) {
      setMode('record');
      const a = params.get('aspect');
      if (a === 'portrait') setAspect('portrait');
    }
  }, []);

  if (mode === 'record') {
    const style = aspect === 'portrait'
      ? { width: '1080px', height: '1350px' }
      : { width: '1080px', height: '1080px' };

    return (
      <div style={{ ...style, overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>
        <VideoTemplate />
      </div>
    );
  }

  return <VideoControls />;
}
