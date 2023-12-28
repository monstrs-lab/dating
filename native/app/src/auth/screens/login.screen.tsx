import type { StackScreenProps }   from '@react-navigation/stack'
import type { ReactElement }       from 'react'

import type { RootStackParamList } from '../../navigation.component'

import { FlowInputNode }           from '@monstrs/react-native-kratos'
import { FlowMessages }            from '@monstrs/react-native-kratos'
import { FlowNodeMessages }        from '@monstrs/react-native-kratos'
import { FlowSubmit }              from '@monstrs/react-native-kratos'
import { ReactNativeLoginFlow }    from '@monstrs/react-native-kratos'
import { View }                    from 'react-native'
import { TextInput }               from 'react-native'
import { TouchableOpacity }        from 'react-native'
import { Text }                    from 'react-native'
import React                       from 'react'

export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>

export const LoginScreen = ({ navigation, route }: LoginScreenProps): ReactElement => (
  <ReactNativeLoginFlow route={route}>
    <View>
      <FlowMessages>
        {(messages) => (
          <View>
            {messages.map((message) => (
              <Text key={message.id}>{message.text}</Text>
            ))}
          </View>
        )}
      </FlowMessages>
      <FlowInputNode name='identifier'>
        {(_, value, onChange) => (
          <View>
            <Text>Логин</Text>
            <TextInput value={value ? String(value) : ''} onChangeText={onChange} />
            <FlowNodeMessages name='identifier'>
              {(messages) => (
                <View>
                  {messages.map((message) => (
                    <Text key={message.id}>{message.text}</Text>
                  ))}
                </View>
              )}
            </FlowNodeMessages>
          </View>
        )}
      </FlowInputNode>
      <FlowInputNode name='password'>
        {(_, value, onChange) => (
          <View>
            <Text>Пароль</Text>
            <TextInput value={value ? String(value) : ''} onChangeText={onChange} />
            <FlowNodeMessages name='password'>
              {(messages) => (
                <View>
                  {messages.map((message) => (
                    <Text key={message.id}>{message.text}</Text>
                  ))}
                </View>
              )}
            </FlowNodeMessages>
          </View>
        )}
      </FlowInputNode>
      <FlowSubmit>
        {({ submitting, onSubmit }) => (
          <TouchableOpacity
            disabled={submitting}
            onPress={() => {
              onSubmit({ method: 'password' })
            }}
          >
            <Text>Войти</Text>
          </TouchableOpacity>
        )}
      </FlowSubmit>
    </View>
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Registration')
        }}
      >
        <Text>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  </ReactNativeLoginFlow>
)
