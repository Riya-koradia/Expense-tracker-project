import moment from "moment";
import { USER_ROLES } from "./constants";

export const accessToken = {
    set: (val) => {
      localStorage.setItem("wehear_lead_management_access_token", val);
    },
    get: () => localStorage.getItem("wehear_lead_management_access_token"),
    remove: () => {
      localStorage.removeItem("wehear_lead_management_access_token");
    },
  };
  export const loggedInUser = {
    set: (val) => {
      localStorage.setItem("wehear_inventory_management_user", JSON.stringify(val));
    },
    get: () =>
      localStorage.getItem("wehear_inventory_lead_management_user")
        ? JSON.parse(localStorage.getItem("wehear_inventory_lead_management_user"))
        : null,
    remove: () => {
      localStorage.removeItem("wehear_inventory_lead_management_user");
    },
  };
  
  export const refreshToken = {
    set: (val) => {
      localStorage.setItem("wehear_inventory_lead_management_refresh_token", val);
    },
    get: () => localStorage.getItem("wehear_inventory_lead_management_refresh_token"),
    remove: () => {
      localStorage.removeItem("wehear_inventory_lead_management_refresh_token");
    },
  };
  
  export const lastReadNotification = {
    set: (val) => {
      localStorage.setItem("last_notification", val);
    },
    get: () =>
      localStorage.getItem("last_notification")
        ? localStorage.getItem("last_notification")
        : null,
    remove: () => {
      localStorage.removeItem("last_notification");
    },
  };
  export const toTitleCase = (str) => {
    if (str)
      return str?.replace(/\w\S*/g, function (txt) {
        return txt?.charAt(0)?.toUpperCase() + txt?.substr(1)?.toLowerCase();
      });
  
    return null;
  };
  
  export const toTitleSpaceCase = (str) => {
    if (str)
      return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    return str;
  };
  
export const logOut = () => {
    refreshToken.remove();
    accessToken.remove();
    loggedInUser.remove();
    lastReadNotification.remove();
    localStatecallModal().remove();
  };

  export const localStatecallModal = () => {
    return {
      set: (val) => localStorage.setItem("call_modal_state", JSON.stringify(val)),
      get: () =>
        localStorage.getItem("call_modal_state")
          ? JSON.parse(localStorage.getItem("call_modal_state"))
          : null,
      remove: () => localStorage.removeItem("call_modal_state"),
    };
  };
  
  export const getHeaders = () => {
    const tokenValue = accessToken.get();
    if (tokenValue) {
      return {
        Authorization: `Bearer ${tokenValue}`,
      };
    }
    return {};
  };
  export const getFileHeaders = () => {
    const tokenValue = accessToken.get();
    if (tokenValue) {
      return {
        Authorization: `Bearer ${tokenValue}`,
        "Content-Type": "multipart/form-data",
      };
    }
    return { "Content-Type": "multipart/form-data" };
  };
  export function setZeroPrefix(val) {
    if (parseInt(val, 10) < 10) {
      return `0${val}`;
    }
    return val;
  }

  export const getDateFiltersTime = (value) => {
    let date = new Date();
    let startDate = date.getTime();
    let endDate = date.getTime();
  
    switch (value) {
      case "this_week":
  
        startDate = moment().startOf("week").valueOf();
  
        break;
      case "this_month":
  
        // const temp = new Date(startDate)
        // startDate = new Date(temp.getFullYear(), temp.getMonth()).getTime()
        startDate = moment().startOf("month").valueOf();
  
        break;
      case "this_year":
  
        startDate = moment().startOf("year").valueOf();
  
        break;
  
      case "last_month":
  
        startDate = moment().add(-1, "month").startOf("month").valueOf();
        endDate = moment().add(-1, "month").endOf("month").valueOf();
  
        break;
      case "last_year":
  
        startDate = moment().add(-1, "year").startOf("year").valueOf();
        endDate = moment().add(-1, "year").endOf("year").valueOf();
  
        break;
      case "last_week":
  
        startDate = moment().add(-1, "week").startOf("week").valueOf();
        endDate = moment().add(-1, "week").endOf("week").valueOf();
  
        break;
      case "today":
  
        startDate = moment().startOf("day").valueOf();
        endDate = moment().endOf("day").valueOf();
  
        break;
      case "yesterday":
  
        startDate = moment().add(-1, "day").startOf("day").valueOf();
        endDate = moment().add(-1, "day").endOf("day").valueOf();
  
        break;
      case "past":
  
        endDate = new Date(endDate);
  
        endDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1
        ).getTime();
  
        startDate = null;
  
        break;
      case "future":
  
        startDate = new Date(startDate);
  
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ).getTime();
  
        endDate = null;
  
        break;
  
      default:
        startDate = null;
        endDate = null;
  
    }
  
    return {
      startDate,
      endDate,
    };
  };

export const dateConverter = ({ type = "DD_MM_YYYY", value }) => {
    if (type === "DD_MM_YYYY") {
      const dateObj = new Date(value);
      return `${setZeroPrefix(dateObj.getDate())}/${setZeroPrefix(
        dateObj.getMonth() + 1
      )}/${dateObj.getFullYear()}`;
    }
    return value;
  };
  
  export const validateEmail = (email) => {
    var re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };
  export const validatePhone = (phone) => {
    var re = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phone.match(re);
  };
  export const allowedDateFilters = [
    {
      id: "today",
      label: "Today",
    },
    {
      id: "yesterday",
      label: "Yesterday",
    },
    {
      id: "last_week",
      label: "Last Week",
    },
    {
      id: "last_month",
      label: "Last Month",
    },
    {
      id: "last_year",
      label: "Last Year",
    },
    {
      id: "this_week",
      label: "This Week",
    },
  
    {
      id: "this_month",
      label: "This Month",
    },
  
    {
      id: "this_year",
      label: "This Year",
    },
  ];

export const titleCase = (s) => {
    if (s)
      return s
        .toLowerCase()
        .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
        .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
  
    return null;
  };
  
  export const findNameByRole = (role) => {
    for (let val in USER_ROLES) {
      if (USER_ROLES[val] == role) {
        return titleCase(val);
  
      }
    }
    return undefined;
  };
  export const findObjectKeyByValue = (value, object) => {
    for (let val in object) {
      if (object[val] == value) {
        return titleCase(val);
  
      }
    }
    return undefined;
  };