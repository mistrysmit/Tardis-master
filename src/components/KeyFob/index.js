/**
 * @flow
 */

import * as React from 'react';
import { Image, StyleSheet, TouchableHighlight, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { LOCK, UNLOCK } from '../../store/constant';
import { onPress } from '../../store/actions/keyfob';

type Props = {
  keyFob: string,
  keyFobFail: boolean,
  keyFobSuccess: boolean,
  keyFobInProgress: boolean,
  onPress: Function
};

type State = {
  InProgressAnimation: Object,
  progressCounter: Object,
  progressStatus: Object

}
class KeyFob extends React.Component<Props, State> {

  //initial state
  state = {};
  constructor() {
    super();

    this.state.progressStatus = new Animated.Value(0);
    //states to perform animation
    this.state.InProgressAnimation = Animated.loop(
      Animated.timing(this.state.progressStatus,
        {
          toValue: 1,
          duration: 1000,
        })
    );
    this.state.progressCounter = this.state.progressStatus.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'] //rotate image start from 0deg and end 360 deg
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { InProgressAnimation, progressStatus } = prevState;
    if (nextProps.keyFobInProgress) {
      //if request for lock or unlock is going on keep animation running
      InProgressAnimation.start()
    }
    else {
      //if no request going on or request done than stop animation and reset to actual starting position
      progressStatus.setValue(0);
      InProgressAnimation.stop();
      InProgressAnimation.reset();
    }
    return null;
  }

  render() {
    const { container, button, image } = styles;
    const { keyFob, keyFobFail, keyFobSuccess, keyFobInProgress } = this.props;
    const { progressCounter } = this.state;
    
    let lockCss = { 'spinAnimation': {}, 'btn': {} };
    let unlockCss = { 'spinAnimation': {}, 'btn': {} };

    //set css for lock image and outer border
    //determine whether it needs to rotate
    //make the border and image green once the task performs successfully
    //else, make the border and image red
    if (keyFob == LOCK) {
      if (keyFobInProgress) {
        lockCss['spinAnimation'] = { 'transform': [{ 'rotate': progressCounter }] };
      }
      else if (keyFobSuccess) {
        lockCss['spinAnimation'] = { 'tintColor': 'green' }
        lockCss['btn'] = { 'borderColor': 'green' }
      }
      else if (keyFobFail) {
        lockCss['spinAnimation'] = { 'tintColor': 'red' }
        lockCss['btn'] = { 'borderColor': 'red' }
      }
    }

    //set css for unlock image and outer border
    //determine whether it needs to rotate
    //make the border and image green once the task performs successfully
    //else, make the border and image red
    if (keyFob == UNLOCK) {
      if (keyFobInProgress) {
        unlockCss['spinAnimation'] = { 'transform': [{ 'rotate': progressCounter }] };
      }
      else if (keyFobSuccess) {
        unlockCss['spinAnimation'] = { 'tintColor': 'green' }
        unlockCss['btn'] = { 'borderColor': 'green' }
      }
      else if (keyFobFail) {
        unlockCss['spinAnimation'] = { 'tintColor': 'red' }
        unlockCss['btn'] = { 'borderColor': 'red' }
      }
    }


    return (
      <View style={container}>
        <TouchableHighlight
          style={[button, lockCss['btn']]}
          onPress={() => { this.props.onPress(LOCK) }}
          disabled={keyFobInProgress}
          underlayColor={'#b9ccee'}>
          <Animated.Image
            style={[image, lockCss['spinAnimation']]}
            source={require('./img/lock.png')} />
        </TouchableHighlight>
        <View style={{ height: 88 }} />

        <TouchableHighlight
          style={[button, unlockCss['btn']]}
          onPress={() => { this.props.onPress(UNLOCK) }}
          disabled={keyFobInProgress}
          underlayColor={'#b9ccee'}>
          <Animated.Image
            style={[image, unlockCss['spinAnimation']]}
            source={require('./img/unlock.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc'
  }
});

const mapStateToProps = state => (
  {
    keyFob: state.keyFob,
    keyFobFail: state.keyFobFail,
    keyFobSuccess: state.keyFobSuccess,
    keyFobInProgress: state.keyFobInProgress
  }
)

const mapDispatchToProps = dispatch => ({
  onPress: lock_unlock => dispatch(onPress(lock_unlock)),
})

export default connect(mapStateToProps, mapDispatchToProps)(KeyFob);

