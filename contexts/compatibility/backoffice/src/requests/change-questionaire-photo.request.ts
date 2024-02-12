import { ApiProperty } from '@nestjs/swagger'
import { IsUUID }      from 'class-validator'

export class ChangeQuestionairePhotoRequest {
  @IsUUID(4)
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  photoId!: string
}
