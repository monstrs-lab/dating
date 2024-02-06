import type { VariantProps }      from '@shopify/restyle'
import type { PressableProps }    from 'react-native'

import type { Theme }             from '../theme'

import { createRestyleComponent } from '@shopify/restyle'
import { createVariant }          from '@shopify/restyle'
import { Pressable }              from 'react-native'

export type ButtonPressableProps = Omit<PressableProps, 'disabled'> &
  VariantProps<Theme, 'buttonDisabled', 'disabled'> &
  VariantProps<Theme, 'buttonPressed', 'pressed'> &
  VariantProps<Theme, 'buttonSize', 'size'> &
  VariantProps<Theme, 'buttonVariant'>

export const ButtonPressable = createRestyleComponent<ButtonPressableProps, Theme>(
  [
    createVariant({
      themeKey: 'buttonVariant',
      defaults: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),
    createVariant({
      themeKey: 'buttonSize',
      property: 'size',
    }),
    createVariant({
      themeKey: 'buttonPressed',
      property: 'pressed',
    }),
    createVariant({
      themeKey: 'buttonDisabled',
      property: 'disabled',
    }),
  ],
  Pressable
)
