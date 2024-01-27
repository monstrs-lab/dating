import { registerEnumType } from '@nestjs/graphql'

import { ProfileGender }    from '@profiles/client-module'

registerEnumType(ProfileGender, {
  name: 'ProfileGender',
})

export { ProfileGender }
