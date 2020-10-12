const Product = require("../models/product");

const calculateOrderTotal = async (
    items = [],
    shippingMethod = "postOffice",
    paymentMethod = "cash",
    promo = {}
) => {
    const products = await Product.find({
        uuid: items.map((el) => el.prodUuid),
    });

    items = items.map((item) => {
        const product = products.find((el) => el.uuid === item.prodUuid);
        return {
            ...item,
            title: product.title,
            price: product.price,
        };
    });

    let sum = 0;

    const itemsTotal = items.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.quantity;
    }, 0);

    sum += itemsTotal;

    if (paymentMethod === "card") {
        sum += Math.ceil(itemsTotal * 0.025);
    }

    let discount = 0;

    if (promo.promoValue) {
        if (promo.promoDisc === "grn") {
            discount = promo.promoValue;
        } else {
            discount = Math.floor((sum * promo.promoValue) / 100);
        }
    }

    return { items, sum, discount };
};

module.exports = calculateOrderTotal;
