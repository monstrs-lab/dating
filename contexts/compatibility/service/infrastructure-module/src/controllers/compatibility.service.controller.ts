/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { FindQuestionairesByQueryResult }     from '@compatibility/application-module'
import type { FindSurveysByQueryResult }           from '@compatibility/application-module'
import type { ListQuestionairesRequest }           from '@compatibility/compatibility-rpc/interfaces'
import type { ListSurveysRequest }                 from '@compatibility/compatibility-rpc/interfaces'
import type { CreateQuestionaireRequest }          from '@compatibility/compatibility-rpc/interfaces'
import type { ChangeQuestionaireNameRequest }      from '@compatibility/compatibility-rpc/interfaces'
import type { ChangeQuestionairePhotoRequest }     from '@compatibility/compatibility-rpc/interfaces'
import type { ActivateQuestionaireRequest }        from '@compatibility/compatibility-rpc/interfaces'
import type { DeactivateQuestionaireRequest }      from '@compatibility/compatibility-rpc/interfaces'
import type { AddQuestionaireQuestionRequest }     from '@compatibility/compatibility-rpc/interfaces'
import type { ChangeQuestionaireQuestionRequest }  from '@compatibility/compatibility-rpc/interfaces'
import type { DeleteQuestionaireQuestionRequest }  from '@compatibility/compatibility-rpc/interfaces'
import type { ListQuestionairesResponse }          from '@compatibility/compatibility-rpc/interfaces'
import type { ListSurveysResponse }                from '@compatibility/compatibility-rpc/interfaces'
import type { CreateQuestionaireResponse }         from '@compatibility/compatibility-rpc/interfaces'
import type { ChangeQuestionaireNameResponse }     from '@compatibility/compatibility-rpc/interfaces'
import type { ChangeQuestionairePhotoResponse }    from '@compatibility/compatibility-rpc/interfaces'
import type { ActivateQuestionaireResponse }       from '@compatibility/compatibility-rpc/interfaces'
import type { DeactivateQuestionaireResponse }     from '@compatibility/compatibility-rpc/interfaces'
import type { AddQuestionaireQuestionResponse }    from '@compatibility/compatibility-rpc/interfaces'
import type { ChangeQuestionaireQuestionResponse } from '@compatibility/compatibility-rpc/interfaces'
import type { DeleteQuestionaireQuestionResponse } from '@compatibility/compatibility-rpc/interfaces'
import type { StartSurveyRequest }                 from '@compatibility/compatibility-rpc/interfaces'
import type { StartSurveyResponse }                from '@compatibility/compatibility-rpc/interfaces'
import type { AddSurveyAnswerRequest }             from '@compatibility/compatibility-rpc/interfaces'
import type { AddSurveyAnswerResponse }            from '@compatibility/compatibility-rpc/interfaces'
import type { Questionaire }                       from '@compatibility/domain-module'
import type { Survey }                             from '@compatibility/domain-module'
import type { ServiceImpl }                        from '@connectrpc/connect'

import { ConnectRpcMethod }                        from '@monstrs/nestjs-connectrpc'
import { ConnectRpcService }                       from '@monstrs/nestjs-connectrpc'
import { ConnectRpcExceptionsFilter }              from '@monstrs/nestjs-connectrpc-errors'
import { Validator }                               from '@monstrs/nestjs-validation'
import { UseFilters }                              from '@nestjs/common'
import { Controller }                              from '@nestjs/common'
import { QueryBus }                                from '@nestjs/cqrs'
import { CommandBus }                              from '@nestjs/cqrs'
import { v4 as uuid }                              from 'uuid'

