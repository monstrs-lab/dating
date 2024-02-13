import type { Questionaire }   from '@compatibility/client-module'

import { ResolveField }        from '@nestjs/graphql'
import { Resolver }            from '@nestjs/graphql'
import { Context }             from '@nestjs/graphql'

import { QuestionaireStatus }  from '@compatibility/client-module'
import { CompatibilityClient } from '@compatibility/client-module'

import { MyCompatibility }     from '../types/index.js'

@Resolver(() => MyCompatibility)
export class MyCompatibilityResolver {
  constructor(private readonly compatibilityClient: CompatibilityClient) {}

  @ResolveField()
  async questionaires(
    @Context('user') intervieweeId: string
  ): Promise<Array<Partial<Questionaire>>> {
    const [{ questionaires }, { surveys }] = await Promise.all([
      this.compatibilityClient.listQuestionaires({
        query: {
          status: {
            conditions: {
              eq: {
                value: QuestionaireStatus.ACTIVE,
              },
            },
          },
        },
      }),
      this.compatibilityClient.listSurveys({
        query: {
          intervieweeId: {
            conditions: {
              eq: {
                value: intervieweeId,
              },
            },
          },
        },
      }),
    ])

    return questionaires.map((questionaire) => ({
      ...questionaire,
      survey: surveys.find((survey) => survey.questionaireId === questionaire.id),
    }))
  }
}
