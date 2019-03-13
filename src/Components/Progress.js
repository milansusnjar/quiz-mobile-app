import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../Styles/Colors';

export class Progress extends Component {
  static propTypes = {
    questions: PropTypes.array,
    answersCount: PropTypes.number
  };

  render() {
    const { questions, answersCount } = this.props;

    const progressStyle = {
      position: 'absolute',
      top: 0,
      right: (Dimensions.get('window').width / 10) * (10 - answersCount),
      bottom: 0,
      left: 0,
      backgroundColor: Colors.PROGRESS_COLOR
    };

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Answered: {answersCount} / {questions.length}
        </Text>
        <View style={progressStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1
  }
});
