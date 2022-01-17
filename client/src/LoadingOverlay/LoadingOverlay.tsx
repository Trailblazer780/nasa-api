import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import './LoadingOverlay.scss';
import { LoadingOverlayProps } from '../tools/data.model';


const LoadingOverlay = ({enabled, bgColor, spinnerColor}:LoadingOverlayProps) => {

    let styles:Object = {
        backgroundColor:bgColor
    }

    return (
        (enabled)
        ? 
        <div className="loading-overlay" style={styles}>
            <Loader
                type="Triangle"
                color={spinnerColor}
                height={300}
                width={300}
            />
        </div>
        : <div></div>
    );
}

export default LoadingOverlay;