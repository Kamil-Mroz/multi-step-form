const createElement = (
  element: string,
  text: string = '',
  ...classes: string[]
) => {
  const createdElement = document.createElement(element)
  createdElement.classList.add(...classes)
  createdElement.textContent = text
  return createdElement
}

export default createElement
