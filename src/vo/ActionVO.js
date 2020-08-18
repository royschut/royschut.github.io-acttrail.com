export const ACTIONS = {
  U_LOGGEDIN: 0,

  C_ARTIST: 1,
  C_EVENT: 2,
  C_BOOKING: 3,

  U_ARTIST: 4,
  U_EVENT: 5,
  U_BOOKING: 6,

  D_ARTIST: 7,
  D_EVENT: 8,
  D_BOOKING: 9,
};

export default class ActionVO {
  constructor(type, data = {}) {
    this.type = type;
    this.data = data;
  }
}
