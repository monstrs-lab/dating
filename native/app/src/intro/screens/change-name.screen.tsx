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

export type ChangeNameScreenProps = StackScreenProps<RootStackParamList, 'ChangeName'>

export const ChangeNameScreen = ({ navigation }: ChangeNameScreenProps): ReactElement => {
  const [name, setName] = useState<string>('')
  const [nameValidationError, setNameValidationError] = useState<string | undefined>(undefined)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const { setProfile } = useProfile()

  const onChangeName = useCallback(async () => {
    setInProgress(true)

    try {
      const { changeProfileName } = await operations.changeProfileName({ name })

      if (changeProfileName.errors?.name) {
        setNameValidationError(changeProfileName.errors.name.message)
      } else if (changeProfileName.result) {
        setProfile(changeProfileName.result)

        navigation.navigate({ key: 'Main' })
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
            onChangeName()
          }}
        >
          <Text>Выбрать</Text>
        </Pressable>
      </View>
    </View>
  )
}
