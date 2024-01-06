import { Dimensions, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';


const Dimensoes = (props = { minWidth: 0 }) => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('screen'));


  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions(Dimensions.get('window'));
      setScreenDimensions(Dimensions.get('screen'));
    };
    Dimensions.addEventListener('change', updateWindowDimensions);
    Platform.OS === 'web' && Dimensions.removeEventListener('change', updateWindowDimensions);
  }, []);


  const { width, height } = windowDimensions;
  const IsWeb = props.minWidth !== 0 ? width > props.minWidth : width > height;
  const navigationBarHeight = Constants.statusBarHeight === 0 ? 0 : screenDimensions.height - (height + Constants.statusBarHeight);


  return {
    ...windowDimensions,
    screen: screenDimensions,
    IsWeb,
    menuBarHeight: IsWeb ? 0 : 50,
    statusBarHeight: Constants.statusBarHeight,
    navigationBarHeight,
    Constants
  };
};


export { Dimensoes };
