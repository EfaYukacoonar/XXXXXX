function sendRiotCodeToDiscord(webhookUrl) {
  console.log("受け取ったURLはこれ：" + webhookUrl);
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

          UrlFetchApp.fetch(webhookUrl, {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify(payload)
          });
        }

        message.markRead();
      }
    }
  }
}
