import * as React from 'react';

const { useEffect, useState } = React;

export default function useLoading (loading: boolean) {
  const [inform, setInform] = useState({ speed: 1, imgNum: 0, pos: 0 });

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (loading) {
      let count = 0;
      timer = setInterval(() => {
        if (count >= 500) {
          setInform({ speed: 3, imgNum: 2, pos: -(count*inform.speed) });
        }
        else if (count >= 250) {  
          setInform({ speed: 2, imgNum: 1, pos: -(count*inform.speed) });
        }
        else {
          setInform({ speed: 1, imgNum: 0, pos: -(count*inform.speed) })
        }
        count++;
      }, 10);
    }
    else {
      setInform({ speed: 1, imgNum: 0, pos: 0 });
    }
    return () => {
      timer && clearInterval(timer);
    }
  }, [loading])

  // useEffect(() => {
  //   if (!loading) setCount(0);
  // }, [loading])

  return [inform.imgNum, inform.pos]
}