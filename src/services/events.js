export const riseAuthError = (error) =>
  window.dispatchEvent(new CustomEvent('error', { detail: error }))
