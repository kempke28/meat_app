import React from "react";
import App from "../App";
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from "jest-cucumber";
import Event from '../Event';
import { mount } from "enzyme";

const feature = loadFeature("./src/features/showHideEventsDetails.feature");

defineFeature(feature, (test) => {

    test('An event element is collapsed by default', ({ given, when, then }) => {
        let EventWrapper;
        given('the list of events has been loaded', () => {
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('the event page is showing and the “Show details” button is not yet selected on an event', () => {            
            expect(EventWrapper.state('showHideDetails')).toBe(false);
            EventWrapper.find('.details-btn').at(0).simulate('click');
        });

        then('the event will remain collapsed', () => {
            expect(EventWrapper.state("showHideDetails")).toBe(true);
            });
        });


   test('User can expand an event to see its details', ({ given, when, then }) => {
    let EventWrapper;
        given('the list of events has been loaded', () => {
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('user clicks on “Show details” button for an event', () => {
            EventWrapper.find(".details-btn").at(0).simulate("click");
        });

        then('the event element will be expanded to show the event details', () => {
            expect(EventWrapper.find(".event-hidden-details")).toHaveLength(1);
        });
    });


    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let EventWrapper; 
        given('the detailed view of an event has been loaded', () => {
            EventWrapper = mount(<Event event={mockData[0]} />);
        });

        when('user clicks on “Hide details” button for an event', () => {
            EventWrapper.find(".details-btn").at(0).simulate("click");
        });

        then('the event element will be collapsed to hide the event details', () => {
            expect(EventWrapper.find(".event-hidden-details")).toHaveLength(1);
        });
    });
});