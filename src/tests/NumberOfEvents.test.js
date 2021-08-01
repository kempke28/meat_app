import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';


describe('<NumberOfEvents /> component', () => {

    let numberOfEventsWrapper;
    beforeAll(() => {
      numberOfEventsWrapper = shallow(<NumberOfEvents updateEventNumber={() => {}} />);
  });

  test("render input element", () => {
    expect(numberOfEventsWrapper.find(".NumberOfEvents")).toHaveLength(1);
  });

  //Create integration tests for the NumberOfEvents component following a test-driven development approach. 

  //Once  the city is written will show only events from the city
  test("render text input correctly", () => {
    const numberOfEvents = numberOfEventsWrapper.state("numberOfEvents");
    expect(
      numberOfEventsWrapper.find(".event-number-input").props().value
    ).toBe(numberOfEvents);
  });
    

  //Once the input of events is changed the number of events will also change to the specified number
  test('change state when input changes', () => {
    const eventNumber = { target: { value: 10 } };
    numberOfEventsWrapper.find('.event-number-input').simulate(
      'change',
      eventNumber,
    );
    expect(numberOfEventsWrapper.state('numberOfEvents')).toEqual(10);
  });
});

