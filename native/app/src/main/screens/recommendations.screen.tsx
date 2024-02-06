import type { ReactElement } from 'react'

import type { Profile }      from '../../shared'

import { useEffect }         from 'react'
import { useState }          from 'react'
import React                 from 'react'
import Swiper                from 'react-native-deck-swiper'

import { Box }               from '../../ui/layout'
import { Text }              from '../../ui/text'
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
    <Box>
      <Swiper
        cards={recommendations}
        renderCard={(card, index) => (
          <Box
            borderRadius='4'
            flex={1}
            justifyContent='center'
            borderWidth={2}
            borderColor='gray'
            backgroundColor='white'
          >
            <Text>
              {card.name} - {index}
            </Text>
          </Box>
        )}
      />
    </Box>
  )
}
