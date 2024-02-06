import type { StackScreenProps }       from '@react-navigation/stack'
import type { ReactElement }           from 'react'

import type { RootStackParamList }     from '../../navigation.component'

import { FlowInputNode }               from '@monstrs/react-native-kratos'
import { FlowMessages }                from '@monstrs/react-native-kratos'
import { FlowNodeMessages }            from '@monstrs/react-native-kratos'
import { FlowSubmit }                  from '@monstrs/react-native-kratos'
import { ReactNativeRegistrationFlow } from '@monstrs/react-native-kratos'
import { TextInput }                   from 'react-native'
import React                           from 'react'

import { Button }                      from '../../ui/button'
import { Box }                         from '../../ui/layout'
import { Text }                        from '../../ui/text'

export type RegistrationScreenProps = StackScreenProps<RootStackParamList, 'Registration'>

export const RegistrationScreen = ({ navigation }: RegistrationScreenProps): ReactElement => (
  <ReactNativeRegistrationFlow>
    <Box p='3x' flex={1} justifyContent='center'>
      <Box>
        <FlowMessages>
          {(messages) => (
            <Box>
              {messages.map((message) => (
                <Text key={message.id}>{message.text}</Text>
              ))}
            </Box>
          )}
        </FlowMessages>
        <FlowInputNode name='traits.phone'>
          {(_, value, onChange) => (
            <Box>
              <Text>Телефон</Text>
              <TextInput value={value ? String(value) : ''} onChangeText={onChange} />
              <FlowNodeMessages name='traits.phone'>
                {(messages) => (
                  <Box>
                    {messages.map((message) => (
                      <Text key={message.id}>{message.text}</Text>
                    ))}
                  </Box>
                )}
              </FlowNodeMessages>
            </Box>
          )}
        </FlowInputNode>
        <FlowInputNode name='password'>
          {(_, value, onChange) => (
            <Box>
              <Text>Пароль</Text>
              <TextInput value={value ? String(value) : ''} onChangeText={onChange} />
              <FlowNodeMessages name='password'>
                {(messages) => (
                  <Box>
                    {messages.map((message) => (
                      <Text key={message.id}>{message.text}</Text>
                    ))}
                  </Box>
                )}
              </FlowNodeMessages>
            </Box>
          )}
        </FlowInputNode>
        <FlowSubmit>
          {({ submitting, onSubmit }) => (
            <Button
              disabled={submitting}
              onPress={() => {
                onSubmit({ method: 'password' })
              }}
            >
              Зарегистрироваться
            </Button>
          )}
        </FlowSubmit>
      </Box>
      <Box marginTop='3x'>
        <Button
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          Войти
        </Button>
      </Box>
    </Box>
  </ReactNativeRegistrationFlow>
)
