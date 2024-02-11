import type { ReactElement }   from 'react'

import type { Profile }        from '../../shared'

import { ImageBackground }     from 'react-native'
import { useEffect }           from 'react'
import { useState }            from 'react'
import { useRef }              from 'react'
import { useWindowDimensions } from 'react-native'
import React                   from 'react'
import Swiper                  from 'react-native-deck-swiper'

import { Box }                 from '../../ui/layout'
import { Text }                from '../../ui/text'
import operations              from '../../operations'

export const MatchesScreen = (): ReactElement | null => {
  const { height } = useWindowDimensions()
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [matches, setMatches] = useState<Array<Profile>>([])
  const ref = useRef<Swiper<Profile>>(null)

  useEffect(() => {
    const loadMatches = async (): Promise<void> => {
      const { my } = await operations.myMatches()

      setMatches(my.matches.profiles)
    }

    loadMatches()
  }, [setMatches])

  useEffect(() => {
    if (height && containerHeight && ref?.current) {
      ref.current.forceUpdate()
    }
  }, [containerHeight, height, ref])

  if (matches.length === 0) {
    return null
  }

  return (
    <Box
      flex={1}
      onLayout={(ev) => {
        setContainerHeight(ev.nativeEvent.layout.height)
      }}
    >
      <Swiper
        ref={ref}
        animateCardOpacity
        backgroundColor='transparent'
        cardVerticalMargin={20}
        cardHorizontalMargin={20}
        marginBottom={height - containerHeight}
        stackSize={2}
        cards={matches}
        renderCard={(card, index) => (
          <Box borderRadius='24' flex={1} backgroundColor='gray' overflow='hidden'>
            <ImageBackground
              source={{ uri: card?.photos?.[0].url }}
              src={card?.photos?.[0].url}
              resizeMode='cover'
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Box margin='5x'>
                <Text fontWeight='700' fontSize={28} color='white'>
                  {card.name} - {index}
                </Text>
              </Box>
            </ImageBackground>
          </Box>
        )}
      />
    </Box>
  )
}
