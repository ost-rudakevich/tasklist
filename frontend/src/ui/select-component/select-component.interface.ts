import type { Options } from 'react-select'
import type { ControllerRenderProps } from 'react-hook-form'
import { IField } from '../field/field.interface'

export interface IOption {
  label: string
  value: number | string
}

export interface ISelect
  extends Omit<IField, 'iconSide' | 'Icon' | 'handleSearch'> {
  options: Options<IOption>
  isMulti?: boolean
  field: ControllerRenderProps<any, any>
  isLoading?: boolean
}
