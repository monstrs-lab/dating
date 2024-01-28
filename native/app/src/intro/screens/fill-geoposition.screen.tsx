import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import * as Location               from 'expo-location'
import { Pressable }               from 'react-native'
import { View }                    from 'react-native'
import { Text }                    from 'react-native'
import { useState }                from 'react'
import { useCallback }             from 'react'
import { useEffect }               from 'react'
import React                       from 'react'

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

        // @ts-expect-error
        navigation.navigate('Main')
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
    <View>
      <View>
        <Text style={{ paddingTop: 40, paddingBottom: 16 }}>Подтвердите местоположение</Text>
      </View>
      <View style={{ paddingTop: 16 }}>
        <Pressable
          onPress={() => {
            onRequest()
          }}
        >
          <Text>Запросить</Text>
        </Pressable>
      </View>
    </View>
  )
}
