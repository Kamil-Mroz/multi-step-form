import './style.css'

const form = document.querySelector('.form') as HTMLFormElement
const btnBack = document.querySelector('.btn--back') as HTMLButtonElement
const btnNext = document.querySelector('.btn--next') as HTMLButtonElement
const btnConfirm = document.querySelector('.btn--confirm') as HTMLButtonElement
const formFields = document.querySelectorAll('.form-field')

const thankYouEl = document.querySelector('.thank-you')

type stateType = {
  period: string
  step: number
  plan: {}
  addOns: []
  total: number
  previousStep: number
}

const state: stateType = {
  period: 'month',
  step: 0,
  plan: {},
  addOns: [],
  total: 0,
  previousStep: 0,
}

const changeStep = (step: number) => {
  if (state.step + step >= 0 && state.step + step <= formFields.length - 1) {
    state.previousStep = state.step
    state.step += step
    currentStep()
  }
}

const currentStep = () => {
  formFields[state.previousStep].style.display = 'none'
  formFields[state.step].style.display = 'flex'

  if (state.step === 0) {
    btnBack.style.display = 'none'
  } else {
    btnBack.style.display = 'block'
  }
  if (state.step === formFields.length - 1) {
    btnNext.style.display = 'none'
    btnConfirm.style.display = 'block'
  } else {
    btnNext.style.display = 'block'
    btnConfirm.style.display = 'none'
  }
}
const onSubmit = (e: SubmitEvent) => {
  e.preventDefault()

  form.style.display = 'none'
  thankYouEl.style.display = 'flex'
}

const init = () => {
  currentStep()
  btnBack?.addEventListener('click', () => changeStep(-1))
  btnNext?.addEventListener('click', () => changeStep(1))
  form.addEventListener('submit', onSubmit)
}
init()
