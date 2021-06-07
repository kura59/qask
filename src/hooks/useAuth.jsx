import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const router = useRouter();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const login = useCallback((id) => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (res.data) {
          showMessage({ title: "ログインしました", status: "success" });
          router.push("/Top");
        } else {
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
        }
      })
      .catch(() =>
        showMessage({ title: "ログインできません", status: "error" })
      )
      .finally(() => setLoading(false));
  }, []);
  return { login, loading };
};
