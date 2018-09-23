function draw(coordinates) {
  const svg = document.querySelector('svg#picker');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const left = Math.floor(coordinates.left);
  const top = Math.floor(coordinates.top);
  const right = Math.ceil(coordinates.right);
  const bottom = Math.ceil(coordinates.bottom);
  path.setAttribute('d', `M${left} ${top} L${right} ${top} L${right} ${bottom} L${left} ${bottom} Z`);
  svg.appendChild(path);
}

function onPicker() {
  const overlay = document.createElement('svg');
  overlay.id = 'picker';
  document.body.appendChild(overlay);
  document.body.classList.add('picker-mode');
  const textboxes = document.querySelectorAll('.vW7d1 ._3_7SH._3DFk6');
  console.log('# tb', textboxes);
  Array.from(textboxes).forEach((textbox) => {
    textbox.addEventListener('mouseover', (event) => {
      console.log('im here');
      const coordinates = event.target.getBoundingClientRect();
      draw(coordinates);
    }, {
      capture: true,
      passive: true,
    });
  });
}

function offPicker() {
  document.getElementById('picker').remove();
  document.body.classList.remove('picker-mode');
}

try {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log('#msg', msg);
    switch (msg.request) {
      case ('on-picker'):
        onPicker();
        break;
      case ('off-picker'):
        offPicker();
        break;
      default:
        console.log(msg.request);
    }
  });
} catch (err) {
  console.log(err);
}
