"use client"
import { useState } from 'react';

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const images = [
    {
      id: 1,
      image: '/co.jpeg', 
      title: 'Concert Live',
      color: 'from-orange-400 to-yellow-500'
    },
    {
      id: 2,
      image: '/ca.jpeg', 
      title: 'Soirée dancing',
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 3,
      image: '/Im3.jpeg', 
      title: 'Soirée Lounge',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 4,
      image: '/Im4.jpeg', 
      title: 'Concert one fire',
      color: 'from-red-500 to-orange-400'
    },
    {
      id: 5,
      image: '/Im5.jpeg', 
      title: 'Showcase',
      color: 'from-gray-600 to-gray-800'
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - translateX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    setTranslateX(x);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (translateX < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    setTranslateX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - startX;
    setTranslateX(x);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleImageError = (imageId: number) => {
    console.log(`Image ${imageId} failed to load`);
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  return (
    <div className="w-full py-8">
      <div 
        className="relative w-full h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1000px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => {
          const offset = index - currentIndex;
          const isCenter = offset === 0;
          const scale = isCenter ? 1 : 0.75; 
          const opacity = Math.abs(offset) > 2 ? 0 : isCenter ? 1 : 0.6; 
          const zIndex = isCenter ? 30 : 20 - Math.abs(offset);
          
          const baseTranslate = offset * 320;
          const dragTranslate = isDragging ? translateX : 0;
          const totalTranslate = baseTranslate + dragTranslate;

          const hasError = imageErrors[image.id];

          return (
            <div
              key={image.id}
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) translateX(${totalTranslate}px) scale(${scale}) rotateY(${offset * -10}deg)`,
                opacity: opacity,
                zIndex: zIndex,
                width: '320px', 
                height: '260px', 
                transformStyle: 'preserve-3d'
              }}
              onClick={() => !isCenter && goToSlide(index)}
            >
              <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-xl bg-gradient-to-br ${image.color}`}>
                <div className="relative w-full h-full">
                  {!hasError ? (
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                      onError={() => handleImageError(image.id)}
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${image.color}`}>
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="text-white font-semibold">{image.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {isCenter && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                    <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-gray-500 w-1.5 hover:bg-gray-400'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-gray-400 mt-4 text-xs">
        Glissez ou cliquez pour naviguer
      </p>
    </div>
  );
}

export default function Popular() {
  return (
    <div className="min-h-screen">
      <div className="px-8 pt-6 pb-2">
        <h1 className="text-3xl text-white font-bold">Populaires</h1>
      </div>

      <ImageSlider />
    </div>
  );
}