import React, {ReactElement} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'
import ListItem from './list_item/ListItem'
import i18n from 'i18n-js'
import {DayOfWeek, MyAvailability, TimeSlot} from '../../../types/myAvailability'
import {ACTIVE_OPACITY} from '../../../appConstants'
import {ChildProps, compose, graphql} from 'react-apollo'
import {UserResponse} from '../../../types/userResponse'
import SFSpinner from '../../../components/sf_spinner/SFSpinner'
import SFDropdownAlert from '../../../components/sf_dropdown_alert/SFDropdownAlert'
import {fetchCurrentUserGql} from '../../../network/apollo/currentUser'
import {ApolloError} from 'apollo-client/errors/ApolloError'
import {preferenceResponseProcessing} from '../../../utils/dateUtils'
import {getPreference} from '../../../network/apollo/preferences'
import {getError} from '../../../network/apollo/getError'

interface Response {
    loading: boolean,
    user?: UserResponse,
    availabilities?: TimeSlot[],
    error: ApolloError,
    myPreferredDaysAndTimes?: TimeSlot[]
}

type Props = ChildProps<OwnProps, Response>

interface OwnProps {
    loading: boolean,
    user?: UserResponse,
    availabilities?: TimeSlot[],
    error?: ApolloError,
    myPreferredDaysAndTimes?: TimeSlot[]
}

interface State {
    myAvailability: MyAvailability,
    loading: boolean,
}

const initialState: State = {
    loading: false,
    myAvailability: null,
}
const defaultProps: Props = {
    loading: false,
    user: null,
    availabilities: [],
    error: null
}

class MyAvailabilityListView extends React.Component<Props, State> {
    readonly state: State = initialState
    static defaultProps: Props = defaultProps
    readonly dropdownAlert: React.RefObject<SFDropdownAlert>

    constructor(defaultProps: Props) {
        super(defaultProps)
        this.dropdownAlert = React.createRef()
    }

    componentWillMount(): void {
        const {user} = this.props
        if (user) {
            const companyId: number = user.companies.length > 0 ? user.companies[0].id : null
            this.setState({loading: true})
            getPreference(companyId, user.id)
                .then((response) => {
                    const {loading} = response
                    const myAvailability: MyAvailability = preferenceResponseProcessing(response.data)
                    this.setState({
                        myAvailability,
                        loading
                    })
                })
                .catch((error) => {
                    this.setState({
                        loading: false
                    }, () => this.dropdownAlert.current.show('error', getError(error)))
                })
        }
    }

    render(): ReactElement<any> {
        const {loading} = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    <SFSpinner loading={loading || this.state.loading}/>
                    {this.getHeader()}
                    {this.getDays()}
                </ScrollView>
                {/*{this.getButton()}*/}
                <SFDropdownAlert ref={this.dropdownAlert}/>
            </View>
        )
    }

    getHeader = (): ReactElement<any> => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    {i18n.t('my_availability_header')}
                </Text>
            </View>
        )
    }

    getDays = (): ReactElement<any>[] => {
        const {myAvailability} = this.state
        const {user} = this.props
        const companyId = user.companies[0].id
        const userId = user.id

        if (myAvailability) {
            return (
                myAvailability.days.map((item: DayOfWeek, index: number) => (
                    <ListItem data={item}
                              companyId={companyId}
                              userId={userId}
                              showLoader={this.handleShowHideLoader}
                              key={index}/>
                ))
            )
        } else {
            return null
        }
    }

    getButton = (): ReactElement<any> => {
        return (
            <TouchableOpacity activeOpacity={ACTIVE_OPACITY}
                              onPress={this.handleSubmitPress}
                              style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}
                      numberOfLines={1}>
                    {i18n.t('Submit Availability')}
                </Text>
            </TouchableOpacity>
        )
    }

    handleSubmitPress = (): void => {

    }

    handleShowHideLoader = (show: boolean, withErrorMessage: string = null): void => {
        this.setState({loading: show})
        if (withErrorMessage) {
            this.dropdownAlert.current.show('error', withErrorMessage)
        }
    }
}

export default compose(
    graphql<Response, Props>(fetchCurrentUserGql, {
        options: {fetchPolicy: 'cache-only'},
        props: ({data}) => ({
            ...data,
            error: data.error,
            user: data.user
        }),
    }),
)(MyAvailabilityListView)
