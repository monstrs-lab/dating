import { shadows } from '../shadows'

export const buttonVariants = {
  buttonVariant: {
    primary: {
      backgroundColor: 'primary',
      ...shadows.black,
    },
  },
  buttonSize: {
    small: {
      height: 34,
      borderRadius: '3',
      px: '2x',
    },
    normal: {
      height: 48,
      borderRadius: '6',
      px: '3x',
    },
    large: {
      height: 56,
      borderRadius: '6',
      px: '4x',
    },
  },
  buttonPressed: {
    primary: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'lightSteelGray2',
    },
  },
  buttonDisabled: {
    primary: {
      backgroundColor: 'mystic',
    },
  },
  buttonTextVariant: {
    primary: {
      color: 'white',
    },
  },
  buttonTextSize: {
    defaults: {
      fontWeight: '500',
    },
    small: {
      fontSize: 14,
    },
    normal: {
      fontSize: 16,
    },
    large: {
      fontSize: 16,
    },
  },
  buttonTextDisabled: {
    primary: {
      color: 'lightSteelGray',
    },
  },
}
