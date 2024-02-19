import type { ReactElement } from 'react'

import { useRouter }         from 'expo-router'
import { useState }          from 'react'
import { useCallback }       from 'react'
import React                 from 'react'

import { Button }            from '../../ui/button'
import { Input }             from '../../ui/input'
import { Box }               from '../../ui/layout'
import { Text }              from '../../ui/text'
import { useProfile }        from '../../shared'
import operations            from '../../operations'

export const FillNameScreen = (): ReactElement => {
  const router = useRouter()
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

        router.navigate('/(intro)/geoposition')
      }
    } finally {
      setInProgress(false)
    }
  }, [name, router, setInProgress, setProfile])

  return (
    <Box p='3x' flex={1} justifyContent='center'>
      <Box mb='4x' alignItems='center'>
        <Text fontSize={20}>Выберите имя</Text>
      </Box>
      <Box>
        <Input value={name} onChangeText={setName} />
      </Box>
      {!!nameValidationError && (
        <Box mt='1x' mb='2x'>
          <Text>{nameValidationError}</Text>
        </Box>
      )}
      <Box mt='5x'>
        <Button
          disabled={inProgress}
          onPress={() => {
            onFillName()
          }}
        >
          Выбрать
        </Button>
      </Box>
    </Box>
  )
}
