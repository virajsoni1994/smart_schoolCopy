import { NotificationManager } from "react-notifications";

export default (type, msg, title) => {
  NotificationManager[type](title, msg);

  switch ((type, msg, title)) {
    case "info":
      console.log(type);
      NotificationManager.info(msg, title);
      break;

    case "success":
      NotificationManager.success(msg, title);
      break;

    case "warning":
      NotificationManager.warning(msg, title);
      break;

    case "error":
      NotificationManager.error(msg, title);
  }
};
