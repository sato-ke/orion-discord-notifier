console.log("Content script loaded for Orion Notify Bridge");

function injectScript(file) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.runtime.getURL(file));
  document.documentElement.appendChild(script);
  script.onload = function () {
    this.remove();
  };
}

injectScript("injected.js");

window.addEventListener(
  "message",
  function (event) {
    if (event.source != window) return;

    if (event.data.type && event.data.type == "ORION_NOTIFICATION") {
      console.log("Notification received in content script:", event.data);
      chrome.runtime.sendMessage(
        {
          type: "ORION_NOTIFICATION",
          title: event.data.title,
          message: event.data.message,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Response from background script:", response);
          }
        }
      );
    }
  },
  false
);

// Keep the service worker alive
function keepAlive() {
  chrome.runtime.sendMessage({ type: "KEEP_ALIVE" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error in keepAlive:", chrome.runtime.lastError);
    } else {
      console.log("Service worker kept alive");
    }
    setTimeout(keepAlive, 20000); // Send keep-alive message every 20 seconds
  });
}

keepAlive();
