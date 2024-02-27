import type { ReactElement } from 'react'

import { Button }            from '@ui-admin/button'
import { DrawerClose }       from '@ui-admin/drawer'
import { ArrowLeftIcon }     from '@ui-admin/icons'
import { Column }            from '@ui-admin/layout'
import { Row }               from '@ui-admin/layout'
import { Layout }            from '@ui-admin/layout'
import { Text }              from '@ui-admin/text'
import React                 from 'react'

export interface DeactivateQuestionaireProps {
  onConfirm: () => void
  onCancel: () => void
}

export const DeactivateQuestionaire = ({
  onConfirm,
  onCancel,
}: DeactivateQuestionaireProps): ReactElement => (
  <Column minHeight='100%' p='2x' overflow='auto'>
    <Row alignItems='center' justifyContent='center'>
      <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }}>
        <DrawerClose asChild>
          <ArrowLeftIcon width={24} height={24} color='blue' />
        </DrawerClose>
      </Layout>
      <Layout>
        <Text fontSize='regular'>Деактивация анкеты</Text>
      </Layout>
      <Layout flexBasis='5x' flexGrow={1} display={{ mobile: 'flex', desktop: 'none' }} />
    </Row>
    <Layout flexBasis='2x' flexShrink={0} />
    <Row>
      <Layout flexGrow={1}>
        <Button
          size='large'
          style={{
            width: '100%',
          }}
          onClick={onCancel}
        >
          Отмена
        </Button>
      </Layout>
      <Layout flexBasis='3x' flexShrink={0} />
      <Layout flexGrow={1}>
        <Button
          size='large'
          style={{
            width: '100%',
          }}
          onClick={onConfirm}
        >
          Принять
        </Button>
      </Layout>
    </Row>
  </Column>
)
