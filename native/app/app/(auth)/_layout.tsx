import type { ReactElement } from 'react'

import { AuthContext }       from '@monstrs/react-native-kratos'
import { Stack }             from 'expo-router'
import { Redirect }          from 'expo-router'
import { useContext }        from 'react'
import React                 from 'react'

export default (): ReactElement => {
  const { isAuthenticated } = useContext(AuthContext)

  if (isAuthenticated) {
    return <Redirect href='/(main)' />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
