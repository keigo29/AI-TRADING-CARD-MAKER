import React, { useState, useMemo } from 'react';
import { Style } from '../types';
import { STYLES } from '../constants';
import { SparklesIcon, WandIcon } from './icons';

interface StyleSelectorProps {
  imageFile: File;
  onGenerate: (style: Style, cardName: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ imageFile, onGenerate }) => {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [cardName, setCardName] = useState('');
  const imagePreviewUrl = useMemo(() => URL.createObjectURL(imageFile), [imageFile]);

  const handleRandomSelect = () => {
    const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)];
    setSelectedStyle(randomStyle);
  };
  
  const handleGenerateClick = () => {
    if (selectedStyle && cardName.trim()) {
      onGenerate(selectedStyle, cardName.trim());
    }
  };

  return (
    <div className="w-full max-w-6xl animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">アップロードした写真</h2>
          <div className="w-full mb-4">
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-2">カード名</label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 transition"
              placeholder="例: 伝説の勇者"
              maxLength={20}
              required
            />
          </div>
          <img src={imagePreviewUrl} alt="User upload" className="rounded-xl object-cover w-full aspect-[3/4] shadow-lg shadow-purple-900/50" />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-300">スタイルを選択してください</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLES.map((style) => (
              <div
                key={style.id}
                className={`cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 group ${selectedStyle?.id === style.id ? 'border-purple-500 scale-105 bg-purple-900/50' : 'border-gray-700 hover:border-purple-400 hover:scale-105'}`}
                onClick={() => setSelectedStyle(style)}
              >
                <img src={style.image} alt={style.name} className="w-full h-auto rounded-md aspect-[3/4] object-cover" />
                <h3 className="font-bold mt-2 text-center text-lg">{style.name}</h3>
                <p className="text-sm text-gray-400 text-center">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={handleRandomSelect}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-300 bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <WandIcon className="w-5 h-5" />
          ランダムで選ぶ
        </button>
        <button
          onClick={handleGenerateClick}
          disabled={!selectedStyle || !cardName.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 disabled:transform-none hover:scale-105"
        >
          <SparklesIcon className="w-6 h-6" />
          トレカを生成！
        </button>
      </div>
    </div>
  );
};

export default StyleSelector;