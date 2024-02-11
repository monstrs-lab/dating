/* eslint-disable @typescript-eslint/consistent-type-imports */

import type { Survey }                from '@compatibility/compatibility-rpc'
import type { CompatibilityService }  from '@compatibility/compatibility-rpc'
import type { PromiseClient }         from '@connectrpc/connect'

import { Injectable }                 from '@nestjs/common'
import { Inject }                     from '@nestjs/common'
import DataLoader                     from 'dataloader'

import { COMPATIBILITY_CLIENT_TOKEN } from '../constants/index.js'

@Injectable()
export class SurveysDataLoader {
  protected dataloader: DataLoader<string, Survey>

  constructor(
    @Inject(COMPATIBILITY_CLIENT_TOKEN)
    protected readonly client: PromiseClient<typeof CompatibilityService>
  ) {
    this.dataloader = new DataLoader<string, Survey>(async (queries) => this.getSurveys(queries))
  }

  async load(query: string): Promise<Survey> {
    return this.dataloader.load(query)
  }

  async loadMany(queries: Array<string>): Promise<Array<Error | Survey>> {
    return this.dataloader.loadMany(queries)
  }

  protected async getSurveys(surveyIds: ReadonlyArray<string>): Promise<Array<Survey>> {
    const { surveys } = await this.client.listSurveys({
      query: {
        id: {
          conditions: {
            in: {
              values: surveyIds.map((surveyId) => surveyId),
            },
          },
        },
      },
    })

    return surveys
  }
}
