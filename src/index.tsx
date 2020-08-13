import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import { store } from "./store/index";

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER}/graphql`,
});

ReactDOM.render(
  <HashRouter hashType="noslash" >
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
