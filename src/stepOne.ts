import Form from './Form'
import createElement from './createElement'

type StepOneType = {
  heading: string
  text: string
  name: string
  email: string
  phone: string
}

class StepOne extends Form {
  name: string
  email: string
  phone: string
  formField: HTMLFieldSetElement
  constructor({ heading, text, name, email, phone }: StepOneType) {
    super(heading, text)
    this.name = name
    this.email = email
    this.phone = phone
    this.formField = createElement('fieldset', '', 'form-field', 'flex-col')
    this.render()
  }

  render() {
    this.clear()
    this.renderHeading(this.formField, this.heading, this.text)
    this.formField.append(
      ...[
        this.createInput({ placeholder: 'enter your name', name: 'Name' }),
        this.createInput({
          type: 'email',
          placeholder: 'enter your email',
          name: 'Email',
        }),
        this.createInput({
          type: 'number',
          placeholder: 'enter your phone number',
          name: 'Phone',
        }),
      ]
    )
    this.renderButtons()
  }
  createInput({ type = 'text', placeholder = '', name = '' }) {
    const label = createElement('label', name, 'label') as HTMLLabelElement
    label.htmlFor = name

    const input = createElement('input', '', 'input') as HTMLInputElement
    input.type = type
    input.placeholder = placeholder
    input.id = name

    const inputGroup = createElement('div', '', 'input-group')

    inputGroup.append(...[label, input])
    return inputGroup
  }
}

export default StepOne