import { GetQuestionairesQuery }                   from '@compatibility/application-module'
import { GetSurveysQuery }                         from '@compatibility/application-module'
import { GetQuestionaireByIdQuery }                from '@compatibility/application-module'
import { GetSurveyByIdQuery }                      from '@compatibility/application-module'
import { StartSurveyCommand }                      from '@compatibility/application-module'
import { AddSurveyAnswerCommand }                  from '@compatibility/application-module'
import { CreateQuestionaireCommand }               from '@compatibility/application-module'
import { ChangeQuestionaireNameCommand }           from '@compatibility/application-module'
import { ChangeQuestionairePhotoCommand }          from '@compatibility/application-module'
import { ActivateQuestionaireCommand }             from '@compatibility/application-module'
import { DeactivateQuestionaireCommand }           from '@compatibility/application-module'
import { ChangeQuestionaireQuestionCommand }       from '@compatibility/application-module'
import { AddQuestionaireQuestionCommand }          from '@compatibility/application-module'
import { DeleteQuestionaireQuestionCommand }       from '@compatibility/application-module'
import { CompatibilityService }                    from '@compatibility/compatibility-rpc/connect'

import { ActivateQuestionairePayload }             from '../payloads/index.js'
import { AddQuestionaireQuestionPayload }          from '../payloads/index.js'
import { AddSurveyAnswerPayload }                  from '../payloads/index.js'
import { ChangeQuestionaireNamePayload }           from '../payloads/index.js'
import { ChangeQuestionairePhotoPayload }          from '../payloads/index.js'
import { ChangeQuestionaireQuestionPayload }       from '../payloads/index.js'
import { CreateQuestionairePayload }               from '../payloads/index.js'
import { DeactivateQuestionairePayload }           from '../payloads/index.js'
import { DeleteQuestionaireQuestionPayload }       from '../payloads/index.js'
import { ListQuestionairesPayload }                from '../payloads/index.js'
import { ListSurveysPayload }                      from '../payloads/index.js'
import { StartSurveyPayload }                      from '../payloads/index.js'
import { ActivateQuestionaireSerializer }          from '../serializers/index.js'
import { AddQuestionaireQuestionSerializer }       from '../serializers/index.js'
import { AddSurveyAnswerSerializer }               from '../serializers/index.js'
import { ChangeQuestionaireNameSerializer }        from '../serializers/index.js'
import { ChangeQuestionairePhotoSerializer }       from '../serializers/index.js'
import { ChangeQuestionaireQuestionSerializer }    from '../serializers/index.js'
import { CreateQuestionaireSerializer }            from '../serializers/index.js'
import { DeactivateQuestionaireSerializer }        from '../serializers/index.js'
import { DeleteQuestionaireQuestionSerializer }    from '../serializers/index.js'
import { ListQuestionairesSerializer }             from '../serializers/index.js'
import { ListSurveysSerializer }                   from '../serializers/index.js'
import { StartSurveySerializer }                   from '../serializers/index.js'

