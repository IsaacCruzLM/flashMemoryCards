import getContrastRatio from 'get-contrast-ratio';

import themes from '../../styles/themes';

const getContrastColor = (
  backgroundColor: string,
  firstOptionColor: string = themes.colors.textColor2,
  secondOptionColor: string = themes.colors.background,
) => {
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
    : secondOptionColor;
};

export default getContrastColor;
