import React, { useRef, useEffect, useState } from 'react';

interface HeroVideoProps {
  videoSrc?: string;
  overlayOpacity?: number;
  children: React.ReactNode;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ 
  videoSrc = "/background-video.mp4", 
  overlayOpacity = 0.5,
  children 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('🎥 Video element found, attempting to load...');
      
      const handleLoadStart = () => console.log('Video load started');
      const handleLoadedData = () => {
        console.log('Video data loaded');
        setVideoLoaded(true);
      };
      const handleCanPlay = () => {
        console.log('Video can play');
        // Force play when video can play
        video.play().catch(e => console.error('Autoplay failed:', e));
      };
      const handlePlay = () => {
        console.log('Video started playing');
        setVideoLoaded(true);
      };
      const handleError = (e: any) => {
        console.error('Video error:', e);
        setVideoError(true);
        setVideoLoaded(false);
      };

      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('play', handlePlay);
      video.addEventListener('error', handleError);

      // Multiple attempts to load and play
      const tryToPlay = async () => {
        try {
          console.log('Attempting to load video...');
          video.load();
          
          // Wait a bit then try to play
          setTimeout(async () => {
            try {
              await video.play();
              console.log('Video playing successfully');
            } catch (error) {
              console.error('Failed to play video:', error);
              setVideoError(true);
            }
          }, 500);
          
        } catch (error) {
          console.error('Failed to load video:', error);
          setVideoError(true);
        }
      };

      // Try immediately and after a delay
      tryToPlay();

      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Fallback gradient background - only show if video fails or hasn't loaded */}
      {(!videoLoaded || videoError) && (
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"
          style={{ zIndex: 0 }}
        />
      )}
      
      {/* Dark overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black"
        style={{ 
          zIndex: 2,
          opacity: overlayOpacity 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default HeroVideo; 