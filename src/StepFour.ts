import Form from './Form'
import { changeStep, state } from './main'

class StepFour extends Form {
  formField: HTMLFieldSetElement
  constructor({ heading, text, id }) {
    super(heading, text)
    this.formField = this.createElement({
      element: 'fieldset',

      classTag: ['form-field', 'flex-col'],
    }) as HTMLFieldSetElement
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
    const container = this.createElement({
      children: [this.createSummary(), this.createTotal()],
    })
    this.formField.append(container)
  }

  createTotal() {
    const titleEl = this.createElement({
      element: 'p',
      content: `Total (per ${state.period})`,
    })

    const total =
      state.plan.price +
      state.addOns.reduce((acc, curr) => (acc += curr.price), 0)

    const totalPrice = this.createElement({
      element: 'p',
      content: `$${total}${this.period()}`,
      classTag: ['price', 'price--accent', 'price--xl'],
    })

    const totalContainer = this.createElement({
      classTag: ['total', 'row'],
      children: [titleEl, totalPrice],
    })

    return totalContainer
  }

  createSummary() {
    const planEl = this.createPlan()

    const summaryEl = this.createElement({
      classTag: ['flex-col', 'summary'],
      children: planEl,
    })

    state.addOns?.forEach((addon) => summaryEl.append(this.createAddon(addon)))
    return summaryEl
  }

  createPlan() {
    const title = this.createElement({
      element: 'h2',
      content: `${state.plan.title}(${state.period})`,
      classTag: 'title',
    })

    const changeBtn = this.createElement({
      element: 'button',
      content: 'Change',
      classTag: 'btn-change',
      type: 'button',
    }) as HTMLButtonElement
    changeBtn.addEventListener('click', () => {
      state.step = 1
      changeStep()
    })
    const descriptionContainer = this.createElement({
      children: [title, changeBtn],
    })
    const price = this.createElement({
      element: 'p',
      content: `$${state.plan.price}${this.period()}`,
    })

    const planContainer = this.createElement({
      classTag: ['plan', 'row'],
      children: [descriptionContainer, price],
    })
    return planContainer
  }

  createAddon({ title, price, period }) {
    const titleEl = this.createElement({ element: 'p', content: title })

    const priceEl = this.createElement({
      element: 'p',
      content: `+$${price}${this.period()}}`,
      classTag: ['price', 'price--sm'],
    })

    const addonContainer = this.createElement({
      classTag: 'row',
      children: [titleEl, priceEl],
    })

    return addonContainer
  }

  handleError() {}
}
export default StepFour
