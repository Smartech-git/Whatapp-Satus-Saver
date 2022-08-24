import { View, Text, Image, StyleSheet, Animated, Pressable, Easing} from 'react-native'
import { useStateValue } from '../StateProvider'
import { Shadow } from 'react-native-shadow-2'
import { actionTypes } from '../Reducer'
import { mergeToObjectSettings, settingsType } from '../APIs'
import React from 'react'

const themeEmojis = {
  light : require('../assets/Images/EmojiPack/Sun_Behind_Small_Cloud.png'),
  dark: require('../assets/Images/EmojiPack/Crescent_Moon.png')
}

export default function Header(props) {
  const [state, dispatch] = useStateValue();

  let swipe = new Animated.Value(state.theme === 'LIGHT' ? 0 : 35)

  const handlePressEvent = (e) => {
    Animated.timing(swipe,
      {
        toValue: state.theme === 'LIGHT' ? 35 : 0,
        duration: 170,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2.8))
      }
    ).start(() => {
      const action = {
        type: actionTypes.setTheme,
        theme: state.theme === 'LIGHT' ? 'DARK' : 'LIGHT'
        }
      dispatch(action);
      mergeToObjectSettings(state.theme === 'LIGHT' ? settingsType.setThemeDark : settingsType.setThemeLight)
    });
  }
 
  return (
    <View style={styles.Header}>
      <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: state.themeHue.primary_dark, padding: 6, borderRadius: 50}}>
          <Image style={{ width: 28, height: 28}} source={require('../assets/Images/Status.png')} />
        </View>
        <Text style={{fontFamily: props.fontFamily, color: state.themeHue.secondary, fontSize: 23,
          marginTop: 6,
          marginLeft: 5
        }}>Status Saver</Text>
      </View>

      <Pressable onPress={handlePressEvent}  style={{...styles.themeButton, 
        backgroundColor: state.themeHue.primary_dark, 
        borderColor: state.themeHue.secondary_sub,
      }}>
        <View style={{zIndex: 1}}>
          <Animated.View style={{position: 'relative', transform: [{ translateX: swipe}]}}>
            <View >
                <Shadow startColor={ state.theme === 'LIGHT' ? '#00000020' : '#e1e1e120'} offset={[0, 1]} distance={4}>
                <View style={styles.themeButton_thumb}/>
              </Shadow>
            </View>
          </Animated.View>
        </View>
        { state.theme === 'LIGHT' ?
          <EmojiThemeIcon size = {22} position={39} path = {themeEmojis.light}/> :
          <EmojiThemeIcon size = {17} position={7} path = {themeEmojis.dark}/>
        }
      </Pressable>
       
    </View>
  )
}

function EmojiThemeIcon(props) {
  return (
    <Image style={{ 
      width: props.size, height: props.size,
      position: 'absolute',
      left: props.position,
      }}  
    source={props.path}/>
  )
}

const styles = StyleSheet.create({
  Header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeButton: {
    width: 70,
    height: 34, 
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6
  },
  themeButton_thumb:{
    width: 22,
    height: 22,
    borderRadius: 50,
    backgroundColor: '#00D426',
    borderColor: '#ffffff',
    borderWidth: 2,
    zIndex: 2
  }
})