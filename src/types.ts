interface KeyString {
  [key: string]: any
}

export interface CreateElementType {
  element?: string
  children?: Node[] | Node
  classTag?: string[] | string
  content?: string
  type?: string
}

export interface PriceType extends KeyString {
  year: number
  month: number
}

export interface PlanType extends KeyString {
  id: undefined | number
  title: string
  price: PriceType
}

interface InfoType extends KeyString {
  name: string
  email: string
  phone: string
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
export interface PatterType extends KeyString {
  name: RegExp
  email: RegExp
  phone: RegExp
}

export interface PlansType {
  title: string
  price: PriceType
}

export interface AddonType extends PlansType {
  description: string
}

export interface BaseClass {
  heading: string
  text: string
  id: number
}

export interface StepOneType extends BaseClass {
  inputs: InputType[]
}
export interface StepTwoType extends BaseClass {
  plans: PlanType[]
  offer: string
}

export interface StepThreeType extends BaseClass {
  plans: AddonType[]
}
