import { useState } from 'react';

const useSignup = () => {
  const [signupShowing, setSignupShowing] = useState(false);

  function toggleSignup() {
    if (registerSignup) {
      setSignupShowing(false);
    } else {
      setSignupShowing(true);
    }
  }

  return {
    signupShowing,
    toggleSignup,
  }
};


export default useSignup