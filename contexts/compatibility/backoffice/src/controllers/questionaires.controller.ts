import type { Questionaire }                from '@compatibility/client-module'

import { Controller }                       from '@nestjs/common'
import { Get }                              from '@nestjs/common'
import { Post }                             from '@nestjs/common'
import { Put }                              from '@nestjs/common'
import { Delete }                           from '@nestjs/common'
import { Body }                             from '@nestjs/common'
import { Param }                            from '@nestjs/common'
import { ApiResponse }                      from '@nestjs/swagger'
import { ApiTags }                          from '@nestjs/swagger'
import { ApiBody }                          from '@nestjs/swagger'
import { ApiExtraModels }                   from '@nestjs/swagger'
import { getSchemaPath }                    from '@nestjs/swagger'

import { CompatibilityClient }              from '@compatibility/client-module'

import { QuestionaireEntity }               from '../entities/index.js'
import { QuestionEntity }                   from '../entities/index.js'
import { CreateQuestionaireRequest }        from '../requests/index.js'
import { AddQuestionareQuestionRequest }    from '../requests/index.js'
import { ChangeQuestionareQuestionRequest } from '../requests/index.js'
import { ChangeQuestionaireNameRequest }    from '../requests/index.js'
import { ChangeQuestionairePhotoRequest }   from '../requests/index.js'
import { ListQuestionairesResponse }        from '../responses/index.js'

@ApiTags('questionaires')
@Controller('api/questionaires')
@ApiExtraModels(QuestionEntity)
@ApiExtraModels(QuestionaireEntity)
@ApiExtraModels(ListQuestionairesResponse)
export class QuestionairesController {
  constructor(private readonly client: CompatibilityClient) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Questionaires list',
    schema: {
      $ref: getSchemaPath(ListQuestionairesResponse),
    },
  })
  async list(): Promise<{ questionaires: Array<Questionaire>; hasNextPage: boolean }> {
    return this.client.listQuestionaires({})
  }

  @Post()
  @ApiBody({ type: CreateQuestionaireRequest })
  @ApiResponse({
    status: 200,
    description: 'Create questionaire',
    type: QuestionaireEntity,
  })
  async create(@Body() body: CreateQuestionaireRequest): Promise<Questionaire> {
    const { result } = await this.client.createQuestionaire(body.name)

    return result!
  }

  @Put(':id/name')
  @ApiBody({ type: ChangeQuestionaireNameRequest })
  @ApiResponse({
    status: 200,
    description: 'Change questionaire name',
    type: QuestionaireEntity,
  })
  async changeName(
    @Param('id') questionaireId: string,
    @Body() body: ChangeQuestionaireNameRequest
  ): Promise<Questionaire> {
    const { result } = await this.client.changeQuestionaireName(questionaireId, body.name)

    return result!
  }

  @Put(':id/photo')
  @ApiBody({ type: ChangeQuestionairePhotoRequest })
  @ApiResponse({
    status: 200,
    description: 'Change questionaire photo',
    type: QuestionaireEntity,
  })
  async changePhoto(
    @Param('id') questionaireId: string,
    @Body() body: ChangeQuestionairePhotoRequest
  ): Promise<Questionaire> {
    const { result } = await this.client.changeQuestionairePhoto(questionaireId, body.photoId)

    return result!
  }

  @Post(':id/activate')
  @ApiResponse({
    status: 200,
    description: 'Activate questionaire',
    type: QuestionaireEntity,
  })
  async activate(@Param('id') questionaireId: string): Promise<Questionaire> {
    const { result } = await this.client.activateQuestionaire(questionaireId)

    return result!
  }

  @Post(':id/deactivate')
  @ApiResponse({
    status: 200,
    description: 'Activate questionaire',
    type: QuestionaireEntity,
  })
  async deactivate(@Param('id') questionaireId: string): Promise<Questionaire> {
    const { result } = await this.client.deactivateQuestionaire(questionaireId)

    return result!
  }

  @Post(':id/questions')
  @ApiBody({ type: AddQuestionareQuestionRequest })
  @ApiResponse({
    status: 200,
    description: 'Add questionaire question',
    type: QuestionaireEntity,
  })
  async addQuestion(
    @Param('id') questionaireId: string,
    @Body() body: AddQuestionareQuestionRequest
  ): Promise<Questionaire> {
    const { result } = await this.client.addQuestionaireQuestion(questionaireId, body.content)

    return result!
  }

  @Put(':id/questions/:question_id')
  @ApiBody({ type: ChangeQuestionareQuestionRequest })
  @ApiResponse({
    status: 200,
    description: 'Change questionaire question',
    type: QuestionaireEntity,
  })
  async changeQuestion(
    @Param('id') questionaireId: string,
    @Param('question_id') questionId: string,
    @Body() body: ChangeQuestionareQuestionRequest
  ): Promise<Questionaire> {
    const { result } = await this.client.changeQuestionaireQuestion(
      questionaireId,
      questionId,
      body.content
    )

    return result!
  }

  @Delete(':id/questions/:question_id')
  @ApiResponse({
    status: 200,
    description: 'Delete questionaire question',
    type: QuestionaireEntity,
  })
  async DeleteQuestion(
    @Param('id') questionaireId: string,
    @Param('question_id') questionId: string
  ): Promise<Questionaire> {
    const { result } = await this.client.deleteQuestionaireQuestion(questionaireId, questionId)

    return result!
  }
}
