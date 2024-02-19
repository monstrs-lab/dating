import type { ReactNode }      from 'react'
import type { PressableProps } from 'react-native'
import type { View }           from 'react-native'

import type { Theme }          from '../theme'

import { useState }            from 'react'
import { forwardRef }          from 'react'
import React                   from 'react'

import { ButtonPressable }     from './button-pressable.component'
import { ButtonText }          from './button-text.component'

interface ButtonProps extends PressableProps {
  variant?: Exclude<keyof Theme['buttonVariant'], 'defaults'>
  size?: Exclude<keyof Theme['buttonSize'], 'defaults'>
  children: ReactNode
}

export const Button = forwardRef<View, ButtonProps>((
  { children, variant = 'primary', size = 'normal', disabled, ...props },
  ref
) => {
  const [pressed, setPressed] = useState<boolean>(false)
  return (
    <ButtonPressable
      ref={ref}
      variant={variant}
      size={size}
      pressed={(pressed && !disabled && variant) || undefined}
      disabled={(disabled && variant) || undefined}
      onPressIn={(): void => {
        setPressed(true)
      }}
      onPressOut={(): void => {
        setPressed(false)
      }}
      {...props}
    >
      <ButtonText variant={variant} size={size} disabled={(disabled && variant) || undefined}>
        {children}
      </ButtonText>
    </ButtonPressable>
  )
})
