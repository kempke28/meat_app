import React from 'react';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
let AppWrapper;
 

defineFeature(feature, (test) => {

    //scenario 1
    test('If user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {
        given('the user did not specify a number of events being shown', () => {});
        when('app loaded', () => {
        AppWrapper = mount(<App />);
        });
        then('the default number of shown events is 32', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event')).toBe(32);
        });
    });

    //Scenario 2
    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        let AppWrapper;
    
        given('the list of elements has been loaded and the user did not specify a number of events he wants to see', () => {
            AppWrapper = mount(<App />);
        });
        when('the user specified a number', () => {
            const numberOfEvents = { target: { value: 13 } };
            AppWrapper.find('.numberOfEvents').simulate('change', numberOfEvents);
        });
        then('the maximum of events listed should be the specified number', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.setState({ numberOfEvents: 13 });
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(13);
        });
        });
    });