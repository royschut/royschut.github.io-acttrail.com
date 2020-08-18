import axios from "axios";

import UserVO from "../vo/UserVO";

import {
  formatArtists,
  formatEvents,
  formatBookings,
} from "../utils/Formatters";
import EventVO from "../vo/EventVO";
import ArtistVO from "../vo/ArtistVO";

const ax = axios.create({
  baseURL: "http://localhost:80/actrale/api.php",
});
const SIGNIN = 0;
const R_ARTIST = 1;
const R_EVENTS = 2;
const R_BOOKINGS = 3;
const C_EVENTS = 4;
const C_ARTIST = 5;
const C_BOOKING = 6;
const URL = [
  "?method=login",
  "?list=artistsforteam&id=",
  "?list=eventsforteam&id=",
  "?list=bookingsforteam&id=",
  "?crud=c&target=event&name=",
  "?crud=c&target=artist&name=",
  "?crud=c&target=booking&artist_id=",
];
export const getArtists = (team_id) =>
  new Promise(async (resolve) => {
    const res = await ax.get(`${URL[R_ARTIST]}${team_id}`);
    if (res.data.success) resolve(formatArtists(res.data.data));
  });
export const signIn = (credentialsVO) =>
  new Promise(async (resolve) => {
    const res = await ax.post(URL[SIGNIN], credentialsVO);
    if (res.data.success) resolve(new UserVO(res.data.data));
  });

export default class DataSource {
  constructor() {
    // console.log("DataSource created");
  }

  //todo: Make one talk function, to handle all errors from one place

  //SIGN
  signIn = (credentialsVO) =>
    new Promise(async (resolve) => {
      const res = await ax.post(URL[SIGNIN], credentialsVO);
      if (res.data.success) {
        this.tID = res.data.data.team_id;
        resolve(new UserVO(res.data.data));
      }
    });

  //READ
  getArtists = () =>
    new Promise(async (resolve) => {
      console.log(resolve);
      const res = await ax.get(`${URL[R_ARTIST]}${this.tID}`);
      if (res.data.success) resolve(formatArtists(res.data.data));
    });
  getEvents = () =>
    new Promise(async (resolve) => {
      const res = await ax.get(URL[R_EVENTS] + this.tID);
      if (res.data.success) resolve(formatEvents(res.data.data));
    });

  getBookings = () =>
    new Promise(async (resolve) => {
      const res = await ax.get(URL[R_BOOKINGS] + this.tID);
      if (res.data.success) resolve(formatBookings(res.data.data));
    });

  //TODO: Get Team_id from session!!!!!

  newOne = (daVO) =>
    new Promise(async (resolve) => {
      const res = await ax.get(this.buildURL(daVO));
      if (res.data) resolve(res.data);
    });

  buildURL = (daVO) => {
    let url = "";
    if (daVO.crud === "c") {
      url = `?crud=c&target=${daVO.target}`;
      daVO.forEach((key, value) => {
        if (value) url += `&${key}=${value}`;
      });
    }
    console.log("Have built URL: ", url);
    return url;
  };

  newEvent = (name) =>
    new Promise(async (resolve) => {
      const res = await ax.get(URL[C_EVENTS] + name + "&team_id=" + this.tID);
      if (res.data) resolve(new EventVO(res.data));
    });
  newArtist = (name) =>
    new Promise(async (resolve) => {
      const res = await ax.get(URL[C_ARTIST] + name + "&team_id=" + this.tID);
      if (res.data) resolve(new ArtistVO(res.data));
    });
  newBooking = (artist_id, event_id) =>
    new Promise(async (resolve) => {
      const res = await ax.get(
        URL[C_BOOKING] + artist_id + "&event_id=" + event_id
      );
      if (res.data) resolve(res.data);
    });
}
