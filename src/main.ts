import './style.css'
import data from './data'
import StepOne from './stepOne'

type stateType = {
  period: string
  step: number
  plan: {}
  addOns: []
  total: number
  previousStep: number
  maxStep: number
}

export const state: stateType = {
  period: 'month',
  step: 0,
  maxStep: data.length - 1,
  plan: {},
  addOns: [],
  total: 0,
  previousStep: 0,
}

const stepOne = new StepOne(data[0])
