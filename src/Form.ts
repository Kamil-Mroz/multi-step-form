import { changeStep, state } from './main'
import { CreateElementType } from './types'

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
  get statePeriod() {
    return state.period
  }
  set statePeriod(period) {
    state.period = period
  }

  get stateStep() {
    return state.step
  }

  set stateStep(step: number) {
    state.step = step
  }
  get stateMaxStep() {
    return state.maxStep
  }

  get statePlan() {
    return state.plan
  }
  set statePlan(plan) {
    state.plan = plan
  }
  get stateAddOns() {
    return state.addOns
  }
  set stateAddOns(addOns) {
    state.addOns = addOns
  }

  get stateTotal() {
    const total =
      state.plan.price[this.statePeriod] +
      state.addOns.reduce((acc, cur) => (acc += cur.price[this.statePeriod]), 0)
    return total
  }
  get stateInfo() {
    return state.info
  }
  set stateInfo(info) {
    state.info = info
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

    if (this.stateStep === 0) {
      btnBack.style.display = 'none'
    }
    if (this.stateStep >= this.stateMaxStep) {
      btnNext.style.display = 'none'
      btnConfirm.style.display = 'block'
    }
    if (this.stateStep < this.stateMaxStep) {
      btnConfirm.style.display = 'none'
    }

    ;[btnBack, btnNext].forEach((btn) =>
      btn.addEventListener('click', () => {
        if (errorHandler()) return

        const value = btn.classList.contains('btn--back') ? -1 : 1

        if (this.stateStep > -1 && this.stateStep <= this.stateMaxStep) {
          this.stateStep += value
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
  periodString() {
    return this.statePeriod === 'month' ? '/mo' : '/yr'
  }
}
export default Form
