export interface ImageD {
  id: number;
  src: string;
  alt: string;
}

export interface Disease {

  id: number;
  name: string;
  folderName: string;
  images: ImageD[];
  info: string;
}