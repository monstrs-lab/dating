import type { ChangeQuestionairePhotoRequest } from '@compatibility/compatibility-rpc/interfaces'

import { IsUUID }                              from 'class-validator'

export class ChangeQuestionairePhotoPayload {
  constructor(private readonly request: ChangeQuestionairePhotoRequest) {}

  @IsUUID(4)
  get questionaireId(): string {
    return this.request.questionaireId
  }

  @IsUUID(4)
  get photoId(): string {
    return this.request.photoId
  }
}
