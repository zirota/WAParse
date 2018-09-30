// TODO: listen for changes so that eventListeners will be updated again

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.set({ picker: false });
});
