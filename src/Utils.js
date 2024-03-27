import { Animated } from "react-native";


export async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
  
    return response;
}


export const startShake = (transformRef) => {
  Animated.sequence([
    Animated.timing(transformRef, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(transformRef, { toValue: -10, duration: 100, useNativeDriver: true }),
    Animated.timing(transformRef, { toValue: 10, duration: 100, useNativeDriver: true }),
    Animated.timing(transformRef, { toValue: 0, duration: 100, useNativeDriver: true })
  ]).start();
}