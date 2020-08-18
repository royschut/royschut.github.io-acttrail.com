export default class EventVO {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.subname = data.subname;
    this.date = data.date;
    this.venue_id = data.venue_id;
    this.notes = data.notes;
  }
}
