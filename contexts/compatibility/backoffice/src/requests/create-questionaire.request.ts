import { ApiProperty } from '@nestjs/swagger'
import { IsString }    from 'class-validator'

export class CreateQuestionaireRequest {
  @IsString()
  @ApiProperty()
  name!: string
}
