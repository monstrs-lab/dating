import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { Pressable }               from 'react-native'
import { View }                    from 'react-native'
import { Text }                    from 'react-native'
import { useState }                from 'react'
import { useCallback }             from 'react'
import React                       from 'react'
// @ts-expect-error
import SwitchFillor                from 'react-native-switch-selector'

import { ProfileGender }           from '../../operations'
import { useProfile }              from '../../shared'
import operations                  from '../../operations'

export type FillGenderScreenProps = StackScreenProps<RootStackParamList, 'FillGender'>

export const FillGenderScreen = ({ navigation }: FillGenderScreenProps): ReactElement => {
  const { setProfile } = useProfile()
  const [gender, setGender] = useState<ProfileGender>(ProfileGender.Male)
  const [inProgress, setInProgress] = useState<boolean>(false)

  const onFill = useCallback(async () => {
    setInProgress(true)

    try {
      const { fillProfileGender } = await operations.fillProfileGender({ gender })

      if (fillProfileGender.result) {
        setProfile(fillProfileGender.result)

        navigation.navigate('FillName')
      }
    } finally {
      setInProgress(false)
    }
  }, [gender, navigation, setInProgress, setProfile])

  return (
    <View>
      <View>
        <Text style={{ paddingTop: 40, paddingBottom: 16 }}>Выберите пол</Text>
      </View>
      <View>
        <SwitchFillor
          initial={0}
          accessibilityLabel='gender-switch-selector'
          options={[
            { label: 'Мужчина', value: ProfileGender.Male },
            { label: 'Женщина', value: ProfileGender.Female },
          ]}
          onPress={setGender}
        />
      </View>
      <View style={{ paddingTop: 16 }}>
        <Pressable
          disabled={inProgress}
          onPress={() => {
            onFill()
          }}
        >
          <Text>Выбрать</Text>
        </Pressable>
      </View>
    </View>
  )
}
