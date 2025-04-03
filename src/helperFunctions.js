function createElementFunction(tag, classes = [], attributes = {}) {
  const element = document.createElement(tag);

  classes.forEach((classInstance) => {
    element.classList.add(classInstance);
  });

  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  return element;
}

export { createElementFunction };
