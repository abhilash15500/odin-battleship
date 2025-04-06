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


function isCoordInArray(arr, coord) {
  return arr.some((item) => item[0] === coord[0] && item[1] === coord[1]);
}

export { createElementFunction, isCoordInArray };
