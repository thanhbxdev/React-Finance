import moment from 'moment';
import { AnyAction } from 'redux';

const TIME_TYPES = {
  SET_TIME: '[Time] set time',
};

export interface TimeReducer {
  monthSelected: number;
}
const initialState: TimeReducer = { monthSelected: Number(moment().format('MM')) };

export const setMonthReducer = (value: number) => ({
  type: TIME_TYPES.SET_TIME,
  payload: value,
});

export default function timeReducer(state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case TIME_TYPES.SET_TIME:
      return {
        ...state,
        monthSelected: payload,
      };
    default:
      return state;
  }
}
