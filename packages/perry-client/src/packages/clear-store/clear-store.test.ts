import clearStore from './';

describe('Clear Store', () => {
  it('should clear localStorage', () => {
    expect(clearStore()).toBeUndefined();
  });
});
