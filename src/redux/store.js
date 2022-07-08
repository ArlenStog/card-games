import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { pokemonReducer } from './pokemon/pokemons.slice'

const middlewares = [logger, thunk]

export const store = configureStore({
  reducer: pokemonReducer,
  middleware: middlewares
})