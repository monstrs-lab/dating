import type { ReactNode } from 'react'
import type { FC }        from 'react'

import { View }           from 'react-native'
import { createContext }  from 'react'
import { useState }       from 'react'
import { useMemo }        from 'react'
import React              from 'react'

export interface ContextRoot {
  prefixOffset?: number
  suffixOffset?: number
  setPrefixOffset?: (value: number) => void
  setSuffixOffset?: (value: number) => void
}

export const RootContext = createContext<ContextRoot>({})

export interface RootInputProps {
  children: ReactNode
}

export const RootInput: FC<RootInputProps> = ({ children }) => {
  const [prefixOffset, setPrefixOffset] = useState<number>(0)
  const [suffixOffset, setSuffixOffset] = useState<number>(0)
  const value = useMemo(
    () => ({
      prefixOffset,
      suffixOffset,
      setPrefixOffset,
      setSuffixOffset,
    }),
    [prefixOffset, suffixOffset, setPrefixOffset, setSuffixOffset]
  )

  return (
    <RootContext.Provider value={value}>
      <View style={{ position: 'relative' }}>{children}</View>
    </RootContext.Provider>
  )
}
