import { useState, useCallback } from 'react';
import RAF from '@/utils/RAF';

const raf = new RAF();

const useTimeRender = () => {
  const [renderEnabled, setRenderEnabled] = useState(false);
  let timeOut: symbol;
  const timeRender = useCallback((time: number = 3000) => {
    setRenderEnabled(true);
    raf.clearTimeout(timeOut);
    timeOut = raf.setTimeout(() => {
      setRenderEnabled(false);
    }, time);
  }, []);

  return [renderEnabled, timeRender] as const;
};

export default useTimeRender;
