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
import SwitchSelector              from 'react-native-switch-selector'

import { ProfileGender }           from '../../operations'
import { useProfile }              from '../../shared'
import operations                  from '../../operations'

export type SelectGenderScreenProps = StackScreenProps<RootStackParamList, 'SelectGender'>

export const SelectGenderScreen = ({ navigation }: SelectGenderScreenProps): ReactElement => {
  const { setProfile } = useProfile()
  const [gender, setGender] = useState<ProfileGender>(ProfileGender.Male)
  const [inProgress, setInProgress] = useState<boolean>(false)

  const onSelect = useCallback(async () => {
    setInProgress(true)

    try {
      const { selectProfileGender } = await operations.selectProfileGender({ gender })

      if (selectProfileGender.result) {
        setProfile(selectProfileGender.result)

        navigation.navigate('ChangeName')
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
        <SwitchSelector
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
            onSelect()
          }}
        >
          <Text>Выбрать</Text>
        </Pressable>
      </View>
    </View>
  )
}
