"use client"
import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Clock, Eye, Settings, SkipBack, SkipForward } from 'lucide-react';

export default function VideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
      setIsMuted(value === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentTime(value);
    if (videoRef.current) {
      videoRef.current.currentTime = value;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (!videoDuration) {
        setVideoDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const skipForward = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const skipBackward = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime -= seconds;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-10 text-center px-4">
      {/* Titre principal */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Comment ça marche ?
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Découvrez comment organiser vos événements facilement avec notre plateforme
        </p>
      </div>

      {/* Carte Vidéo */}
      <div className="flex justify-center">
        <div 
          ref={containerRef}
          className="relative w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* En-tête */}
          <div className="p-5 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <div className="w-6 h-6 flex items-center justify-center text-purple-400">
                    ▶
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">Guide complet - FULL EVENT</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                      Tutoriel
                    </span>
                    <span className="text-gray-400 text-sm">8:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zone vidéo - CHEMIN DIRECT DEPUIS PUBLIC/ */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className="w-full h-auto aspect-video"
              poster=""
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
            >
              {/* ICI : Chemin direct depuis le dossier public */}
              <source 
                src="/video.mp4"  // ← Votre vidéo est à la racine de public/
                type="video/mp4" 
              />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>

            {/* Overlay avec contrôles */}
            <div className={`
              absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
              transition-opacity duration-300
              ${showControls ? 'opacity-100' : 'opacity-0'}
              ${isPlaying ? 'cursor-none' : 'cursor-pointer'}
            `}>
              
              {/* Bouton Play/Pause central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className={`
                    p-4 bg-white/20 backdrop-blur-sm rounded-full 
                    transition-all duration-300 transform
                    ${showControls ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                    hover:scale-110 hover:bg-white/30
                  `}
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </button>
                
                {/* Boutons Skip */}
                <div className="absolute left-6 right-6 flex justify-between">
                  <button
                    onClick={() => skipBackward(10)}
                    className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => skipForward(10)}
                    className="p-2.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  >
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Barre de contrôle inférieure */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-gradient-to-t from-black/90 to-transparent">
                {/* Barre de progression */}
                <div className="flex items-center gap-3">
                  <span className="text-white text-xs font-medium min-w-[45px]">
                    {formatTime(currentTime)}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={videoDuration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <span className="text-white text-xs font-medium min-w-[45px]">
                    {formatTime(videoDuration)}
                  </span>
                </div>

                {/* Contrôles inférieurs */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      )}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                  </div>

                  {/* Contrôles droits */}
                  <div className="flex items-center gap-1">
                    {/* Paramètres */}
                    <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                      <Settings className="w-4 h-4 text-white" />
                    </button>

                    {/* Plein écran */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize className="w-4 h-4 text-white" />
                      ) : (
                        <Maximize className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Infos sous la vidéo */}
          <div className="p-5">
            <p className="text-gray-300 mb-4 text-left">
              Apprenez à organiser vos événements facilement avec notre guide étape par étape. 
              De la création à la promotion, découvrez toutes les fonctionnalités de la plateforme.
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">15.2K vues</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Publié il y a 3 jours</span>
                </div>
              </div>
              
              <div className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                1080p HD
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}