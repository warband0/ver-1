export const newElement = function (tag, classes = [], textContent = '', attributes = {}) {
  const element = document.createElement(tag);
  classes.forEach(style => element.classList.add(style));
  if (textContent) {
    element.textContent = textContent
  }
  for (let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute])
  }
  return element;
}