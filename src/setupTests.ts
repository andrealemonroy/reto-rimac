import '@testing-library/jest-dom';

import { configure } from '@testing-library/react';
import { act } from 'react';

configure({
  asyncWrapper: async (cb) => {
    let result;
    await act(async () => {
      result = await cb();
    });
    return result;
  },
});

const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.('React Router Future Flag Warning')) {
    return;
  }
  originalConsoleWarn(...args);
};
