function draw(coordinates) {
  const svg = document.querySelector('svg#picker');
  let path = document.querySelector('svg#picker path');
  const { left, top, right, bottom } = coordinates;

  if (!path) {
    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.appendChild(path);
  }
  path.setAttribute('stroke', '#db1313');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', '#ff000085');
  path.setAttribute('d', `M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`);
}

function updateChromeSync(details) {
  // TODO: Send message to chrome sync storage
  chrome.storage.sync.get('WAParse', (current) => {
    let existingDetails = !current ? [] : current.WAParse;
    console.log('exisitingDetais', existingDetails);
    existingDetails = existingDetails.concat(details);
    chrome.storage.sync.set({ WAParse: existingDetails }, () => {
      console.log(existingDetails);
    });
  });
}

function saveMessage(element) {
  const data = element.querySelector('.Tkt2p .copyable-text').getAttribute('data-pre-plain-text');
  const sender = data.match(/\](.*?):/)[1].trim();
  const time = data.match(/\[(.*?)\]/)[1];
  const message = element.querySelector('._3zb-j.ZhF0n span').innerHTML;
  // TODO: Make this support emojis
  const repliedMsg = element.querySelector('.Y9G3K .quoted-mention')
    ? element.querySelector('.Y9G3K .quoted-mention').innerHTML : null;
  const repliedSender = element.querySelector('._2a1Yw')
    ? element.querySelector('._2a1Yw').innerHTML : null;

  // Details of a message
  const details = {
    sender,
    time,
    message,
    repliedMsg,
    repliedSender,
  };

  updateChromeSync(details);
}

function updateListener() {
  const textboxes = document.querySelectorAll('.vW7d1 ._3_7SH._3DFk6');
  return Array.from(textboxes).forEach((textbox) => {
    textbox.addEventListener('mouseover', (event) => {
      // Path: An array of elements to the element
      const { path } = event;
      const message = path.filter((element) => {
        return element.className && element.className.includes('_3_7SH _3DFk6');
      });
      const coordinates = message[0].getBoundingClientRect();
      draw(coordinates);
    }, {
      capture: true,
      passive: true,
    });

    textbox.addEventListener('click', () => {
      saveMessage(textbox);
    });

    textbox.addEventListener('mouseleave', () => {
      const coordinates = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };
      draw(coordinates);
    });
  });
}

// TODO: Remove all listeners
function removeListener(textboxes) {
  textboxes.forEach((textbox) => {
    textbox.removeEventListener('mouseover', saveMessage);
    textbox.removeEventListener('click');
    textbox.removeEventListener('mouseleave');
  });
}

function onPicker() {
  // Links to create namespace elements
  const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  overlay.id = 'picker';
  document.body.appendChild(overlay);
  document.body.classList.add('picker-mode');
}

function offPicker() {
  document.getElementById('picker').remove();
  document.body.classList.remove('picker-mode');
}

try {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log('#msg', msg);
    const textboxes = [];
    switch (msg.request) {
      case ('on-picker'):
        onPicker();
        textboxes.push(updateListener());
        break;
      case ('off-picker'):
        offPicker();
        removeListener(textboxes);
        break;
      case ('page-change'):
        textboxes.push(updateListener());
        break;
      default:
        console.log(msg.request);
    }
  });
} catch (err) {
  console.log(err);
}
