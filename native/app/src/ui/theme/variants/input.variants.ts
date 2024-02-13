import { shadows } from '../shadows'

export const inputVariants = {
  inputVariant: {
    primary: {
      backgroundColor: 'white',
      color: 'steelGray',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'mystic',
      ...shadows.black2,
    },
  },
  inputSize: {
    normal: {
      height: 48,
      borderRadius: '6',
      px: '4x',
      fontSize: 16,
      fontWeight: '400',
    },
  },
  inputFocused: {
    primary: {
      borderColor: 'cerulean',
    },
  },
  inputDisabled: {
    primary: {
      backgroundColor: 'pattensBlue',
      borderColor: 'mystic',
      color: 'lightSteelGray',
    },
  },
  inputAttachmentVariant: {
    defaults: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    prefix: {
      left: 0,
      zIndex: '1z',
      paddingRight: '2x',
      paddingLeft: '3x',
    },
    suffix: {
      right: 0,
      zIndex: '1z',
      paddingRight: '3x',
      paddingLeft: '2x',
    },
  },
}
