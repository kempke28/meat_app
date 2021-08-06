import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations } from './api';
import { OfflineAlert } from './alert';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    offlineText: "",
    numberOfEvents: 32,
  }


  // refactor the updateEvents function in your “App.js” file to take 2 parameters, location and eventCount, either of which might be undefined when this function is called. You’ll need numberOfEvents: 32 in the state of the App component (you can pick whatever default value you want for the state instead of 32). The updateEvents function will then need to filter the results based on location if it’s passed in and shorten the filtered array to the number of events either in the state (if it’s not passed in) or to eventCount (if it is passed in).
  updateEvents = (location, eventCount) => {
    this.setState({currentLocation: location, numberOfEvents: eventCount});
    getEvents().then((events) => {
      let locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      if(eventCount != null )
      {
        locationEvents = locationEvents.filter((event, index) => index < eventCount);
      }
      
      this.setState({
        events: locationEvents
      });
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText: 'You are not online, display using only cache.'
      });
    }
    else {
      this.setState({
        offlineText: ''
      })
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

// Implement the first scenario, “load a list of events by default.” You can make use of React’s componentDidMount() function. Remember this should getEvents, then save events and locations to the state.
  loadEvents = () => {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events,
          locations: extractLocations(events),
        });
      }
    });
  };

  //map data from locations to a variable
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };


  render() {
    
    const { locations, events } = this.state;

    return (
      <div className="App">

        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>      
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents}/>
        <NumberOfEvents updateEvents={this.updateEvents} location={this.state.currentLocation}/>

        {/* charts responsive tables */}
        <div className = "data-vis-wrapper">
        <EventGenre locations={locations} events={events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events={this.state.events} />

        <OfflineAlert text={this.state.offlineText} />
        
      </div>
    );
  }
}

export default App;