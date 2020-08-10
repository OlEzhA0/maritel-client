/// <reference types="react-scripts" />

interface SubCateg {
  id: string;
  subs: string;
}

type SortBy = "Новизне" | "От дешевых к дорогим" | "От дорогих к дешевым"

interface CategoriesTypes {
  id: string;
  category: string;
  subCategories: SubCateg[];
}

interface CategoriesFromDB {
  id: string;
  category: string;
  subCategories: string;
}

interface SpecProdsCategory {
  id: string;
  name: string;
  products: string[];
}

interface SubFooterInfo {
  name: string;
  link: string;
}

interface FooterInfo {
  name: string;
  fields: SubFooterInfo[];
}

interface Sizes {
  size: string;
  articul: string;
  stock: string;
}

interface Products {
  uuid: string;
  id: string;
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  gender: string;
  care: string;
  composition: string;
  sizes: Sizes[];
  lastPrice: string;
  type: string;
  photos: string[];
  previewPhoto: string;
  timestamp: string;
}

interface LocalProduct {
  uuid: string;
  title: string;
  descr: string;
  color: string;
  price: string;
  modelParam: string;
  gender: string;
  care: string;
  composition: string;
  sizes: string;
  lastPrice: string;
  type: string;
  photos: string[];
  previewPhoto: string;
  timestamp: string;
}

interface ColorTypes {
  id: string;
  name: string;
  link: string;
}

interface SortOptions {
  name: string;
  count: number;
}
