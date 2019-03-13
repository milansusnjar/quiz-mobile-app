import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../Styles/Colors';

export class Question extends Component {
  static propTypes = {
    question: PropTypes.object,
    disabled: PropTypes.bool,
    markAnsweredQuestion: PropTypes.func,
    answeredOrdinal: PropTypes.number,
    showAnswer: PropTypes.bool
  };

  answerColor = (index, isCorrect) => {
    const isChosen = this.props.answeredOrdinal === index;

    if (this.props.showAnswer) {
      return isCorrect
        ? Colors.POSITIVE
        : isChosen
        ? Colors.NEGATIVE
        : Colors.TRANSPARENT;
    }

    return isChosen ? Colors.NEUTRAL : Colors.TRANSPARENT;
  };

  render() {
    const { question, disabled, markAnsweredQuestion } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question.question}</Text>
        <View style={styles.answersContainer}>
          {question.answers.map((answer, index) => (
            <View key={index} style={{ marginVertical: 6 }}>
              <TouchableOpacity
                disabled={disabled}
                onPress={() => markAnsweredQuestion(index)}
                style={{
                  ...styles.answerButton,
                  backgroundColor: this.answerColor(index, answer.correct)
                }}>
                <Text style={styles.answer}>{answer.text}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 30
  },
  question: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10
  },
  answersContainer: {
    marginVertical: 10
  },
  answerButton: {
    marginVertical: 4,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.NEUTRAL,
    borderRadius: 12
  },
  answer: {
    padding: 4,
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  }
});
