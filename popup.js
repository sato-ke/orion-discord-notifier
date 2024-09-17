document.addEventListener("DOMContentLoaded", function () {
  var webhookUrlInput = document.getElementById("webhookUrl");
  var excludedPairsInput = document.getElementById("excludedPairs");
  var isActiveCheckbox = document.getElementById("isActive");
  var saveButton = document.getElementById("save");

  // Load saved settings
  chrome.storage.sync.get(
    ["webhookUrl", "excludedPairs", "isActive"],
    function (result) {
      webhookUrlInput.value = result.webhookUrl || "";
      excludedPairsInput.value = result.excludedPairs || "";
      isActiveCheckbox.checked = result.isActive || false;
    }
  );

  // Save settings
  saveButton.addEventListener("click", function () {
    chrome.storage.sync.set(
      {
        webhookUrl: webhookUrlInput.value,
        excludedPairs: excludedPairsInput.value,
        isActive: isActiveCheckbox.checked,
      },
      function () {
        console.log("Settings saved");
        window.close();
      }
    );
  });
});
