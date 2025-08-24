import { useState, useEffect, useRef } from 'react';
import { AlgorithmAnimator } from './AlgorithmAnimator';

export function useAlgorithmAnimator(initialState, options) {
  const [state, setState] = useState(initialState);
  const [animator, setAnimator] = useState(null);
  const animatorRef = useRef(null);

  useEffect(() => {
    animatorRef.current = new AlgorithmAnimator(initialState, options);
    setAnimator(animatorRef.current);

    const unsubscribe = animatorRef.current.subscribe((newState) => {
      setState(newState);
    });

    return unsubscribe;
  }, []);

  return [state, animator];
}