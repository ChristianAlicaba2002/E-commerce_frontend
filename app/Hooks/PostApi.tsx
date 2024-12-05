import React, { useState } from "react";

function PostApi(api: string) {
  const [data, setData] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Object-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await response.json();
      setData(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
}

export default PostApi;
