import createElement from './createElement'
import { changeStep, state } from './main'

class Form {
  heading: string
  text: string
  parentElement: HTMLFormElement
  constructor(heading: string, text: string) {
    this.heading = heading
    this.text = text
    this.parentElement = document.querySelector('.form') as HTMLFormElement
  }
  renderHeading(
    formField: HTMLFieldSetElement,
    headingT: string,
    textT: string
  ) {
    const heading = createElement('legend', headingT, 'heading')
    const text = createElement('p', textT, 'form__text')

    formField.prepend(...[heading, text])
    this.parentElement.prepend(formField)
  }
  clear() {
    this.parentElement.innerHTML = ''
  }
  renderButtons(errorHandler) {
    const btnNext = createElement(
      'button',
      'Next Step',
      'btn',
      'btn--next'
    ) as HTMLButtonElement
    btnNext.type = 'button'
    const btnBack = createElement(
      'button',
      'Go back',
      'btn',
      'btn--back'
    ) as HTMLButtonElement

    btnBack.type = 'button'
    const btnConfirm = createElement(
      'button',
      'Confirm',
      'btn',
      'btn--confirm'
    ) as HTMLButtonElement

    if (state.step === 0) {
      btnBack.style.display = 'none'
    }
    if (state.step >= state.maxStep) {
      btnNext.style.display = 'none'
    }
    if (state.step < state.maxStep) {
      btnConfirm.style.display = 'none'
    }
    ;[btnBack, btnNext].forEach((btn) =>
      btn.addEventListener('click', () => {
        const error = errorHandler()
        if (error) return

        const value = btn.classList.contains('btn--back') ? -1 : 1

        if (state.step > -1 && state.step <= state.maxStep) {
          state.step += value
          console.log(state.step)
          buttons.innerHTML = ''
          changeStep()
        }
      })
    )

    const buttons = createElement('div', '', 'buttons')
    buttons.append(...[btnBack, btnNext, btnConfirm])
    this.parentElement.append(buttons)
  }
}
export default Form
