import type { ReactElement } from 'react'

import type { Profile }      from '../../shared'

import { View }              from 'react-native'
import { Text }              from 'react-native'
import { useEffect }         from 'react'
import { useState }          from 'react'
import React                 from 'react'
import Swiper                from 'react-native-deck-swiper'

import operations            from '../../operations'

export const RecommendationsScreen = (): ReactElement | null => {
  const [recommendations, setRecommendations] = useState<Array<Profile>>([])

  useEffect(() => {
    const loadRecommendations = async (): Promise<void> => {
      const { my } = await operations.myRecommendations()

      setRecommendations(my.recommendations.profiles)
    }

    loadRecommendations()
  }, [setRecommendations])

  if (recommendations.length === 0) {
    return null
  }

  return (
    <View>
      <Swiper
        cards={recommendations}
        renderCard={(card, index) => (
          <View
            style={{
              flex: 1,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: '#E8E8E8',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Text>
              {card.name} - {index}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
