import { ApiProperty }        from '@nestjs/swagger'
import { getSchemaPath }      from '@nestjs/swagger'

import { QuestionaireEntity } from '../entities/index.js'

export class ListQuestionairesResponse {
  @ApiProperty({
    description: 'List questionaires items',
    type: 'array',
    items: {
      $ref: getSchemaPath(QuestionaireEntity),
    },
  })
  questionaires!: Array<QuestionaireEntity>

  @ApiProperty({
    description: 'Next page indicator',
    type: 'boolean',
  })
  hasNextPage!: boolean
}
