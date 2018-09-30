// TODO: Add function to save on click
// Look into chrome sync storage

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

function onPicker() {
  // Links to create namespace elements
  const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  overlay.id = 'picker';
  document.body.appendChild(overlay);
  document.body.classList.add('picker-mode');
  const textboxes = document.querySelectorAll('.vW7d1 ._3_7SH._3DFk6');
  Array.from(textboxes).forEach((textbox) => {
    textbox.addEventListener('mouseleave', () => {
      const coordinates = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      };
      draw(coordinates);
    });

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
