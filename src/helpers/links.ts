import cyrillicToTranslit from "cyrillic-to-translit-js";

export const handleTranslit = (str: string) =>
  `${new cyrillicToTranslit().transform(`${str.toLocaleLowerCase()}`, "+")}`;

export const handleDecode = (str: string) =>
  `${new cyrillicToTranslit().reverse(`${str.toLocaleUpperCase()}`, "+")}`;
