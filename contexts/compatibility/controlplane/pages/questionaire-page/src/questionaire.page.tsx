'use client'

import type { QuestionaireEntity } from '@dating/operations'
import type { ReactElement }       from 'react'

import { useEffect }               from 'react'
import { useState }                from 'react'
import { useCallback }             from 'react'
import React                       from 'react'

import { QuestionaireFragment }    from '@compatibility/controlplane-entities'
import { ActivateQuestionaire }    from '@compatibility/controlplane-entities'
import { DeactivateQuestionaire }  from '@compatibility/controlplane-entities'
import { ChangeQuestionaireName }  from '@compatibility/controlplane-entities'
import { AddQuestion }             from '@compatibility/controlplane-entities'
import { DeleteQuestion }          from '@compatibility/controlplane-entities'
import { ChangeQuestion }          from '@compatibility/controlplane-entities'
import { questionairesApi }        from '@dating/operations'

export interface QuestionairePageProps {
  id: string
}

export const QuestionairePage = ({ id }: QuestionairePageProps): ReactElement | null => {
  const [questionaire, setQuestionaire] = useState<QuestionaireEntity>()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [activateModalOpen, setActivateModalOpen] = useState<boolean>(false)
  const [changeNameModalOpen, setChangeNameModalOpen] = useState<boolean>(false)
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState<boolean>(false)
  const [deleteQuestionModalOpen, setDeleteQuestionModalOpen] = useState<boolean>(false)
  const [changeQuestionModalOpen, setChangeQuestionModalOpen] = useState<boolean>(false)

  useEffect(() => {
    questionairesApi.list({ credentials: 'include' }).then(({ questionaires }) => {
      questionaires.some((item) => {
        if (item.id === id) {
          setQuestionaire(item)
          return true
        }
        return false
      })
    })
  }, [id])

  const activateQuestionaire = useCallback(() => {
    if (isPending) return

    setIsPending(true)

    questionairesApi
      .activate({ id }, { credentials: 'include' })
      .then((props): void => {
        setActivateModalOpen(false)
        setQuestionaire(props)
      })
      .finally(() => {
        setIsPending(false)
      })
  }, [id, isPending, setQuestionaire, setActivateModalOpen, setIsPending])

  const deactivateQuestionaire = useCallback(() => {
    if (isPending) return

    setIsPending(true)

    questionairesApi
      .deactivate({ id }, { credentials: 'include' })
      .then((props): void => {
        setActivateModalOpen(false)
        setQuestionaire(props)
      })
      .finally(() => {
        setIsPending(false)
      })
  }, [id, isPending, setQuestionaire, setActivateModalOpen, setIsPending])

  const changeQuestionaireName = useCallback(
    (name: string) => {
      if (isPending) return

      setIsPending(true)

      questionairesApi
        .changeName({ id, changeQuestionaireNameRequest: { name } }, { credentials: 'include' })
        .then((props): void => {
          setChangeNameModalOpen(false)
          setQuestionaire(props)
        })
        .finally(() => {
          setIsPending(false)
        })
    },
    [id, isPending, setQuestionaire, setChangeNameModalOpen, setIsPending]
  )

  const addQuestion = useCallback(
    (content: string) => {
      if (isPending) return

      setIsPending(true)

      questionairesApi
        .addQuestion({ id, addQuestionareQuestionRequest: { content } }, { credentials: 'include' })
        .then((props): void => {
          setAddQuestionModalOpen(false)
          setQuestionaire(props)
        })
        .finally(() => {
          setIsPending(false)
        })
    },
    [id, isPending, setQuestionaire, setAddQuestionModalOpen, setIsPending]
  )

  const deleteQuestion = useCallback(
    (questionId: string) => {
      if (isPending) return

      setIsPending(true)

      questionairesApi
        .deleteQuestion({ id, questionId }, { credentials: 'include' })
        .then((props): void => {
          setDeleteQuestionModalOpen(false)
          setQuestionaire(props)
        })
        .finally(() => {
          setIsPending(false)
        })
    },
    [id, isPending, setQuestionaire, setDeleteQuestionModalOpen, setIsPending]
  )

  const changeQuestion = useCallback(
    (questionId: string, content: string) => {
      if (isPending) return

      setIsPending(true)

      questionairesApi
        .changeQuestion(
          { id, questionId, changeQuestionareQuestionRequest: { content } },
          { credentials: 'include' }
        )
        .then((props): void => {
          setChangeQuestionModalOpen(false)
          setQuestionaire(props)
        })
        .finally(() => {
          setIsPending(false)
        })
    },
    [id, isPending, setQuestionaire, setChangeQuestionModalOpen, setIsPending]
  )

  if (!questionaire?.id) return null

  return (
    <QuestionaireFragment
      addQuestionAction={<AddQuestion onConfirm={addQuestion} />}
      activateModalOpen={activateModalOpen}
      changeNameModalOpen={changeNameModalOpen}
      addQuestionModalOpen={addQuestionModalOpen}
      deleteQuestionModalOpen={deleteQuestionModalOpen}
      changeQuestionModalOpen={changeQuestionModalOpen}
      activateAction={
        <ActivateQuestionaire
          onConfirm={activateQuestionaire}
          onCancel={(): void => {
            setActivateModalOpen(false)
          }}
        />
      }
      deactivateAction={
        <DeactivateQuestionaire
          onConfirm={deactivateQuestionaire}
          onCancel={(): void => {
            setActivateModalOpen(false)
          }}
        />
      }
      changeNameAction={
        <ChangeQuestionaireName
          defaultName={questionaire.name}
          onConfirm={changeQuestionaireName}
        />
      }
      deleteQuestionAction={(questionId: string): ReactElement => (
        <DeleteQuestion
          onConfirm={(): void => {
            deleteQuestion(questionId)
          }}
          onCancel={(): void => {
            setDeleteQuestionModalOpen(false)
          }}
        />
      )}
      changeQuestionAction={(questionId: string): ReactElement => (
        <ChangeQuestion questionId={questionId} onConfirm={changeQuestion} />
      )}
      onActivateModalOpenChange={setActivateModalOpen}
      onChangeNameModalOpenChange={setChangeNameModalOpen}
      onAddQuestionModalOpenChange={setAddQuestionModalOpen}
      onDeleteQuestionModalOpenChange={setDeleteQuestionModalOpen}
      onChangeQuestionModalOpenChange={setChangeQuestionModalOpen}
      {...questionaire}
    />
  )
}
