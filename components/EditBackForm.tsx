import React, { useState } from 'react';
import { UserInput } from '../types';
import { SparklesIcon } from './icons';

interface EditBackFormProps {
    onSubmit: (data: UserInput) => void;
}

const EditBackForm: React.FC<EditBackFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [mbti, setMbti] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!name.trim()) newErrors.name = '名前は必須です。';
        if (name.length > 20) newErrors.name = '名前は20文字以内で入力してください。';
        if (!birthdate) newErrors.birthdate = '生年月日は必須です。';
        if (!mbti.trim()) newErrors.mbti = 'MBTIは必須です。';
        if (mbti.length > 10) newErrors.mbti = 'MBTIは10文字以内で入力してください。';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ name, birthdate, mbti });
        }
    };

    return (
        <div className="w-full max-w-lg animate-fade-in p-8 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-300">
                カードの裏面を作成
            </h2>
            <p className="text-center text-gray-400 mb-8">
                あなたの情報を入力して、AIに面白ステータスを生成させよう！
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">名前</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-4 py-2 bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="例: 英雄ジェミニ"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-2">生年月日</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        className={`w-full px-4 py-2 bg-gray-900 border ${errors.birthdate ? 'border-red-500' : 'border-gray-600'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition`}
                    />
                     {errors.birthdate && <p className="text-red-500 text-xs mt-1">{errors.birthdate}</p>}
                </div>
                <div>
                    <label htmlFor="mbti" className="block text-sm font-medium text-gray-300 mb-2">MBTI</label>
                    <input
                        type="text"
                        id="mbti"
                        value={mbti}
                        onChange={(e) => setMbti(e.target.value)}
                        className={`w-full px-4 py-2 bg-gray-900 border ${errors.mbti ? 'border-red-500' : 'border-gray-600'} rounded-md focus:ring-purple-500 focus:border-purple-500 transition`}
                        placeholder="例: INFP"
                    />
                     {errors.mbti && <p className="text-red-500 text-xs mt-1">{errors.mbti}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 border border-transparent text-lg font-bold rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 disabled:transform-none hover:scale-105"
                >
                    <SparklesIcon className="w-6 h-6" />
                    ステータスを生成！
                </button>
            </form>
        </div>
    );
};

export default EditBackForm;
