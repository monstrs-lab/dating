import { Field }     from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class AddSurveyAnswerInput {
  @Field()
  surveyId!: string

  @Field()
  questionId!: string

  @Field()
  answer!: number
}
