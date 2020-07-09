import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecreaseCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddToCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}  />
                <hr />
                <button onClick={() => this.props.onSaveResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((result) => (
                        <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch(actionCreator.increment()),
        onDecreaseCounter: () => dispatch(actionCreator.decrease()),
        onAddToCounter: (amount) => dispatch(actionCreator.add(amount)),
        onSubtractCounter: (amount) => dispatch(actionCreator.subtract(amount)),
        onSaveResult: (counter) =>  dispatch(actionCreator.saveResultAsync(counter)),
        onDeleteResult: (id) => dispatch(actionCreator.deleteResult(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);