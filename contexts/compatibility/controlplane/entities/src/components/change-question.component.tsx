import type { ReactElement } from 'react'

import { Button }            from '@ui-admin/button'
import { DrawerClose }       from '@ui-admin/drawer'
import { ArrowLeftIcon }     from '@ui-admin/icons'
import { Input }             from '@ui-admin/input'
import { Column }            from '@ui-admin/layout'
import { Row }               from '@ui-admin/layout'
import { Layout }            from '@ui-admin/layout'
import { Text }              from '@ui-admin/text'
import { useState }          from 'react'
import React                 from 'react'

export interface ChangeQuestionProps {
  questionId: string
  onConfirm: (questionId: string, content: string) => void
}

export const ChangeQuestion = ({ questionId, onConfirm }: ChangeQuestionProps): ReactElement => {
  const [content, setContent] = useState<string>('')

  return (
    <Column minHeight='100%' p='2x' overflow='auto'>
      <Row alignItems='center' justifyContent='center'>
        <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }}>
          <DrawerClose asChild>
            <ArrowLeftIcon width={24} height={24} color='blue' />
          </DrawerClose>
        </Layout>
        <Layout>
          <Text fontSize='regular'>Изменение вопроса</Text>
        </Layout>
        <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }} />
      </Row>
      <Layout flexBasis='2x' flexShrink={0} />
      <Layout>
        <Input
          label='Вопрос'
          placeholder='Введите Вопрос'
          value={content}
          onValueChange={setContent}
        />
      </Layout>
      <Layout flexBasis='2x' />
      <Layout>
        <Button
          size='large'
          style={{ width: '100%' }}
          disabled={!content}
          onClick={(): void => {
            onConfirm(questionId, content)
          }}
        >
          Применить
        </Button>
      </Layout>
    </Column>
  )
}
