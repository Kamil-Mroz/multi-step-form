import Form from './Form'
import Arcade from './assets/images/icon-arcade.svg'
import Pro from './assets/images/icon-pro.svg'
import Advanced from './assets/images/icon-advanced.svg'
import { PriceType, state } from './main'
type PlansType = {
  title: string
  price: PriceType
}

type StepTwoType = {
  heading: string
  text: string
  plans: PlansType[]
  offer: string
  id: number
}

class StepTwo extends Form {
  plans: PlansType[]
  offer: string
  formField: HTMLFieldSetElement
  icons: { [key: string]: any }
  id: number
  constructor({ heading, text, plans, offer, id }: StepTwoType) {
    super(heading, text)
    this.offer = offer
    this.plans = plans
    this.id = id
    this.icons = { Arcade, Pro, Advanced }
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
    this.renderPlans()
    this.renderSwitch()
    this.renderButtons(this.handleError)
  }

  renderPlans() {
    const plansContainer = this.createElement({ classTag: 'billing__plan' })

    this.plans.forEach((plan, index) => {
      const planEl = this.createPlans(plan)
      planEl.addEventListener('click', () => {
        state.plan.id = index
        state.plan.price = plan.price
        state.plan.title = plan.title
        document
          .querySelectorAll('.billing__card')
          .forEach((plan) => plan.classList.remove('active'))
        planEl.classList.add('active')
      })
      plansContainer.append(planEl)
    })

    this.formField.append(plansContainer)
  }

  createPlans({ title, price }: PlansType) {
    const icon = this.createElement({
      element: 'img',
      classTag: 'billing__icon',
    }) as HTMLImageElement

    icon.src = this.icons[title]
    icon.alt = title

    const titleEl = this.createElement({
      element: 'h2',
      content: title,
      classTag: 'title',
    })
    const priceEl = this.createElement({
      element: 'p',
      content: `$${price[state.period]}${this.period()}`,
      classTag: 'price',
    })
    const offerEl = this.createElement({
      element: 'p',
      content: this.offer,
      classTag: 'offer',
    })
    offerEl.style.display = state.period === 'year' ? 'block' : 'none'

    const planDetails = this.createElement({
      classTag: ['flex-col', 'billing__card-details'],
      children: [titleEl, priceEl, offerEl],
    })

    const plan = this.createElement({
      classTag: ['flex-col', 'billing__card'],
      children: [icon, planDetails],
    })
    if (state.plan.title === title) plan.classList.add('active')
    plan.tabIndex = 0

    return plan
  }
  renderSwitch() {
    const checkboxEl = this.createSwitch()
    checkboxEl.addEventListener('change', (e) => {
      if (e.target instanceof HTMLInputElement)
        state.period = e.target?.checked ? 'year' : 'month'
      this.clearField()
      this.render()
    })
  }
  clearField() {
    this.formField.innerHTML = ''
  }

  createSwitch() {
    const billingMonthEl = this.createElement({
      element: 'p',
      content: 'Monthly',
      classTag: ['billing__period', 'month'],
    })
    const billingYearEl = this.createElement({
      element: 'p',
      content: 'Yearly',
      classTag: ['billing__period', 'year'],
    })

    const checkboxEl = this.createElement({
      element: 'input',
      classTag: 'time',
      type: 'checkbox',
    }) as HTMLInputElement
    checkboxEl.checked = state.period === 'year'

    const sliderEl = this.createElement({ element: 'span', classTag: 'slider' })

    const switchEl = this.createElement({
      element: 'label',
      classTag: 'switch',
      children: [checkboxEl, sliderEl],
    })

    const billingTimeEl = this.createElement({
      classTag: 'billing__time',
      children: [billingMonthEl, switchEl, billingYearEl],
    })
    this.formField.append(billingTimeEl)
    return checkboxEl
  }

  handleError() {
    if (Object.values(state.plan).some((Element) => Element)) return false
    return true
  }
}

export default StepTwo
