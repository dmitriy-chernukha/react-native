import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native'
import {SF_BLACK, SF_GREY_2, SF_MAIN_BORDER_COLOR, SF_WHITE} from '../../../../assets/colors'
import getPlatformFont from '../../../../assets/fonts/getFontByPlatform'

export interface Style {
    container: ViewStyle,
    internalContainer: ViewStyle,
    timeSlot: ViewStyle,
    closeContainer: ViewStyle
    close: ImageStyle,
    time: TextStyle,
    timeSeparator: ViewStyle
}

const styles = StyleSheet.create<Style>({
    container: {
        height: 40,
        width: '100%',
        backgroundColor: SF_WHITE,
        borderColor: SF_MAIN_BORDER_COLOR,
    },
    internalContainer: {
        flexDirection: 'row',
        flex: 1,
        marginStart: 16,
    },
    timeSlot: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    closeContainer: {
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        width: 9,
        height: 9
    },
    time: {
        ...getPlatformFont('whitney_semi_bold'),
        color: SF_BLACK,
        fontSize: 15
    },
    timeSeparator: {
        height: 1,
        width: 12,
        marginHorizontal: 8,
        backgroundColor: SF_GREY_2
    }
})

export default styles
