import React, {ReactElement} from 'react'
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native'
import styles from './styles'
import {ACTIVE_OPACITY} from '../../../../appConstants'
import FastImage from 'react-native-fast-image'
import imgs from '../../../../assets/imgs/imgs'
import {TimeSlot} from '../../../../types/myAvailability'
import moment from 'moment-timezone'
import {DateFormatter} from '../../../../utils/dateUtils'

const BORDER_RADIUS: number = 4
const BORDER_WIDTH: number = 1

type ItemMode =
    | 'first'
    | 'last'
    | 'middle'
    | 'alone'

export interface Props {
    data: TimeSlot,
    index: number,
    itemsCount: number,
    onDeletePress?: (index: number) => void,
    onFromTimePress?: (index: number) => void,
    onToTimePress?: (index: number) => void,
}

interface State {
}

const initialState: State = {}
const defaultProps: Props = {
    data: null,
    index: 0,
    itemsCount: 0
}

class TimeSlotItem extends React.Component<Props, State> {
    readonly state: State = initialState
    static defaultProps: Props = defaultProps

    render(): ReactElement<any> {
        const {
            data,
            itemsCount
        } = this.props

        return (
            <View style={[styles.container,
                this.cornersStyle(),
                this.borderStyle()]}>
                {data && (
                    <View style={styles.internalContainer}>
                        <View style={styles.timeSlot}>
                            <TouchableOpacity activeOpacity={ACTIVE_OPACITY}
                                              onPress={this.handleFromTimePress}>
                                <Text style={styles.time}>
                                    {moment(data.hoursFrom, ['HH:mm']).format(DateFormatter)}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.timeSeparator}/>
                            <TouchableOpacity activeOpacity={ACTIVE_OPACITY}
                                              onPress={this.handleToTimePress}>
                                <Text style={styles.time}>
                                    {moment(data.hoursTo, ['HH:mm']).format(DateFormatter)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {itemsCount > 1 && (
                            <TouchableOpacity activeOpacity={ACTIVE_OPACITY}
                                              onPress={this.handleOnPress}
                                              style={styles.closeContainer}>
                                <FastImage style={styles.close}
                                           source={imgs.close2}/>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        )
    }

    cornersStyle = (): ViewStyle => {
        const itemMode: ItemMode = this.calculateItemMode()

        switch (itemMode) {
            case 'alone':
                return {borderRadius: BORDER_RADIUS}
            case 'first':
                return {
                    borderTopStartRadius: BORDER_RADIUS,
                    borderTopEndRadius: BORDER_RADIUS
                }
            case 'last':
                return {
                    borderBottomStartRadius: BORDER_RADIUS,
                    borderBottomEndRadius: BORDER_RADIUS
                }
            default:
                return {}
        }
    }

    borderStyle = (): ViewStyle => {
        const itemMode: ItemMode = this.calculateItemMode()

        switch (itemMode) {
            case 'alone':
            default:
                return {borderWidth: BORDER_WIDTH}
            case 'first':
                return {
                    borderTopWidth: BORDER_WIDTH,
                    borderLeftWidth: BORDER_WIDTH,
                    borderRightWidth: BORDER_WIDTH,
                    borderBottomWidth: BORDER_WIDTH
                }
            case 'last':
            case 'middle':
                return {
                    borderBottomWidth: BORDER_WIDTH,
                    borderLeftWidth: BORDER_WIDTH,
                    borderRightWidth: BORDER_WIDTH
                }
        }
    }

    calculateItemMode = (): ItemMode => {
        const {
            index,
            itemsCount
        } = this.props

        if (itemsCount <= 1) {
            return 'alone'
        } else if (index === 0) {
            return 'first'
        } else if (index < itemsCount - 1) {
            return 'middle'
        } else if (index === itemsCount - 1) {
            return 'last'
        }
        return 'alone'
    }

    handleOnPress = (): void => {
        const {
            index,
            onDeletePress
        } = this.props
        onDeletePress && onDeletePress(index)
    }

    handleFromTimePress = (): void => {
        const {
            index,
            onFromTimePress
        } = this.props
        onFromTimePress && onFromTimePress(index)
    }

    handleToTimePress = (): void => {
        const {
            index,
            onToTimePress
        } = this.props
        onToTimePress && onToTimePress(index)
    }
}

export default TimeSlotItem
