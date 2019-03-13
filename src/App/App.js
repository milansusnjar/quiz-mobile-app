import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ActivityIndicator
} from 'react-native';
import { Progress, Results, StartButton, Question } from '../Components';
import { fetchQuizQuestions, getMinutesFromMs } from '../Services';
import { Colors } from '../Styles/Colors';

const initialState = {
  loading: false,
  questions: [],
  givenAnswers: {},
  startTime: null,
  duration: 0,
  finished: false
};

export default class App extends Component {
  state = { ...initialState };

  startQuiz = async () => {
    this.setState({
      ...initialState,
      loading: true
    });
    const questions = await fetchQuizQuestions();
    const startTime = new Date().getTime();
    this.setState({
      questions,
      startTime,
      loading: false
    });
  };

  markAnsweredQuestion = (questionOrdinal, answerOrdinal) => {
    this.setState(state => {
      const withNewAnswer = {
        ...state.givenAnswers,
        [questionOrdinal]: answerOrdinal
      };

      if (Object.keys(state.givenAnswers).length === 9) {
        return {
          givenAnswers: withNewAnswer,
          duration: new Date().getTime() - state.startTime,
          finished: true
        };
      }

      return {
        givenAnswers: withNewAnswer
      };
    });
  };

  getScore = () => {
    if (!this.state.finished) return;

    let score = 0;
    this.state.questions.forEach((question, index) => {
      if (this.state.givenAnswers[index] === question.correctPosition) {
        score++;
      }
    });

    return `${score * 10}%`;
  };

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        {this.state.loading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator color={'white'} />
          </View>
        )}

        {this.state.questions.length === 0 && !this.state.loading && (
          <StartButton onPress={this.startQuiz} />
        )}

        {this.state.questions.length > 0 && (
          <ScrollView style={styles.container}>
            {this.state.questions.map((question, index) => (
              <Question
                key={index}
                disabled={this.state.givenAnswers[index] != null}
                question={question}
                markAnsweredQuestion={answerOrdinal =>
                  this.markAnsweredQuestion(index, answerOrdinal)
                }
                answeredOrdinal={this.state.givenAnswers[index]}
                showAnswer={this.state.finished}
              />
            ))}
            {this.state.finished && (
              <View style={styles.resultsContainer}>
                <Results
                  score={this.getScore()}
                  duration={getMinutesFromMs(this.state.duration)}
                />
                <StartButton onPress={this.startQuiz} label={'Play again'} />
              </View>
            )}
          </ScrollView>
        )}
        {this.state.questions.length > 0 && (
          <Progress
            questions={this.state.questions}
            answersCount={Object.keys(this.state.givenAnswers).length}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.BACKGROUND_COLOR
  },
  resultsContainer: {
    marginVertical: 20
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
