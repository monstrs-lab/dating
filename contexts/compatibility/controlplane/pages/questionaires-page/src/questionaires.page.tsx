'use client'

import type { QuestionaireEntity }  from '@dating/operations'
import type { ReactElement }        from 'react'

import { useEffect }                from 'react'
import { useState }                 from 'react'
import React                        from 'react'

import { CreateQuestionaireWidget } from '@compatibility/controlplane-create-questionaire-widget'
import { Questionaires }            from '@compatibility/controlplane-entities'
import { questionairesApi }         from '@dating/operations'

export const QuestionairesPage = (): ReactElement => {
  const [questionaires, setQuestionaires] = useState<Array<QuestionaireEntity>>([])
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)

  useEffect(() => {
    questionairesApi.list({ credentials: 'include' }).then(({
      questionaires: baseQuestionaires,
    }) => {
      setQuestionaires(baseQuestionaires)
    })
  }, [])

  return (
    <Questionaires
      data={questionaires}
      createAction={<CreateQuestionaireWidget />}
      createModalOpen={createModalOpen}
      onCreateModalOpenChange={setCreateModalOpen}
    />
  )
}
