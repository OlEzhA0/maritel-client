/// <reference types="react-scripts" />

interface SubCateg {
  id: string;
  subs: string;
}

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
