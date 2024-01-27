import 'react-native-gesture-handler'

import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ReactElement }          from 'react'

import { AuthContext }                from '@monstrs/react-native-kratos'
import { NavigationContainer }        from '@react-navigation/native'
import { createBottomTabNavigator }   from '@react-navigation/bottom-tabs'
import { createStackNavigator }       from '@react-navigation/stack'
import { Keyboard }                   from 'react-native'
import { KeyboardAvoidingView }       from 'react-native'
import { Platform }                   from 'react-native'
import { TouchableWithoutFeedback }   from 'react-native'
import { useContext }                 from 'react'
import React                          from 'react'

import { CallbackScreen }             from './auth/screens'
import { LoginScreen }                from './auth/screens'
import { RegistrationScreen }         from './auth/screens'
import { ChangeNameScreen }           from './intro/screens'
import { IntroScreen }                from './intro/screens'
import { SelectGenderScreen }         from './intro/screens'
import { ProfileScreen }              from './main/screens'

export type MainTabsParamList = {
  Profile: undefined
}

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
  Intro: undefined
  SelectGender: undefined
  ChangeName: undefined
  Main: NavigatorScreenParams<MainTabsParamList>
}

const Tabs = createBottomTabNavigator<MainTabsParamList>()
const Stack = createStackNavigator<RootStackParamList>()

export const Main = (): ReactElement => (
  <Tabs.Navigator>
    <Tabs.Screen name='Profile' component={ProfileScreen} />
  </Tabs.Navigator>
)

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
            {isAuthenticated ? (
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Intro' component={IntroScreen} />
                <Stack.Screen name='SelectGender' component={SelectGenderScreen} />
                <Stack.Screen name='ChangeName' component={ChangeNameScreen} />
                <Stack.Screen
                  name='Main'
                  component={Main}
                  initialParams={{}}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name='Login' component={LoginScreen} initialParams={{}} />
                <Stack.Screen name='Registration' component={RegistrationScreen} />
                <Stack.Screen name='Callback' component={CallbackScreen} />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
