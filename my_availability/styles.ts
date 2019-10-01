import {StyleSheet, ViewStyle} from 'react-native'
import {SF_MAIN_BLUE} from '../../assets/colors'

export interface Style {
    container: ViewStyle,
    bottomContainer: ViewStyle
}

const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: SF_MAIN_BLUE
    },
    bottomContainer: {
        height: 40,
        width: '100%',
        backgroundColor: SF_MAIN_BLUE
    }
})

export default styles
