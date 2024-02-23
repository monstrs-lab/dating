import type { ReactElement } from 'react'
import type { ReactNode }    from 'react'

import { EffectorNext }      from '@effector/next'
import { BottomNavigation }  from '@ui-admin/bottom-navigation'
import { Row }               from '@ui-admin/layout'
import { Column }            from '@ui-admin/layout'
import { Layout }            from '@ui-admin/layout'
import { Sidebar }           from '@ui-admin/sidebar'
import React                 from 'react'

import { QuestionairesLink } from './navigation.component.jsx'

const items: Array<any> = [{ icon: QuestionairesLink }]

export interface RootLayoutProps {
  children: ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps): ReactElement => (
  <EffectorNext>
    <html style={{ height: '100%', overflow: 'hidden' }}>
      <body style={{ height: '100%', background: '#000000' }}>
        <Row height='100%'>
          <Layout display={['none', 'flex', 'flex']}>
            <Sidebar items={items} />
          </Layout>
          <Layout flexGrow={1}>
            <Column height='100%'>
              <Layout flexGrow={1} overflow='hidden'>
                {children}
              </Layout>
              <Layout display={['flex', 'none', 'none']}>
                <BottomNavigation items={items} />
              </Layout>
            </Column>
          </Layout>
        </Row>
      </body>
    </html>
  </EffectorNext>
)
