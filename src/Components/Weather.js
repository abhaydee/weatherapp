import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Weather extends Component {
  state = {
    query: "",
    displaydata: undefined,
    show: false
  };

  updatequery = query => {
    console.log(query)
    if (query === "") {
      this.setState({ show: false });
    }       
    this.setState({ query: query.trim() });
  };

  clearquery = () => this.setState({query: '', displaydata: undefined, show: false});

  displayWeather = () => {
    fetch(`
https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=55198d4f87f289ec883df973bd75e1a3
        `)
      .then(Response => {
        Response.json().then(displaydata => {
          this.setState({
            displaydata,
            show: true
          });
        });
      })
      .catch(displaydata => {
        //console.log("no  such data");
        this.setState({ displaydata, show: true });
      });
  };

  render() {
    let {displaydata, show, query} = this.state;
    return (
      <div>
        <div className="listing">
          <h1 className="App">Weather-API</h1>
          <input
            className="search-weather"
            type="text"
            placeholder="list-weather"
            value={query}
            onChange={event => this.updatequery(event.target.value)}
          />

          <Button onClick={() => this.displayWeather()}>CLICK_ME</Button>
          <Button variant="danger" onClick={() => this.clearquery()}>CLEAR</Button>
        </div>
        {console.log('', displaydata)}
        {show &&
          displaydata &&
          displaydata.cod === 200 &&
          query !== "" && (
            <div className="displaying">
              <h1>
                The Temperature of the city is&nbsp;
                {Math.round(displaydata.main.temp - 273.15)} C
              </h1>
              <h1>
                The Max Temperature of the city is&nbsp;
                {Math.round(displaydata.main.temp_max - 273.15)} C
              </h1>
              <h1>
                The minimum Temperature of the city is&nbsp;
                {Math.round(displaydata.main.temp_min - 273.15)} C
              </h1>
            </div>
          )}
        {displaydata && !displaydata.coord && (
          <div className="displaying">
            <h1>City not found</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
