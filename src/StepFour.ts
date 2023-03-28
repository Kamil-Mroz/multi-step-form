import Form from './Form'
import { state } from './main'
import createElement from './createElement'

class StepFour extends Form {
  formField: HTMLFieldSetElement
  constructor({ heading, text, id }) {
    super(heading, text)
    this.formField = createElement(
      'fieldset',
      '',
      'form-field',
      'flex-col'
    ) as HTMLFieldSetElement
    this.setCurrentStep(id)
    this.render()
  }
  render() {
    this.clear()
    this.renderHeading(this.formField, this.heading, this.text)
    this.renderTotal()
    this.renderButtons(this.handleError)
  }

  renderTotal() {
    const container = createElement('div', '', 'ok')

    container.append(...[this.createSummary(), this.createTotal()])

    this.formField.append(container)
  }

  createTotal() {
    const totalContainer = createElement('div', '', 'total', 'row')
    const titleEl = createElement('p', `Total (per ${state.period})`)

    const total =
      state.plan.price +
      state.addOns.reduce((acc, curr) => (acc += curr.price), 0)

    const totalPrice = createElement(
      'p',
      `$${total}/${state.period === 'month' ? 'mo' : 'yr'}`,
      'price',
      'price--accent',
      'price--xl'
    )

    totalContainer.append(...[titleEl, totalPrice])
    return totalContainer
  }

  createSummary() {
    const summaryEl = createElement('div', '', 'flex-col', 'summary')
    const planEl = this.createPlan()
    summaryEl.append(planEl)

    state.addOns?.forEach((addon) => summaryEl.append(this.createAddon(addon)))
    return summaryEl
  }

  createPlan() {
    const planContainer = createElement('div', '', 'plan', 'row')

    const descriptionContainer = createElement('div', '', 'ok')

    const title = createElement(
      'h2',
      `${state.plan.title}(${state.period})`,
      'title'
    )

    const changeBtn = createElement(
      'button',
      'Change',
      'btn-change'
    ) as HTMLButtonElement
    changeBtn.type = 'button'

    descriptionContainer.append(...[title, changeBtn])
    const price = createElement(
      'p',
      `$${state.plan.price}/${state.period === 'month' ? 'mo' : 'yr'}`
    )

    planContainer.append(...[descriptionContainer, price])
    return planContainer
  }

  createAddon({ title, price, period }) {
    const addonContainer = createElement('div', '', 'row')
    const titleEl = createElement('p', title, 'ok')
    const priceEl = createElement(
      'p',
      `+$${price}/${period === 'month' ? 'mo' : 'yr'}`,
      'price',
      'price--sm'
    )
    addonContainer.append(...[titleEl, priceEl])
    return addonContainer
  }

  handleError() {}
}
export default StepFour
