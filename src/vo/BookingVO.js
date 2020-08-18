export default class BookingVO {
  constructor(data) {
    this.id = data.id;
    this.artist_id = data.artist_id;
    this.event_id = data.event_id;
    this.bookingstatus_id = data.bookingstatus_id;
    this.fee = data.fee;
    this.day = data.day;
    this.settype = data.settype;
    this.area = data.area;
  }
}
