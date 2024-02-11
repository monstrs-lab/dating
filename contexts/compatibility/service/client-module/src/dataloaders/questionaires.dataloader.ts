/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { Questionaire }          from '@compatibility/compatibility-rpc'
import type { CompatibilityService }  from '@compatibility/compatibility-rpc'
import type { PromiseClient }         from '@connectrpc/connect'

import { Injectable }                 from '@nestjs/common'
import { Inject }                     from '@nestjs/common'
import DataLoader                     from 'dataloader'

import { COMPATIBILITY_CLIENT_TOKEN } from '../constants/index.js'

@Injectable()
export class QuestionairesDataLoader {
  protected dataloader: DataLoader<string, Questionaire>

  constructor(
    @Inject(COMPATIBILITY_CLIENT_TOKEN)
    protected readonly client: PromiseClient<typeof CompatibilityService>
  ) {
    this.dataloader = new DataLoader<string, Questionaire>(async (queries) =>
      this.getQuestionaires(queries))
  }

  async load(query: string): Promise<Questionaire> {
    return this.dataloader.load(query)
  }

  async loadMany(queries: Array<string>): Promise<Array<Error | Questionaire>> {
    return this.dataloader.loadMany(queries)
  }

  protected async getQuestionaires(
    questionaireIds: ReadonlyArray<string>
  ): Promise<Array<Questionaire>> {
    const { questionaires } = await this.client.listQuestionaires({
      query: {
        id: {
          conditions: {
            in: {
              values: questionaireIds.map((questionaireId) => questionaireId),
            },
          },
        },
      },
    })

    return questionaires
  }
}
