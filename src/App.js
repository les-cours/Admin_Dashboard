import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login/Login.js";

import "./App.css";
import NavBar from "./NavBar/NavBar.js";
import Teachers from "./Teachers/Teachers.js";
import Students from "./Students/Students.js";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:9090/graphql" }),
]);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setConnected(true);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      {connected && (
          <NavBar setConnected={setConnected} />
        )}
        <Routes>
          {connected ? (
            <>
              {/* <Route path="/" element={<NavBar />} /> */}

              <Route path="/home" element={<div>home</div>} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/students" element={<Students />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<Login setConnected={setConnected} />}
              />

              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
