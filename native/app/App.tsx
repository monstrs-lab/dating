import type { ReactElement } from 'react'

import { AuthProvider }      from '@monstrs/react-native-kratos'
import { SdkProvider }       from '@monstrs/react-native-kratos'
import { FrontendApi }       from '@ory/client'
import { Configuration }     from '@ory/client'
import React                 from 'react'

import { Navigation }        from './src/navigation.component'

export default (): ReactElement => (
  <SdkProvider
    value={
      new FrontendApi(
        new Configuration({
          basePath: 'http://localhost:4433',
          baseOptions: {
            withCredentials: false,
            timeout: 10000,
          },
        })
      )
    }
  >
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  </SdkProvider>
)
