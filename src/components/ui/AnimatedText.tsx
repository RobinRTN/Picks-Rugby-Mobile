import React, { useEffect } from 'react';
import { Text, TextProps } from 'react-native';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    withSpring,
    interpolate,
    Extrapolate,
    withDelay,
    withSequence,
    withRepeat,
    Easing
} from 'react-native-reanimated';

interface AnimatedTextProps extends TextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  animationType?: 'fade' | 'slide' | 'bounce' | 'scale' | 'typewriter' | 'modern';
  repeat?: boolean;
  style?: any;
}

export function AnimatedText({ 
  children, 
  delay = 0, 
  duration = 800,
  animationType = 'modern',
  repeat = false,
  style,
  ...props 
}: AnimatedTextProps) {
  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40); // Start from bottom
  const scale = useSharedValue(0.95);
  const progress = useSharedValue(0);

  // Get animation based on type
  const getAnimation = () => {
    const baseDelay = delay;
    
    switch (animationType) {
      case 'modern':
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.6,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withSpring(0, { 
            damping: 18, 
            stiffness: 120,
            mass: 0.9,
            overshootClamping: false
          })),
          scale: withDelay(baseDelay, withSpring(1, { 
            damping: 18, 
            stiffness: 120,
            mass: 0.9
          }))
        };
      
      case 'fade':
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withTiming(0, { 
            duration,
            easing: Easing.out(Easing.cubic)
          })),
          scale: withDelay(baseDelay, withTiming(1, { 
            duration,
            easing: Easing.out(Easing.cubic)
          }))
        };
      
      case 'slide':
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.7,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withSpring(0, { 
            damping: 20, 
            stiffness: 100,
            mass: 0.8
          })),
          scale: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.7,
            easing: Easing.out(Easing.cubic)
          }))
        };
      
      case 'bounce':
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.5,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withSpring(0, { 
            damping: 12, 
            stiffness: 100,
            mass: 0.7,
            overshootClamping: false
          })),
          scale: withDelay(baseDelay, withSpring(1, { 
            damping: 12, 
            stiffness: 100,
            mass: 0.7
          }))
        };
      
      case 'scale':
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.6,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withTiming(0, { 
            duration: duration * 0.6,
            easing: Easing.out(Easing.cubic)
          })),
          scale: withDelay(baseDelay, withSpring(1, { 
            damping: 16, 
            stiffness: 110,
            mass: 0.8
          }))
        };
      
      case 'typewriter':
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.4,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withTiming(0, { 
            duration: duration * 0.4,
            easing: Easing.out(Easing.cubic)
          })),
          scale: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.4,
            easing: Easing.out(Easing.cubic)
          }))
        };
      
      default:
        return {
          opacity: withDelay(baseDelay, withTiming(1, { 
            duration: duration * 0.6,
            easing: Easing.out(Easing.cubic)
          })),
          translateY: withDelay(baseDelay, withSpring(0, { 
            damping: 18, 
            stiffness: 120,
            mass: 0.9
          })),
          scale: withDelay(baseDelay, withSpring(1, { 
            damping: 18, 
            stiffness: 120,
            mass: 0.9
          }))
        };
    }
  };

  // Animated style with enhanced interpolation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { 
          translateY: translateY.value 
        },
        { 
          scale: interpolate(
            scale.value,
            [0.95, 1],
            [0.95, 1],
            Extrapolate.CLAMP
          )
        }
      ],
    };
  });

  // Start animation when component mounts
  useEffect(() => {
    const animations = getAnimation();
    
    opacity.value = animations.opacity;
    translateY.value = animations.translateY;
    scale.value = animations.scale;

    // Optional repeat animation with modern pulse effect
    if (repeat) {
      const repeatAnimation = () => {
        opacity.value = withDelay(3000, withSequence(
          withTiming(0.85, { 
            duration: 600,
            easing: Easing.inOut(Easing.cubic)
          }),
          withTiming(1, { 
            duration: 600,
            easing: Easing.inOut(Easing.cubic)
          })
        ));
      };
      
      setTimeout(repeatAnimation, delay + duration + 1500);
    }
  }, [delay, duration, animationType, repeat]);

  return (
    <Animated.Text 
      style={[animatedStyle, style]} 
      {...props}
    >
      {children}
    </Animated.Text>
  );
} 