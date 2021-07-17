import React, { Component } from 'react';


class NumberOfEvents extends Component {
  state = {
    numberEvents: 8,
    errorText: ''
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1) {
        return this.setState({
        errorText: 'Please choose a number between 1 and 32',
        numberOfEvents: ''
        });
    } else if (value > 32) {
        return this.setState({
          errorText: 'Please choose a number between 1 and 32',
          numberOfEvents: ''
        });
      } else {
        this.setState({
          numberOfEvents: value,
          errorText: '',
        });
      }
    };

  render() {
    return (
        
        <div className="NumberOfEvents">
          
          <label For='numberOfEvent'>Number of Events</label>
          <input type="number" className="event-number-input" placeholder='Enter Number of Events'
            value={this.state.numberOfEvents} onChange={this.handleInputChanged} />

        </div>
      );
    }
  }
  
  export default NumberOfEvents;