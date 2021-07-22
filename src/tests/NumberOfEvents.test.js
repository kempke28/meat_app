import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

describe('<NumberOfEvents /> component', () => {

    let numberOfEventshWrapper;
    beforeAll(() => {
      numberOfEventshWrapper = shallow(<NumberOfEvents event={mockData[0]} />);
    });
  
    test('render text input', () => {
    expect(numberOfEventshWrapper.find('.event-number-input')).toHaveLength(1);
    });
    
    test('change state when input changes', () => {
    numberOfEventshWrapper.setState({
    numberOfEvents: 5
    });
    const eventObject = { target: { value: 2 } };
    numberOfEventshWrapper.find('.event-number-input').simulate('change', eventObject);
    expect(numberOfEventshWrapper.state('numberOfEvents')).toBe(2);
    });
    
//Create integration tests for the NumberOfEvents component following a test-driven development approach. This will be very similar to what you already did for the CitySearch component in this Exercise. The two things you should test are

   })