export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: "Real.gr" | "Instyle" | "Ολο Υγεία" | "The Cars" | "Real Player";
  url: string;
  publishedAt: string;
}