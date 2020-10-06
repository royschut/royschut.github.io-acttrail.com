export const local = process.env.NODE_ENV === "development";

const BaseURL = "http://" + (local ? "localhost/" : "acttrail.com/");
const ApiURL = BaseURL + (local ? "/actrale/" : "") + "api.php";
export const UploadURL = BaseURL + "uploads/";

export const URL_SIGN = {
  CHECKSESSION: ApiURL + "?method=checksession",
  SIGNIN: ApiURL + "?method=login",
  SIGNOUT: ApiURL + "?method=logout",
};
export const CRUD_URL = (crud, target) =>
  ApiURL + "?crud=" + crud + "&target=" + target;

export const URL_BOOKER = {
  R_ARTISTS: ApiURL + "?list=artistsforteam&id=",
  R_EVENTS: ApiURL + "?list=eventsforteam&id=",
  R_BOOKINGS: ApiURL + "?list=bookingsforteam&id=",
  R_ARTISTFEE: ApiURL + "?list=artistfee&artist_id=",
  R_TEAM: ApiURL + "?list=team&user_id=",

  INVITE_BOOKER: ApiURL + "?method=invite&target=booker",

  C_USER: ApiURL + "?crud=c&target=user",
  U_USER: ApiURL + "?crud=u&target=user",
  D_USER: ApiURL + "?crud=d&target=user",

  C_ARTIST: ApiURL + "?crud=c&target=artist&name=",
  U_ARTIST: ApiURL + "?crud=u&target=artist",
  D_ARTIST: ApiURL + "?crud=d&target=artist",

  C_EVENT: ApiURL + "?crud=c&target=event&name=",
  U_EVENT: ApiURL + "?crud=u&target=event",
  D_EVENT: ApiURL + "?crud=d&target=event",

  C_BOOKING: ApiURL + "?crud=c&target=booking&artist_id=",
  R_BOOKING: ApiURL + "?crud=r&target=booking&id=",
  U_BOOKING: ApiURL + "?crud=u&target=booking",
  D_BOOKING: ApiURL + "?crud=d&target=booking",

  C_VENUE: ApiURL + "?crud=c&target=venue&event_id=",
  R_VENUE: ApiURL + "?crud=r&target=venue&id=",
  U_VENUE: ApiURL + "?crud=u&target=venue&id=",
  D_VENUE: ApiURL + "?crud=d&target=venue&id=",

  C_ARTISTFEE: ApiURL + "?crud=c&target=artistfee&artist_id=",
  U_ARTISTFEE: ApiURL + "?crud=u&target=artistfee&id=",

  UPLOADPIC_EVENT: ApiURL + "?method=upload&target=event",
  UPLOADPIC_ARTIST: ApiURL + "?method=upload&target=artist",

  R_ARTIST: ApiURL + "?list=artist&id=",
  R_EVENTS_FORARTIST: ApiURL + "?list=eventsforartist&id=",
  R_BOOKINGS_FORARTIST: ApiURL + "?list=bookingsforartist&id=",
};
const f = "fas fa-";
export const PAGEDATA_BOOKER = {
  top: { id: "profile", label: "Profile" },
  main: [
    {
      id: "dashboard",
      label: "Dashboard",
      iconClass: f + "tachometer-alt",
      xs: true,
    },
    { id: "artists", label: "Artists", iconClass: f + "headphones" },
    {
      id: "events",
      label: "Events",
      iconClass: f + "calendar-check",
      xs: true,
    },
    { id: "checklists", label: "Checklists", iconClass: f + "clipboard-list" },
    {
      id: "travel",
      label: "Travel",
      iconClass: f + "plane-departure",
      xs: true,
    },
    { id: "papers", label: "Papers", iconClass: f + "file-contract" },
    { id: "media", label: "Media", iconClass: f + "photo-video" },
  ],
  bottom1: {
    id: "exit",
    label: "Logout",
    iconClass: f + "sign-out-alt",
    small: true,
  },
  bottom2: { id: "settings", label: "Settings", iconClass: f + "cog" },
};
export const PAGEDATA_ARTIST = {
  top: { id: "profile", label: "Profile" },
  main: [
    { id: "dashboard", label: "Dashboard", iconClass: f + "tachometer-alt" },
    { id: "events", label: "Events", iconClass: f + "calendar-check" },
    { id: "travel", label: "Travel", iconClass: f + "plane-departure" },
    { id: "papers", label: "Papers", iconClass: f + "file-contract" },
    { id: "media", label: "Media", iconClass: f + "photo-video" },
  ],

  bottom1: {
    id: "exit",
    label: "Logout",
    iconClass: f + "sign-out-alt",
    small: true,
  },
  bottom2: { id: "settings", label: "Settings", iconClass: f + "cog" },
};
export const BOOKINGSTATUS = {
  OPTION: 1,
  CANCELLED: 2,
  CONFIRMED: 3,
  ARCHIVED: 4,
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const daysFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const showcaseData = [
  {
    assets: ["artists.png", "events.png"],
    title: "Manage",
    body: "Artists and events",
  },
  {
    assets: ["artist_bookings.png"],
    title: "Bookings",
    body:
      "Manage bookings with status, set type, fees, areas, briefing, timetables, notes",
  },
  {
    assets: ["artist_detail.png"],
    title: "Artist",
    body: "Adjust the standard fee, add press kits of your artists",
  },
  {
    assets: ["artists_list.png", "agenda.png"],
    title: "Friendly views",
    body: "Grid, list or calendar view",
  },
  {
    assets: ["artist_spread.png", "event_bookings.png"],
    title: "Intuitive navigation",
    body:
      "Quickly switch between artists and it's events, or the other way around",
  },
];

// TEMP  STUFF
export const tempTimetable = [
  { label: "23:00-24:00", key: "tt1", value: "Artist X" },
  { label: "24:00-00:00", key: "tt1", value: "Artist Y" },
  { label: "00:00-01:00", key: "tt1", value: "Artist Z" },
  { label: "01:00-02:00", key: "tt1", value: "Artist QS" },
  { label: "02:00-03:00", key: "tt1", value: "Artist XOL" },
  { label: "03:00-04:00", key: "tt1", value: "Artist SXY" },
];
export const tempAssets = [
  {
    label: "Festival Artwork",
    key: "asset1",
    value: "flyer_download.jpg",
  },
  {
    label: "Banner",
    key: "asset2",
    value: "banner_058459_download.jpg",
  },
  {
    label: "Banner",
    key: "asset2",
    value: "banner_058459_download.jpg",
  },
];
export const tempVenue = {
  name: "Ten-X Club",
  address: "Switserlaan 88",
  zipcode: "2418 XQ Amstelveen",
  notes: "Cool club here",
};
