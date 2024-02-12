import { ApiProperty }        from '@nestjs/swagger'
import { getSchemaPath }      from '@nestjs/swagger'

import { QuestionaireStatus } from '@compatibility/client-module'

import { QuestionEntity }     from './question.entity.js'

export class QuestionaireEntity {
  @ApiProperty({
    description: 'The id of the questionaire',
    type: 'string',
    format: 'uuid',
  })
  id!: string

  @ApiProperty({
    description: 'The status of the questionaire',
    enum: QuestionaireStatus,
  })
  status!: QuestionaireStatus

  @ApiProperty({
    description: 'The name of the questionaire',
    type: 'string',
  })
  name!: string

  @ApiProperty({
    description: 'The questions of the questionaire',
    type: 'array',
    items: {
      $ref: getSchemaPath(QuestionEntity),
    },
  })
  questionaires!: Array<QuestionEntity>

  @ApiProperty({
    description: 'The creation date of the profile',
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date
}
