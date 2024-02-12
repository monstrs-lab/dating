import { ApiProperty }        from '@nestjs/swagger'

import { QuestionaireStatus } from '@compatibility/client-module'

export class QuestionaireEntity {
  @ApiProperty({
    description: 'The id of the questionaire',
    type: 'string',
    format: 'uuid',
  })
  id!: string

  @ApiProperty({
    description: 'The status of the questionaire',
    type: 'number',
  })
  status!: QuestionaireStatus

  @ApiProperty({
    description: 'The creation date of the profile',
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date
}
