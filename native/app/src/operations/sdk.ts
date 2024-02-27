/* eslint-disable */
// @ts-nocheck
import type { GraphQLClient }  from 'graphql-request'
import type { RequestOptions } from 'graphql-request'

import gql                     from 'graphql-tag'

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
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
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

export type AddSurveyAnswerErrors = {
  __typename?: 'AddSurveyAnswerErrors'
  answer?: Maybe<ValidationError>
  questionId?: Maybe<ValidationError>
  surveyId?: Maybe<ValidationError>
}

export type AddSurveyAnswerInput = {
  answer: Scalars['Float']['input']
  questionId: Scalars['String']['input']
  surveyId: Scalars['String']['input']
}

export type AddSurveyAnswerResponse = {
  __typename?: 'AddSurveyAnswerResponse'
  errors?: Maybe<AddSurveyAnswerErrors>
  result?: Maybe<Survey>
}

export type Answer = {
  __typename?: 'Answer'
  id: Scalars['String']['output']
  value?: Maybe<Scalars['Float']['output']>
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

export type LikeProfileErrors = {
  __typename?: 'LikeProfileErrors'
  targetId?: Maybe<ValidationError>
}

export type LikeProfileInput = {
  targetId: Scalars['String']['input']
}

export type LikeProfileResponse = {
  __typename?: 'LikeProfileResponse'
  errors?: Maybe<LikeProfileErrors>
  result?: Maybe<Profile>
}

export type Match = {
  __typename?: 'Match'
  profile: Profile
  similarity?: Maybe<Similarity>
}

export type Matches = {
  __typename?: 'Matches'
  hasNextPage: Scalars['Boolean']['output']
  matches: Array<Match>
}

export type Mutation = {
  __typename?: 'Mutation'
  addProfilePhoto: AddProfilePhotoResponse
  addSurveyAnswer: AddSurveyAnswerResponse
  confirmUpload: ConfirmUploadResponse
  createUpload: CreateUploadResponse
  fillProfileGender: FillProfileGenderResponse
  fillProfileGeoposition: FillProfileGeopositionResponse
  fillProfileName: FillProfileNameResponse
  likeProfile: LikeProfileResponse
  skipProfile: SkipProfileResponse
  startSurvey: StartSurveyResponse
}

export type MutationAddProfilePhotoArgs = {
  input: AddProfilePhotoInput
}

export type MutationAddSurveyAnswerArgs = {
  input: AddSurveyAnswerInput
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

export type MutationLikeProfileArgs = {
  input: LikeProfileInput
}

export type MutationSkipProfileArgs = {
  input: SkipProfileInput
}

export type MutationStartSurveyArgs = {
  input: StartSurveyInput
}

export type MyCompatibility = {
  __typename?: 'MyCompatibility'
  questionaires: Array<Questionaire>
}

export type MyMatches = {
  __typename?: 'MyMatches'
  profiles: Array<Profile>
}

export type MyMatching = {
  __typename?: 'MyMatching'
  matches: Matches
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

export type Question = {
  __typename?: 'Question'
  content: Scalars['String']['output']
  id: Scalars['String']['output']
}

export type Questionaire = {
  __typename?: 'Questionaire'
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  photo?: Maybe<File>
  questions: Array<Question>
  status: QuestionaireStatus
  survey?: Maybe<Survey>
}

export enum QuestionaireStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type Similarity = {
  __typename?: 'Similarity'
  id: Scalars['String']['output']
  value: Scalars['Float']['output']
}

export type SkipProfileErrors = {
  __typename?: 'SkipProfileErrors'
  targetId?: Maybe<ValidationError>
}

export type SkipProfileInput = {
  targetId: Scalars['String']['input']
}

export type SkipProfileResponse = {
  __typename?: 'SkipProfileResponse'
  errors?: Maybe<SkipProfileErrors>
  result?: Maybe<Profile>
}

export type StartSurveyErrors = {
  __typename?: 'StartSurveyErrors'
  questionaireId?: Maybe<ValidationError>
}

export type StartSurveyInput = {
  questionaireId: Scalars['String']['input']
}

export type StartSurveyResponse = {
  __typename?: 'StartSurveyResponse'
  errors?: Maybe<StartSurveyErrors>
  result?: Maybe<Survey>
}

export type Survey = {
  __typename?: 'Survey'
  answers: Array<Answer>
  id: Scalars['String']['output']
  status: SurveyStatus
}

export enum SurveyStatus {
  Completed = 'COMPLETED',
  Started = 'STARTED',
}

export type Upload = {
  __typename?: 'Upload'
  id: Scalars['String']['output']
  url: Scalars['String']['output']
}

export type User = {
  __typename?: 'User'
  compatibility: MyCompatibility
  id: Scalars['String']['output']
  matches: MyMatches
  matching: MyMatching
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

export type AddSurveyAnswerMutationVariables = Exact<{
  input: AddSurveyAnswerInput
}>

export type AddSurveyAnswerMutation = {
  __typename?: 'Mutation'
  addSurveyAnswer: {
    __typename?: 'AddSurveyAnswerResponse'
    result?:
      | {
          __typename?: 'Survey'
          id: string
          status: SurveyStatus
          answers: Array<{ __typename?: 'Answer'; id: string; value?: number | undefined }>
        }
      | undefined
    errors?:
      | {
          __typename?: 'AddSurveyAnswerErrors'
          surveyId?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
          questionId?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
          answer?: { __typename?: 'ValidationError'; id: string; message: string } | undefined
        }
      | undefined
  }
}

export type MyCompatibilityQueryVariables = Exact<{ [key: string]: never }>

export type MyCompatibilityQuery = {
  __typename?: 'Query'
  my: {
    __typename?: 'User'
    compatibility: {
      __typename?: 'MyCompatibility'
      questionaires: Array<{
        __typename?: 'Questionaire'
        id: string
        status: QuestionaireStatus
        name: string
        photo?: { __typename?: 'File'; id: string; url: string } | undefined
        questions: Array<{ __typename?: 'Question'; id: string; content: string }>
        survey?:
          | {
              __typename?: 'Survey'
              id: string
              status: SurveyStatus
              answers: Array<{ __typename?: 'Answer'; id: string; value?: number | undefined }>
            }
          | undefined
      }>
    }
  }
}

export type SkipProfileMutationVariables = Exact<{
  targetId: Scalars['String']['input']
}>

export type SkipProfileMutation = {
  __typename?: 'Mutation'
  skipProfile: {
    __typename?: 'SkipProfileResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
  }
}

export type LikeProfileMutationVariables = Exact<{
  targetId: Scalars['String']['input']
}>

export type LikeProfileMutation = {
  __typename?: 'Mutation'
  likeProfile: {
    __typename?: 'LikeProfileResponse'
    result?: ({ __typename?: 'Profile' } & ProfileFragmentFragment) | undefined
  }
}

export type MyMatchesQueryVariables = Exact<{ [key: string]: never }>

export type MyMatchesQuery = {
  __typename?: 'Query'
  my: {
    __typename?: 'User'
    matching: {
      __typename?: 'MyMatching'
      matches: {
        __typename?: 'Matches'
        matches: Array<{
          __typename?: 'Match'
          profile: { __typename?: 'Profile' } & ProfileFragmentFragment
          similarity?: { __typename?: 'Similarity'; id: string; value: number } | undefined
        }>
      }
    }
  }
}

export type StartSurveyMutationVariables = Exact<{
  questionaireId: Scalars['String']['input']
}>

export type StartSurveyMutation = {
  __typename?: 'Mutation'
  startSurvey: {
    __typename?: 'StartSurveyResponse'
    result?:
      | {
          __typename?: 'Survey'
          id: string
          status: SurveyStatus
          answers: Array<{ __typename?: 'Answer'; id: string; value?: number | undefined }>
        }
      | undefined
    errors?:
      | {
          __typename?: 'StartSurveyErrors'
          questionaireId?:
            | { __typename?: 'ValidationError'; id: string; message: string }
            | undefined
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
export const AddSurveyAnswerDocument = gql`
  mutation addSurveyAnswer($input: AddSurveyAnswerInput!) {
    addSurveyAnswer(input: $input) {
      result {
        id
        status
        answers {
          id
          value
        }
      }
      errors {
        surveyId {
          id
          message
        }
        questionId {
          id
          message
        }
        answer {
          id
          message
        }
      }
    }
  }
`
export const MyCompatibilityDocument = gql`
  query myCompatibility {
    my {
      compatibility {
        questionaires {
          id
          status
          name
          photo {
            id
            url
          }
          questions {
            id
            content
          }
          survey {
            id
            status
            answers {
              id
              value
            }
          }
        }
      }
    }
  }
`
export const SkipProfileDocument = gql`
  mutation skipProfile($targetId: String!) {
    skipProfile(input: { targetId: $targetId }) {
      result {
        ...ProfileFragment
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`
export const LikeProfileDocument = gql`
  mutation likeProfile($targetId: String!) {
    likeProfile(input: { targetId: $targetId }) {
      result {
        ...ProfileFragment
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`
export const MyMatchesDocument = gql`
  query myMatches {
    my {
      matching {
        matches {
          matches {
            profile {
              ...ProfileFragment
            }
            similarity {
              id
              value
            }
          }
        }
      }
    }
  }
  ${ProfileFragmentFragmentDoc}
`
export const StartSurveyDocument = gql`
  mutation startSurvey($questionaireId: String!) {
    startSurvey(input: { questionaireId: $questionaireId }) {
      result {
        id
        status
        answers {
          id
          value
        }
      }
      errors {
        questionaireId {
          id
          message
        }
      }
    }
  }
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

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) =>
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
    addSurveyAnswer(
      variables: AddSurveyAnswerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<AddSurveyAnswerMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddSurveyAnswerMutation>(AddSurveyAnswerDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'addSurveyAnswer',
        'mutation',
        variables
      )
    },
    myCompatibility(
      variables?: MyCompatibilityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<MyCompatibilityQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MyCompatibilityQuery>(MyCompatibilityDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'myCompatibility',
        'query',
        variables
      )
    },
    skipProfile(
      variables: SkipProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<SkipProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SkipProfileMutation>(SkipProfileDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'skipProfile',
        'mutation',
        variables
      )
    },
    likeProfile(
      variables: LikeProfileMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<LikeProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LikeProfileMutation>(LikeProfileDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'likeProfile',
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
    startSurvey(
      variables: StartSurveyMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<StartSurveyMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<StartSurveyMutation>(StartSurveyDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'startSurvey',
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
