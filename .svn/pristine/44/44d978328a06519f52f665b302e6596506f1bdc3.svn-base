import { SerializableObject } from "../serializable";

export class Passenger extends SerializableObject {
  constructor(firstname, lastname, birthday, title) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthday = birthday;
    this.title = title;
  }
  getJsonPropertis(i, object) {
    this.getAndSetPropertis(i, object, "get");
  }

  setJsonToObjPropertis(i, object) {
    this.getAndSetPropertis(i, object, "set");
  }

  getAndSetPropertis(i, object, type) {
    if (i == "firstname") {
      if (type == "get") {
        object.firstname = this.firstname;
      } else if (type == "set") {
        this.firstname = object.firstname;
      }
    } else if (i == "lastname") {
      if (type == "get") {
        object.lastname = this.lastname;
      } else if (type == "set") {
        this.lastname = object.lastname;
      }
    } else if (i == "birthday") {
      if (type == "get") {
        object.birthday = Date.parse(this.birthday);
      } else if (type == "set") {
        this.birthday = new Date(object.birthday);
      }
    } else if (i == "title") {
      if (type == "get") {
        object.title = this.title;
      } else if (type == "set") {
        this.title = object.title;
      }
    }
  }
}
