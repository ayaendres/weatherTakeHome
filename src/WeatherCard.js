import React, { Component } from "react";
import "./styles/WeatherCard.css";

class WeatherCard extends Component {
  render() {
    const { date, location, weather } = this.props;
    if (date) {
      let weatherClass;
      if (weather === "Sunny") {
        weatherClass = "sunny";
      } else if (weather === "Rainy") {
        weatherClass = "rainy";
      } else if (weather === "Partly Cloudy") {
        weatherClass = "partly-cloudy";
      } else if (weather === "Cloudy") {
        weatherClass = "cloudy";
      } else {
        weatherClass = null
      }
      return (
        <div className="weather-card" key={date + location}>
          <div className="weather-datetime">{date}</div>
          {
            weatherClass ?
                (<div
                className={"weather-forecast " + weatherClass}
                title={weather}
            />) :
                (<div className="weather-datetime">
                  No Weather Data
                </div>)
          }
          <div className="weather-location">{location}</div>
        </div>
      );
    }
    return <div/>;
  }
}

export default WeatherCard;
