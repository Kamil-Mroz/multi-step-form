import { changeStep, state } from './main'

type CreateElementType = {
  element?: string
  children?: Node[] | Node
  classTag?: string[] | string
  content?: string
  type?: string
}

class Form {
  heading: string
  text: string
  parentElement: HTMLFormElement
  constructor(heading: string, text: string) {
    this.heading = heading
    this.text = text
    this.parentElement = document.querySelector('.form') as HTMLFormElement
    this.parentElement.addEventListener('submit', this.onSubmit)
  }
  onSubmit(e: SubmitEvent) {
    e.preventDefault()
    if (e.target instanceof HTMLFormElement) {
      e.target.style.display = 'none'
      const thankYopPage = document.querySelector('.thank-you') as HTMLElement
      thankYopPage && (thankYopPage.style.display = 'flex')
    }
  }
  renderHeading(
    formField: HTMLFieldSetElement,
    headingT: string,
    textT: string
  ) {
    const heading = this.createElement({
      element: 'legend',
      content: headingT,
      classTag: 'heading',
    })
    const text = this.createElement({
      element: 'p',
      content: textT,
      classTag: 'form__text',
    })

    formField.prepend(...[heading, text])
    this.parentElement.prepend(formField)
  }
  clear() {
    this.parentElement.innerHTML = ''
  }
  renderButtons(errorHandler: () => boolean | void) {
    const btnNext = this.createElement({
      element: 'button',
      content: 'Next Step',
      classTag: ['btn', 'btn--next'],
      type: 'button',
    }) as HTMLButtonElement
    const btnBack = this.createElement({
      element: 'button',
      content: 'Go back',
      classTag: ['btn', 'btn--back'],
      type: 'button',
    }) as HTMLButtonElement

    const btnConfirm = this.createElement({
      element: 'button',
      content: 'Confirm',
      classTag: ['btn', 'btn--confirm'],
    }) as HTMLButtonElement

    if (state.step === 0) {
      btnBack.style.display = 'none'
    }
    if (state.step >= state.maxStep) {
      btnNext.style.display = 'none'
      btnConfirm.style.display = 'block'
    }
    if (state.step < state.maxStep) {
      btnConfirm.style.display = 'none'
    }

    ;[btnBack, btnNext].forEach((btn) =>
      btn.addEventListener('click', () => {
        if (errorHandler()) return

        const value = btn.classList.contains('btn--back') ? -1 : 1

        if (state.step > -1 && state.step <= state.maxStep) {
          state.step += value
          buttons.innerHTML = ''
          changeStep()
        }
      })
    )

    const buttons = this.createElement({
      classTag: 'buttons',
      children: [btnBack, btnNext, btnConfirm],
    })
    this.parentElement.append(buttons)
  }

  setCurrentStep(id: number) {
    document.querySelectorAll('.step-icon').forEach((icon, index) => {
      if (index === id) icon.classList.add('active')
      else icon.classList.remove('active')
    })
  }
  createElement({
    element = 'div',
    children,
    content,
    classTag,
    type,
  }: CreateElementType) {
    const createdElement = document.createElement(element) as any
    if (content) createdElement.textContent = content
    if (children) {
      if (Array.isArray(children) && children.length > 0)
        createdElement.append(...children)
      else createdElement.append(children)
    }
    if (classTag) {
      if (classTag.length > 0 && Array.isArray(classTag))
        createdElement.classList.add(...classTag)
      else createdElement.classList.add(classTag)
    }
    if (type) createdElement.type = type
    return createdElement
  }
  period() {
    return state.period === 'month' ? '/mo' : '/yr'
  }
}
export default Form
