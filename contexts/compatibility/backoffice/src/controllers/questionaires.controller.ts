import type { Questionaire }        from '@compatibility/client-module'

import { Controller }                from '@nestjs/common'
import { Get }                       from '@nestjs/common'
import { Post }                      from '@nestjs/common'
import { Body }                      from '@nestjs/common'
import { ApiResponse }               from '@nestjs/swagger'
import { ApiTags }                   from '@nestjs/swagger'
import { ApiBody }                   from '@nestjs/swagger'
import { ApiExtraModels }            from '@nestjs/swagger'
import { getSchemaPath }             from '@nestjs/swagger'

import { CompatibilityClient }       from '@compatibility/client-module'

import { QuestionaireEntity }        from '../entities/index.js'
import { CreateQuestionaireRequest } from '../requests/index.js'
import { ListQuestionairesResponse } from '../responses/index.js'

@ApiTags('questionaires')
@Controller('api/questionaires')
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
  async create(@Body() body: CreateQuestionaireRequest): Promise<QuestionaireEntity> {
    const { result } = await this.client.createQuestionaire(body.name)

    // eslint-disable-next-line
    return result as any
  }
}
