import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class StartSurveyInput {
  @Field()
  questionaireId!: string
}
