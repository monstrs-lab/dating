import { ApiProperty } from '@nestjs/swagger'
import { IsString }    from 'class-validator'

export class ChangeQuestionareQuestionRequest {
  @IsString()
  @ApiProperty()
  content!: string
}
