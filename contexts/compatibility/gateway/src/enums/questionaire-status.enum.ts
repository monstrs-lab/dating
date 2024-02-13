import { registerEnumType }   from '@nestjs/graphql'

import { QuestionaireStatus } from '@compatibility/client-module'

registerEnumType(QuestionaireStatus, {
  name: 'QuestionaireStatus',
})

export { QuestionaireStatus }
