import React, { Component } from "react";
import { Button, Nav, NavDropdown, Navbar, NavbarBrand } from "react-bootstrap";

class Weather extends Component {
  state = {
    query: "",
    WeatherData: "",
    show: false
  };

  updatequery = query => {
    this.setState({ query: query.trim() });
    if (query === "") {
      this.setState({ show: false });
    }
  };

  clearquery = query => {
    this.setState({ query: "" });
  };
  display = () => {
    if (this.state.query === "") {
      this.setState({ show: false });
    }
  };
  displayWeather = () => {
    fetch(`
https://api.openweathermap.org/data/2.5/weather?q=${this.state.query}&appid=55198d4f87f289ec883df973bd75e1a3
        `)
      .then(Response => {
        Response.json().then(json => {
          console.log(json);
          this.setState({
            WeatherData: json,
            show: true
          });
          console.log(this.state.WeatherData);
        });
      })
      .catch(reject => {
        //console.log("no  such data");
        this.setState({ WeatherData: reject, show: true });

        console.log(this.state.WeatherData);
      });
  };

  render() {
    const temp = null;
    let displaydata = this.state.WeatherData;
    return (
      <div>
        <div className="listing">
          <h1 className="App">Weather-API</h1>
          <input
            className="search-weather"
            type="text"
            placeholder="list-weather"
            value={this.state.query}
            onChange={event => this.updatequery(event.target.value)}
            onClick={this.display}
          ></input>
          {console.log(this.state.query)}
          <Button onClick={this.displayWeather}>CLICK_ME</Button>

          <Button onClick={this.clearquery}>CLEAR</Button>
        </div>
        {console.log(displaydata.name)}
        {this.state.show &&
          displaydata &&
          displaydata.cod == "200" &&
          this.state.query != "" && (
            <div className="displaying">
              <h1>
                The Temperature of the city is
                {Math.round(displaydata.main.temp - 273.15)}
              </h1>
              <h1>
                The Max Temperature of the city is
                {Math.round(displaydata.main.temp_max - 273.15)}
              </h1>
              <h1>
                The minimum Temperature of the city is
                {Math.round(displaydata.main.temp_min - 273.15)}
              </h1>
            </div>
          )}
        {this.state.show && displaydata.cod == "404" && (
          <div className="displaying">
            <h1>City no found</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
