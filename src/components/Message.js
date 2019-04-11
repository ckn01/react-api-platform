import React from 'react';

export class Message extends React.Component {
    render() {
        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    { this.props.message }
                </div>
            </div>
        );
    }
}