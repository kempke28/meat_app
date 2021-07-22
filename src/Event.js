import React, { Component } from "react";

class Event extends Component {

state = {
  event: {},
  showHideDetails: false,
  divStyle: {
    visible: false
  }
};

//function to open and collapse EVent

handleShowHideButton = () => {
  if (this.state.showHideDetails === true) {
    this.setState({ showHideDetails: false });
    this.setState({divStyle: {visible: false}});
  } else {
    this.setState({ showHideDetails: true });
    this.setState({divStyle: {visible: true}});
  }
};


  render() {
    const { event } = this.props;
    return (
      <div className='event'>
        <h2 className='eventSummary'>{event.summary}</h2>
        <h3 className='eventDate'>{event.start.dateTime}</h3>
        <h3 className='eventLocation'>{event.location}</h3>

        
          <div className='event-hidden-details' style={this.state.divStyle}>
            <h2>About event:</h2>
            <p>{event.description}</p>
            <p>{event.email}</p>
          </div>
        

        <button
          className='details-btn'
          onClick={() => this.handleShowHideButton()}
        >
          {!this.state.showHideDetails ? 'Show Details' : 'Hide Details'}
        </button>
      </div>
    );
  }

}
export default Event;
