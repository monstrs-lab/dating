import type { ReactElement } from 'react'

import * as Device           from 'expo-device'
import * as Location         from 'expo-location'
import { Platform }          from 'react-native'
import { useRouter }         from 'expo-router'
import { useState }          from 'react'
import { useCallback }       from 'react'
import { useEffect }         from 'react'
import React                 from 'react'

import { Button }            from '../../ui/button'
import { Box }               from '../../ui/layout'
import { Text }              from '../../ui/text'
import { useProfile }        from '../../shared'
import operations            from '../../operations'

export const FillGeopositionScreen = (): ReactElement => {
  const router = useRouter()
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
      const location =
        !Device.isDevice && Platform.OS === 'android'
          ? {
              coords: {
                latitude: 55.751244,
                longitude: 37.618423,
              },
            }
          : await Location.getCurrentPositionAsync()

      const { fillProfileGeoposition } = await operations.fillProfileGeoposition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })

      if (fillProfileGeoposition.result) {
        setProfile(fillProfileGeoposition.result)

        router.navigate('/(intro)/photo')
      }
    }

    if (granted) {
      requestLocation()
    }
  }, [granted, router, setProfile])

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
