import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../Styles/Colors';

export class StartButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    label: PropTypes.string
  };

  render() {
    const { onPress, label = 'Start Quiz' } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    borderRadius: 4
  },
  buttonLabel: {
    padding: 6,
    color: Colors.WHITE,
    fontWeight: 'bold'
  }
});
