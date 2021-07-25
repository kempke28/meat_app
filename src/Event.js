import React, { Component } from "react";

class Event extends Component {

state = {
  event: {},
  showHideDetails: false,
  divStyle: {
    visible: false
  },
  myStyle:{
    display: "none"
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

        {!this.state.showHideDetails ? 
        <div className='event-hidden-details' style={this.state.divStyle}>
            <h2>About event:</h2>
            <p>{event.description}</p>
            <p>{event.email}</p>
          </div> : 
          <div className='event-hidden-details' style={this.state.divStyle}>
            <h2 style={this.state.myStyle}>About event:</h2>
            <p style={this.state.myStyle}>{event.description}</p>
            <p style={this.state.myStyle}>{event.email}</p>
          </div>
          }
          
        

        <button
          className='details-btn'
          onClick={() => this.handleShowHideButton()}
        >
          {!this.state.showHideDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    );
  }

}
export default Event;
