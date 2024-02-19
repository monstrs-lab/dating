import type { FC }         from 'react'

import { Link }            from 'expo-router'
import { Pressable }       from 'react-native'
import { ImageBackground } from 'react-native'
import { useEffect }       from 'react'
import { useState }        from 'react'
import React               from 'react'

import { Box }             from '../../ui/layout'
import { Text }            from '../../ui/text'
import operations          from '../../operations'

export interface QuestionnairePhoto {
  id: string
  url: string
}

export interface Question {
  id: string
  content: string
}

export enum QuestionaireStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum SurveyStatus {
  Completed = 'COMPLETED',
  Started = 'STARTED',
}

export interface SurveyAnswer {
  id: string
  value?: number
}

export interface Survey {
  id: string
  status: SurveyStatus
  answers: Array<SurveyAnswer>
}

export interface Questionnaire {
  id: string
  name: string
  photo?: QuestionnairePhoto
  questions: Array<Question>
  status: QuestionaireStatus
  survey?: Survey
}

export const QuestionnairesScreen: FC = () => {
  const [questionaires, setQuestionaires] = useState<Array<Questionnaire>>([])

  useEffect(() => {
    const loadMatches = async (): Promise<void> => {
      const { my } = await operations.myCompatibility()

      setQuestionaires(my.compatibility.questionaires)
    }

    loadMatches()
  }, [setQuestionaires])

  return (
    <Box flex={1} m='5x'>
      {questionaires.map((questionaire) => (
        <Link
          key={questionaire.id}
          asChild
          href={{ pathname: '/(main)/tests/[id]', params: { id: questionaire.id } }}
          disabled={questionaire?.survey?.status === SurveyStatus.Completed}
        >
          <Pressable style={{ marginBottom: 20 }}>
            <Box
              borderRadius='24'
              height={200}
              backgroundColor='gray'
              position='relative'
              overflow='hidden'
            >
              <ImageBackground
                source={{ uri: questionaire?.photo?.url }}
                src={questionaire?.photo?.url}
                resizeMode='cover'
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <Box margin='5x'>
                  <Text fontWeight='700' fontSize={28} color='white'>
                    {questionaire.name}
                  </Text>
                </Box>
              </ImageBackground>
              {questionaire?.survey?.status === SurveyStatus.Completed && (
                <Box
                  position='absolute'
                  top={10}
                  right={10}
                  bg='white'
                  borderRadius='8'
                  py='1.5x'
                  px='2x'
                >
                  <Text color='black'>Пройден</Text>
                </Box>
              )}
            </Box>
          </Pressable>
        </Link>
      ))}
    </Box>
  )
}
