import {StyleSheet, TextStyle, ViewStyle} from 'react-native'
import {SF_BLACK, SF_GREEN_1, SF_GREY_1} from '../../../assets/colors'
import getPlatformFont from '../../../assets/fonts/getFontByPlatform'

export interface Style {
    container: ViewStyle
    headerContainer: ViewStyle
    header: TextStyle,
    buttonContainer: ViewStyle
    buttonTitle: TextStyle
}

const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: SF_GREY_1
    },
    headerContainer: {
        width: '100%',
    },
    header: {
        flex: 1,
        margin: 20,
        ...getPlatformFont('whitney_semi_bold'),
        color: SF_BLACK,
        fontSize: 14
    },
    buttonContainer: {
        width: '100%',
        height: 64,
        backgroundColor: SF_GREEN_1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        ...getPlatformFont('whitney_semi_bold'),
        color: 'white',
        fontSize: 15
    }
})

export default styles
