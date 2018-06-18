import React from 'react';
import { RingLoader } from 'react-spinners'

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div className="spinnerContainer"><RingLoader size={150} color={'#3F89E8'} loading={true}/></div>
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}