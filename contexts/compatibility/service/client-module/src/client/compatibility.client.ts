/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { ListQuestionairesRequest }  from '@compatibility/compatibility-rpc'
import type { ListSurveysRequest }        from '@compatibility/compatibility-rpc'
import type { ListQuestionairesResponse } from '@compatibility/compatibility-rpc'
import type { ListSurveysResponse }       from '@compatibility/compatibility-rpc'
import type { CompatibilityService }      from '@compatibility/compatibility-rpc'
import type { Questionaire }              from '@compatibility/compatibility-rpc'
import type { Survey }                    from '@compatibility/compatibility-rpc'
import type { PartialMessage }            from '@compatibility/compatibility-rpc'
import type { PromiseClient }             from '@connectrpc/connect'

import { Inject }                         from '@nestjs/common'
import { Injectable }                     from '@nestjs/common'

import { COMPATIBILITY_CLIENT_TOKEN }     from '../constants/index.js'
import { QuestionairesDataLoader }        from '../dataloaders/index.js'
import { SurveysDataLoader }              from '../dataloaders/index.js'

@Injectable()
export class CompatibilityClient {
  constructor(
    @Inject(COMPATIBILITY_CLIENT_TOKEN)
    protected readonly client: PromiseClient<typeof CompatibilityService>,
    private readonly questionaireDataLoader: QuestionairesDataLoader,
    private readonly surveysDataLoader: SurveysDataLoader
  ) {}

  async createQuestionaire(name: string): Promise<{ result?: Questionaire }> {
    return this.client.createQuestionaire({
      name,
    })
  }

  async activateQuestionaire(questionaireId: string): Promise<{ result?: Questionaire }> {
    return this.client.activateQuestionaire({
      questionaireId,
    })
  }

  async deactivateQuestionaire(questionaireId: string): Promise<{ result?: Questionaire }> {
    return this.client.deactivateQuestionaire({
      questionaireId,
    })
  }

  async changeQuestionaireName(
    questionaireId: string,
    name: string
  ): Promise<{ result?: Questionaire }> {
    return this.client.changeQuestionaireName({
      questionaireId,
      name,
    })
  }

  async changeQuestionairePhoto(
    questionaireId: string,
    photoId: string
  ): Promise<{ result?: Questionaire }> {
    return this.client.changeQuestionairePhoto({
      questionaireId,
      photoId,
    })
  }

  async addQuestionaireQuestion(
    questionaireId: string,
    content: string
  ): Promise<{ result?: Questionaire }> {
    return this.client.addQuestionaireQuestion({
      questionaireId,
      content,
    })
  }

  async changeQuestionaireQuestion(
    questionaireId: string,
    questionId: string,
    content: string
  ): Promise<{ result?: Questionaire }> {
    return this.client.changeQuestionaireQuestion({
      questionaireId,
      questionId,
      content,
    })
  }

  async deleteQuestionaireQuestion(
    questionaireId: string,
    questionId: string
  ): Promise<{ result?: Questionaire }> {
    return this.client.deleteQuestionaireQuestion({
      questionaireId,
      questionId,
    })
  }

  async listQuestionaires(
    request: PartialMessage<ListQuestionairesRequest> = {}
  ): Promise<ListQuestionairesResponse> {
    return this.client.listQuestionaires(request)
  }

  async loadQuestionaire(questionaireId: string): Promise<Questionaire> {
    return this.questionaireDataLoader.load(questionaireId)
  }

  async loadProfiles(questionaireIds: Array<string>): Promise<Array<Error | Questionaire>> {
    return this.questionaireDataLoader.loadMany(questionaireIds)
  }

  async startSurvey(intervieweeId: string, questionaireId: string): Promise<{ result?: Survey }> {
    return this.client.startSurvey({
      intervieweeId,
      questionaireId,
    })
  }

  async addSurveyAnswer(
    surveyId: string,
    questionId: string,
    answer: number
  ): Promise<{ result?: Survey }> {
    return this.client.addSurveyAnswer({
      surveyId,
      questionId,
      answer,
    })
  }

  async listSurveys(
    request: PartialMessage<ListSurveysRequest> = {}
  ): Promise<ListSurveysResponse> {
    return this.client.listSurveys(request)
  }

  async loadSurvey(surveyId: string): Promise<Survey> {
    return this.surveysDataLoader.load(surveyId)
  }

  async loadSurveys(surveyIds: Array<string>): Promise<Array<Error | Survey>> {
    return this.surveysDataLoader.loadMany(surveyIds)
  }
}
