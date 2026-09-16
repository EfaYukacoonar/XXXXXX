function sendRiotCodeToDiscord(webhookUrls) {

  const urls = Array.isArray(webhookUrls) ? webhookUrls : [webhookUrls];
  
  console.log("処理を開始します。対象Webhook数：" + urls.length);
  
  const query = 'from:noreply@mail.accounts.riotgames.com is:unread';
  const threads = GmailApp.search(query);

  for (const thread of threads) {
    const messages = thread.getMessages();
    for (const message of messages) {
      if (message.isUnread()) {
        const body = message.getPlainBody();
        const match = body.match(/\b\d{6}\b/);

        if (match) {
          const code = match[0];
          const payload = {
            content: `🔑 **Riot 2FA code**: \`${code}\``
          };

          for (const url of urls) {
            try {
              UrlFetchApp.fetch(url, {
                method: 'post',
                contentType: 'application/json',
                payload: JSON.stringify(payload)
              });
            } catch (e) {
              console.error("送信エラー (URL: " + url + "): " + e.message);
            }
          }
        }
        message.markRead();
      }
    }
  }
}
