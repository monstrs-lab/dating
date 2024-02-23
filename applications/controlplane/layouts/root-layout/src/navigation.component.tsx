'use client'

import type { FunctionComponent } from 'react'
import type { ReactElement }      from 'react'

import { GiftIcon }               from '@ui-admin/icons'
import { usePathname }            from 'next/navigation.js'
import { createElement }          from 'react'
import NextLinkPkg                from 'next/link.js'
import React                      from 'react'

const NextLink = NextLinkPkg.default || NextLinkPkg

export interface NavLinkProps {
  href: string
  width?: number | string
  height?: number | string
  icon: FunctionComponent<{ width?: number; height?: number; color: string }>
}

export interface LinkProps {
  width?: number | string
  height?: number | string
}

export const NavigationLink = ({ href, width, height, icon }: NavLinkProps): ReactElement => {
  const pathname = usePathname()

  return (
    <NextLink href={href}>
      {createElement(icon, {
        width: Number(width),
        height: Number(height),
        color: pathname === href ? 'blue' : 'white',
      })}
    </NextLink>
  )
}

export const QuestionairesLink = (props: LinkProps): ReactElement => (
  <NavigationLink icon={GiftIcon} href='/questionaires' {...props} />
)
