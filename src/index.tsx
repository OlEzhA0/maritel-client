import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { Provider } from "react-redux";
import { store1 } from "./store/index";
import { getAccessToken } from "./store/actionsTypes";
import jwtDecode from "jwt-decode";
import { clearCustomerInfo, setCustomerInfo } from "./store/actionCreators";

const cache = new InMemoryCache({});

const store = store1();

const requestLink = new ApolloLink(
    (operation, forward) =>
        new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
                .then((operation) => {
                    const accessToken = getAccessToken(store.getState());
                    operation.setContext({
                        headers: {
                            authorization: `bearer ${accessToken}`,
                        },
                    });
                })
                .then(() => {
                    handle = forward(operation).subscribe({
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer),
                    });
                })
                .catch(observer.error.bind(observer));
            return () => {
                if (handle) handle.unsubscribe();
            };
        })
);

const client = new ApolloClient({
    link: ApolloLink.from([
        new TokenRefreshLink({
            accessTokenField: "accessToken",
            isTokenValidOrUndefined: () => {
                const token = getAccessToken(store.getState());

                if (!token) {
                    return false;
                }

                try {
                    const { exp } = jwtDecode(token);
                    if (Date.now() >= exp * 1000) {
                        return false;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch(`${process.env.REACT_APP_SERVER}/refresh_token`, {
                    method: "POST",
                    credentials: "include",
                });
            },
            handleFetch: (accessToken) => {
                store.dispatch(setCustomerInfo({ accessToken }));
            },
            handleError: (err) => {
                console.warn("Your refresh token is invalid. Try to relogin");
                console.error(err);
                store.dispatch(clearCustomerInfo());
            },
        }),
        onError(({ graphQLErrors, networkError }) => {
            console.log(graphQLErrors);
            console.log(networkError);
        }),
        requestLink,
        new HttpLink({
            uri: `${process.env.REACT_APP_SERVER}/graphql`,
            credentials: "include",
        }),
    ]),
    cache,
});

ReactDOM.render(
    <HashRouter hashType="noslash">
        <ApolloProvider client={client}>
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>
        </ApolloProvider>
    </HashRouter>,
    document.getElementById("root")
);
