import React from "react";
import App from "../App";
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";
import { mockEvents } from "../mock-events";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {

    //Scenario 1 An event is collapsed by default
  test("An event element is collapsed by default", ({ given, when, then, }) => {
    given("the list of events has been loaded", () => {});

    let AppWrapper;

    when("the user did not click the „Show Details“ yet", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockEvents.length);
    });

    then("the event elements are collapsed", () => {
      expect(AppWrapper.find("showDetails")).toHaveLength(mockData.length);
    });
  });

  //Scenario 2 user can expand to see its details
  test("User can expand an event to see its details", ({ given, when, then, }) => {
    let AppWrapper;

    given("app loaded", () => {
      AppWrapper = mount(<App />);
    });

    when("the user clicks the button „show Details“", () => {
      AppWrapper.find(".event .details-btn").at(0).simulate("click");
    });

    then("the event element should expand and show more information", () => {
      expect(AppWrapper.find(".event .event__Details")).toHaveLength(1);
    });
  });


  //Scenario 3 User can collapse an event to hide its details
  test("User can collapse an event to hide its details", ({ given, when, then, }) => {
    let AppWrapper;

    given("app loaded", () => {
      AppWrapper = mount(<App />);
    });

    when("the user clicks the „hide details“ button", () => {
      AppWrapper.find(".details-btn").at(0).simulate("click");
    });

    then("the event element details should collapse", () => {
      expect(AppWrapper.find(".event .event__Details")).toHaveLength(0);
    });
  });
});