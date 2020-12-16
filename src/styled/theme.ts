const breakpoints = (
  <T extends Record<string, unknown>>(config: T): number[] & T => (
    Object.assign(Object.values(config) as number[], config)
  )
)({
  /* eslint-disable sort-keys -- configuration map */
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  hd: 1400,
  /* eslint-enable sort-keys -- configuration map */
});

export const theme = {
  breakpoints,
};
