import 'react-native-url-polyfill/auto'

import type { ReactElement } from 'react'

import { AuthProvider }      from '@monstrs/react-native-kratos'
import { SdkProvider }       from '@monstrs/react-native-kratos'
import { FrontendApi }       from '@ory/client'
import { Configuration }     from '@ory/client'
import { ThemeProvider }     from '@shopify/restyle'
import { Platform }          from 'react-native'
import React                 from 'react'

import { Navigation }        from './src/navigation.component'
import { ProfileProvider }   from './src/shared'
import { theme }             from './src/ui/theme'

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
          <Navigation />
        </ThemeProvider>
      </ProfileProvider>
    </AuthProvider>
  </SdkProvider>
)
