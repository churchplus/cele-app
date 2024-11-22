import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomStatusBar = ({ backgroundColor, barStyle, translucent }) => {
  // const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const insets = useSafeAreaInsets();
  const iosstatusBarHeight = translucent ?? insets.top;
  const androidStatusHeight = translucent ?? StatusBar.currentHeight;

  return (
    <>
      {
        Platform.OS === 'android' ? (
          <View style={{ height: !translucent ?? insets.top, backgroundColor }}>
            <StatusBar
              animated={true}
              backgroundColor={backgroundColor}
              barStyle={barStyle}
              translucent={translucent}
            />
          </View>
        ) : (
          <View style={{ height: Platform.OS === 'android' ? androidStatusHeight : iosstatusBarHeight, backgroundColor }}>
            <StatusBar
              animated={true}
              backgroundColor={backgroundColor}
              barStyle={barStyle}
              translucent={translucent}
            />
          </View>
        )
      }
    </>
  );
};

export default CustomStatusBar;