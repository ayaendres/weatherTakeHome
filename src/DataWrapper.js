import React from "react";
const filename = "test-data.json";


const DataWrapper = (props) => {
    const {children} = props;
    const [weatherData, setWeatherData] = React.useState(null);
    React.useEffect(() => {
            fetch(filename).then((data) => {
                    data.json().then((result) => {
                        setWeatherData(result);
                    }).catch(() => {
                        setWeatherData({error: "Failed to load data. JSON may be malformed."})
                    });
        });
    });
    return children({weatherData});
};

export default DataWrapper;
