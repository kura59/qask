import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const login = useCallback((id) => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (res.data) {
          router.push("/Top");
        } else {
          alert("ユーザーが見つかりません");
        }
      })
      .catch(() => alert("ログインできません"))
      .finally(() => setLoading(false));
  }, []);
  return { login, loading };
};
