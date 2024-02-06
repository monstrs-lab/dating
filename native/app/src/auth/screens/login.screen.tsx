import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { FlowInputNode }           from '@monstrs/react-native-kratos'
import { FlowMessages }            from '@monstrs/react-native-kratos'
import { FlowNodeMessages }        from '@monstrs/react-native-kratos'
import { FlowSubmit }              from '@monstrs/react-native-kratos'
import { ReactNativeLoginFlow }    from '@monstrs/react-native-kratos'
import { TextInput }               from 'react-native'
import React                       from 'react'

import { Button }                  from '../../ui/button'
import { Box }                     from '../../ui/layout'
import { Text }                    from '../../ui/text'

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen = ({ navigation, route }: LoginScreenProps): ReactElement => (
  <ReactNativeLoginFlow route={route}>
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
        <FlowInputNode name='identifier'>
          {(_, value, onChange) => (
            <Box>
              <Text>Логин</Text>
              <TextInput value={value ? String(value) : ''} onChangeText={onChange} />
              <FlowNodeMessages name='identifier'>
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
              Войти
            </Button>
          )}
        </FlowSubmit>
      </Box>
      <Box marginTop='3x'>
        <Button
          onPress={() => {
            navigation.navigate('Registration')
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  </ReactNativeLoginFlow>
)
