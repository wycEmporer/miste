import { DomainManager } from "../../config/DomainManager.js";

export class Trip {
  static printInvoice(vueComp, String) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .get(DomainManager.printInvoice(String))
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
