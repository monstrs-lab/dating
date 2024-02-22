import type { ReactElement }   from 'react'

import type { Profile }        from '../../shared'

import { ImageBackground }     from 'react-native'
import { useCallback }         from 'react'
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
  const [matches, setMatches] = useState<
    Array<{
      profile: Profile
      similary?: { id: string; value: number }
    }>
  >([])
  const ref = useRef<
    Swiper<{
      profile: Profile
      similary?: { id: string; value: number }
    }>
  >(null)

  useEffect(() => {
    const loadMatches = async (): Promise<void> => {
      const { my } = await operations.myMatches()

      setMatches(my.matching.matches.matches)
    }

    loadMatches()
  }, [setMatches])

  useEffect(() => {
    if (height && containerHeight && ref?.current) {
      ref.current.forceUpdate()
    }
  }, [containerHeight, height, ref])

  const skipProfile = useCallback(
    async (cardIndex: number): Promise<void> => {
      const match = matches.at(cardIndex)

      if (match) {
        await operations.skipProfile({ targetId: match.profile.id })
      }
    },
    [matches]
  )

  const likeProfile = useCallback(
    async (cardIndex: number): Promise<void> => {
      const match = matches.at(cardIndex)

      if (match) {
        await operations.likeProfile({ targetId: match.profile.id })
      }
    },
    [matches]
  )

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
              source={{ uri: card?.profile?.photos?.[0]?.url }}
              src={card?.profile?.photos?.[0]?.url}
              resizeMode='cover'
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Box margin='5x'>
                <Text fontWeight='700' fontSize={28} color='white'>
                  {card.profile.name} - {index}
                </Text>
              </Box>
            </ImageBackground>
          </Box>
        )}
        onSwipedLeft={(cardIndex) => {
          skipProfile(cardIndex)
        }}
        onSwipedRight={(cardIndex) => {
          likeProfile(cardIndex)
        }}
      />
    </Box>
  )
}
