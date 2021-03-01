import { css } from '@emotion/core';
import { bgColor } from '../../../styles/colors';
import { jioTypeMedium, fontSize20 } from '../../../styles/typography';
import { dFlex } from '../../../styles/flexbox';

export const baseContainer = css`
  z-index: 2;
  background: ${bgColor};
  position: fixed;
  bottom: 0;
  width: 100%;
  // max-height: 100%;
  overflow: hidden;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
`;

const drawerHeights = {
  quarter: '40%',
  half: '50%',
  full: '75%'
};

const appearTransition = css`
 transition: all .5s ease-in-out;
transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
`;

export const show = {
  sm: css`
    max-height: ${drawerHeights.quarter};
    ${appearTransition}
    ${baseContainer}
  `,
  md: css`
    max-height: ${drawerHeights.half};
    ${appearTransition}
    ${baseContainer}
  `,
  lg: css`
    max-height: ${drawerHeights.full};
    ${appearTransition}
    ${baseContainer}
  `
};

export const hide = css`
  transition: all .2s ease-in;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  max-height: 0px;  
  ${baseContainer}
`;

export const drawerHead = css`  
  ${dFlex}
  width: 100%;
  flex-flow: row;
  justify-content: space-between;
  padding: 16px;
`;

export const titleStyle = css`
  ${fontSize20};
  ${jioTypeMedium};  
  `;

export const drawerContent = css`  
  width: 100%;
`;
