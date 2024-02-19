import type { FC }              from 'react'

import type { Questionnaire }   from './questionnaires.screen'

import { Pressable }            from 'react-native'
import { ImageBackground }      from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useRouter }            from 'expo-router'
import { useEffect }            from 'react'
import { useState }             from 'react'
import { useCallback }          from 'react'
import React                    from 'react'

import { Button }               from '../../ui/button'
import { Box }                  from '../../ui/layout'
import { Text }                 from '../../ui/text'
import { SurveyStatus }         from './questionnaires.screen'
import operations               from '../../operations'

export interface SelectQuestionProps {
  size: number
  active: boolean
  onSelect: () => void
}

const SelectQuestion: FC<SelectQuestionProps> = ({ size, active, onSelect }) => (
  <Pressable style={{ flexGrow: 1, alignItems: 'center' }} onPress={onSelect}>
    <Box
      width={size}
      height={size}
      borderColor='primary'
      borderRadius='24'
      borderWidth={2}
      borderStyle='solid'
      overflow='hidden'
      p='0.5x'
    >
      {!!active && <Box width='100%' height='100%' borderRadius='24' backgroundColor='primary' />}
    </Box>
  </Pressable>
)

export const QuestionnaireScreen: FC = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [questionaires, setQuestionaires] = useState<Array<Questionnaire>>([])
  const [activeQuestionnaire, setActiveQuestionnaire] = useState<Questionnaire>()
  const [activeQuestion, setActiveQuestion] = useState<number>(0)
  const [answerValue, setAnswerValue] = useState<number | undefined>()

  useEffect(() => {
    const loadMatches = async (): Promise<void> => {
      const { my } = await operations.myCompatibility()

      setQuestionaires(my.compatibility.questionaires)
    }

    loadMatches()
  }, [setQuestionaires])

  useEffect(() => {
    if (questionaires && id) {
      setActiveQuestionnaire(questionaires.find((item) => item.id === id))
    }
  }, [questionaires, id, setActiveQuestionnaire])

  const onStart = useCallback(async () => {
    if (activeQuestionnaire) {
      setInProgress(true)

      try {
        const { startSurvey } = await operations.startSurvey({
          questionaireId: activeQuestionnaire.id,
        })

        if (startSurvey.result) {
          setActiveQuestionnaire({
            ...activeQuestionnaire,
            survey: startSurvey.result,
          })
        }
      } finally {
        setInProgress(false)
      }
    }
  }, [activeQuestionnaire, setInProgress])

  const onAddAnswer = useCallback(async () => {
    if (activeQuestionnaire?.survey && typeof answerValue === 'number') {
      setInProgress(true)

      try {
        const { addSurveyAnswer } = await operations.addSurveyAnswer({
          input: {
            questionId: activeQuestionnaire.questions[activeQuestion].id,
            answer: answerValue,
            surveyId: activeQuestionnaire.survey.id,
          },
        })

        if (addSurveyAnswer.result) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          if (addSurveyAnswer.result.status === SurveyStatus.Completed) {
            router.navigate('/tests')
          } else {
            setActiveQuestion((prev) => prev + 1)
            setActiveQuestionnaire({
              ...activeQuestionnaire,
              survey: addSurveyAnswer.result,
            })
          }
        }
      } finally {
        setAnswerValue(undefined)
        setInProgress(false)
      }
    }
  }, [router, answerValue, activeQuestion, activeQuestionnaire, setInProgress, setActiveQuestion])

  if (!activeQuestionnaire) return null

  if (!activeQuestionnaire.survey)
    return (
      <Box flex={1} backgroundColor='gray' overflow='hidden'>
        <ImageBackground
          source={{ uri: activeQuestionnaire?.photo?.url }}
          src={activeQuestionnaire?.photo?.url}
          resizeMode='cover'
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Box margin='5x'>
            <Button
              disabled={inProgress}
              onPress={(): void => {
                onStart()
              }}
            >
              Начать тест
            </Button>
          </Box>
        </ImageBackground>
      </Box>
    )

  return (
    <Box flex={1} m='5x'>
      <Box alignItems='center'>
        <Text fontSize={24}>{activeQuestionnaire.name}</Text>
      </Box>
      <Box flexGrow={1} alignItems='center' mt='10x'>
        <Text fontSize={16} textAlign='center'>
          {activeQuestionnaire.questions[activeQuestion].content}
        </Text>
      </Box>
      <Box flexDirection='row' alignItems='center'>
        <SelectQuestion
          size={44}
          active={answerValue === 0}
          onSelect={(): void => {
            setAnswerValue(0)
          }}
        />
        <SelectQuestion
          size={38}
          active={answerValue === 1}
          onSelect={(): void => {
            setAnswerValue(1)
          }}
        />
        <SelectQuestion
          size={32}
          active={answerValue === 2}
          onSelect={(): void => {
            setAnswerValue(2)
          }}
        />
        <SelectQuestion
          size={26}
          active={answerValue === 3}
          onSelect={(): void => {
            setAnswerValue(3)
          }}
        />
        <SelectQuestion
          size={32}
          active={answerValue === 4}
          onSelect={(): void => {
            setAnswerValue(4)
          }}
        />
        <SelectQuestion
          size={38}
          active={answerValue === 5}
          onSelect={(): void => {
            setAnswerValue(5)
          }}
        />
        <SelectQuestion
          size={44}
          active={answerValue === 6}
          onSelect={(): void => {
            setAnswerValue(6)
          }}
        />
      </Box>
      <Box flexGrow={1} flexBasis={16} />
      <Box>
        <Button
          disabled={typeof answerValue !== 'number'}
          onPress={(): void => {
            onAddAnswer()
          }}
        >
          Следующий вопрос
        </Button>
      </Box>
    </Box>
  )
}
