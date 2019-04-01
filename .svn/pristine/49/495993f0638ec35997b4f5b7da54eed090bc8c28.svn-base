
const IS_PROD = process.env.NODE_ENV === 'production' ? 'PROD' : 'TEST';

//mode  PROD || TEST
export class CashfreeConfig {
  static setConfig() {
    var config = {};
    config.layout = { view: "popup", width: "500" };
    config.mode = IS_PROD;
    return config;
  }
}

// child dir has "/"
export const API_ROOT = process.env.NODE_ENV === 'production' ? '' : '';
