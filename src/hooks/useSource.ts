import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { AppReducer } from '../redux/reducer';
import { loadSourceCurrenciesReducer, SourceReducer } from '../redux/reducer/source.reducer';
import AuthService from '../services/auth.service';

interface UserSource extends SourceReducer {
  loadSources(): void;
}

export default function useSource(): UserSource {
  const { sources } = useSelector((state: AppReducer) => state.source);
  const dispatch = useDispatch();
  const loadSources = useCallback(() => {
    AuthService.getCurrencies().then(res => {
      dispatch(loadSourceCurrenciesReducer(res || []));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadSources();
    // eslint-disable-next-line
  }, []);
  return { sources, loadSources };
}
