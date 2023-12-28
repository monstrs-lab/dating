import 'react-native-gesture-handler'

import type { ReactElement }        from 'react'

import { AuthContext }              from '@monstrs/react-native-kratos'
import { NavigationContainer }      from '@react-navigation/native'
import { createStackNavigator }     from '@react-navigation/stack'
import { Keyboard }                 from 'react-native'
import { KeyboardAvoidingView }     from 'react-native'
import { Platform }                 from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { useContext }               from 'react'
import React                        from 'react'

import { LoginScreen }              from './auth/screens'
import { RegistrationScreen }       from './auth/screens'

const Stack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
  Registration: undefined
  Login:
    | {
        refresh?: boolean
        aal?: 'aal2'
      }
    | undefined
  Callback: {
    code?: string
  }
}

export const Navigation = (): ReactElement => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: isAuthenticated,
            }}
          >
            <Stack.Screen name='Login' component={LoginScreen} initialParams={{}} />
            <Stack.Screen name='Registration' component={RegistrationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
