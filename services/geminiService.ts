import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Utility to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};


export const generateCardImage = async (imageFile: File, basePrompt: string, cardName: string): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    const finalPrompt = `${basePrompt} The card must have the name "${cardName}" stylishly integrated into its design, usually placed at the bottom.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                imagePart,
                { text: finalPrompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    if (response.candidates && response.candidates[0].content.parts[0].inlineData) {
        const base64Image = response.candidates[0].content.parts[0].inlineData.data;
        return `data:image/png;base64,${base64Image}`;
    } else {
        throw new Error("AI did not return a valid image. Please try again.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    throw new Error("Failed to generate image. Please check your photo or try a different style.");
  }
};