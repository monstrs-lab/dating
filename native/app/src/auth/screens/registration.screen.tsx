import type { ReactElement }           from 'react'

import { FlowInputNode }               from '@monstrs/react-native-kratos'
import { FlowMessages }                from '@monstrs/react-native-kratos'
import { FlowNodeMessages }            from '@monstrs/react-native-kratos'
import { FlowSubmit }                  from '@monstrs/react-native-kratos'
import { ReactNativeRegistrationFlow } from '@monstrs/react-native-kratos'
import { Link }                        from 'expo-router'
import React                           from 'react'

import { Button }                      from '../../ui/button'
import { Input }                       from '../../ui/input'
import { Box }                         from '../../ui/layout'
import { Text }                        from '../../ui/text'

export const RegistrationScreen = (): ReactElement => (
  <ReactNativeRegistrationFlow>
    <Box p='3x' flex={1} justifyContent='center'>
      <Box>
        <FlowMessages>
          {(messages) => (
            <Box mb='3x'>
              {messages.map((message) => (
                <Text key={message.id} textAlign='center'>
                  {message.text}
                </Text>
              ))}
            </Box>
          )}
        </FlowMessages>
        <FlowInputNode name='traits.phone'>
          {(_, value, onChange) => (
            <Box>
              <Text mb='1x'>Телефон</Text>
              <Input value={value ? String(value) : ''} onChangeText={onChange} />
              <Box mt='1x' mb='2x'>
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
            </Box>
          )}
        </FlowInputNode>
        <FlowInputNode name='password'>
          {(_, value, onChange) => (
            <Box mb='5x'>
              <Text mb='1x'>Пароль</Text>
              <Input value={value ? String(value) : ''} onChangeText={onChange} />
              <Box mt='1x' mb='2x'>
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
        <Link asChild href='/(auth)'>
          <Button>Войти</Button>
        </Link>
      </Box>
    </Box>
  </ReactNativeRegistrationFlow>
)
