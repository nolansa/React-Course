import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor(props) {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
                
            })
            this.respInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            //console.log('Will Unmount', this.respInterceptor, this.reqInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Auxillary>
                    <Modal 
                    show={this.state.error}
                    clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message :  null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
                
            )
        }
    }
}

export default withErrorHandler;