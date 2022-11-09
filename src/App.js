import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import CountriesList from "./components/CountriesList";
import Chart from "./components/Chart";
import coronavirus from "./imgs/coronavirus.png";

const App = () => {
  const [selectedCountryData, setSelectedCountryData] = useState({});
  const [countryNames, setCountryNames] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loadCountry, setLoadCountry] = useState(false);

  const onCountryChange = (value) => {
    setLoadCountry(true);
    fetch(
      `https://covid19.mathdro.id/api${
        value === "Global" ? "" : `/countries/${value}`
      }`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setLoadCountry(false);
        if (data["error"]) {
          alert(data.error.message);
          setSelectedCountryData({
            confirmed: undefined,
            recovered: undefined,
            deaths: undefined,
            date: undefined,
          });
          return;
        }
        setSelectedCountryData({
          confirmed: data.confirmed.value,
          recovered: data.recovered.value,
          deaths: data.deaths.value,
          date: data.lastUpdate,
        });
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    Promise.all([
      fetch("https://covid19.mathdro.id/api").then((resp) => resp.json()),
      fetch("https://covid19.mathdro.id/api/countries").then((resp) =>
        resp.json()
      ),
    ])
      .then((data) => {
        setInitialized(true);
        if (data["error"]) {
          alert(data.error.message);
          return;
        }
        setSelectedCountryData({
          confirmed: data[0].confirmed.value,
          recovered: data[0].recovered.value,
          deaths: data[0].deaths.value,
          date: data[0].lastUpdate,
        });
        setCountryNames(data[1].countries);
      })
      .catch(() => {
        alert("Oops! Something Went Wrong!🤔");
      });
  }, []);

  return (
    <div className="App container">
      <div className="container bg-dark my-3 rounded">
        <h1 className="py-3 fw-bold text-info">
          <img
            src={coronavirus}
            className="bg-dark border-0 corona-logo"
            alt="logo"
          />
          &nbsp;COVID-19 INFO
        </h1>
      </div>
      <div className={`loader ${initialized ? "hide" : ""}`}></div>
      {initialized ? (
        <>
          <Cards countryData={selectedCountryData} />
          <CountriesList
            countryList={countryNames}
            onCountryChange={onCountryChange}
          />
          <div className={`loader ${loadCountry ? "" : "hide"}`}></div>
          {!loadCountry ? <Chart countryData={selectedCountryData} /> : ""}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
