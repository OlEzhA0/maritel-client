import { handleTranslit } from "./links";
import { splitValue } from ".";

export const handleCreateLink = (
  prod: Products,
  categories: CategoriesTypes[]
) => {
  const categ = handleTranslit(
    categories.find((c) => c.id === prod.type.split(splitValue)[0])?.category ||
      ""
  );
  const currentCateg = categories.find(
    (cat) => cat.id === prod.type.split(splitValue)[0]
  );
  let subCat = "Vse-tovari";
  if (currentCateg?.subCategories.length) {
    subCat = handleTranslit(
      currentCateg.subCategories.find(
        (sub) => sub.id === prod.type.split(splitValue)[1]
      )?.subs || ""
    );
  }

  return `/${categ}/${subCat}/${handleTranslit(prod.title)}/${prod.uuid}`;
};
