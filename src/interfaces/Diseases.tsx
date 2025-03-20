export interface ImageD {
  id: number;
  src: string;
  alt: string;
}

export interface Disease extends DiseaseMain {
  images?: ImageD[];
  info?: string;
}

export interface DiseaseMain {

  id: number;
  name: string;
  folderName: string;
}