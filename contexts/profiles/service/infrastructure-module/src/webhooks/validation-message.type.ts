export interface ValidationMessageText {
  id: number
  text: string
  type: 'validation'
  context: object
}

export interface ValidationMessage {
  instance_ptr: string
  messages: Array<ValidationMessageText>
}
