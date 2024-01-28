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

export type FillProfileGenderErrors = {
  __typename?: 'FillProfileGenderErrors'
  gender?: Maybe<ValidationError>
}

export type FillProfileGenderInput = {
  gender: ProfileGender
}

export type FillProfileGenderResponse = {
  __typename?: 'FillProfileGenderResponse'
  errors?: Maybe<FillProfileGenderErrors>
  result?: Maybe<Profile>
}

export type FillProfileGeopositionErrors = {
  __typename?: 'FillProfileGeopositionErrors'
  latitude?: Maybe<ValidationError>
  longitude?: Maybe<ValidationError>
}

export type FillProfileGeopositionInput = {
  latitude: Scalars['Float']['input']
  longitude: Scalars['Float']['input']
}

export type FillProfileGeopositionResponse = {
  __typename?: 'FillProfileGeopositionResponse'
  errors?: Maybe<FillProfileGeopositionErrors>
  result?: Maybe<Profile>
}

export type FillProfileNameErrors = {
  __typename?: 'FillProfileNameErrors'
  name?: Maybe<ValidationError>
}

export type FillProfileNameInput = {
  name: Scalars['String']['input']
}

export type FillProfileNameResponse = {
  __typename?: 'FillProfileNameResponse'
  errors?: Maybe<FillProfileNameErrors>
  result?: Maybe<Profile>
}

export type Mutation = {
  __typename?: 'Mutation'
  fillProfileGender: FillProfileGenderResponse
  fillProfileGeoposition: FillProfileGeopositionResponse
  fillProfileName: FillProfileNameResponse
}

export type MutationFillProfileGenderArgs = {
  input: FillProfileGenderInput
}

export type MutationFillProfileGeopositionArgs = {
  input: FillProfileGeopositionInput
}

export type MutationFillProfileNameArgs = {
  input: FillProfileNameInput
}

export type MyProfile = {
  __typename?: 'MyProfile'
  info: Profile
}

export type Profile = {
  __typename?: 'Profile'
  gender?: Maybe<ProfileGender>
  geoposition?: Maybe<ProfileGeoposition>
  id: Scalars['String']['output']
  location?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export enum ProfileGender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type ProfileGeoposition = {
  __typename?: 'ProfileGeoposition'
  latitude: Scalars['Float']['output']
  longitude: Scalars['Float']['output']
}

export type Query = {
  __typename?: 'Query'
  my: User
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

export type FillProfileGenderMutationVariables = Exact<{
  gender: ProfileGender
}>

export type FillProfileGenderMutation = {
  __typename?: 'Mutation'
  fillProfileGender: {
    __typename?: 'FillProfileGenderResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
    errors?:
      | {
          __typename?: 'FillProfileGenderErrors'
          gender?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export type FillProfileGeopositionMutationVariables = Exact<{
  latitude: Scalars['Float']['input']
  longitude: Scalars['Float']['input']
}>

export type FillProfileGeopositionMutation = {
  __typename?: 'Mutation'
  fillProfileGeoposition: {
    __typename?: 'FillProfileGeopositionResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
    errors?:
      | {
          __typename?: 'FillProfileGeopositionErrors'
          latitude?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
          longitude?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export type FillProfileNameMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type FillProfileNameMutation = {
  __typename?: 'Mutation'
  fillProfileName: {
    __typename?: 'FillProfileNameResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
    errors?:
      | {
          __typename?: 'FillProfileNameErrors'
          name?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export type ProfileFragmentFragment = {
  __typename?: 'Profile'
  id: string
  gender?: ProfileGender | undefined
  name?: string | undefined
  location?: string | undefined
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
    location
  }
`
export const FillProfileGenderDocument = gql`
  mutation fillProfileGender($gender: ProfileGender!) {
    fillProfileGender(input: { gender: $gender }) {
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
export const FillProfileGeopositionDocument = gql`
  mutation fillProfileGeoposition($latitude: Float!, $longitude: Float!) {
    fillProfileGeoposition(input: { latitude: $latitude, longitude: $longitude }) {
      result {
        ...ProfileFragment
      }
      errors {
        latitude {
          id
          message
        }
        longitude {
          id
          message
        }
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`
export const FillProfileNameDocument = gql`
  mutation fillProfileName($name: String!) {
    fillProfileName(input: { name: $name }) {
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
    fillProfileGender(
      variables: FillProfileGenderMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FillProfileGenderMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FillProfileGenderMutation>(FillProfileGenderDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fillProfileGender',
        'mutation',
        variables
      )
    },
    fillProfileGeoposition(
      variables: FillProfileGeopositionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FillProfileGeopositionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FillProfileGeopositionMutation>(
            FillProfileGeopositionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'fillProfileGeoposition',
        'mutation',
        variables
      )
    },
    fillProfileName(
      variables: FillProfileNameMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FillProfileNameMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FillProfileNameMutation>(FillProfileNameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fillProfileName',
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
