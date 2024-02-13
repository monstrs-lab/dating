import { registerEnumType } from '@nestjs/graphql'

import { SurveyStatus }     from '@compatibility/client-module'

registerEnumType(SurveyStatus, {
  name: 'SurveyStatus',
})

export { SurveyStatus }
