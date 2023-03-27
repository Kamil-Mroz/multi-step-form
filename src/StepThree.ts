import Form from './Form'
import createElement from './createElement'
import { state } from './main'

type PlansType = {
  title: string
  description: string
  price: {
    month: number
    year: number
  }
}
type StepThreeType = {
  heading: string
  text: string
  plans: PlansType[]
  id: number
}
class StepThree extends Form {
  plans: PlansType[]
  formField: HTMLFieldSetElement
  constructor({ heading, text, plans, id }: StepThreeType) {
    super(heading, text)
    this.plans = plans
    this.formField = createElement(
      'fieldset',
      '',
      'form-field',
      'flex-col'
    ) as HTMLFieldSetElement
    this.setCurrentStep(id)
    this.render()
    console.log(state.addOns)
  }
  render() {
    this.clear()
    this.renderHeading(this.formField, this.heading, this.text)
    this.renderAddons()
    this.renderButtons(this.handleError)
    const inputs = document.querySelectorAll('input[type="checkbox"]')
    inputs.forEach((input, index) => {
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          const { title, price } = this.plans[index]
          const addOn = {
            id: index,
            title,
            price: price[state.period],
            period: state.period,
          }
          state.addOns.push(addOn)
        }
        if (!e.target.checked) {
          const newAddons = state.addOns.filter((plan) => plan.id !== index)
          state.addOns = newAddons
        }
        console.log(state.addOns)
      })
    })
  }

  renderAddons() {
    const container = createElement('div', '', 'flex-col', 'add-ons')
    this.plans.forEach((plan) => {
      container.append(this.createAddon(plan))
    })

    this.formField.append(container)
  }

  createAddon({ title, description, price }: PlansType) {
    const addOnContainerEl = createElement('div', '', 'row', 'add-on')
    const inputEl = createElement('input', '', 'ok') as HTMLInputElement
    inputEl.type = 'checkbox'
    inputEl.checked = state.addOns.some((plan) => plan.title === title)
    const descriptionEl = createElement('div', '', 'add-ons__text')
    const titleEl = createElement('h2', title, 'title')
    const textEl = createElement('p', description, 'description')

    descriptionEl.append(...[titleEl, textEl])

    const priceEl = createElement(
      'p',
      `+$${
        state.period === 'month' ? price.month + '/mo' : price.year + '/yr'
      }`,
      'price',
      'price--accent'
    )

    addOnContainerEl.append(...[inputEl, descriptionEl, priceEl])

    return addOnContainerEl
  }

  handleError() {}
}
export default StepThree
