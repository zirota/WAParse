function main() {
  const showPage = {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          hostEquals: 'web.whatsapp.com',
          schemes: ['https'],
        },
        css: ['.vW7d1'],
      }),
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()],
  };

  chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([showPage]);
    });
  });
}

main();
