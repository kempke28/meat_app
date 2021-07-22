import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';



class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    offlineText: "",
    numberOfEvents: 32,
  }


  // efactor the updateEvents function in your “App.js” file to take 2 parameters, location and eventCount, either of which might be undefined when this function is called. You’ll need numberOfEvents: 32 in the state of the App component (you can pick whatever default value you want for the state instead of 32). The updateEvents function will then need to filter the results based on location if it’s passed in and shorten the filtered array to the number of events either in the state (if it’s not passed in) or to eventCount (if it is passed in).
  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        events.filter((event) => event.eventCount === eventCount);
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


  render() {
    return (
      <div className="App">
        
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents />
        <EventList events={this.state.events} />
        
      </div>
    );
  }
}

export default App;