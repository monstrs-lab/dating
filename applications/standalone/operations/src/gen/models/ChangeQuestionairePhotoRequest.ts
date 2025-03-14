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

import { exists }    from '../runtime.js'
import { mapValues } from '../runtime.js'
/**
 *
 * @export
 * @interface ChangeQuestionairePhotoRequest
 */
export interface ChangeQuestionairePhotoRequest {
  /**
   *
   * @type {string}
   * @memberof ChangeQuestionairePhotoRequest
   */
  photoId: string
}

/**
 * Check if a given object implements the ChangeQuestionairePhotoRequest interface.
 */
export function instanceOfChangeQuestionairePhotoRequest(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'photoId' in value

  return isInstance
}

export function ChangeQuestionairePhotoRequestFromJSON(json: any): ChangeQuestionairePhotoRequest {
  return ChangeQuestionairePhotoRequestFromJSONTyped(json, false)
}

export function ChangeQuestionairePhotoRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ChangeQuestionairePhotoRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    photoId: json['photoId'],
  }
}

export function ChangeQuestionairePhotoRequestToJSON(
  value?: ChangeQuestionairePhotoRequest | null
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    photoId: value.photoId,
  }
}
