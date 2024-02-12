import { ApiProperty } from '@nestjs/swagger'
import { IsString }    from 'class-validator'

export class ChangeQuestionaireNameRequest {
  @IsString()
  @ApiProperty()
  name!: string
}