@Controller()
@ConnectRpcService(CompatibilityService)
@UseFilters(ConnectRpcExceptionsFilter)
export class CompatibilityController implements ServiceImpl<typeof CompatibilityService> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly validator: Validator
  ) {}

  @ConnectRpcMethod()
  async listQuestionaires(request: ListQuestionairesRequest): Promise<ListQuestionairesResponse> {
    const payload = new ListQuestionairesPayload(request)

    await this.validator.validate(payload)

    return new ListQuestionairesSerializer(
      await this.queryBus.execute<GetQuestionairesQuery, FindQuestionairesByQueryResult>(
        new GetQuestionairesQuery(payload.pager, payload.order, payload.query, payload.search)
      )
    )
  }

  @ConnectRpcMethod()
  async createQuestionaire(
    request: CreateQuestionaireRequest
  ): Promise<CreateQuestionaireResponse> {
    const payload = new CreateQuestionairePayload(request)

    await this.validator.validate(payload)

    const command = new CreateQuestionaireCommand(uuid(), payload.name)

    await this.commandBus.execute(command)

    return new CreateQuestionaireSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(command.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async activateQuestionaire(
    request: ActivateQuestionaireRequest
  ): Promise<ActivateQuestionaireResponse> {
    const payload = new ActivateQuestionairePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new ActivateQuestionaireCommand(payload.questionaireId))

    return new ActivateQuestionaireSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async deactivateQuestionaire(
    request: DeactivateQuestionaireRequest
  ): Promise<DeactivateQuestionaireResponse> {
    const payload = new DeactivateQuestionairePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(new DeactivateQuestionaireCommand(payload.questionaireId))

    return new DeactivateQuestionaireSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async changeQuestionaireName(
    request: ChangeQuestionaireNameRequest
  ): Promise<ChangeQuestionaireNameResponse> {
    const payload = new ChangeQuestionaireNamePayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new ChangeQuestionaireNameCommand(payload.questionaireId, payload.name)
    )

    return new ChangeQuestionaireNameSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async changeQuestionairePhoto(
    request: ChangeQuestionairePhotoRequest
  ): Promise<ChangeQuestionairePhotoResponse> {
    const payload = new ChangeQuestionairePhotoPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new ChangeQuestionairePhotoCommand(payload.questionaireId, payload.photoId)
    )

    return new ChangeQuestionairePhotoSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async addQuestionaireQuestion(
    request: AddQuestionaireQuestionRequest
  ): Promise<AddQuestionaireQuestionResponse> {
    const payload = new AddQuestionaireQuestionPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new AddQuestionaireQuestionCommand(payload.questionaireId, payload.content)
    )

    return new AddQuestionaireQuestionSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async changeQuestionaireQuestion(
    request: ChangeQuestionaireQuestionRequest
  ): Promise<ChangeQuestionaireQuestionResponse> {
    const payload = new ChangeQuestionaireQuestionPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new ChangeQuestionaireQuestionCommand(
        payload.questionaireId,
        payload.questionId,
        payload.content
      )
    )

    return new ChangeQuestionaireQuestionSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async deleteQuestionaireQuestion(
    request: DeleteQuestionaireQuestionRequest
  ): Promise<DeleteQuestionaireQuestionResponse> {
    const payload = new DeleteQuestionaireQuestionPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new DeleteQuestionaireQuestionCommand(payload.questionaireId, payload.questionId)
    )

    return new DeleteQuestionaireQuestionSerializer(
      await this.queryBus.execute<GetQuestionaireByIdQuery, Questionaire>(
        new GetQuestionaireByIdQuery(payload.questionaireId)
      )
    )
  }

  @ConnectRpcMethod()
  async listSurveys(request: ListSurveysRequest): Promise<ListSurveysResponse> {
    const payload = new ListSurveysPayload(request)

    await this.validator.validate(payload)

    return new ListSurveysSerializer(
      await this.queryBus.execute<GetSurveysQuery, FindSurveysByQueryResult>(
        new GetSurveysQuery(payload.pager, payload.order, payload.query, payload.search)
      )
    )
  }

  @ConnectRpcMethod()
  async startSurvey(request: StartSurveyRequest): Promise<StartSurveyResponse> {
    const payload = new StartSurveyPayload(request)

    await this.validator.validate(payload)

    const command = new StartSurveyCommand(uuid(), payload.intervieweeId, payload.questionaireId)

    await this.commandBus.execute(command)

    const {
      surveys: [survey],
    } = await this.queryBus.execute<GetSurveysQuery, FindSurveysByQueryResult>(
      new GetSurveysQuery(undefined, undefined, {
        intervieweeId: {
          conditions: {
            eq: {
              value: payload.intervieweeId,
            },
          },
        },
        questionaireId: {
          conditions: {
            eq: {
              value: payload.questionaireId,
            },
          },
        },
      })
    )

    return new StartSurveySerializer(survey)
  }

  @ConnectRpcMethod()
  async addSurveyAnswer(request: AddSurveyAnswerRequest): Promise<AddSurveyAnswerResponse> {
    const payload = new AddSurveyAnswerPayload(request)

    await this.validator.validate(payload)

    await this.commandBus.execute(
      new AddSurveyAnswerCommand(payload.surveyId, payload.questionId, payload.answer)
    )

    return new AddSurveyAnswerSerializer(
      await this.queryBus.execute<GetSurveyByIdQuery, Survey>(
        new GetSurveyByIdQuery(payload.surveyId)
      )
    )
  }
}
