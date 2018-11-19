chrome.storage.sync.get('WAParse', (items) => {
  // Get the array of stored messages
  Object.values(items).forEach((item) => {
    Object.values(item).forEach((data) => {
      let row = '<tr class="row">';
      Object.entries(data).forEach(([key, value]) => {
        const cell = value == null ? '-' : value;
        switch (key) {
          case('message'):
            row += `<td class="cell message">${cell}</td>`;
            break;
          case('repliedMsg'):
            row += `<td class="cell repliedmessage">${cell}</td>`;
            break;
          case('repliedSender'):
            row += `<td class="cell repliedsender">${cell}</td>`;
            break;
          case('sender'):
            row += `<td class="cell sender">${cell}</td>`;
            break;
          case('time'):
            row += `<td class="cell datetime">${cell}</td>`;
            break;
          default:
            row += `<td class="cell">${cell}</td>`;
        }
      });
      row += '</tr>';
      document.querySelector('#content-header tbody').innerHTML += row;
    });
  });
});
