import Form from './Form'
import { InputType, PatterType, StepOneType } from './types'

class StepOne extends Form {
  id: number
  inputs: InputType[]
  formField: HTMLFieldSetElement
  pattern: PatterType
  constructor({ heading, text, id, inputs }: StepOneType) {
    super(heading, text)
    this.id = id
    this.inputs = inputs
    this.formField = this.createElement({
      element: 'fieldset',
      classTag: ['form-field', 'flex-col'],
    }) as HTMLFieldSetElement

    this.pattern = {
      name: `${/^([a-zA-Z]+ )+[A-Z-a-z]+$/}`,
      email: `${/^\S+@\S+\.\S+$/}`,
      phone: `${/^\+\d{1}\s\d{3}\s\d{3}\s\d{3}$/}`,
    }
    this.handleError = this.handleError.bind(this)
    this.setCurrentStep(id)
    this.render()
  }

  render() {
    this.clear()
    this.renderHeading(this.formField, this.heading, this.text)

    this.renderInputs()
    this.renderButtons(this.handleError)
  }

  renderInputs() {
    this.inputs.forEach((input) => {
      this.formField.append(this.createInput(input))
    })
  }

  createInput({ name, type, placeholder, label }: InputType) {
    const labelEl = this.createElement({
      element: 'label',
      content: label,
      classTag: 'label',
    }) as HTMLLabelElement
    labelEl.htmlFor = name

    const inputEl = this.createElement({
      element: 'input',
      classTag: 'input',
      type: type,
    }) as HTMLInputElement
    inputEl.placeholder = placeholder
    inputEl.pattern = this.pattern[name]
    inputEl.id = name
    inputEl.value = this.stateInfo[name]
    inputEl.addEventListener('change', (e) => {
      if (e.target instanceof HTMLInputElement)
        this.stateInfo[name] = e?.target.value || ''
    })

    const errorEl = this.createElement({
      element: 'p',
      content: 'This field is required',
      classTag: 'error',
    })
    errorEl.dataset.error = name

    const inputGroup = this.createElement({ classTag: 'input-group' })

    inputGroup.append(...[labelEl, errorEl, inputEl])
    return inputGroup
  }
  handleError() {
    let errors: { [key: string]: any } = {
      name: false,
      email: false,
      phone: false,
    }
    for (const [key, value] of Object.entries(this.stateInfo)) {
      if (!value) {
        errors[key] = true
        const errorEl = document.querySelector(
          `[data-error=${key}]`
        ) as HTMLParagraphElement
        errorEl?.classList.add('active')
      }
    }
    for (const [key, value] of Object.entries(errors)) {
      if (!value)
        document
          .querySelector(`[data-error=${key}]`)
          ?.classList.remove('active')
    }
    if (Object.values(errors).some((err) => err === true)) return true
    else {
      return false
    }
  }
}

export default StepOne
