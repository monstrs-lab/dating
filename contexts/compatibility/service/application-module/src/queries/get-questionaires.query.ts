import type { FindQuestionairesByQuery } from '../repositories/index.js'

export class GetQuestionairesQuery {
  constructor(
    public readonly pager: FindQuestionairesByQuery['pager'],
    public readonly order?: FindQuestionairesByQuery['order'],
    public readonly query?: FindQuestionairesByQuery['query'],
    public readonly search?: FindQuestionairesByQuery['search']
  ) {}
}
