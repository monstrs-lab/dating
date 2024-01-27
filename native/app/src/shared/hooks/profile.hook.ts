import type { Profile }   from '../providers'

import { useContext }     from 'react'

import { ProfileContext } from '../providers'

export const useProfile = (): {
  profile?: Profile
  setProfile: (profile: Profile) => void
} => useContext(ProfileContext)
