import { QuestionairesApi } from './gen/index.js'
import { Configuration }    from './gen/runtime.js'

export const questionairesApi = new QuestionairesApi(
  new Configuration({
    basePath: 'http://localhost:3000',
  })
)
