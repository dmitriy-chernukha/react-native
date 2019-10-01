import React, {ReactElement} from 'react'
import {NavigationScreenProp, SafeAreaView} from 'react-navigation'
import styles from './styles'
import i18n from 'i18n-js'
import SFToolbar from '../../components/sf_toolbar/SFToolbar'
import MyAvailabilityListView from './my_availability_list/MyAvailabilityListView'
import {View} from 'react-native'

export interface Props {
    navigation?: NavigationScreenProp<any, any>
}

interface State {
}

const initialState: State = {}
const defaultProps: Props = {}

class MyAvailabilityScreen extends React.Component<Props, State> {
    readonly state: State = initialState
    static defaultProps: Props = defaultProps

    render(): ReactElement<any> {
        return (
            <SafeAreaView style={styles.container}>
                <SFToolbar
                    title={i18n.t('My Availability')}/>
                <MyAvailabilityListView/>
                <View style={styles.bottomContainer}/>
            </SafeAreaView>
        )
    }
}

export default MyAvailabilityScreen
