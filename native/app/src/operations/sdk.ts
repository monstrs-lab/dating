/* eslint-disable */
// @ts-nocheck
import type { GraphQLClient }               from 'graphql-request'
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/esm/types.js'

import gql                                  from 'graphql-tag'

export type Maybe<T> = T | undefined
export type InputMaybe<T> = T | undefined
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type ChangeProfileNameErrors = {
  __typename?: 'ChangeProfileNameErrors'
  name?: Maybe<ValidationError>
}

export type ChangeProfileNameInput = {
  name: Scalars['String']['input']
}

export type ChangeProfileNameResponse = {
  __typename?: 'ChangeProfileNameResponse'
  errors?: Maybe<ChangeProfileNameErrors>
  result?: Maybe<Profile>
}

export type Mutation = {
  __typename?: 'Mutation'
  changeProfileName: ChangeProfileNameResponse
  selectProfileGender: SelectProfileGenderResponse
}

export type MutationChangeProfileNameArgs = {
  input: ChangeProfileNameInput
}

export type MutationSelectProfileGenderArgs = {
  input: SelectProfileGenderInput
}

export type MyProfile = {
  __typename?: 'MyProfile'
  info: Profile
}

export type Profile = {
  __typename?: 'Profile'
  gender?: Maybe<ProfileGender>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
}

export enum ProfileGender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type Query = {
  __typename?: 'Query'
  my: User
}

export type SelectProfileGenderErrors = {
  __typename?: 'SelectProfileGenderErrors'
  gender?: Maybe<ValidationError>
}

export type SelectProfileGenderInput = {
  gender: ProfileGender
}

export type SelectProfileGenderResponse = {
  __typename?: 'SelectProfileGenderResponse'
  errors?: Maybe<SelectProfileGenderErrors>
  result?: Maybe<Profile>
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']['output']
  profile: MyProfile
}

export type ValidationError = {
  __typename?: 'ValidationError'
  id: Scalars['String']['output']
  message: Scalars['String']['output']
}

export type ChangeProfileNameMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type ChangeProfileNameMutation = {
  __typename?: 'Mutation'
  changeProfileName: {
    __typename?: 'ChangeProfileNameResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
    errors?:
      | {
          __typename?: 'ChangeProfileNameErrors'
          name?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export type SelectProfileGenderMutationVariables = Exact<{
  gender: ProfileGender
}>

export type SelectProfileGenderMutation = {
  __typename?: 'Mutation'
  selectProfileGender: {
    __typename?: 'SelectProfileGenderResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
    errors?:
      | {
          __typename?: 'SelectProfileGenderErrors'
          gender?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export type ProfileFragmentFragment = {
  __typename?: 'Profile'
  id: string
  gender?: ProfileGender | undefined
  name?: string | undefined
}

export type MyProfileQueryVariables = Exact<{ [key: string]: never }>

export type MyProfileQuery = {
  __typename?: 'Query'
  my: {
    __typename?: 'User'
    profile: {
      __typename?: 'MyProfile'
      info: { __typename?: 'Profile' } & ProfileFragmentFragment
    }
  }
}

export const ProfileFragmentFragmentDoc = gql`
  fragment ProfileFragment on Profile {
    id
    gender
    name
  }
`
export const ChangeProfileNameDocument = gql`
  mutation changeProfileName($name: String!) {
    changeProfileName(input: { name: $name }) {
      result {
        ...ProfileFragment
      }
      errors {
        name {
          id
          message
        }
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`
export const SelectProfileGenderDocument = gql`
  mutation selectProfileGender($gender: ProfileGender!) {
    selectProfileGender(input: { gender: $gender }) {
      result {
        ...ProfileFragment
      }
      errors {
        gender {
          id
          message
        }
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`
export const MyProfileDocument = gql`
  query myProfile {
    my {
      profile {
        info {
          ...ProfileFragment
        }
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) =>
  action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    changeProfileName(
      variables: ChangeProfileNameMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ChangeProfileNameMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ChangeProfileNameMutation>(ChangeProfileNameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'changeProfileName',
        'mutation',
        variables
      )
    },
    selectProfileGender(
      variables: SelectProfileGenderMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<SelectProfileGenderMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SelectProfileGenderMutation>(SelectProfileGenderDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'selectProfileGender',
        'mutation',
        variables
      )
    },
    myProfile(
      variables?: MyProfileQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<MyProfileQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MyProfileQuery>(MyProfileDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'myProfile',
        'query',
        variables
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
