import axios from "axios";
import { URL_BOOKER as URL } from "../data/Constants";

export const axGet = async (goal, payload) => {
  console.log("axshell getss", goal, payload);
  const url = getURL(goal, payload);
  const res = await axios.get(url);
  if (res.data.success) return res.data.data;
  else console.log("Axshell get: couldn't succeed!", res, payload);
};
export const axPost = async (goal, payload) => {
  console.log("axshell post", goal, payload);
  const url = getURL(goal, payload);
  const res = await axios.post(url);
  console.log("-->", res);
  if (res.data.success) return res.data.data;
  else console.log("Axshell post: couldn't succeed!", res, payload);
};
function getURL(goal, payload) {
  switch (goal) {
    case "fetchEvents":
      return URL.R_EVENTS + payload;
    case "fetchEventsForArtist":
      return URL.R_EVENTS_FORARTIST + payload;
    case "newEvent":
      return URL.C_EVENT + payload.name + "&team_id=" + payload.team_id;
    case "updateEvent":
      return URL.U_EVENT, JSON.stringify(payload);
    default:
      return "";
  }
}
export default function test() {}
