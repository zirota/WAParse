if (document.readyState === 'complete') {
  console.log('im ready');
  // Get an storage objects
}
console.log(document.readyState);
chrome.storage.sync.get('WAParse', (items) => {
  // Get the array of stored messages
  Object.values(items).forEach((item) => {
    const row = document.createElement('div');
    Object.values(item).forEach((data) => {
      const cell = document.createElement('div');
      const text = document.createTextNode(data);
      cell.appendChild(text);
      row.appendChild(cell);
    });
    document.querySelector('#content').appendChild(row);
  });
});
