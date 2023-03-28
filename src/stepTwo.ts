import Form from './Form'
import createElement from './createElement'
import Arcade from './assets/images/icon-arcade.svg'
import Pro from './assets/images/icon-pro.svg'
import Advanced from './assets/images/icon-advanced.svg'
import { state } from './main'
type PlansType = {
  title: string
  price: {
    year: number
    month: number
  }
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
  icons: {}
  id: number
  constructor({ heading, text, plans, offer, id }: StepTwoType) {
    super(heading, text)
    this.offer = offer
    this.plans = plans
    this.id = id
    this.icons = { Arcade, Pro, Advanced }
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
    this.renderPlans()
    this.renderSwitch()
    this.renderButtons(this.handleError)
  }

  renderPlans() {
    const plansContainer = createElement('div', '', 'billing__plan')

    this.plans.forEach((plan, index) => {
      const planEl = this.createPlans(plan)
      planEl.addEventListener('click', () => {
        state.plan.id = index
        state.plan.price = plan.price[state.period]
        state.plan.title = plan.title
        state.plan.period = state.period
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
    const plan = createElement('div', '', 'flex-col', 'billing__card')
    if (state.plan.title === title) plan.classList.add('active')
    plan.tabIndex = 0
    const icon = createElement('img', '', 'billing__icon') as HTMLImageElement

    icon.src = this.icons[title]
    icon.alt = title

    const planDetails = createElement(
      'div',
      '',
      'flex-col',
      'billing__card-details'
    )

    const titleEl = createElement('h2', title, 'title')
    const priceEl = createElement(
      'p',
      `$${state.period === 'month' ? price.month + '/mo' : price.year + '/yr'}`,
      'price'
    )
    const offerEl = createElement('p', this.offer, 'offer')
    offerEl.style.display = state.period === 'year' ? 'block' : 'none'

    planDetails.append(...[titleEl, priceEl, offerEl])
    plan.append(...[icon, planDetails])

    return plan
  }
  renderSwitch() {
    const checkboxEl = this.createSwitch()
    checkboxEl.addEventListener('change', (e) => {
      state.period = e.target?.checked ? 'year' : 'month'
      this.clearField()
      this.render()
    })
  }
  clearField() {
    this.formField.innerHTML = ''
  }

  createSwitch() {
    const billingTimeEl = createElement('div', '', 'billing__time')
    const billingMonthEl = createElement(
      'p',
      'Monthly',
      'billing__period',
      'month'
    )
    const billingYearEl = createElement(
      'p',
      'Yearly',
      'billing__period',
      'year'
    )
    const switchEl = createElement('label', '', 'switch')

    const checkboxEl = createElement('input', '', 'time') as HTMLInputElement
    checkboxEl.type = 'checkbox'
    checkboxEl.checked = state.period === 'year'

    const sliderEl = createElement('span', '', 'slider')

    switchEl.append(...[checkboxEl, sliderEl])

    billingTimeEl.append(...[billingMonthEl, switchEl, billingYearEl])
    this.formField.append(billingTimeEl)
    return checkboxEl
  }

  handleError() {
    if (Object.values(state.plan).some((Element) => Element)) return false
    return true
  }
}

export default StepTwo