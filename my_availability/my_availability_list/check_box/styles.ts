import {ImageStyle, StyleSheet, ViewStyle} from 'react-native'
import {SF_BORDER_GREY, SF_CB_BLUE} from '../../../../assets/colors'

export interface Style {
    container: ViewStyle,
    checked: ViewStyle,
    unchecked: ViewStyle,
    icon: ImageStyle
}

const styles = StyleSheet.create<Style>({
    container: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unchecked: {
        borderRadius: 1.5,
        borderWidth: 1,
        borderColor: SF_BORDER_GREY,
        backgroundColor: 'white'
    },
    checked: {
        borderRadius: 1.5,
        backgroundColor: SF_CB_BLUE
    },
    icon: {
        width: 10,
        height: 8,
    }
})

export default styles
