const style = document.createElement("style");
style.textContent = `
  html, body {
    background-color: #111 !important;
    color: #e0e0e0 !important;
    filter: invert(1) hue-rotate(180deg) !important;
  }

  img, video, picture, iframe, svg {
    filter: invert(1) hue-rotate(180deg) !important;
  }

  input, textarea, button, select {
    background-color: #222 !important;
    color: #e0e0e0 !important;
    border-color: #555 !important;
  }

  a {
    color: #80c0ff !important;
  }
`;

document.head.appendChild(style);

