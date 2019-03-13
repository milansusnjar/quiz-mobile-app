import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../Styles/Colors';

export class Results extends Component {
  static propTypes = {
    score: PropTypes.string,
    duration: PropTypes.string
  };

  render() {
    const { score, duration } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Score: {score}</Text>
        <Text style={styles.text}>Duration: {duration}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  text: {
    color: Colors.WHITE,
    fontSize: 18,
    paddingVertical: 4
  }
});
