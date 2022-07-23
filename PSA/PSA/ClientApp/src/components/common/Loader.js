import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from "react-redux";



export class Loader extends Component {

    render() {
        return (

            <div hidden={!this.props.loading} className={`loading-div  active'}`}>
                <div className='loading-content'>
                    <div id="preloader" className='loading-inner'>
                        <div id="loader" />
                    </div>
                </div>
            </div>


        );

    }
}




const
    mapStateToProps = state => {
        return {
            loading: state.form.loading,
        };
    };


const
    mapDispatchToProps = dispatch => {
        return {
            HideLoading: () => dispatch(actions.HideLoading()),

        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(Loader);