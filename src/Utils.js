import { Animated } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
    mode: 'cors',
    credentials: 'include',
    headers: {
      ...options.headers,
      'ngrok-skip-browser-warning': true
    }
  });
  clearTimeout(id);

  return response;
}

export async function asyncFetchPosts(posts) {
  
  return Promise.all(
      posts.map(async (id) => {
        let tmp = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/posts/fetch/${id}`,
          {
            mode: 'cors',
            credentials: 'include',
            headers: {
              'ngrok-skip-browser-warning': true
            }
          }
        )
        return tmp.json()
      })
  ).then(
    (ret) => {
      return ret
    }
  )
}

export async function asyncFetchGroups(posts) {
  
  return Promise.all(
      posts.map(async (id) => {
        let tmp = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/groups/fetch/${id}`,
          {
            mode: 'cors',
            credentials: 'include',
            headers: {
              'ngrok-skip-browser-warning': true
            }
          }
        )
        return tmp.json()
      })
  ).then(
    (ret) => {
      return ret
    }
  )
}

export function startShake(transformRef) {
  Animated.sequence([
    Animated.timing(transformRef, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(transformRef, { toValue: -10, duration: 100, useNativeDriver: true }),
    Animated.timing(transformRef, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(transformRef, { toValue: 0, duration: 100, useNativeDriver: true })
  ]).start();
}


export async function getCurrentUserID() {
  try {
    return await AsyncStorage.getItem('currentUserID')
  } catch (error) {
    console.log(error)
  }
}