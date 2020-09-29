import { useState } from "react";

const useLogin = () => {
  const [loginShowing, setLoginShowing] = useState(false);

  function toggleLogin() {
    if (loginShowing) {
      setLoginShowing(false);
    } else {
      setLoginShowing(true);
    }
  }

  return {
    loginShowing,
    toggleLogin,
  };
};

export default useLogin;
