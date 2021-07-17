import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

describe('<App /> component', () => {

  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

test('render CitySearch', () => {
  expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('renders a list of suggestions', () => {
    const CitySearchWrapper = shallow(<CitySearch />);
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });
  
});