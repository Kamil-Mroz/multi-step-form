import './style.css'
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import { dataFour, dataOne, dataThree, dataTwo } from './data'
import StepThree from './StepThree'
import StepFour from './StepFour'

type planType = {
  id: undefined | number
  title: string
  price: { year: number; month: number }
}

type stateType = {
  period: string
  step: number
  plan: planType
  addOns: planType[]
  total: number
  previousStep: number
  maxStep: number
  info: {
    name: string
    email: string
    phone: string
  }
}

export const state: stateType = {
  period: 'month',
  step: 3,
  maxStep: 3,
  plan: {
    id: undefined,
    title: '',
    period: '',
    price: 0,
  },
  addOns: [],
  total: 0,
  previousStep: 0,
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
