import { Stream } from '../../commons/interface/schemas/Stream';
import { AnyAction } from 'redux';

const STREAM_TYPES = {
  LOAD: '[Stream] load',
};

export interface StreamReducer {
  streams: Stream[];
  incomes: Stream[];
  expenses: Stream[];
}

const initialState: StreamReducer = {
  streams: [],
  incomes: [],
  expenses: [],
};

export const loadStreamsReducer = (streams: Stream[]) => ({
  type: STREAM_TYPES.LOAD,
  payload: streams,
});

export default function streamReducer(state = initialState, action: AnyAction) {
  const { type, payload } = action;

  switch (type) {
    case STREAM_TYPES.LOAD: {
      const incomes = payload.filter((i: Stream) => i.type === 'INCOME');
      const expenses = payload.filter((i: Stream) => i.type === 'EXPENSE');
      return {
        streams: payload,
        incomes,
        expenses,
      };
    }
    default:
      return state;
  }
}
