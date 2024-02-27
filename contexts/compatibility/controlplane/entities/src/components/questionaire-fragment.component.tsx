import type { ReactElement }  from 'react'

import type { Questionaire }  from '../interfaces/index.js'

import { IconButton }         from '@ui-admin/button'
import { Drawer }             from '@ui-admin/drawer'
import { DropdownMenu }       from '@ui-admin/dropdown-menu'
import { DropdownMenuItem }   from '@ui-admin/dropdown-menu'
import { ArrowLeftIcon }      from '@ui-admin/icons'
import { MoreIcon }           from '@ui-admin/icons'
import { Column }             from '@ui-admin/layout'
import { Row }                from '@ui-admin/layout'
import { Layout }             from '@ui-admin/layout'
import { Navigation }         from '@ui-admin/navigation'
import { NavigationActions }  from '@ui-admin/navigation'
import { NavigationTitle }    from '@ui-admin/navigation'
import { Text }               from '@ui-admin/text'
import LinkPkg                from 'next/link.js'
import React                  from 'react'

import { QuestionaireStatus } from '../interfaces/index.js'

const Link = LinkPkg.default || LinkPkg

export interface QuestionaireFragmentProps extends Questionaire {
  activateAction: ReactElement
  deactivateAction: ReactElement
  changeNameAction: ReactElement
  addQuestionAction: ReactElement
  deleteQuestionAction: (questionId: string) => ReactElement
  changeQuestionAction: (questionId: string) => ReactElement
  activateModalOpen: boolean
  changeNameModalOpen: boolean
  addQuestionModalOpen: boolean
  deleteQuestionModalOpen: boolean
  changeQuestionModalOpen: boolean
  onActivateModalOpenChange: (value: boolean) => void
  onChangeNameModalOpenChange: (value: boolean) => void
  onAddQuestionModalOpenChange: (value: boolean) => void
  onDeleteQuestionModalOpenChange: (value: boolean) => void
  onChangeQuestionModalOpenChange: (value: boolean) => void
}

export const QuestionaireFragment = ({
  name,
  questionaires,
  status,
  activateAction,
  deactivateAction,
  changeNameAction,
  addQuestionAction,
  deleteQuestionAction,
  changeQuestionAction,
  activateModalOpen,
  changeNameModalOpen,
  addQuestionModalOpen,
  deleteQuestionModalOpen,
  changeQuestionModalOpen,
  onActivateModalOpenChange,
  onChangeNameModalOpenChange,
  onAddQuestionModalOpenChange,
  onDeleteQuestionModalOpenChange,
  onChangeQuestionModalOpenChange,
}: QuestionaireFragmentProps): ReactElement => (
  <Column minHeight='100%'>
    <Layout>
      <Navigation>
        <NavigationActions display={{ mobile: 'flex', tablet: 'none' }}>
          <Link href='/membership-requests'>
            <IconButton size='large'>
              <ArrowLeftIcon width={24} height={24} color='white' />
            </IconButton>
          </Link>
        </NavigationActions>
        <NavigationTitle>Анкеты</NavigationTitle>
        <NavigationActions ml='1x'>
          <DropdownMenu
            content={
              <>
                <Drawer
                  direction='right'
                  open={activateModalOpen}
                  content={
                    (status === QuestionaireStatus.ACTIVE && deactivateAction) || activateAction
                  }
                  onOpenChange={onActivateModalOpenChange}
                >
                  <div>
                    <DropdownMenuItem
                      onSelect={(ev) => {
                        ev.preventDefault()
                      }}
                    >
                      {status === QuestionaireStatus.ACTIVE
                        ? 'Деактивировать анкету'
                        : 'Активировать анкету'}
                    </DropdownMenuItem>
                  </div>
                </Drawer>
                <Drawer
                  direction='right'
                  open={changeNameModalOpen}
                  content={changeNameAction}
                  onOpenChange={onChangeNameModalOpenChange}
                >
                  <div>
                    <DropdownMenuItem
                      onSelect={(ev) => {
                        ev.preventDefault()
                      }}
                    >
                      Изменить название анкеты
                    </DropdownMenuItem>
                  </div>
                </Drawer>
                <Drawer
                  direction='right'
                  open={addQuestionModalOpen}
                  content={addQuestionAction}
                  onOpenChange={onAddQuestionModalOpenChange}
                >
                  <div>
                    <DropdownMenuItem
                      onSelect={(ev) => {
                        ev.preventDefault()
                      }}
                    >
                      Добавить вопрос
                    </DropdownMenuItem>
                  </div>
                </Drawer>
              </>
            }
          >
            <IconButton size='large'>
              <MoreIcon color='white' height={18} width={18} />
            </IconButton>
          </DropdownMenu>
        </NavigationActions>
      </Navigation>
    </Layout>
    <Column p='2x'>
      <Layout>
        <Text>Название анкеты: {name}</Text>
      </Layout>
      <Layout flexBasis='2x' />
      <Layout>
        <Text>Статус анкеты: {QuestionaireStatus[status]}</Text>
      </Layout>
      <Layout flexBasis='2x' />
      <Layout justifyContent='center'>
        <Text fontSize='regular'>Вопросы</Text>
      </Layout>
      <Layout flexBasis='2x' />
      {questionaires.map((question) => (
        <Row key={question.id} mb='2x' alignItems='center'>
          <Layout>
            <Text>{question.content}</Text>
          </Layout>
          <Layout flexBasis='3x' flexGrow={1} />
          <Layout>
            <DropdownMenu
              content={
                <>
                  <Drawer
                    direction='right'
                    open={changeQuestionModalOpen}
                    content={changeQuestionAction(question.id)}
                    onOpenChange={onChangeQuestionModalOpenChange}
                  >
                    <div>
                      <DropdownMenuItem
                        onSelect={(ev) => {
                          ev.preventDefault()
                        }}
                      >
                        Изменить вопрос
                      </DropdownMenuItem>
                    </div>
                  </Drawer>
                  <Drawer
                    direction='right'
                    open={deleteQuestionModalOpen}
                    content={deleteQuestionAction(question.id)}
                    onOpenChange={onDeleteQuestionModalOpenChange}
                  >
                    <div>
                      <DropdownMenuItem
                        onSelect={(ev) => {
                          ev.preventDefault()
                        }}
                      >
                        Удалить вопрос
                      </DropdownMenuItem>
                    </div>
                  </Drawer>
                </>
              }
            >
              <IconButton size='large'>
                <MoreIcon color='white' height={18} width={18} />
              </IconButton>
            </DropdownMenu>
          </Layout>
        </Row>
      ))}
    </Column>
  </Column>
)
