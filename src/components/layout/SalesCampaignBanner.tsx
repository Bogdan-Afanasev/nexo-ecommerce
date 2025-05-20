"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "fake-sale-timer-expires-at";
const MIN_DURATION = 1 * 60 * 60 * 1000; // 1 час в мс
const MAX_DURATION = 24 * 60 * 60 * 1000; // 24 часа в мс

const getRandomDuration = () => {
  return (
    Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) + MIN_DURATION
  );
};

const initializeTimer = () => {
  const now = Date.now();
  const expiresAt = now + getRandomDuration();
  localStorage.setItem(STORAGE_KEY, expiresAt.toString());
  return expiresAt;
};

const SalesCampaignBanner = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const now = Date.now();
    let expiresAt: number;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && !isNaN(parseInt(stored))) {
      expiresAt = parseInt(stored);
      if (now >= expiresAt) {
        // время истекло — сброс
        expiresAt = initializeTimer();
      }
    } else {
      expiresAt = initializeTimer();
    }

    const updateTimer = () => {
      const now = Date.now();
      const remainingSeconds = Math.floor((expiresAt - now) / 1000);

      if (remainingSeconds <= 0) {
        const newExpires = initializeTimer();
        setTimeLeft(Math.floor((newExpires - Date.now()) / 1000));
      } else {
        setTimeLeft(remainingSeconds);
      }
    };

    updateTimer(); // немедленно вызвать
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 py-3 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold animate-bounce">
              🔥
            </span>
            <div className="text-sm sm:text-base font-bold">
              РАСПРОДАЖА ЗАКАНЧИВАЕТСЯ ЧЕРЕЗ:
            </div>
            <div className="bg-white/20 rounded px-2 py-1 font-mono font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">⚡</span>
            <span className="font-bold text-yellow-200 animate-pulse">
              СКИДКИ ДО 95%!
            </span>
          </div>

          <button
            className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm hover:bg-yellow-100 transition-colors shadow-lg"
            onClick={() => {
              router.push("/");
            }}
          >
            КУПИТЬ СЕЙЧАС!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesCampaignBanner;
