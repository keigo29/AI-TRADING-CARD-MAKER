
import { Style } from './types';

export const STYLES: Style[] = [
  {
    id: 'anime',
    name: 'アニメ風',
    description: '鮮やかなアニメキャラクター',
    prompt: 'Create a trading card of this person in a vibrant anime style, with big expressive eyes, dynamic pose, and saturated colors. 3:4 aspect ratio.',
    image: 'https://picsum.photos/seed/anime/300/400'
  },
  {
    id: 'chibi',
    name: 'ちびキャラ',
    description: '可愛いSDスタイル',
    prompt: 'Turn this person into a cute chibi style character for a trading card. Super deformed with a big head, small body, and adorable features, kawaii. 3:4 aspect ratio.',
    image: 'https://picsum.photos/seed/chibi/300/400'
  },
  {
    id: 'figure',
    name: 'フィギュア化',
    description: '3Dフィギュアのような立体感',
    prompt: 'Generate a trading card image of this person as a highly detailed 3D rendered collectible figure, with realistic textures and a dynamic sculpt. 3:4 aspect ratio.',
    image: 'https://picsum.photos/seed/figure/300/400'
  },
  {
    id: 'hero',
    name: 'ヒーロー風',
    description: 'スーパーヒーローのようなスタイル',
    prompt: 'Transform this person into a powerful superhero for a trading card. Give them a heroic pose, a cape, and a powerful aura with dramatic lighting. 3:4 aspect ratio.',
    image: 'https://picsum.photos/seed/hero/300/400'
  },
  {
    id: 'kawaii',
    name: '可愛い系',
    description: 'パステルカラーの優しいスタイル',
    prompt: 'Create a trading card of this person in a kawaii cute style. Use soft pastel colors, sparkles, hearts, and fluffy textures for an adorable look. 3:4 aspect ratio.',
    image: 'https://picsum.photos/seed/kawaii/300/400'
  },
  {
    id: 'cool',
    name: 'カッコいい系',
    description: 'クールでスタイリッシュ',
    prompt: 'Generate a trading card of this person with a cool and stylish design. Emphasize sharp lines, a confident pose, and a badass, modern aesthetic. 3:4 aspect ratio.',
    image: 'https://picsum.photos/seed/cool/300/400'
  }
];
