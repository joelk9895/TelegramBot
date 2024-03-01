"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [queryKey, setQueryKey] = useState(0); // Random query key
  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      const scrollYProgress = scrollY / (documentHeight - windowHeight);
      setFrameCount(Math.floor(scrollYProgress * 249) + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = [];
      for (let i = 1; i <= 250; i++) {
        const image = new Image();
        image.src = `/airpods/${i.toString().padStart(4, "0")}.png?${queryKey}`; // Append random query string
        promises.push(
          new Promise((resolve) => {
            image.onload = resolve;
            image.onerror = () => {
              console.error("Error loading image:", image.src);
            };
          }),
        );
      }
      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [queryKey]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderCanvas = () => {
      const image = new Image();
      const frameIndex = Math.floor(frameCount);
      const imagePath = `/airpods/${frameIndex.toString().padStart(4, "0")}.png?${queryKey}`;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, -100);
      };

      image.src = imagePath ? imagePath : `/airpods/0001.png?${queryKey}`;
    };

    renderCanvas();
  }, [frameCount, imagesLoaded, queryKey]);

  // Function to force reload images
  const reloadImages = () => {
    setQueryKey(Date.now());
  };

  return (
    <main
      className="flex h-[500vh] min-h-screen flex-col items-center justify-between bg-black"
      ref={containerRef}
    >
      <canvas className="sticky left-0 top-0 z-10" ref={canvasRef}></canvas>
      <div className="fixed left-0 top-0 z-0 flex h-[100vh] w-[100vw] items-center justify-center bg-transparent">
        <h1 className="text-[13rem] font-bold text-white">Airpods Pro</h1>
      </div>
      <button onClick={reloadImages}>Reload Images</button>
    </main>
  );
}
