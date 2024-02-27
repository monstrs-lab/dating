import type { ReactElement } from 'react'

import { Button }            from '@ui-admin/button'
import { DrawerClose }       from '@ui-admin/drawer'
import { ArrowLeftIcon }     from '@ui-admin/icons'
import { Input }             from '@ui-admin/input'
import { Column }            from '@ui-admin/layout'
import { Row }               from '@ui-admin/layout'
import { Layout }            from '@ui-admin/layout'
import { Text }              from '@ui-admin/text'
import React                 from 'react'

export interface CreateQuestionaireProps {
  name: string
  onChangeName: (value: string) => void
  onConfirm: () => void
}

export const CreateQuestionaire = ({
  name,
  onChangeName,
  onConfirm,
}: CreateQuestionaireProps): ReactElement => (
  <Column minHeight='100%' p='2x' overflow='auto'>
    <Row alignItems='center'>
      <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }}>
        <DrawerClose asChild>
          <ArrowLeftIcon width={24} height={24} color='blue' />
        </DrawerClose>
      </Layout>
      <Layout>
        <Text fontSize='regular'>Новая анкета</Text>
      </Layout>
      <Layout flexBasis='5x' flexGrow={1} />
    </Row>
    <Layout flexBasis='2x' flexShrink={0} />
    <Layout>
      <Input
        label='Название анкеты'
        placeholder='Введите название анкеты'
        value={name}
        onValueChange={onChangeName}
      />
    </Layout>
    <Layout flexBasis='2x' flexShrink={0} flexGrow={1} />
    <Layout>
      <Button size='large' style={{ width: '100%' }} onClick={onConfirm}>
        Применить
      </Button>
    </Layout>
  </Column>
)
