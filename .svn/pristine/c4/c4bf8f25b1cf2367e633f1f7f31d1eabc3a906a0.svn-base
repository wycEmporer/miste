export class OrderStatusUtil {
  static getOrderStatus(num) {
    switch (num) {
      case "1":
        return "Refunding";
        break;
      case "2":
        return "Changing";
        break;
      case "3":
        return "Refunded";
        break;
      case "4":
        return "Changed";
        break;
      case "105":
        return "Upcoming";
        break;
      case "106":
        return "Complete";
        break;
      case "107":
        return "To be paid";
        break;
      case "108":
        return "Canceled";
        break;
      case "109":
        return "Canceled";
        break;
    }
  }

  static getOrderClass(status) {
    switch (status) {
      case "To be paid":
        return "notpay";
        break;
      case "Upcoming":
        return "upcoming";
        break;
      case "Complete":
        return "complete";
        break;
      case "Canceled":
        return "Canceled";
        break;
      default:
        break;
    }
  }

  static getSilverType(status) {
    switch (status) {
      case "1":
        return "Reward";
      case "2":
        return "Redeem";
      case "3":
        return "Expired";
      case "4":
        return "Refund";
      case "5":
        return "Exchange";
      case "7":
        return "Sys Top-up";
      case "8":
        return "Referral";
      case "9": return "Refund";
      case '10': return "Redeem";
        
    }
  }
  static getGoldType(status) {
    let type = {
      0: "Top-up Gift",
      1: "Top-up",
      2: "Redeem",
      3: "Transfer",
      4: "Refund",
      5: "Exchange",
      6: "Cashback",
      7: "Sys Top-up"
    };
    return type[status];
  }
}
