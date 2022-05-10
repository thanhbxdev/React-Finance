import { SourceCurrency } from '../../commons/interface/schemas/Account';
import { AnyAction } from 'redux';

const SOURCE_TYPES = {
  LOAD: '[Source currency] load',
};

export interface SourceReducer {
  sources: SourceCurrency[];
}

const initialState: SourceReducer = {
  sources: [],
};

export const loadSourceCurrenciesReducer = (currencies: SourceCurrency[]) => ({
  type: SOURCE_TYPES.LOAD,
  payload: currencies,
});

export default function sourceReducer(state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case SOURCE_TYPES.LOAD:
      return {
        ...state,
        sources: payload,
      };

    default:
      return state;
  }
}
