import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import CountriesList from "./components/CountriesList";
import Chart from "./components/Chart";

const App = () => {
  const [countryData, setCountryData] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
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
        if (Object.keys(data).length !== 1) {
          setCountryData({
            confirmed: data.confirmed.value,
            recovered: data.recovered.value,
            deaths: data.deaths.value,
            date: data.lastUpdate,
          });
          setLoadCountry(false);
        } else {
          alert(data.error.message);
        }
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
        setCountryData({
          confirmed: data[0].confirmed.value,
          recovered: data[0].recovered.value,
          deaths: data[0].deaths.value,
          date: data[0].lastUpdate,
        });
        setCountryList(data[1].countries);
        setInitialLoad(true);
      })
      .catch(() => {
        alert("Oops! Something Went Wrong!🤔");
      });
  }, []);

  return (
    <div className="App ">
      <div className="container bg-dark text-info my-3 rounded">
        <p className="text-uppercase fs-2"> Covid-19 Info</p>
      </div>
      <div className={`loader ${initialLoad ? "hide" : ""}`}></div>
      {initialLoad ? (
        <>
          <Cards countryData={countryData} />
          <CountriesList
            countryList={countryList}
            onCountryChange={onCountryChange}
          />
          <div className={`loader ${loadCountry ? "" : "hide"}`}></div>
          {!loadCountry ? <Chart countryData={countryData} /> : ""}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
