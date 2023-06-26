import React, { Component } from 'react';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

class App extends Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    };


    handleFeedback = (type) => {
        this.setState((prevState) => ({
            [type]: prevState[type] + 1
        }));
    };

    countTotalFeedback = () => {
        const { good, neutral, bad } = this.state;
        return good + neutral + bad;
    };

    countPositiveFeedbackPercentage = () => {
        const { good } = this.state;
        const totalFeedback = this.countTotalFeedback();
        return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
    };

    render() {
        const { good, neutral, bad } = this.state;
        const totalFeedback = this.countTotalFeedback();
        const positivePercentage = this.countPositiveFeedbackPercentage();
        const options = Object.keys(this.state);

        return (
            <div>
                <h1>Feedback App</h1>
                <Section title="Leave Feedback">
                    <FeedbackOptions options={options} onLeaveFeedback={this.handleFeedback} />
                </Section>
                <Section title="Statistics">
                    {totalFeedback > 0 ? (
                        <Statistics good={good} neutral={neutral} bad={bad} total={totalFeedback} positivePercentage={positivePercentage} />
                    ) : (
                        <Notification message="There is no feedback" />
                    )}
                </Section>
            </div>
        );
    }
}

export default App;
