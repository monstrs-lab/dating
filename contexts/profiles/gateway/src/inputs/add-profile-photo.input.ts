import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class AddProfilePhotoInput {
  @Field()
  photoId!: string
}
