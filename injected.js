(function () {
  console.log("Injected script loaded");

  const OriginalNotification = window.Notification;

  window.Notification = function (title, options) {
    console.log("New Notification created:", title, options);

    const notification = new OriginalNotification(title, options);

    window.postMessage(
      {
        type: "ORION_NOTIFICATION",
        title: title,
        message: options.body || "",
      },
      "*"
    );

    return notification;
  };

  Object.keys(OriginalNotification).forEach((key) => {
    window.Notification[key] = OriginalNotification[key];
  });

  window.Notification.prototype = OriginalNotification.prototype;

  console.log("Notification API has been hooked");
})();
