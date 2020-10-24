import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function useSafeAreaStyles() {
   const safeArea = useSafeAreaInsets();

   return StyleSheet.create({
      container: {
         paddingTop: safeArea.top,
         paddingLeft: safeArea.left,
         paddingRight: safeArea.right,
         paddingBottom: safeArea.bottom,
      },
      header: {
         paddingTop: safeArea.top,
         paddingLeft: safeArea.left,
         paddingRight: safeArea.right,
      },
      footer: {
         paddingLeft: safeArea.left,
         paddingRight: safeArea.right,
         paddingBottom: safeArea.bottom,
      },
   })
}
