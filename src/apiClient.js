import axios from 'axios'
import { SERVER_BASE_URL } from './constants'

export const getRestaurants = async ({
  radius,
  latitude,
  longitude
}) => {
  const { data } = await axios.post(`${SERVER_BASE_URL}/places/placesNearby`, {
    radius,
    latitude,
    longitude
  })

  return data
}

export const getMeals = async (userId) => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/mongo/recentMeals?userId=${userId}`)

  return data
}

export const postMeal = async ({ id, name, userId }) => {
  const { data } = await axios.post(`${SERVER_BASE_URL}/mongo/chosenMeal`, {
    id,
    name,
    userId
  })

  return data
}

export const getSettings = async (userId) => {
  const { data } = await axios.get(`${SERVER_BASE_URL}/mongo/settings?userId=${userId}`)

  return data
}

export const updateSettings = async (userId) => {
  const { data } = await axios.put(`${SERVER_BASE_URL}/mongo/settings`, {
    repeatRestaurants,
    distance,
    userId
  })

  return data
}

export const login = async ({ username, password }) => {
  const { data } = await axios.post(`${SERVER_BASE_URL}/user/login`, {
    username,
    password
  })

  return data
}

export const signup = async ({ username, password }) => {
  const { data } = await axios.post(`${SERVER_BASE_URL}/user/signup`, {
    username,
    password
  })

  return data
}
