export type CreateElementType = {
  element?: string
  children?: Node[] | Node
  classTag?: string[] | string
  content?: string
  type?: string
}

export type PriceType = {
  year: number
  month: number
  [key: string]: any
}

export type PlanType = {
  id: undefined | number
  title: string
  price: PriceType
  [key: string]: any
}

type InfoType = {
  name: string
  email: string
  phone: string
  [key: string]: any
}

export type StateType = {
  period: string
  step: number
  plan: PlanType
  addOns: PlanType[]
  total: number
  maxStep: number
  info: InfoType
}
export type InputType = {
  name: string
  type: string
  placeholder: string
  label: string
}
export type PatterType = {
  name: RegExp
  email: RegExp
  phone: RegExp
  [key: string]: any
}
export type AddonType = {
  title: string
  price: PriceType
  description: string
}

export type PlansType = {
  title: string
  price: PriceType
}

export type StepOneType = {
  heading: string
  text: string
  id: number
  inputs: InputType[]
}
export type StepTwoType = {
  heading: string
  text: string
  plans: PlanType[]
  offer: string
  id: number
}

export type StepThreeType = {
  heading: string
  text: string
  plans: AddonType[]
  id: number
}

export type StepFourType = {
  heading: string
  text: string
  id: number
}
