import getContrastRatio from 'get-contrast-ratio';

import themes from '../../styles/themes';

import {getContrastColorProps} from './types';

const getContrastColor = ({
  backgroundColor,
  firstOptionColor = themes.colors.textColor2,
  secondOptionColor = themes.colors.background,
}: getContrastColorProps) => {
  const firstColorContrast = getContrastRatio(
    backgroundColor,
    firstOptionColor,
  );
  const secondColorContrast = getContrastRatio(
    backgroundColor,
    secondOptionColor,
  );

  return firstColorContrast >= secondColorContrast
    ? firstOptionColor
    : secondColorContrast;
};

export default getContrastColor;
