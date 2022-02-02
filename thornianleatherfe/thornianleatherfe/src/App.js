import logo from "./logo.svg";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import configData from "./config.json";
import axios from "axios";

function App() {
  const {
    isLoading,
    error,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState(null);
  const [apiResponseMessage, setAPIResponseMessage] = useState("");

  useEffect(() => {
    setAPIResponseMessage("");
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: configData.audience,
          scope: configData.scope,
        });
        setAccessToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, setAPIResponseMessage]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };

  const securedAPITest = () => {
    axios
      .get(`http://localhost:8080/auth0/private`, config)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      // .then((resJson) => {
      //   console.log(resJson);
      //   setAPIResponseMessage(resJson.message);
      // })
      .catch((e) => console.log(e));
  };

  const publicApiTest = () => {
    fetch("http://localhost:8080/auth0/public", {
      method: "GET",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        console.log(resJson);
        setAPIResponseMessage(resJson.message);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi {user.email}, You have successfully logged in.</p>

        <button onClick={() => securedAPITest()}>Test Private API</button>

        <button onClick={() => publicApiTest()}>Test Public API</button>

        {apiResponseMessage ? (
          <p>Response Message: {apiResponseMessage}</p>
        ) : (
          ""
        )}

        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </header>
    </div>
  );
}

export default App;
