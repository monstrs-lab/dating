import 'react-native-gesture-handler'

import type { NavigatorScreenParams } from '@react-navigation/native'
import type { ReactElement }          from 'react'

import { AuthContext }                from '@monstrs/react-native-kratos'
import { NavigationContainer }        from '@react-navigation/native'
import { createBottomTabNavigator }   from '@react-navigation/bottom-tabs'
import { createStackNavigator }       from '@react-navigation/stack'
import { Keyboard }                   from 'react-native'
import { SafeAreaView }               from 'react-native'
import { KeyboardAvoidingView }       from 'react-native'
import { Platform }                   from 'react-native'
import { TouchableWithoutFeedback }   from 'react-native'
import { useContext }                 from 'react'
import React                          from 'react'

import { CallbackScreen }             from './auth/screens'
import { LoginScreen }                from './auth/screens'
import { RegistrationScreen }         from './auth/screens'
import { FillNameScreen }             from './intro/screens'
import { FillPhotoScreen }            from './intro/screens'
import { IntroScreen }                from './intro/screens'
import { FillGenderScreen }           from './intro/screens'
import { FillGeopositionScreen }      from './intro/screens'
import { ProfileScreen }              from './main/screens'
import { MatchesScreen }              from './main/screens'
import { QuestionnairesScreen }       from './main/screens'
import { QuestionnaireScreen }        from './main/screens'

export type TestsStackParamList = {
  Questionnaires: undefined
  Questionnaire: { id: string }
}

export type MainTabsParamList = {
  Matches: undefined
  Profile: undefined
  Tests: NavigatorScreenParams<TestsStackParamList>
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
  FillGender: undefined
  FillName: undefined
  FillPhoto: undefined
  FillGeoposition: undefined
  Main: NavigatorScreenParams<MainTabsParamList>
}

const Tabs = createBottomTabNavigator<MainTabsParamList>()
const Stack = createStackNavigator<RootStackParamList>()
const TestsStack = createStackNavigator<TestsStackParamList>()

export const Tests = (): ReactElement => (
  <TestsStack.Navigator screenOptions={{ headerShown: false }}>
    <TestsStack.Screen name='Questionnaires' component={QuestionnairesScreen} />
    <TestsStack.Screen name='Questionnaire' component={QuestionnaireScreen} />
  </TestsStack.Navigator>
)

export const Main = (): ReactElement => (
  <Tabs.Navigator>
    <Tabs.Screen name='Matches' component={MatchesScreen} />
    <Tabs.Screen name='Profile' component={ProfileScreen} />
    <Tabs.Screen name='Tests' component={Tests} />
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
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 50 : 0 }}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: isAuthenticated,
              }}
            >
              {isAuthenticated ? (
                <>
                  <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Intro' component={IntroScreen} />
                    <Stack.Screen name='FillGender' component={FillGenderScreen} />
                    <Stack.Screen name='FillName' component={FillNameScreen} />
                    <Stack.Screen name='FillPhoto' component={FillPhotoScreen} />
                    <Stack.Screen name='FillGeoposition' component={FillGeopositionScreen} />
                  </Stack.Group>
                  <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name='Main'
                      component={Main}
                      initialParams={{}}
                      options={{ headerShown: false }}
                    />
                  </Stack.Group>
                </>
              ) : (
                <Stack.Group>
                  <Stack.Screen name='Login' component={LoginScreen} initialParams={{}} />
                  <Stack.Screen name='Registration' component={RegistrationScreen} />
                  <Stack.Screen name='Callback' component={CallbackScreen} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
