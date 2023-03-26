import './style.css'
import StepOne from './stepOne'
import { dataOne } from './data'

type stateType = {
  period: string
  step: number
  plan: {}
  addOns: []
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
  step: 0,
  maxStep: 3,
  plan: {},
  addOns: [],
  total: 0,
  previousStep: 0,
  info: {
    name: '',
    email: '',
    phone: '',
  },
}

const stepOne = new StepOne(dataOne)
