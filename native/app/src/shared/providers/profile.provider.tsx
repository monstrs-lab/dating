import type { ReactNode }     from 'react'
import type { ReactElement }  from 'react'

import type { ProfileGender } from '../../operations'

import { AuthContext }        from '@monstrs/react-native-kratos'
import { createContext }      from 'react'
import { useState }           from 'react'
import { useEffect }          from 'react'
import { useContext }         from 'react'
import React                  from 'react'

import operations             from '../../operations'

export const PROFILE_STORAGE_KEY = 'profile'

export interface ProfileGeoposition {
  latitude: number
  longitude: number
}

export interface Profile {
  id: string
  gender?: ProfileGender
  name?: string
  location?: string
  geoposition?: ProfileGeoposition
}

export const ProfileContext = createContext<{
  profile?: Profile
  setProfile: (profile: Profile) => void
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProfile: () => {},
})

interface ProfileProviderProps {
  children: ReactNode
}

export const ProfileProvider = ({ children }: ProfileProviderProps): ReactElement => {
  const { isAuthenticated } = useContext(AuthContext)
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  useEffect(() => {
    const loadProfile = async (): Promise<void> => {
      const { my } = await operations.myProfile()

      setProfile(my.profile.info)
    }

    if (isAuthenticated) {
      loadProfile()
    }
  }, [isAuthenticated])

  return (
    <ProfileContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        profile,
        setProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
