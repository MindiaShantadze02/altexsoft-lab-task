import { useEffect, useState, useRef } from "react";

export const useKeyPress = () => {
  // implement key press logic
  // return pressed key codes
  const keysPressedRef = useRef({
    KeyA: false,
    KeyD: false,
    KeyJ: false,
    KeyL: false,
    KeyQ: false,
    KeyW: false,
    KeyE: false,
    KeyU: false,
    KeyI: false,
    KeyO: false
  });
  const [key, setKey] = useState('');
  
  
  useEffect(() => {
    window.addEventListener('keydown', ev => {
      if (ev.code in keysPressedRef.current) {
        const copy = {...keysPressedRef.current}
        copy[ev.code] = true;
        keysPressedRef.current = copy;
        setKey(ev.code);
      }
    });
    window.addEventListener('keyup', ev => {
      keysPressedRef.current = {
        KeyA: false,
        KeyD: false,
        KeyJ: false,
        KeyL: false,
        KeyQ: false,
        KeyW: false,
        KeyE: false,
        KeyU: false,
        KeyI: false,
        KeyO: false
      };
      setKey('');
    });
  }, []);

  return {
    keysPressed: keysPressedRef.current,
    key
  };
};
