import type { VariantProps }      from '@shopify/restyle'
import type { TextProps }         from 'react-native'

import type { Theme }             from '../theme'

import { createRestyleComponent } from '@shopify/restyle'
import { createVariant }          from '@shopify/restyle'
import { Text }                   from 'react-native'

export type ButtonTextProps = Omit<TextProps, 'disabled'> &
  VariantProps<Theme, 'buttonTextDisabled', 'disabled'> &
  VariantProps<Theme, 'buttonTextSize', 'size'> &
  VariantProps<Theme, 'buttonTextVariant'>

export const ButtonText = createRestyleComponent<ButtonTextProps, Theme>(
  [
    createVariant({
      themeKey: 'buttonTextVariant',
    }),
    createVariant({
      themeKey: 'buttonTextSize',
      property: 'size',
    }),
    createVariant({
      themeKey: 'buttonTextDisabled',
      property: 'disabled',
    }),
  ],
  Text
)
