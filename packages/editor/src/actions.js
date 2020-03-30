import { createAction } from '@reduxjs/toolkit';

export * from './slices/actions';
export * from './thunks';

export const init = createAction('init');
