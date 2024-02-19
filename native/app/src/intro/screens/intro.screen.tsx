import type { ReactElement } from 'react'

import { useRouter }         from 'expo-router'
import { useEffect }         from 'react'
import React                 from 'react'

import { ProfileGender }     from '../../operations'
import { Box }               from '../../ui/layout'
import { Text }              from '../../ui/text'
import { useProfile }        from '../../shared'

export const IntroScreen = (): ReactElement => {
  const router = useRouter()
  const { profile } = useProfile()

  useEffect(() => {
    if (profile) {
      if (profile.gender !== ProfileGender.Female && profile.gender !== ProfileGender.Male) {
        router.navigate('/(intro)/gender')
      } else if (!profile.name) {
        router.navigate('/(intro)/name')
      } else if (!profile.location) {
        router.navigate('/(intro)/geoposition')
        // eslint-disable-next-line
      } else if (!(profile.photos?.length! > 0)) {
        router.navigate('/(intro)/photo')
      } else {
        router.navigate('/(main)')
      }
    }
  }, [profile, router])

  return (
    <Box>
      <Text>Intro</Text>
    </Box>
  )
}
