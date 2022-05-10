import { StreamReducer, loadStreamsReducer } from '../redux/reducer/stream.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppReducer } from '../redux/reducer';
import { useCallback, useEffect } from 'react';
import StreamService from '../services/stream.service';

interface UseStream extends StreamReducer {
  loadStreams(): void;
}

export default function useStream(): UseStream {
  const { streams, incomes, expenses } = useSelector((state: AppReducer) => state.stream);
  const { monthSelected } = useSelector((state: AppReducer) => state.time);
  const dispatch = useDispatch();
  const loadStreams = useCallback(() => {
    StreamService.all(monthSelected).then(res => {
      dispatch(loadStreamsReducer(res || []));
    });
    // eslint-disable-next-line
  }, [monthSelected]);
  useEffect(() => {
    loadStreams();
    // eslint-disable-next-line
  }, []);
  return { streams, incomes, expenses, loadStreams };
}
