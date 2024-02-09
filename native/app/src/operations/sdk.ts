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

export type AddProfilePhotoErrors = {
  __typename?: 'AddProfilePhotoErrors'
  photoId?: Maybe<ValidationError>
}

export type AddProfilePhotoInput = {
  photoId: Scalars['String']['input']
}

export type AddProfilePhotoResponse = {
  __typename?: 'AddProfilePhotoResponse'
  errors?: Maybe<AddProfilePhotoErrors>
  result?: Maybe<Profile>
}

export type ConfirmUploadErrors = {
  __typename?: 'ConfirmUploadErrors'
  id?: Maybe<ValidationError>
}

export type ConfirmUploadInput = {
  id: Scalars['ID']['input']
}

export type ConfirmUploadResponse = {
  __typename?: 'ConfirmUploadResponse'
  errors?: Maybe<ConfirmUploadErrors>
  result?: Maybe<File>
}

export type CreateUploadErrors = {
  __typename?: 'CreateUploadErrors'
  bucket?: Maybe<ValidationError>
  name?: Maybe<ValidationError>
  size?: Maybe<ValidationError>
}

export type CreateUploadInput = {
  bucket: Scalars['String']['input']
  name: Scalars['String']['input']
  size: Scalars['Float']['input']
}

export type CreateUploadResponse = {
  __typename?: 'CreateUploadResponse'
  errors?: Maybe<CreateUploadErrors>
  result?: Maybe<Upload>
}

export type File = {
  __typename?: 'File'
  id: Scalars['String']['output']
  url: Scalars['String']['output']
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
  addProfilePhoto: AddProfilePhotoResponse
  confirmUpload: ConfirmUploadResponse
  createUpload: CreateUploadResponse
  fillProfileGender: FillProfileGenderResponse
  fillProfileGeoposition: FillProfileGeopositionResponse
  fillProfileName: FillProfileNameResponse
}

export type MutationAddProfilePhotoArgs = {
  input: AddProfilePhotoInput
}

export type MutationConfirmUploadArgs = {
  input: ConfirmUploadInput
}

export type MutationCreateUploadArgs = {
  input: CreateUploadInput
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

export type MyMatches = {
  __typename?: 'MyMatches'
  profiles: Array<Profile>
}

export type MyProfile = {
  __typename?: 'MyProfile'
  info: Profile
}

export type Profile = {
  __typename?: 'Profile'
  gender?: Maybe<ProfileGender>
  id: Scalars['String']['output']
  location?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  photos: Array<File>
}

export enum ProfileGender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type Query = {
  __typename?: 'Query'
  my: User
}

export type Upload = {
  __typename?: 'Upload'
  id: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']['output']
  matches: MyMatches
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

export type MyMatchesQueryVariables = Exact<{ [key: string]: never }>

export type MyMatchesQuery = {
  __typename?: 'Query'
  my: {
    __typename?: 'User'
    matches: {
      __typename?: 'MyMatches'
      profiles: Array<{ __typename?: 'Profile' } & ProfileFragmentFragment>
    }
  }
}

export type ProfileFragmentFragment = {
  __typename?: 'Profile'
  id: string
  gender?: ProfileGender | undefined
  name?: string | undefined
  location?: string | undefined
  photos: Array<{ __typename?: 'File'; id: string; url: string }>
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

export type CreateUploadMutationVariables = Exact<{
  bucket: Scalars['String']['input']
  name: Scalars['String']['input']
  size: Scalars['Float']['input']
}>

export type CreateUploadMutation = {
  __typename?: 'Mutation'
  createUpload: {
    __typename?: 'CreateUploadResponse'
    result?: { __typename?: 'Upload'; id: string; url: string } | undefined
  }
}

export type ConfirmUploadMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type ConfirmUploadMutation = {
  __typename?: 'Mutation'
  confirmUpload: {
    __typename?: 'ConfirmUploadResponse'
    result?: { __typename?: 'File'; id: string; url: string } | undefined
  }
}

export type AddProfilePhotoMutationVariables = Exact<{
  photoId: Scalars['String']['input']
}>

export type AddProfilePhotoMutation = {
  __typename?: 'Mutation'
  addProfilePhoto: {
    __typename?: 'AddProfilePhotoResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
    errors?:
      | {
          __typename?: 'AddProfilePhotoErrors'
          photoId?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export const ProfileFragmentFragmentDoc = gql`
  fragment ProfileFragment on Profile {
    id
    gender
    name
    location
    photos {
      id
      url
    }
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
export const MyMatchesDocument = gql`
  query myMatches {
    my {
      matches {
        profiles {
          ...ProfileFragment
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
export const CreateUploadDocument = gql`
  mutation createUpload($bucket: String!, $name: String!, $size: Float!) {
    createUpload(input: { bucket: $bucket, name: $name, size: $size }) {
      result {
        id
        url
      }
    }
  }
`
export const ConfirmUploadDocument = gql`
  mutation confirmUpload($id: ID!) {
    confirmUpload(input: { id: $id }) {
      result {
        id
        url
      }
    }
  }
`
export const AddProfilePhotoDocument = gql`
  mutation addProfilePhoto($photoId: String!) {
    addProfilePhoto(input: { photoId: $photoId }) {
      result {
        ...ProfileFragment
      }
      errors {
        photoId {
          id
          message
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
    myMatches(
      variables?: MyMatchesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<MyMatchesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MyMatchesQuery>(MyMatchesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'myMatches',
        'query',
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
    createUpload(
      variables: CreateUploadMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateUploadMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUploadMutation>(CreateUploadDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createUpload',
        'mutation',
        variables
      )
    },
    confirmUpload(
      variables: ConfirmUploadMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<ConfirmUploadMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ConfirmUploadMutation>(ConfirmUploadDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'confirmUpload',
        'mutation',
        variables
      )
    },
    addProfilePhoto(
      variables: AddProfilePhotoMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<AddProfilePhotoMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddProfilePhotoMutation>(AddProfilePhotoDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'addProfilePhoto',
        'mutation',
        variables
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
