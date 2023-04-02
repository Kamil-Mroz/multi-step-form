import Form from './Form'
import Arcade from './assets/images/icon-arcade.svg'
import Pro from './assets/images/icon-pro.svg'
import Advanced from './assets/images/icon-advanced.svg'
import { PlanType, StepTwoType } from './types'

class StepTwo extends Form {
  plans: PlanType[]
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
    this.handleError = this.handleError.bind(this)
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

    this.plans.forEach((plan) => {
      console.log(plan)
      const planEl = this.createPlans(plan)
      planEl.addEventListener('click', () => {
        this.statePlan = plan
        document
          .querySelectorAll('.billing__card')
          .forEach((plan) => plan.classList.remove('active'))
        planEl.classList.add('active')
      })
      plansContainer.append(planEl)
    })

    this.formField.append(plansContainer)
  }

  createPlans({ title, price }: PlanType) {
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
      content: `$${price[this.statePeriod]}${this.periodString()}`,
      classTag: 'price',
    })
    const offerEl = this.createElement({
      element: 'p',
      content: this.offer,
      classTag: 'offer',
    })
    offerEl.style.display = this.statePeriod === 'year' ? 'block' : 'none'

    const planDetails = this.createElement({
      classTag: ['flex-col', 'billing__card-details'],
      children: [titleEl, priceEl, offerEl],
    })

    const plan = this.createElement({
      classTag: ['flex-col', 'billing__card'],
      children: [icon, planDetails],
    })
    if (this.statePlan.title === title) plan.classList.add('active')
    plan.tabIndex = 0

    return plan
  }
  renderSwitch() {
    const checkboxEl = this.createSwitch()
    checkboxEl.addEventListener('change', (e) => {
      if (e.target instanceof HTMLInputElement)
        this.statePeriod = e.target?.checked ? 'year' : 'month'
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
    checkboxEl.checked = this.statePeriod === 'year'

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
    console.log(this.statePlan)
    if (this.statePlan.id) return false
    return true
  }
}

export default StepTwo
