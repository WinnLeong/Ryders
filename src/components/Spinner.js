import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Spinner extends Component {
  spinValue = new Animated.Value(0);

  state = {
    spinning: false
  };

  spin = () => {
    this.spinValue.setValue(0);

    if (this.state.spinning === false) {
      this.setState({ spinning: true });
      this.animation();
    } else {
      this.setState({ spinning: false });
    }
  };

  animation = () => {
    this.spinValue.setValue(0);

    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(() => {
      if (this.state.spinning) {
        this.animation();
      }
    });
  };

  componentDidMount() {
    this.spin();
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
          position: 'relative',
          height: 30,
          width: 30
        }}
      >
        <Icon
          name="spinner"
          type="font-awesome"
          size={this.props.size}
          color={this.props.color}
          containerStyle={this.props.style}
        />
      </Animated.View>
    );
  }
}
