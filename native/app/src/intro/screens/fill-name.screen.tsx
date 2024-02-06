import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { TextInput }               from 'react-native'
import { useState }                from 'react'
import { useCallback }             from 'react'
import React                       from 'react'

import { Button }                  from '../../ui/button'
import { Box }                     from '../../ui/layout'
import { Text }                    from '../../ui/text'
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
    <Box p='3x' flex={1}>
      <Box mb='4x' alignItems='center'>
        <Text fontSize={20}>Выберите имя</Text>
      </Box>
      <Box>
        <TextInput value={name} onChangeText={setName} />
      </Box>
      <Box style={{ minHeight: 40 }}>
        {!!nameValidationError && <Text>{nameValidationError}</Text>}
      </Box>
      <Box flex={1} flexBasis={16} />
      <Box>
        <Button
          disabled={inProgress}
          onPress={() => {
            onFillName()
          }}
        >
          <Text>Выбрать</Text>
        </Button>
      </Box>
    </Box>
  )
}
