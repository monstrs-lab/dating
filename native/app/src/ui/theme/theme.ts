import { createTheme }    from '@shopify/restyle'

import { breakpoints }    from './breakpoints'
import { colors }         from './colors'
import { radii }          from './radii'
import { shadows }        from './shadows'
import { spacing }        from './spacing'
import { buttonVariants } from './variants'
import { inputVariants }  from './variants'
import { zIndices }       from './z-index'

export const theme = createTheme({
  colors,
  spacing,
  borderRadii: radii,
  zIndices,
  breakpoints,
  shadows,
  textVariants: {
    defaults: {},
  },
  ...buttonVariants,
  ...inputVariants,
})

export type Theme = typeof theme
