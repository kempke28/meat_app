
import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
 

 export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
  };


  /** This function takes the accessToken you found and checks whether it’s a valid token or not. If it’s not, then you follow the redirect logic and send the user to the Google Authorization screen. */
  const checkToken = async (accessToken) => {
    const result = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
      .then((res) => res.json())
      .catch((error) => error.json());
  
    return result;
  };


  //** will remove the code from the URL once you’re finished with it. */
  const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
      var newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      window.history.pushState("", "", newurl);
    } else {
      newurl = window.location.protocol + "//" + window.location.host;
      window.history.pushState("", "", newurl);
    }
  };



  export const getEvents = async () => {
    NProgress.start();
  
    if (window.location.href.startsWith("http://localhost")) {
      NProgress.done();
      return mockData;
    }
  
  
    const token = await getAccessToken();
  
    if (token) {
      removeQuery();
      const url = 'https://t9c5wopqjl.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/' + token;
      const result = await axios.get(url);
      if (result.data) {
        var locations = extractLocations(result.data.events);
        localStorage.setItem("lastEvents", JSON.stringify(result.data));
        localStorage.setItem("locations", JSON.stringify(locations));
      }
      NProgress.done();
      return result.data.events;
    }
  };  



  /** If no authorization code is found (!code), the user is automatically redirected to the Google Authorization screen, where they can sign in and receive their code. */
  export const getAccessToken = async () => {
  
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://t9c5wopqjl.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
  };


/**  when the token doesn’t exist or is invalid, you need to get a new one. To that end, you need to redirect your users to log in with Google so they can be redirected back to your site with the code. The new token will be fetched in the code above using the function getToken */
  const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(
      'https://t9c5wopqjl.execute-api.eu-central-1.amazonaws.com/dev/api/token/' + encodeCode
    )
      .then((res) => {
        return res.json();
      })
      .catch((error) => error);
  
    access_token && localStorage.setItem("access_token", access_token);
  
    return access_token;
  };

  