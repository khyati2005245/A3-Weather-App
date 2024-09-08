import { useRef, useState } from "react";

// API key for OpenWeatherMap API
const Api_key = "6047c028caac6f8e494924ea82a0fdf6"; // Update API key here

const App = () => {
  // useRef hook to access the input element
  const inputRef = useRef(null);

  // useState hooks for managing state
  const [apiData, setApiData] = useState(null); // State to hold the API response data
  const [showWeather, setShowWeather] = useState(null); // State to manage which weather icon to display
  const [loading, setLoading] = useState(false); // State to manage loading spinner visibility

  // Array containing weather types and corresponding images
  const WeatherTypes = [
    { type: "Clear", img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png" },
    { type: "Rain", img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png" },
    { type: "Snow", img: "https://cdn-icons-png.flaticon.com/512/642/642102.png" },
    { type: "Clouds", img: "https://cdn-icons-png.flaticon.com/512/414/414825.png" },
    { type: "Haze", img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png" },
    { type: "Smoke", img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png" },
    { type: "Mist", img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png" },
    { type: "Drizzle", img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png" },
  ];

  // Function to fetch weather data from the API
  const fetchWeather = async () => {
    // Construct the API URL with the location input and API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    
    // Set loading state to true while fetching data
    setLoading(true);

    // Fetch data from the API
    fetch(URL)
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => {
        // Reset weather display and handle error cases
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        } else {
          // Filter weather types to find the matching icon
          setShowWeather(
            WeatherTypes.filter(
              (weather) => weather.type === data.weather[0].main
            )
          );
        }
        // Set API data and turn off loading
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        // Log any errors and turn off loading
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="Search"
              className="w-8"
            />
          </button>
        </div>
        <div
          className={`duration-300 delay-75 overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="Loading"
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt={showWeather[0]?.type}
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-zinc-800">
                  {showWeather[0]?.type}
                </h3>

                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                        alt="Temperature"
                        className="h-9 mt-1"
                      />
                      <h2 className="text-4xl font-extrabold">
                        {apiData?.main?.temp}&#176;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

