export type ValidatorNameType = 'required';

export type ValidatorConfigElementType = RegExp | ValidatorNameType;

export interface ValidatorsTypeConfig {
  none: Array<ValidatorConfigElementType>;
  email: Array<ValidatorConfigElementType>;
}

export const VALIDATORS_TYPE_CONFIG: ValidatorsTypeConfig = {
  none: [],
  email: [
    'required',
    /^[0-9a-z_.-]+@[0-9a-z.-]+\.[a-z]{2,3}$/i
  ]
};
