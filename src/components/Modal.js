import React from 'react';
import { View, Modal } from 'react-native';
import CardSection from './CardSection';

export default ({ children, visible }) => {
  const { cardSectionStyle, containerStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>{children}</CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    flexDirection: 'column',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  buttonContainer: {
    width: '40%'
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
