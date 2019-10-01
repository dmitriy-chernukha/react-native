import React, {ReactElement} from 'react'
import {TouchableOpacity} from 'react-native'
import styles from './styles'
import FastImage from 'react-native-fast-image'
import imgs from '../../../../assets/imgs/imgs'

export interface Props {
    checked: boolean,
    onPress?: () => void
}

interface State {
}

const initialState: State = {}
const defaultProps: Props = {
    checked: false
}

class CheckBox extends React.Component<Props, State> {
    readonly state: State = initialState
    static defaultProps: Props = defaultProps

    render(): ReactElement<any> {
        const {
            checked,
            onPress
        } = this.props

        return (
            <TouchableOpacity onPress={onPress}
                              style={[styles.container, (checked ? styles.checked : styles.unchecked)]}>
                {checked && (
                    <FastImage source={imgs.check}
                               resizeMode={FastImage.resizeMode.stretch}
                               style={styles.icon}/>
                )}
            </TouchableOpacity>
        )
    }
}

export default CheckBox
