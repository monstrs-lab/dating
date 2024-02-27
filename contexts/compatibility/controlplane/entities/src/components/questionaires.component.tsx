import type { ReactElement } from 'react'

import type { Questionaire } from '../interfaces/index.js'

import { Avatar }            from '@ui-admin/avatar'
import { IconButton }        from '@ui-admin/button'
import { Drawer }            from '@ui-admin/drawer'
import { DropdownMenu }      from '@ui-admin/dropdown-menu'
import { DropdownMenuItem }  from '@ui-admin/dropdown-menu'
import { MoreIcon }          from '@ui-admin/icons'
import { Column }            from '@ui-admin/layout'
import { Row }               from '@ui-admin/layout'
import { Layout }            from '@ui-admin/layout'
import { Navigation }        from '@ui-admin/navigation'
import { NavigationActions } from '@ui-admin/navigation'
import { NavigationTitle }   from '@ui-admin/navigation'
import { Text }              from '@ui-admin/text'
import LinkPkg               from 'next/link.js'
import React                 from 'react'

const Link = LinkPkg.default || LinkPkg

export interface QuestionairesProps {
  data: Array<Questionaire>
  createAction: ReactElement
  createModalOpen: boolean
  onCreateModalOpenChange: (value: boolean) => void
}

export const Questionaires = ({
  data,
  createAction,
  createModalOpen,
  onCreateModalOpenChange,
}: QuestionairesProps): ReactElement => (
  <Column minHeight='100%'>
    <Layout>
      <Navigation>
        <NavigationTitle>Анкеты</NavigationTitle>
        <NavigationActions ml='1x'>
          <DropdownMenu
            content={
              <Drawer
                direction='right'
                open={createModalOpen}
                content={createAction}
                onOpenChange={onCreateModalOpenChange}
              >
                <div>
                  <DropdownMenuItem
                    onSelect={(ev) => {
                      ev.preventDefault()
                    }}
                  >
                    Создать анкету
                  </DropdownMenuItem>
                </div>
              </Drawer>
            }
          >
            <IconButton size='large'>
              <MoreIcon color='white' height={18} width={18} />
            </IconButton>
          </DropdownMenu>
        </NavigationActions>
      </Navigation>
    </Layout>
    <Column p='2x' overflow='auto'>
      {data.map((questionaire) => (
        <Link key={questionaire.id} href={`/questionaires/${questionaire.id}`}>
          <Row
            alignItems='center'
            p='2x'
            mb='1x'
            style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: '14px' }}
          >
            <Layout>
              <Avatar title={questionaire.name} />
            </Layout>
            <Layout flexBasis='3x' flexShrink={0} />
            <Layout flexGrow={1}>
              <Text>{questionaire.name}</Text>
            </Layout>
            <Layout flexBasis='3x' flexShrink={0} />
            <Layout>
              <Text>{questionaire.status}</Text>
            </Layout>
          </Row>
        </Link>
      ))}
    </Column>
  </Column>
)
