export default class UserVO {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role_id = data.role_id;
    this.team_id = data.team_id;
    this.team_name = data.team_name;
  }
}
