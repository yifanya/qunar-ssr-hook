import * as React from 'react';

const { useState, useEffect } = React;

function usePosition () {
  const [ left, setLeft ] = useState(0);
  const [ right, setRight ] = useState(0);

  useEffect(() => {

  });

  return [left, right];
}

export default usePosition;