import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { Pressable }               from 'react-native'
import { View }                    from 'react-native'
import { TextInput }               from 'react-native'
import { Text }                    from 'react-native'
import { useState }                from 'react'
import { useCallback }             from 'react'
import React                       from 'react'

import { useProfile }              from '../../shared'
import operations                  from '../../operations'

export type FillNameScreenProps = StackScreenProps<RootStackParamList, 'FillName'>

export const FillNameScreen = ({ navigation }: FillNameScreenProps): ReactElement => {
  const [name, setName] = useState<string>('')
  const [nameValidationError, setNameValidationError] = useState<string | undefined>(undefined)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const { setProfile } = useProfile()

  const onFillName = useCallback(async () => {
    setInProgress(true)

    try {
      const { fillProfileName } = await operations.fillProfileName({ name })

      if (fillProfileName.errors?.name) {
        setNameValidationError(fillProfileName.errors.name.message)
      } else if (fillProfileName.result) {
        setProfile(fillProfileName.result)

        navigation.navigate('FillGeoposition')
      }
    } finally {
      setInProgress(false)
    }
  }, [name, navigation, setInProgress, setProfile])

  return (
    <View>
      <View>
        <Text style={{ paddingTop: 40, paddingBottom: 16 }}>Выберите имя</Text>
      </View>
      <View>
        <TextInput value={name} onChangeText={setName} />
      </View>
      <View style={{ minHeight: 40 }}>
        {!!nameValidationError && <Text>{nameValidationError}</Text>}
      </View>
      <View>
        <Pressable
          disabled={inProgress}
          onPress={() => {
            onFillName()
          }}
        >
          <Text>Выбрать</Text>
        </Pressable>
      </View>
    </View>
  )
}
