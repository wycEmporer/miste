export class SerializableObject {
  constructor() {}
  //set Es6 Object to JSON Object
  toJSON() {
    let object = {};
    for (let i in this) {
      this.getJsonPropertis(i, object);
    }
    return object;
  }

  /** set JSON Object to Es6 Object
      { 
      param:obj
      is json Object
      }
 */
  toObject(obj) {
    for (let i in obj) {
      this.setJsonToObjPropertis(i, obj);
    }
  }
}
