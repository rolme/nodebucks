import React from 'react';
import { RingLoader } from 'react-spinners'

export default function Loading(props) {
  console.log('LOADING ERROR - 1: ', props, typeof props.retry === "function")
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div className="spinnerContainer pageLoaderContainer"><RingLoader size={100} color={'#3F89E8'} loading={true}/></div>
    } else {
      return null;
    }
  } else if (props.error) {
    !!props.retry && typeof props.retry === "function" &&  props.retry();
  console.log('Oups, Error!!!')
    console.log('LOADING ERROR:', props)
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}
