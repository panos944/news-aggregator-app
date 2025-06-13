import type { Article } from "../types/news";
import { mockArticles } from "./mock-data";

const shuffleArray = (array: Article[]): Article[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const sectionsData = [
  { 
    name: "Real.gr", 
    logoUrl: 'https://www.real.gr/wp-content/themes/realnews/images/realgr-logo.svg', 
    articles: shuffleArray(mockArticles).slice(0, 4) 
  },
  { 
    name: "Instyle", 
    logoUrl: 'https://www.instyle.gr/wp-content/uploads/2022/05/Logo_InStyle-1.png', 
    articles: shuffleArray(mockArticles).slice(0, 4) 
  },
  { 
    name: "Όλο Υγεία", 
    logoUrl: 'https://www.oloygeia.gr/wp-content/uploads/2023/06/olo-ygeia-logo-red.png', 
    articles: shuffleArray(mockArticles).slice(0, 4) 
  },
  { 
    name: "The Cars", 
    logoUrl: 'https://www.thecars.gr/wp-content/uploads/2023/05/the-cars-logo-330x44-1.png', 
    articles: shuffleArray(mockArticles).slice(0, 4) 
  },
  { 
    name: "Realplayer", 
    logoUrl: 'https://player.real.gr/wp-content/uploads/2024/06/Logo-e1718700920635.png', 
    articles: shuffleArray(mockArticles).slice(0, 4) 
  },
];

