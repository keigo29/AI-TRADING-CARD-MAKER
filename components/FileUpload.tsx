
import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onImageSelect: (file: File) => void;
  setErrorMessage: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageSelect, setErrorMessage }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('無効なファイル形式です。JPEG, PNG, WebP を選択してください。');
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage('ファイルサイズが大きすぎます。20MB以下の画像を選択してください。');
      return;
    }

    setErrorMessage('');
    onImageSelect(file);
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);


  return (
    <div className="w-full max-w-2xl text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        オリジナルトレカメーカー
      </h1>
      <p className="text-gray-300 mb-8 text-lg">あなたの顔写真からAIが世界に一枚だけのトレカを生成します！</p>
      
      <div 
        className={`relative border-4 border-dashed rounded-xl p-8 md:p-12 transition-all duration-300 ${isDragging ? 'border-purple-500 bg-gray-800' : 'border-gray-600 hover:border-purple-400'}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
          <UploadIcon className="w-16 h-16" />
          <p className="text-xl font-semibold">写真をドラッグ＆ドロップ</p>
          <p>またはクリックしてファイルを選択</p>
          <p className="text-sm text-gray-500">（顔がはっきり写った写真がおすすめです）</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
