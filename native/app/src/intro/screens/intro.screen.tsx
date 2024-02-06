import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { useEffect }               from 'react'
import React                       from 'react'

import { ProfileGender }           from '../../operations'
import { Box }                     from '../../ui/layout'
import { Text }                    from '../../ui/text'
import { useProfile }              from '../../shared'

export type IntroScreenProps = StackScreenProps<RootStackParamList, 'Intro'>

export const IntroScreen = ({ navigation }: IntroScreenProps): ReactElement => {
  const { profile } = useProfile()

  useEffect(() => {
    if (profile) {
      if (profile.gender !== ProfileGender.Female && profile.gender !== ProfileGender.Male) {
        navigation.navigate('FillGender')
      } else if (!profile.name) {
        navigation.navigate('FillName')
      } else if (!profile.location) {
        navigation.navigate('FillGeoposition')
        // eslint-disable-next-line
      } else if (!(profile.photos?.length! > 0)) {
        navigation.navigate('FillPhoto')
      } else {
        // @ts-expect-error
        navigation.navigate('Main')
      }
    }
  }, [profile, navigation])

  return (
    <Box>
      <Text>Intro</Text>
    </Box>
  )
}
