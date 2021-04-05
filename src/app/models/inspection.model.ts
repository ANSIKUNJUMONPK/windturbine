export interface inspectiondata {
  blade_id: string;
  inspection_date: string;
  blade_serial_num: string;
  blade_cat: Category;
  notes: Note[];
  images: Image[];
}

export interface Note {
  text: string;
  date: number;
}

export interface Category {
  auto: number;
  validated: number|null;
}
export interface Image {
  image_cat: string;
  image_hash: string;
  notes: Note[];
  URI: string;
}

export interface Blade {
  label: string;
  notes: Note[];
  blade_id: string;
  serial_number: string;
  blade_cat: Category;
}
