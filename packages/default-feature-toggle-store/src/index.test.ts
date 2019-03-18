import defaultFeatureToggleStore from '.';

describe('Default Feature Toogle Store', () => {
  it('should Features.CONSOLE_LISTENER return false', () => {
    expect(defaultFeatureToggleStore['perry::feature::consolelistener']).toBe(false)
  })

  it('should Features.DOCUMENT_CLICK_LISTENER return false', () => {
    expect(defaultFeatureToggleStore['perry::feature::documentclicklistener']).toBe(false)
  })

  it('should Features.WINDOW_ERROR_LISTENER return false', () => {
    expect(defaultFeatureToggleStore['perry::feature::windowerrorlistener']).toBe(false)
  })
})