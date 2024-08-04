import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import photo from "../../public/weather.png";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const url = `  https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=41e2b7ac474a47496aebac3adf329ae8`;

  const handleSearch = () => {
    setWeather();
    setIsLoading(true);
    if (city === "") {
      alert("Enter a city!!!");
    } else {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            setIsLoading(false);
            throw Error("City not found!");
          }
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          setWeather(data);
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-yellow-50 to-green-300 w-full flex justify-center items-center  h-[100vh] ">
      <div className="bg-white w-[380px] sm:w-[430px] h-[530px] rounded-2xl bg-opacity-40 p-8   shadow-xl relative">
        <div className="text-center mb-7 font-bold text-4xl text-gray-600">
          <p>WEATHER APP</p>
        </div>
        <div className="bg-white h-10 rounded-lg  flex w-full mb-2 items-center px-5 justify-between shadow-md hover:shadow-lg">
          <input
            type="text"
            placeholder="Enter a city"
            onChange={(e) => setCity(e.target.value)}
            className=" outline-none bg-transparent flex flex-1 mr-3"
          />{" "}
          <BsSearch
            className="hover:fill-gray-800 fill-gray-500 hover:w-[1.1rem] h-full cursor-pointer "
            onClick={handleSearch}
          />
        </div>

        <div className="ml-3 mt-[-4px] text-red-400 font-semibold h-1">
          {error && <p> City not found!</p>}
        </div>
        {isLoading && (
          <div className="flex justify-center items-center h-[150px] ">
            <ClipLoader size={80} />
          </div>
        )}
        <div className="mt-2">
          <p className="font-bold text-3xl text-gray-600 ">{weather?.name}</p>
          <p className="font-bold text-[6rem] text-gray-700 flex  ">
            {weather?.main?.temp}{" "}
            {weather && <span className="text-[3.8rem] mt-4"> ℃</span>}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className=" w-40 h-40">
            {weather && (
              <img
                src={photo}
                alt=""
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {weather && (
            <div className="flex flex-col">
              <div
                className="border-y-[1.5px] border-y-gray-300 text-center py-3
              "
              >
                <p className="italic font-bold text-gray-600 text-[1.6rem]">
                  {" "}
                  <span className="font-bold text-[1.5rem] ">Humidity: </span>
                  {weather?.main?.humidity}
                </p>
              </div>
              <div
                className="border-y-[1.5px] border-y-gray-300 text-center py-3 text-gray-700
              "
              >
                <p className="italic font-semibold text-[1.7rem]">
                  {weather?.weather[0]?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
