import React, { useState, useCallback } from 'react';
import { AppPhase, Style } from './types';
import FileUpload from './components/FileUpload';
import StyleSelector from './components/StyleSelector';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import { generateCardImage } from './services/geminiService';

const imageGenMessages = [
  "AIがあなたのキャラクターを生成中...",
  "アーティスティックなスタイルを適用しています...",
  "トレカを最終仕上げしています...",
  "魔法のインクで印刷中...",
  "もうすぐ完成です！"
];

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('upload');
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [cardName, setCardName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageSelect = useCallback((file: File) => {
    setUserImageFile(file);
    setPhase('select-style');
  }, []);

  const handleStyleSelect = useCallback(async (style: Style, name: string) => {
    if (!userImageFile) {
      setErrorMessage("画像ファイルが見つかりません。");
      setPhase('upload');
      return;
    }
    setCardName(name);
    setPhase('generating-image');
    setErrorMessage('');
    try {
      const resultImage = await generateCardImage(userImageFile, style.prompt, name);
      setGeneratedImage(resultImage);
      setPhase('result');
    } catch (error) {
      const message = error instanceof Error ? error.message : '不明なエラーが発生しました。';
      setErrorMessage(message);
      setPhase('select-style');
    }
  }, [userImageFile]);

  const handleStartOver = useCallback(() => {
    setPhase('upload');
    setUserImageFile(null);
    setGeneratedImage(null);
    setCardName('');
    setErrorMessage('');
  }, []);

  const renderContent = () => {
    switch (phase) {
      case 'upload':
        return <FileUpload onImageSelect={handleImageSelect} setErrorMessage={setErrorMessage} />;
      case 'select-style':
        return userImageFile ? <StyleSelector imageFile={userImageFile} onGenerate={handleStyleSelect} /> : null;
      case 'generating-image':
        return <LoadingSpinner messages={imageGenMessages}/>;
      case 'result':
        return generatedImage ? (
          <ResultCard 
            generatedImage={generatedImage} 
            onStartOver={handleStartOver} 
          />
        ) : null;
      default:
        handleStartOver();
        return null;
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-900 text-white font-sans">
      {errorMessage && (
        <div className="fixed top-5 bg-red-500 text-white py-2 px-4 rounded-md mb-4 animate-fade-in-down z-50" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
       <footer className="absolute bottom-4 text-gray-500 text-sm">
         オリジナルトレカメーカー by Gemini
      </footer>
    </main>
  );
};

export default App;