let local = process.env.NODE_ENV === "development";

let SERVER = "/api.php";
if (local) SERVER = "http://localhost:80/actrale/api.php";
//if (local) SERVER = "http://192.168.1.128:80/actrale/api.php";

let siteURL = "actrale.com/#";
//if (local) siteURL = "localhost:3000/#";
if (local) siteURL = "192.168.1.128:3000/#";

export default {
  local: local,
  SERVER: SERVER,
  siteURL: siteURL,
};

const BaseURL = "http://actrale.com/api.php";
export const URL = {
  SIGNIN: BaseURL + "?method=login",
  R_ARTISTS: BaseURL + "?list=artistsforteam&id=",
  R_EVENTS: BaseURL + "?list=eventsforteam&id=",
  R_BOOKINGS: BaseURL + "?list=bookingsforteam&id=",
  C_EVENT: BaseURL + "?crud=c&target=event&name=",
  C_ARTIST: BaseURL + "?crud=c&target=artist&name=",
  C_BOOKING: BaseURL + "?crud=c&target=booking&artist_id=",
};
export const PAGES = {
  PROFILE: 0,
  DASHBOARD: 1,
  ARTIST: 2,
  EVENT: 3,
  CHECKLIST: 4,
  TRAVEL: 5,
  PAPERS: 6,
  MEDIA: 7,
  SETTINGS: 9,
  DEFAULT: 1,
};

export const P_TITLES = [
  "Profile (Dummy)",
  "Dashboard (Dummy)",
  "Artists",
  "Events",
  "Checklists (Dummy)",
  "Travel (Dummy)",
  "Papers (Dummy)",
  "Media (Dummy)",
  "Settings (Dummy)",
];
export const BOOKINGSTATUS = {
  OPTION: 1,
  CANCELLED: 2,
  CONFIRMED: 3,
  ARCHIVED: 4,
};

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
export const tempVenue = [
  { label: "Name", key: "fullname", value: "Ten-X Club" },
  { label: "Address", key: "address", value: "Switserlaan 88" },
  {
    label: "Zip code",
    key: "zipcode",
    value: "2418 XQ Amstelveen",
  },
];
export const tempPersona = [
  { label: "Name", key: "fullname", value: "fullname" },
  { label: "E-mail", key: "email", value: "email" },
];
export const tempFee = [
  { label: "Standard fee", key: "fee", value: "$ 500" },
  { label: "Bottom fee", key: "feeBottom", value: "$ 300" },
];
