import type { ReactElement } from 'react'

import React                 from 'react'

import { QuestionairePage }  from '@compatibility/controlplane-questionaire-page'

export default ({ params }: { params: { id: string } }): ReactElement => (
  <QuestionairePage id={params.id} />
)
