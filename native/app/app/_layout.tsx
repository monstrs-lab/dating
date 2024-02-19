import type { ReactElement }        from 'react'

import { AuthProvider }             from '@monstrs/react-native-kratos'
import { SdkProvider }              from '@monstrs/react-native-kratos'
import { FrontendApi }              from '@ory/client'
import { Configuration }            from '@ory/client'
import { ThemeProvider }            from '@shopify/restyle'
import { Slot }                     from 'expo-router'
import { Platform }                 from 'react-native'
import { Keyboard }                 from 'react-native'
import { SafeAreaView }             from 'react-native'
import { KeyboardAvoidingView }     from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import React                        from 'react'

import { ProfileProvider }          from '../src/shared'
import { theme }                    from '../src/ui/theme'

export default (): ReactElement => (
  <SdkProvider
    value={
      new FrontendApi(
        new Configuration({
          basePath: Platform.OS === 'android' ? 'http://10.0.2.2:4433' : 'http://127.0.0.1:4433',
          baseOptions: {
            withCredentials: false,
            timeout: 10000,
          },
        })
      )
    }
  >
    <AuthProvider>
      <ProfileProvider>
        <ThemeProvider theme={theme}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 50 : 0 }}>
                <Slot />
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ThemeProvider>
      </ProfileProvider>
    </AuthProvider>
  </SdkProvider>
)
