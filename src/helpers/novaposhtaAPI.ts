type NVSettlement = OptionType;

export const getNVSettlements = (
    searchQuery: string
): Promise<NVSettlement[]> => {
    const data = {
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
            FindByString: searchQuery,
            Limit: 5,
        },
    };

    return fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((json) => {
            const result = json.data.map(
                (el: { Ref: string; DescriptionRu: string }) => ({
                    value: el.Ref,
                    name: el.DescriptionRu,
                })
            );
            return result;
        });
};

export const getCityWarehouses = (
    searchQuery: string,
    settlementRef = ""
): Promise<NVSettlement[]> => {
    const data = {
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
            Language: "ru",
            FindByString: searchQuery,
            Limit: 5,
            CityRef: settlementRef,
        },
    };

    return fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((json) => {
            return json.data.map(
                (el: { Ref: string; DescriptionRu: string }) => ({
                    value: el.Ref,
                    name: el.DescriptionRu,
                })
            );
        });
};

export const getDeliveryAddress = (
    searchQuery: string,
    settlementRef = ""
): Promise<NVSettlement[]> => {
    const data = {
        apiKey: process.env.NOVA_POSHTA_API_KEY,
        modelName: "Address",
        calledMethod: "getStreet",
        methodProperties: {
            Language: "ru",
            FindByString: searchQuery,
            Limit: 5,
            CityRef: settlementRef,
        },
    };

    return fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((json) => {
            return json.data.map(
                (el: {
                    Ref: string;
                    Description: string;
                    StreetsType: string;
                }) => ({
                    value: el.Ref,
                    name: `${el.StreetsType} ${el.Description}`,
                })
            );
        });
};
