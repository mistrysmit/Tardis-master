/**
 * @flow
 */

import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { loadManual } from '../../store/actions/manual';
import { API_URL } from '../../store/constant';

type Props = {
    manual: Array<Object>,
    manualFail: boolean,
    manualSuccess: boolean,
    manualInProgress: boolean,
    loadManual:Function
};

class Manual extends React.Component<Props> {
    componentDidMount() {
        this.props.loadManual();
    }
    render() {
        const { container, image, manualItem, titleContainer, titleText, descriptionText, errorText, button } = styles;
        const { manual, manualSuccess, manualFail, manualInProgress } = this.props;

        const ManualList = () => manual.map((item, index) =>
            (<View style={manualItem} key={index}>
                <View style={titleContainer}>
                    <Text style={titleText}>{item.title}</Text>
                </View>
                <Image style={image} source={{ uri: `${API_URL}manual/${item.image}` }} />
                <Text style={descriptionText}>{item.description}</Text>
            </View>)
        );

        return (
            <ScrollView>
                <View style={container}>
                    {manualSuccess && ManualList()}
                    {manualFail &&
                        <TouchableHighlight style={button} onPress={() => this.props.loadManual()}>
                            <Text style={errorText}>Something goes wrong, Try Again </Text>
                        </TouchableHighlight>}
                    {manualInProgress && <ActivityIndicator size="large" color="black" />}
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        height: 200,
        resizeMode: 'contain',
        marginVertical: 30,
    },
    manualItem: {
        margin: 20,
        borderWidth: 1,
    },
    titleContainer: {
        height: 50,
        elevation: 3,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
    },
    descriptionText: {
        margin: 10,
        textAlign: 'justify',
    },
    errorText: {
        color: 'red'
    }, button: {
        marginBottom: 5,
        height: 50,
        borderWidth: 1,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapStateToProps = state => (
    {
        manual: state.manual,
        manualFail: state.manualFail,
        manualSuccess: state.manualSuccess,
        manualInProgress: state.manualInProgress
    }
)

const mapDispatchToProps = dispatch => ({
    loadManual: () => dispatch(loadManual()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Manual);

