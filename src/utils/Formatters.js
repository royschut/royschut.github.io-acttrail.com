import ArtistVO from "../vo/ArtistVO";
import EventVO from "../vo/EventVO";
import BookingVO from "../vo/BookingVO";

export default function Formatter() {
  return;
}
export function formatArtists(data) {
  let arr = [];
  data.forEach((subdata) => (arr[subdata.id] = new ArtistVO(subdata)));
  return arr;
}

export function formatEvents(data) {
  let arr = [];
  data.forEach((subdata) => (arr[subdata.id] = new EventVO(subdata)));
  return arr;
}
export function formatBookings(data) {
  let arr = [];
  data.forEach((subdata) => (arr[subdata.id] = new BookingVO(subdata)));
  return arr;
}
export function formatFilteredBookings(bookings, curEvent, artists) {
  let nBookings = [];
  bookings = bookings.forEach((b) => {
    if (b.event_id === curEvent) {
      const a = artists[b.artist_id];
      const nB = { ...b, name: a.name, assetsrc: a.assetsrc };
      nBookings[b.id] = nB;
    }
  });
  return nBookings;
}
export function formatFilteredBookingsForArtists(bookings, curArtist, events) {
  let nBookings = [];
  bookings = bookings.forEach((b) => {
    if (b.artist_id === curArtist) {
      const eVO = events[b.event_id];
      const nB = { ...b, name: eVO.name, assetsrc: eVO.assetsrc };
      nBookings[b.id] = nB;
    }
  });
  return nBookings;
}

export function addNewArtist(arr, name, id) {
  arr[id] = new ArtistVO({ id: id, name: name });
  return arr;
}
export function addNewEvent(arr, name, id) {
  arr[id] = new EventVO({ id: id, name: name });
  return arr;
}
export function addNewBooking(arr, a_id, e_id, id) {
  arr[id] = new BookingVO({ id: id, artist_id: a_id, event_id: e_id });
  return arr;
}
