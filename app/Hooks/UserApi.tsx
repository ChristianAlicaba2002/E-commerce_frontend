"use client";

import React, { useState, useEffect } from "react";

function UserApi(api: string) {
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<string | null>(null);

  const postData = async (data = {}) => {
    try {
      setStatus("loading");
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const responseData = await res.json();
      setResponse(responseData);
      setStatus("success");
      return responseData;
    } catch (err) {
      setError(err + "An error occurred");
      setStatus("error");
      throw err;
    }
  };

  return {
    postData,
    response,
    status,
    error,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
  };
}

export default UserApi;
