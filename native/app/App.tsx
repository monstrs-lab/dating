import 'react-native-url-polyfill/auto'

import type { ReactElement } from 'react'

import { AuthProvider }      from '@monstrs/react-native-kratos'
import { SdkProvider }       from '@monstrs/react-native-kratos'
import { FrontendApi }       from '@ory/client'
import { Configuration }     from '@ory/client'
import React                 from 'react'

import { Navigation }        from './src/navigation.component'
import { ProfileProvider }   from './src/shared'

export default (): ReactElement => (
  <SdkProvider
    value={
      new FrontendApi(
        new Configuration({
          basePath: 'http://192.168.0.101:4433',
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
        <Navigation />
      </ProfileProvider>
    </AuthProvider>
  </SdkProvider>
)
