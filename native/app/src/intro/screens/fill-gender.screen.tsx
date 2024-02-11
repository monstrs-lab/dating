import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { useState }                from 'react'
import { useCallback }             from 'react'
import React                       from 'react'
// @ts-expect-error
import SwitchFillor                from 'react-native-switch-selector'

import { ProfileGender }           from '../../operations'
import { Button }                  from '../../ui/button'
import { Box }                     from '../../ui/layout'
import { Text }                    from '../../ui/text'
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
    <Box p='3x' flex={1} justifyContent='center'>
      <Box mb='4x' alignItems='center'>
        <Text fontSize={20}>Выберите пол</Text>
      </Box>
      <Box>
        <SwitchFillor
          initial={0}
          accessibilityLabel='gender-switch-selector'
          options={[
            { label: 'Мужчина', value: ProfileGender.Male },
            { label: 'Женщина', value: ProfileGender.Female },
          ]}
          onPress={setGender}
        />
      </Box>
      <Box flexBasis={16} />
      <Box>
        <Button
          disabled={inProgress}
          onPress={() => {
            onFill()
          }}
        >
          Выбрать
        </Button>
      </Box>
    </Box>
  )
}
