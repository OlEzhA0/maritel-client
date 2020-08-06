import cyrillicToTranslit from "cyrillic-to-translit-js";

export const handleTranslit = (str: string) =>
  `${new cyrillicToTranslit().transform(`${str.toLocaleLowerCase()}`, "+")}`;
