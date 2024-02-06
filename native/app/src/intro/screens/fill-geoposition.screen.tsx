import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import * as Location               from 'expo-location'
import { useState }                from 'react'
import { useCallback }             from 'react'
import { useEffect }               from 'react'
import React                       from 'react'

import { Button }                  from '../../ui/button'
import { Box }                     from '../../ui/layout'
import { Text }                    from '../../ui/text'
import { useProfile }              from '../../shared'
import operations                  from '../../operations'

export type FillGeopositionScreenProps = StackScreenProps<RootStackParamList, 'FillGeoposition'>

export const FillGeopositionScreen = ({ navigation }: FillGeopositionScreenProps): ReactElement => {
  const { setProfile } = useProfile()
  const [granted, setGranted] = useState<boolean>(false)

  useEffect(() => {
    const requestPermissions = async (): Promise<void> => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      setGranted(status === Location.PermissionStatus.GRANTED)
    }

    requestPermissions()
  }, [])

  useEffect(() => {
    const requestLocation = async (): Promise<void> => {
      const location = await Location.getCurrentPositionAsync()

      const { fillProfileGeoposition } = await operations.fillProfileGeoposition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      if (fillProfileGeoposition.result) {
        setProfile(fillProfileGeoposition.result)

        navigation.navigate('FillPhoto')
      }
    }

    if (granted) {
      requestLocation()
    }
  }, [granted, navigation, setProfile])

  const onRequest = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    setGranted(status === Location.PermissionStatus.GRANTED)
  }, [])

  return (
    <Box p='3x' flex={1}>
      <Box mb='4x' alignItems='center'>
        <Text fontSize={20}>Подтвердите местоположение</Text>
      </Box>
      <Box flex={1} flexBasis={16} />
      <Box>
        <Button
          onPress={() => {
            onRequest()
          }}
        >
          Запросить
        </Button>
      </Box>
    </Box>
  )
}
