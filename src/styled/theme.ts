type Breakpoints = Array & {
  sm: number;
};

const breakpoints: Breakpoints = [0, 576, 768, 992, 1200, 1400];

breakpoints['sm'] = breakpoints[1];
breakpoints['md'] = breakpoints[2];
breakpoints['lg'] = breakpoints[3];
breakpoints['xl'] = breakpoints[4];
breakpoints['hd'] = breakpoints[5];

export const theme = {
  breakpoints,
};
