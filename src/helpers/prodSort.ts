export const sortByDropDown = (sortedValue: string, products: Products[]) => {
  switch (sortedValue) {
    case "Новизне": {
      return [...products].sort((a, b) => +b.timestamp - +a.timestamp);
    }

    case "От дешевых к дорогим": {
      return [...products].sort((a, b) => +a.price - +b.price);
    }

    case "От дорогих к дешевым": {
      return [...products].sort((a, b) => +b.price - +a.price);
    }

    default: {
      return products;
    }
  }
};

export const fPrice = (filterPrice: string, sortedProducts: Products[]) => {
  if (filterPrice) {
    const filteredByPrice: Products[] = [];
    const uuid = new Set();
    let prods = [...sortedProducts];
    const prices = filterPrice.split(";");
    prices.forEach((price) => {
      const general = price.split(" грн");
      const [from, to] = general[0].split("-");
      prods.forEach((prod) => {
        if (+prod.price > +from && +prod.price < +to) {
          uuid.add(prod.id);
          prods = prods.filter((pr) => pr.id !== prod.id);
        }
      });
    });
    uuid.forEach((id) =>
      filteredByPrice.push(sortedProducts.find((prod) => prod.id === id)!)
    );

    return filteredByPrice;
  } else {
    return sortedProducts;
  }
};

export const fColors = (
  filterColor: string,
  filterByPrice: Products[],
  colors: ColorTypes[]
) => {
  if (filterColor) {
    const filterByColors: Products[] = [];
    const uuid = new Set();
    let prods = [...filterByPrice];
    const color = filterColor.split(";");
    color.forEach((col) => {
      prods = prods.filter((prod) => {
        if (colors.find((c) => c.name === col && c.id === prod.color)) {
          uuid.add(prod.id);

          return false;
        }

        return true;
      });
    });

    uuid.forEach((id) =>
      filterByColors.push(filterByPrice.find((prod) => prod.id === id)!)
    );

    return filterByColors;
  } else {
    return filterByPrice;
  }
};

export const fSizes = (filterSizes: string, filterByColor: Products[]) => {
  if (filterSizes) {
    const filteredBySizes: Products[] = [];
    const sizes = filterSizes.split(";");

    filterByColor.forEach((prod) => {
      if (
        sizes.some((size) =>
          prod.sizes.some(
            (prodSize) => prodSize.size === size && +prodSize.stock !== 0
          )
        )
      ) {
        filteredBySizes.push(prod);
      }
    });

    return filteredBySizes;
  } else {
    return filterByColor;
  }
};

export const gColors = (filterByPrice: Products[], colors: ColorTypes[]) =>
  colors.map((name) => {
    let count = 0;
    filterByPrice.forEach((good) => {
      if (colors.find((col) => col.name === name.name)?.id === good.color) {
        count++;
      }
    });

    return {
      name: name.name,
      count,
    };
  });

export const gPrices = (products: Products[]) => {
  const prices = ["0-500 грн","500-1000 грн", "1000-1500 грн", "1500-2500 грн"];
  const res = prices.map((price) => {
    let count = 0;
    const [from, to] = price.split(" грн")[0].split("-");
    products.forEach((good) => {
      if (+good.price >= +from && +good.price <= +to) {
        count++;
      }
    });

    return {
      name: price,
      count,
    };
  });

  return res;
};

export const gSizes = (filterByColor: Products[], products: Products[]) => {
  const sizes = new Set();
  const sizeArr: string[] = [];
  products.forEach((prod) =>
    prod.sizes.forEach((size) => sizes.add(size.size))
  );
  sizes.forEach((s) => sizeArr.push(s as string));

  return sizeArr.map((size) => {
    let count = 0;

    filterByColor.forEach((good) => {
      if (good.sizes.some((s) => s.size === size && +s.stock !== 0)) {
        count++;
      }
    });

    return {
      name: size,
      count,
    };
  });
};
