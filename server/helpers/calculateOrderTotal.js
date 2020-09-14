const Product = require("../models/product");

const calculateOrderTotal = async (
    items = [],
    shippingMethod = "postOffice"
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

    let sum = items.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.quantity;
    }, 0);

    if (shippingMethod === "courier") {
        sum += 80;
    } else {
        sum += 50;
    }

    return { items, sum };
};

module.exports = calculateOrderTotal;
