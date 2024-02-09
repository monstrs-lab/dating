import type { ReactElement } from 'react'

import type { Profile }      from '../../shared'

import { useEffect }         from 'react'
import { useState }          from 'react'
import React                 from 'react'
import Swiper                from 'react-native-deck-swiper'

import { Box }               from '../../ui/layout'
import { Text }              from '../../ui/text'
import operations            from '../../operations'

export const MatchesScreen = (): ReactElement | null => {
  const [matches, setMatches] = useState<Array<Profile>>([])

  useEffect(() => {
    const loadMatches = async (): Promise<void> => {
      const { my } = await operations.myMatches()

      setMatches(my.matches.profiles)
    }

    loadMatches()
  }, [setMatches])

  if (matches.length === 0) {
    return null
  }

  return (
    <Box>
      <Swiper
        cards={matches}
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
