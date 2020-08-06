import { splitValue } from ".";
import { handleTranslit } from "./links";

export const prodListGoods = (
  currentCategory: CategoriesTypes | undefined,
  setCategory: (category: CategoriesTypes) => void,
  goods: Products[],
  setProducts: (products: Products[]) => void,
  specCategs: SpecProdsCategory[],
  category: string,
  setSpecCategory: (spec: SpecProdsCategory) => void,
  pathname: string,
  setSubsName: (name: string) => void
) => {
  if (currentCategory) {
    setCategory(currentCategory);

    const filteredGoods = goods.filter(
      (good) => good.type.split(splitValue)[0] === currentCategory?.id
    );
    if (pathname.includes("/Vse-tovari")) {
      setProducts(filteredGoods);
    } else {
      const subCateg = pathname.split("/").filter((c) => c)[1];
      const currentSubCateg = currentCategory?.subCategories.find(
        (subCat) => handleTranslit(subCat.subs) === subCateg
      );
      const visGoods = filteredGoods.filter(
        (good) => good.type.split(splitValue)[1] === currentSubCateg?.id
      );
      setSubsName(currentSubCateg?.subs || "");
      setProducts(visGoods);
    }
  } else {
    const currentSpec = specCategs.find(
      (spec) => handleTranslit(spec.name) === category
    );

    if (currentSpec) {
      const visGoods = goods.filter((prod) =>
        currentSpec?.products.some((curr) => curr === prod.id)
      );

      setProducts(visGoods);
      setSpecCategory(currentSpec);
    }
  }
};
