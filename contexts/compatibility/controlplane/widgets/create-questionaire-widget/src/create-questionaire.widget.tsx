'use client'

import type { ReactElement }  from 'react'

import { useRouter }          from 'next/navigation.js'
import { useCallback }        from 'react'
import { useState }           from 'react'
import React                  from 'react'

import { CreateQuestionaire } from '@compatibility/controlplane-entities'
import { questionairesApi }   from '@dating/operations'

export const CreateQuestionaireWidget = (): ReactElement => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [isPending, setIsPending] = useState<boolean>(false)

  const createQuestionaire = useCallback(() => {
    if (isPending) return

    setIsPending(true)

    questionairesApi
      .create({ createQuestionaireRequest: { name } }, { credentials: 'include' })
      .then(({ id }: { id: string }): void => {
        router.push(`/questionaires/${id}`)
      })
      .finally(() => {
        setIsPending(false)
      })
  }, [name, router, isPending, setIsPending])

  return <CreateQuestionaire name={name} onChangeName={setName} onConfirm={createQuestionaire} />
}
