function openSavedMessages() {
  chrome.tabs.create({ url: 'WAParse.html' });
}

function selectMessage() {
  // document.querySelector('body')
}

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = document.getElementById('open-saved-messages');
    const messagePicker = document.getElementById('message-picker');
    savedMessages.addEventListener('toggle', () => {
      openSavedMessages();
    });
  });
}

main();
