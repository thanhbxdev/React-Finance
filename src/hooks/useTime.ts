import { TimeReducer } from '../redux/reducer/time.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducer } from '../redux/reducer';
import { setMonthReducer } from '../redux/reducer/time.reducer';
import { useEffect } from 'react';
import moment from 'moment';

interface UseTime extends TimeReducer {
  setMonth(value: number): void;
}

export default function useTime(): UseTime {
  const { monthSelected } = useSelector((state: AppReducer) => state.time);
  const dispatch = useDispatch();

  const setMonth = (value: number): void => {
    dispatch(setMonthReducer(value));
  };
  useEffect(() => {
    setMonth(Number(moment().format('MM')));
    // eslint-disable-next-line
  }, []);
  return {
    monthSelected,
    setMonth,
  };
}
