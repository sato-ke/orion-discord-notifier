chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ORION_NOTIFICATION") {
    chrome.storage.sync.get(
      ["webhookUrl", "isActive", "excludedPairs"],
      (result) => {
        if (result.isActive && result.webhookUrl) {
          // 除外ペアをチェック
          const excludedPairs = (result.excludedPairs || "")
            .split(",")
            .map((pair) => pair.trim());
          const shouldExclude = excludedPairs.some((pair) => {
            return message.message.includes(pair);
          });

          if (shouldExclude) {
            console.log("Notification excluded based on pair");
            sendResponse({ success: false, reason: "excluded pair" });
          } else {
            console.log("Notification sent to Discord");
            sendToDiscord(result.webhookUrl, message.title, message.message)
              .then(() => {
                sendResponse({ success: true });
              })
              .catch((error) => {
                console.error("Error sending to Discord:", error);
                sendResponse({ success: false, error: error.message });
              });
          }
        } else {
          console.log(
            "Discord notification not sent: inactive or missing webhook URL"
          );
          sendResponse({
            success: false,
            reason: "inactive or missing webhook URL",
          });
        }
      }
    );
    return true; // This keeps the message channel open for the asynchronous response
  }
});

function createCoinglassUrl(pair) {
  // ペアから / を除去し、Binance_ プレフィックスを追加
  const formattedPair = "Binance_" + pair.replace("/", "");
  return `https://www.coinglass.com/tv/${formattedPair}`;
}

function sendToDiscord(webhookUrl, title, message) {
  // メッセージから #{pair}# を抽出
  const pairMatch = message.match(/#(.*?)#/);
  let content = message;
  let url = "";

  if (pairMatch) {
    const pair = pairMatch[1];
    url = createCoinglassUrl(pair);
    // メッセージから #{pair}# を除去
    content = message.replace(/#.*?#/, "").trim();
  }

  const payload = {
    embeds: [
      {
        title: title,
        description: url ? `[${content}](${url})` : content,
        color: 5814783, // 青色
      },
    ],
  };

  console.log("Sending to Discord:", title, message);
  return fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      url
        ? payload
        : {
            content: `**${title}**\n${message}`,
          }
    ),
  });
}

// 既存のコードの後に以下を追加

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "KEEP_ALIVE") {
    sendResponse({ status: "alive" });
  }
});
