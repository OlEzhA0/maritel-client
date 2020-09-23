export const timestampToString = (
    timestamp: number | string,
    time?: boolean
) => {
    const dateObject = new Date(parseInt(timestamp.toString()));
    const day =
        dateObject.getDate().toString().length === 1
            ? `0${dateObject.getDate()}`
            : dateObject.getDate();
    const month =
        dateObject.getMonth().toString().length === 1
            ? `0${dateObject.getMonth()}`
            : dateObject.getMonth();

    if (!time) {
        return `${day}.${month}.${dateObject.getFullYear()}`;
    }

    const hours =
        dateObject.getHours().toString().length === 1
            ? `0${dateObject.getHours()}`
            : dateObject.getHours();
    const minutes =
        dateObject.getMinutes().toString().length === 1
            ? `0${dateObject.getMinutes()}`
            : dateObject.getMinutes();

    return `${day}.${month}.${dateObject.getFullYear()} ${hours}:${minutes}`;
};
