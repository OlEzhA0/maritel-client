export const login = (
    email: string,
    password: string,
    remember: boolean
): Promise<{ ok: boolean; accessToken: string }> => {
    return fetch(`${process.env.REACT_APP_SERVER}/login`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ email, password, remember }),
        headers: { "Content-type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
