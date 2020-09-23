export const registerCustomer = (
    email: string,
    password: string,
    subscribe: boolean
): Promise<{ ok: boolean; accessToken?: string; error?: string }> => {
    return fetch(`${process.env.REACT_APP_SERVER}/register`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ email, password, subscribe }),
        headers: { "Content-type": "application/json" },
    }).then((res) => res.json());
};
