function openSavedMessages() {
  chrome.tabs.create({ url: 'WAParse.html' });
}

function sendRequest(message) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { request: `${message}` });
  });
}

try {
  document.addEventListener('DOMContentLoaded', async () => {
    const savedMessages = document.getElementById('saved-messages');
    const elementPicker = document.getElementById('element-picker');

    savedMessages.addEventListener('click', () => {
      openSavedMessages();
    });

    elementPicker.addEventListener('click', () => {
      chrome.storage.local.get('picker', (value) => {
        console.log('value', value);
        if (value === null || !value.picker) {
          sendRequest('on-picker');
          chrome.storage.local.set({ picker: true });
        } else {
          sendRequest('off-picker');
          chrome.storage.local.set({ picker: false });
        }
      });
    });
  });
} catch (err) {
  console.log(err);
}
