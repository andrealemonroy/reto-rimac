import React from 'react';

import RouteNavigator from './routes';
jest.mock('./App', () => {
  return function MockApp() {
    return <div data-testid="app-page">App Page</div>;
  };
});

jest.mock('./pages/plans', () => {
  return function MockPlans() {
    return <div data-testid="plans-page">Plans Page</div>;
  };
});

jest.mock('./pages/summary', () => {
  return function MockSummary() {
    return <div data-testid="summary-page">Summary Page</div>;
  };
});

describe('RouteNavigator', () => {
  it('should have RouteNavigator component', () => {
    expect(RouteNavigator).toBeDefined();
  });
});
