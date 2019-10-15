import * as React from 'react';

interface AppProps {

}

interface AppState {
  
}

class App extends React.Component<AppProps, AppState> {
  constructor (props: AppProps) {
    super(props);
    console.log('props', props);
  }

  render () {
    return (
      <>

      </>
    )
  }
}

export default App;