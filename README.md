# A-3 description of weather react app

# Brief of the project
This React app is a weather application that allows users to input a location and fetch current weather information from the OpenWeatherMap API. It displays the weather condition, an icon representing the weather type, and the temperature. If the location is invalid, an error message with an appropriate icon is shown.

# Explanation of the Component Structure used in the code 
App Component: The main functional component that contains the entire application logic.
inputRef: A reference to the input element used to get the user's location input.
apiData: State to hold the data retrieved from the API.
showWeather: State to manage the weather icon and description based on the API response.
loading: State to show a loading spinner while fetching data.

# Explanation of State Management

1.apiData:

*Purpose: Stores the weather data fetched from the API.
*Initial State: null (no data fetched initially).
2.showWeather:

*Purpose: Manages the weather type and associated image to display.
*Initial State: null (no weather data to show initially).
3.loading:

*Purpose: Indicates whether the app is in the process of fetching data.
*Initial State: false (not loading initially).

# Functionality of the project

--Input and Search:

-The user types a location into the input field.
-Clicking the search button triggers the fetchWeather function.

--Fetch Weather Data:
-URL Construction: The API URL is built using the user input and a fixed API key.
-Data Fetching: The fetchWeather function makes an API call to OpenWeatherMap.
-Handling Response: Based on the response:
--If the location is valid, it updates apiData and filters the WeatherTypes array to find the corresponding weather icon.
--If the location is invalid or not found, it sets showWeather to a "Not Found" icon.
--Display:

-Loading State: Shows a loading spinner while the data is being fetched.
-Weather Information: Displays the weather icon, type, and temperature when data is available.
-Error Handling: Shows an error message with an icon if the location is invalid.

# images of Weather-React-App
