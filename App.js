import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import Card from './src/components/card';
import users from './assets/data/users';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler, 
  useDerivedValue,
  interpolate,
  withSpring,
  runOnJS
 } from 'react-native-reanimated';

const ROTATION = -20;
const SWIPE_VELOCITY = 800;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);
  const currentAnimal = users[currentIndex];
  const nextAnimal = users[nextIndex];
  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(() => interpolate(
    translateX.value,
    [0, hiddenTranslateX],
    [0, ROTATION]
  ) + 'deg');

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value, },
      { rotate: rotate.value, }
    ]
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.8, 1]) }
    ],
    opacity: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.7, 1])
  }));
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX), 
        {}, 
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
      );
    }
  });

  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  return (
      <View style={styles.pageContainer}>
        {nextAnimal && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.animatedCard, nextCardStyle]}>
            <Card user={nextAnimal}/>
          </Animated.View>
        </View>
        )}
        {currentAnimal && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Card user={currentAnimal}/>
          </Animated.View>
        </PanGestureHandler>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  animatedCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextCardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  }
})

export default App;