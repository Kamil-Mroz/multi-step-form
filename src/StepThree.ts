import Form from './Form'
import { AddonType, PlanType, StepThreeType } from './types'

class StepThree extends Form {
  plans: AddonType[]
  addOns: PlanType[]
  formField: HTMLFieldSetElement
  constructor({ heading, text, plans, id }: StepThreeType) {
    super(heading, text)
    this.plans = plans
    this.addOns = this.stateAddOns
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
    this.renderAddons()
    this.renderButtons(this.handleError)
    const inputs = document.querySelectorAll('input[type="checkbox"]')
    inputs.forEach((input, index) => {
      input.addEventListener('change', (e) => {
        if (e.target instanceof HTMLInputElement) {
          if (e.target.checked) {
            const { title, price } = this.plans[index]
            const addOn = {
              id: index,
              title,
              price: price,
            }
            this.addOns.push(addOn)
          }
          if (!e.target.checked) {
            this.addOns = this.stateAddOns.filter((plan) => plan.id !== index)
          }
          this.stateAddOns = this.addOns
        }
      })
    })
  }

  renderAddons() {
    const container = this.createElement({ classTag: ['flex-col', 'add-ons'] })
    this.plans.forEach((plan) => {
      container.append(this.createAddon(plan))
    })

    this.formField.append(container)
  }

  createAddon({ title, description, price }: AddonType) {
    const inputEl = this.createElement({
      element: 'input',
      type: 'checkbox',
    }) as HTMLInputElement
    inputEl.checked = this.stateAddOns.some((plan) => plan.title === title)
    const titleEl = this.createElement({
      element: 'h2',
      content: title,
      classTag: 'title',
    })
    const textEl = this.createElement({
      element: 'p',
      content: description,
      classTag: 'description',
    })
    const descriptionEl = this.createElement({
      classTag: 'add-ons__text',
      children: [titleEl, textEl],
    })

    const priceEl = this.createElement({
      element: 'p',
      content: `+$${price[this.statePeriod]}${this.periodString()}`,
      classTag: ['price', 'price--accent'],
    })

    const addOnContainerEl = this.createElement({
      classTag: ['row', 'add-on'],
      children: [inputEl, descriptionEl, priceEl],
    })

    return addOnContainerEl
  }

  handleError() {}
}
export default StepThree
