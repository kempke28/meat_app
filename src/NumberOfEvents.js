import React, { Component } from 'react';
import { ErrorAlert } from './alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: ''
  };
  
  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1) {
     this.setState({
        errorText: 'Please choose a number between 1 and 32',
        numberOfEvents: ''
      });
    } else if (value > 32) {
      this.setState({
        errorText: 'Please choose a number between 1 and 32',
        numberOfEvents: ''
      });
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: '',
      });      
    }
    this.props.updateEvents(null, value);
  };

  render() {
    return (
        
        <div className="NumberOfEvents">
          <ErrorAlert text={this.state.errorText} />
          
          <label htmlFor='numberOfEvent'>Number of Events</label>
          <input type="number" className="event-number-input" placeholder='Enter Number of Events'
            value={this.state.numberOfEvents} onChange={this.handleInputChanged} />

        </div>
      );
    }
  }
  
  export default NumberOfEvents;