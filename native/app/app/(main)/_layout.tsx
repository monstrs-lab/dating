import type { ReactElement } from 'react'

import { AuthContext }       from '@monstrs/react-native-kratos'
import { Tabs }              from 'expo-router'
import { Redirect }          from 'expo-router'
import { useRouter }         from 'expo-router'
import { useContext }        from 'react'
import { useEffect }         from 'react'
import React                 from 'react'

import { useProfile }        from '../../src/shared'

export default (): ReactElement => {
  const { isAuthenticated } = useContext(AuthContext)
  const { profile } = useProfile()
  const router = useRouter()

  useEffect(() => {
    if (profile) {
      if (!profile.gender || !profile.name || !profile.location || !profile.photos?.length) {
        router.navigate('/(intro)')
      }
    }
  }, [profile, router])

  if (!isAuthenticated) {
    return <Redirect href='/(auth)' />
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='tests/[id]'
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          href: '/(main)',
          title: 'Matches',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          href: '/profile',
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name='tests/index'
        options={{
          href: '/tests',
          title: 'Tests',
        }}
      />
    </Tabs>
  )
}
