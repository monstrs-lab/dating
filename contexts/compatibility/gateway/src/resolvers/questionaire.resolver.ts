/* eslint-disable @typescript-eslint/consistent-type-imports */

import type * as rpc      from '@compatibility/client-module'
import type { File }      from '@files/gateway-module'

import { ResolveField }   from '@nestjs/graphql'
import { Resolver }       from '@nestjs/graphql'
import { Parent }         from '@nestjs/graphql'
import { Loader }         from 'nestjs-dataloader'
import DataLoader         from 'dataloader'

import { FileDataLoader } from '@files/gateway-module'

import { Questionaire }   from '../types/index.js'

@Resolver(() => Questionaire)
export class QuestionaireResolver {
  @ResolveField()
  async photo(
    @Parent() { photoId }: rpc.Questionaire,
    @Loader(FileDataLoader)
    loader: DataLoader<string, File>
  ): Promise<File | undefined> {
    if (photoId) {
      return loader.load(photoId)
    }

    return undefined
  }
}
