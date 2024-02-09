import type { VariantProps }      from '@shopify/restyle'
import type { FC }                from 'react'
import type { LayoutChangeEvent } from 'react-native'
import type { ViewProps }         from 'react-native'

import type { Theme }             from '../theme'

import { createRestyleComponent } from '@shopify/restyle'
import { createVariant }          from '@shopify/restyle'
import { View }                   from 'react-native'
import { useContext }             from 'react'
import { useCallback }            from 'react'
import React                      from 'react'

import { RootContext }            from './root.component'

export type AttachmentInputProps = VariantProps<Theme, 'inputAttachmentVariant'> & ViewProps

export const RestyleAttachmentInput = createRestyleComponent<AttachmentInputProps, Theme>(
  [
    createVariant({
      themeKey: 'inputAttachmentVariant',
    }),
  ],
  View
)

export const AttachmentInput: FC<AttachmentInputProps> = ({ children, variant, ...props }) => {
  const context = useContext(RootContext)

  const onLayout = useCallback(
    (ev: LayoutChangeEvent) => {
      if (variant && context) {
        if (variant === 'prefix') {
          context?.setPrefixOffset?.(ev.nativeEvent.layout.width)
        } else {
          context?.setSuffixOffset?.(ev.nativeEvent.layout.width)
        }
      }
    },
    [context, variant]
  )

  if (!children) return null

  return (
    <RestyleAttachmentInput variant={variant} onLayout={onLayout} {...props}>
      {children}
    </RestyleAttachmentInput>
  )
}
