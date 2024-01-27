import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { View }                    from 'react-native'
import { Text }                    from 'react-native'
import { useEffect }               from 'react'
import React                       from 'react'

import { ProfileGender }           from '../../operations'
import { useProfile }              from '../../shared'

export type IntroScreenProps = StackScreenProps<RootStackParamList, 'Intro'>

export const IntroScreen = ({ navigation }: IntroScreenProps): ReactElement => {
  const { profile } = useProfile()

  useEffect(() => {
    if (profile) {
      if (profile.gender !== ProfileGender.Female && profile.gender !== ProfileGender.Male) {
        navigation.navigate('SelectGender')
      } else if (!profile.name) {
        navigation.navigate('ChangeName')
      } else {
        navigation.navigate({ key: 'Main' })
      }
    }
  }, [profile, navigation])

  return (
    <View>
      <Text>Intro</Text>
    </View>
  )
}
