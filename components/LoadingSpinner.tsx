import React, { useState, useEffect } from 'react';

const defaultMessages = [
  "AIがあなたのキャラクターを生成中...",
  "アーティスティックなスタイルを適用しています...",
  "トレカを最終仕上げしています...",
  "魔法のインクで印刷中...",
  "もうすぐ完成です！"
];

interface LoadingSpinnerProps {
    messages?: string[];
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ messages = defaultMessages }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setMessageIndex(0); // Reset index when messages change
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="w-24 h-24 border-8 border-t-purple-500 border-gray-700 rounded-full animate-spin"></div>
      <p className="text-xl text-gray-300 font-semibold animate-pulse">{messages[messageIndex]}</p>
    </div>
  );
};

export default LoadingSpinner;
