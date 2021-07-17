import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import EventList from '../EventList';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {

    let eventDetails, EventWrapper;
    beforeAll(() => {
      eventDetails = mockData[0]
      EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    test('Render Event Title', () => {
        expect(EventWrapper.find('.eventSummary').text()).toBe(eventDetails.summary);
      });
    
    test('Render basic event details', () => {
    expect(EventWrapper.find('.event').text()).toContain(
        eventDetails.start.dateTime,
        eventDetails.start.eventLocation
    );
      });
    
    test('test inside event hidden-details', () => {
    expect(EventWrapper.find('.event-hidden-details').text()).toContain(
        eventDetails.description,
        eventDetails.organizer.email
    );
      });
        
    
    test('show event details, expand on click', () => {
        EventWrapper.state({ showHideDetails: true })
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.state('showHideDetails')).toBe(true);
      });

      test('show event details, collapse on click', () => {
        EventWrapper.state({ showHideDetails: false })
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.state('showHideDetails')).toBe(false);
      })
    });