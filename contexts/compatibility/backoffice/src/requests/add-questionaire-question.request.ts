import { ApiProperty } from '@nestjs/swagger'
import { IsString }    from 'class-validator'

export class AddQuestionareQuestionRequest {
  @IsString()
  @ApiProperty()
  content!: string
}
