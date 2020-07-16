import React from 'react';
import '../App.css';

export default function Loading() {
    return (
        <div className="loader-container">
            <i className="fa fa-spinner fa-spin loader-icon" ></i> Loading...
        </div>
    );
}