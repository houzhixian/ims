import React from 'react'

export default class MainContainer extends React.Component{

    componentDidMount() {
        console.log("main init")
    }

    render() {
        return (
            <div className="main-container">
                {this.props.children}
            </div>
        )
    }
}