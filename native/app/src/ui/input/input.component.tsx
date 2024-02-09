import type { FC }             from 'react'
import type { ReactNode }      from 'react'
import type { TextInputProps } from 'react-native'

import type { Theme }          from '../theme'

import { useState }            from 'react'
import React                   from 'react'

import { AttachmentInput }     from './attachment.component'
import { RootInput }           from './root.component'
import { TextInput }           from './text-input.component'
import { colors }              from '../theme'

interface InputProps extends TextInputProps {
  variant?: Exclude<keyof Theme['inputVariant'], 'defaults'>
  size?: Exclude<keyof Theme['inputSize'], 'defaults'>
  prefix?: ReactNode
  suffix?: ReactNode
  disabled?: boolean
}

export const Input: FC<InputProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  disabled,
  prefix,
  suffix,
  ...props
}) => {
  const [focused, setFocused] = useState<boolean>(false)

  return (
    <RootInput>
      {!!prefix && <AttachmentInput variant='prefix'>{prefix}</AttachmentInput>}
      <TextInput
        variant={variant}
        size={size}
        focused={(focused && !disabled && variant) || undefined}
        disabled={(disabled && variant) || undefined}
        editable={!disabled}
        placeholderTextColor={colors.shipCove}
        onFocus={(): void => {
          setFocused(true)
        }}
        onBlur={(): void => {
          setFocused(false)
        }}
        {...props}
      />
      {!!suffix && <AttachmentInput variant='suffix'>{suffix}</AttachmentInput>}
    </RootInput>
  )
}
