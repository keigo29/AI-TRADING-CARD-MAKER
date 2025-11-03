import React from 'react';
import { DownloadIcon, RefreshIcon } from './icons';

interface ResultCardProps {
  generatedImage: string;
  onStartOver: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ generatedImage, onStartOver }) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'original-trading-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center animate-fade-in w-full max-w-sm sm:max-w-md">
      <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        完成！
      </h2>
      
      <div className="w-full aspect-[3/4] relative group">
        {/* Glow element, sits behind the card */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        {/* Card container */}
        <div
          className="relative z-10 w-full h-full rounded-2xl overflow-hidden"
        >
          <img 
            src={generatedImage} 
            alt="Generated trading card" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-500 text-base font-medium rounded-md text-purple-300 hover:bg-purple-500 hover:text-white transition-colors"
        >
          <DownloadIcon className="w-5 h-5" />
          ダウンロード
        </button>
        <button
          onClick={onStartOver}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <RefreshIcon className="w-5 h-5" />
          もう一度作成
        </button>
      </div>
    </div>
  );
};

export default ResultCard;