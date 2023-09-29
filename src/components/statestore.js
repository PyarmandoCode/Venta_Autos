import React from "react";
import { connect } from 'react-redux'
import { INCREMENT, DECREMENT } from "./actionTypes";

class AppStore extends React.Component {
    render() {
        return (
            <div>
                <h1>Contador: {this.props.count}</h1>
                <button onClick={this.props.increment}>Incrementar</button>
                <button onClick={this.props.decrement}>Decrementar</button>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.count,
})

const mapDispatchtoProps = (dispatch) => ({
    increment: () => dispatch({ type: INCREMENT }),
    decrement: () => dispatch({ type: DECREMENT })

});

export default connect(mapStateToProps, mapDispatchtoProps)(AppStore);