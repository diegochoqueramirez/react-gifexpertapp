import { types } from '../types/types';

export const setError = (payload) => ({
  type: types.uiSetError,
  payload,
});

export const removeError = () => ({
  type: types.uiRemoveError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});
