import './style.css'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import { dataFour, dataOne, dataThree, dataTwo } from './data'
import StepThree from './StepThree'
import StepFour from './StepFour'
import { StateType } from './types'

export const state: StateType = {
  period: 'month',
  step: 3,
  maxStep: 3,
  plan: {
    id: undefined,
    title: '',
    price: { year: 0, month: 0 },
  },
  addOns: [],
  total: 0,
  info: {
    name: '',
    email: '',
    phone: '',
  },
}

export const changeStep = () => {
  switch (state.step) {
    case 0:
      new StepOne(dataOne)
      break
    case 1:
      new StepTwo(dataTwo)
      break
    case 2:
      new StepThree(dataThree)
      break
    case 3:
      new StepFour(dataFour)
      break
  }
}

const init = () => {
  changeStep()
}
init()
