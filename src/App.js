import React from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";
import DataWrapper from "./DataWrapper";

//Formats weather data by date
const formatWeatherData = (weatherData) => {
    const groupedByDate = [];
    const sortedData = weatherData.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate.getTime() - bDate.getTime();
    });
    let dailyWeather = []
    sortedData.map((weatherItem) => {
        //if there is a current date, determine if the weatherItem is in that date
        if (dailyWeather.length) {
            const currentDate = new Date(dailyWeather[0].date);
            const weatherDate = new Date(weatherItem.date);
            if (currentDate.getDate() === weatherDate.getDate()) { //add to array if date is the same
                dailyWeather.push(weatherItem);
            } else { //add array to total and make new array if dates are different
                groupedByDate.push([...dailyWeather]);
                dailyWeather = [weatherItem]; //fresh day
            }
        } else {
            dailyWeather.push(weatherItem); //dailyWeather is empty - starting a new day
        }
    });
    if (dailyWeather.length) {
        groupedByDate.push([...dailyWeather]); //add any of the last day
    }
    return groupedByDate;
}
const App = () => {
    const [startDate, setStartDate] = React.useState(new Date(2020, 0, 1, 0));
    const [endDate, setEndDate] = React.useState(new Date(2020, 0, 2, 0));
    const [location, setLocation] = React.useState("");

    const getLocations = (weatherData) => {
      let locations = [];
      weatherData.map((weatherElement) => {
          if (!locations.find((a) => a === weatherElement.town)) {
              locations.push(weatherElement.town);
          }
      });
      return locations;
    };

    const searchWeather = (data) => {
        //check that all fields are filled in
        if (startDate && endDate && location && location !== "") {
            //search weather data and set it
            const filteredByLocation = data.filter((weatherObject) => weatherObject.town === location);
            return filteredByLocation.filter((weatherObject) => {
                const weatherDate = new Date(weatherObject.date);
                return (weatherDate.getTime() >= startDate.getTime() && weatherDate.getTime() <= endDate.getTime())
            });
        }
        return null;
    }

    const endDateValidation = (date) => {
        if (date === null || date.getTime() >= startDate.getTime()) {
            setEndDate(date);
        } else {
            window.alert("End date cannot be set before start date")
        }

    }

    const startDateValidation = (date) => {
        if (date === null || date.getTime() <= endDate.getTime()) {
            setStartDate(date);
        } else {
            window.alert("Start date cannot be set after end date")
        }

    }

    const displayWeatherData = (weatherData) => {
        const filteredData = searchWeather(weatherData);
        if (filteredData === null) { //if not all fields are set, data will be null
            return <div>Please enter dates and location for weather data.</div>
        }
        if (filteredData.length) {
            const formattedData = formatWeatherData(filteredData);
            return formattedData.map((date) => (
                <div>
                <tr>
                    {date[0].date.substring(0, 11)}
                </tr>
                <tr>
                    {date.map((item) => (
                        <td>
                            <WeatherCard
                            date={item.date}
                            weather={item.weather}
                            location={item.town}
                            />
                        </td>
                    ))}
                </tr>
                </div>
            ));
        }
        return <div>No data fits the search criteria!</div>;
    };

    return (
        <DataWrapper>
            {({weatherData}) => {
                if (weatherData) {
                    if (weatherData.error) {
                        return <div>{weatherData.error}</div>
                    }
                    return (
                        <div className="App">
                            <EditableSection
                                startDate={startDate}
                                endDate={endDate}
                                location={location}
                                onStartDateChange={(e) => startDateValidation(e)}
                                onEndDateChange={(e) => endDateValidation(e)}
                                onLocationChange={(e) => setLocation(e.target.value)}
                                locations={getLocations(weatherData)}
                            />
                            <div className="editable-section" style={{overflow: "auto"}}>
                                <table>
                                    <tbody>
                                {displayWeatherData(weatherData)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                } else {
                    return <div>loading...</div>
                }
            }}
          </DataWrapper>
    );
};

export default App;
