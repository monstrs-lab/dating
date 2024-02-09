import type { VariantProps }                            from '@shopify/restyle'
import type { FC }                                      from 'react'
import type { TextInputProps as DefaultTextInputProps } from 'react-native'

import type { Theme }                                   from '../theme'

import { createRestyleComponent }                       from '@shopify/restyle'
import { createVariant }                                from '@shopify/restyle'
import { TextInput as DefaultTextInput }                from 'react-native'
import { useContext }                                   from 'react'
import React                                            from 'react'

import { RootContext }                                  from './root.component'

export type TextInputProps = DefaultTextInputProps &
  VariantProps<Theme, 'inputDisabled', 'disabled'> &
  VariantProps<Theme, 'inputFocused', 'focused'> &
  VariantProps<Theme, 'inputSize', 'size'> &
  VariantProps<Theme, 'inputVariant'>

export const RestyleTextInput = createRestyleComponent<TextInputProps, Theme>(
  [
    createVariant({
      themeKey: 'inputVariant',
    }),
    createVariant({
      themeKey: 'inputSize',
      property: 'size',
    }),
    createVariant({
      themeKey: 'inputFocused',
      property: 'focused',
    }),
    createVariant({
      themeKey: 'inputDisabled',
      property: 'disabled',
    }),
  ],
  DefaultTextInput
)

export const TextInput: FC<TextInputProps> = ({ style = {}, ...props }) => {
  const { prefixOffset, suffixOffset } = useContext(RootContext)

  return (
    <RestyleTextInput
      style={{
        paddingLeft: prefixOffset || undefined,
        paddingRight: suffixOffset || undefined,
      }}
      {...props}
    />
  )
}
