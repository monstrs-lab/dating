// @ts-nocheck
/* eslint-disable */
/**
 * Dating backoffice
 * The Dating backoffice API description
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { QuestionaireEntity }         from './QuestionaireEntity.js'

import { QuestionaireEntityFromJSON }      from './QuestionaireEntity.js'
import { QuestionaireEntityFromJSONTyped } from './QuestionaireEntity.js'
import { QuestionaireEntityToJSON }        from './QuestionaireEntity.js'
import { exists }                          from '../runtime.js'
import { mapValues }                       from '../runtime.js'

/**
 *
 * @export
 * @interface ListQuestionairesResponse
 */
export interface ListQuestionairesResponse {
  /**
   * List questionaires items
   * @type {Array<QuestionaireEntity>}
   * @memberof ListQuestionairesResponse
   */
  questionaires: Array<QuestionaireEntity>
  /**
   * Next page indicator
   * @type {boolean}
   * @memberof ListQuestionairesResponse
   */
  hasNextPage: boolean
}

/**
 * Check if a given object implements the ListQuestionairesResponse interface.
 */
export function instanceOfListQuestionairesResponse(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'questionaires' in value
  isInstance = isInstance && 'hasNextPage' in value

  return isInstance
}

export function ListQuestionairesResponseFromJSON(json: any): ListQuestionairesResponse {
  return ListQuestionairesResponseFromJSONTyped(json, false)
}

export function ListQuestionairesResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ListQuestionairesResponse {
  if (json === undefined || json === null) {
    return json
  }
  return {
    questionaires: (json['questionaires'] as Array<any>).map(QuestionaireEntityFromJSON),
    hasNextPage: json['hasNextPage'],
  }
}

export function ListQuestionairesResponseToJSON(value?: ListQuestionairesResponse | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    questionaires: (value.questionaires as Array<any>).map(QuestionaireEntityToJSON),
    hasNextPage: value.hasNextPage,
  }
}
