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

export interface ChangeQuestionaireNameProps {
  defaultName: string
  onConfirm: (value: string) => void
}

export const ChangeQuestionaireName = ({
  defaultName = '',
  onConfirm,
}: ChangeQuestionaireNameProps): ReactElement => {
  const [name, setName] = useState<string>(defaultName)

  return (
    <Column minHeight='100%' p='2x' overflow='auto'>
      <Row alignItems='center' justifyContent='center'>
        <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }}>
          <DrawerClose asChild>
            <ArrowLeftIcon width={24} height={24} color='blue' />
          </DrawerClose>
        </Layout>
        <Layout>
          <Text fontSize='regular'>Изменение названия анкеты</Text>
        </Layout>
        <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }} />
      </Row>
      <Layout flexBasis='2x' flexShrink={0} />
      <Layout>
        <Input
          label='Название анкеты'
          placeholder='Введите название анкеты'
          value={name}
          onValueChange={setName}
        />
      </Layout>
      <Layout flexBasis='2x' />
      <Layout>
        <Button
          size='large'
          style={{ width: '100%' }}
          disabled={!name}
          onClick={(): void => {
            onConfirm(name)
          }}
        >
          Применить
        </Button>
      </Layout>
    </Column>
  )
}
