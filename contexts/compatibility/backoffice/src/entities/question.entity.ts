import { ApiProperty } from '@nestjs/swagger'

export class QuestionEntity {
  @ApiProperty({
    description: 'The id of the question',
    type: 'string',
    format: 'uuid',
  })
  id!: string

  @ApiProperty({
    description: 'The content of the question',
    type: 'string',
  })
  content!: string
}
