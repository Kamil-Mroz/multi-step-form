import Form from './Form'
import createElement from './createElement'
import { state } from './main'
type InputType = {
  name: string
  type: string
  placeholder: string
  label: string
  pattern: string
}
type StepOneType = {
  heading: string
  text: string
  id: number
  inputs: InputType[]
}
type PatterType = {
  name: string
  email: string
  phone: string
}

class StepOne extends Form {
  id: number
  inputs: InputType[]
  formField: HTMLFieldSetElement
  pattern: PatterType
  constructor({ heading, text, id, inputs }: StepOneType) {
    super(heading, text)
    console.log('stepOne')
    this.id = id
    this.inputs = inputs
    this.formField = createElement(
      'fieldset',
      '',
      'form-field',
      'flex-col'
    ) as HTMLFieldSetElement

    this.pattern = {
      name: `${/^([a-zA-Z]+ )+[A-Z-a-z]+$/}`,
      email: `${/^\S+@\S+\.\S+$/}`,
      phone: `${/^\+\d{1}\s\d{3}\s\d{3}\s\d{3}$/}`,
    }

    this.render()
  }

  render() {
    this.clear()
    this.renderHeading(this.formField, this.heading, this.text)
    this.formField.append()
    this.renderButtons(this.handleError)
    this.renderInputs()
  }

  renderInputs() {
    this.inputs.forEach((input) => {
      this.formField.append(this.createInput(input))
    })
  }

  createInput({ name, type, placeholder, label }: InputType) {
    const labelEl = createElement('label', label, 'label') as HTMLLabelElement
    labelEl.htmlFor = name

    const inputEl = createElement('input', '', 'input') as HTMLInputElement
    inputEl.type = type
    inputEl.placeholder = placeholder
    inputEl.pattern = this.pattern[name]
    inputEl.id = name
    inputEl.value = state.info[name]
    inputEl.addEventListener('change', (e) => {
      state.info[name] = e?.target.value || ''
    })

    const errorEl = createElement('p', 'This field is required', 'error')
    errorEl.dataset.error = name

    const inputGroup = createElement('div', '', 'input-group')

    inputGroup.append(...[labelEl, errorEl, inputEl])
    return inputGroup
  }
  handleError() {
    let errors = { name: false, email: false, phone: false }
    for (const [key, value] of Object.entries(state.info)) {
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
