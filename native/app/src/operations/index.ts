import AsyncStore        from '@react-native-async-storage/async-storage'
import * as SecureStore  from 'expo-secure-store'
import { GraphQLClient } from 'graphql-request'
import { Platform }      from 'react-native'

import { getSdk }        from './sdk'

const getToken = async (): Promise<string | undefined> => {
  const session =
    Platform.OS !== 'web'
      ? await SecureStore.getItemAsync('user_session')
      : await AsyncStore.getItem('user_session')

  if (session) {
    try {
      const { sessionToken }: { sessionToken: string } = JSON.parse(session)

      return sessionToken
    } catch {
      return undefined
    }
  }

  return undefined
}

const client = new GraphQLClient('http://localhost:4455', {
  credentials: 'include',
  requestMiddleware: async (request): Promise<any> => {
    const token = await getToken()

    return {
      ...request,
      headers: { ...request.headers, Authorization: `Bearer ${token}` },
    }
  },
})

export default getSdk(client)

export * from './sdk'
