export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: "Real.gr" | "Instyle" | "Real Kiosk" | "The Cars" | "Real Player";
  url: string;
  publishedAt: string;
}