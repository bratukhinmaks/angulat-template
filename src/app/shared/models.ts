export interface FbResponce {
  name: string;
}

export interface Product {
  _id?: string;
  title?: string ;
  cost?: number ;
  description?: string ;
  imgUrl?: string ;
  category?: string ;
  weight?: number ;
  date?: Date;
  isDeleted?: boolean;
}

export interface Alert {
  text: string;
  type: string;
}
