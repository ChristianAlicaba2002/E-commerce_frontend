import { useState, useEffect } from "react";

function useGetDataSpecialProduct(url: string) {
  const [getData, setGetData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        setGetData(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { getData, error, loading };
}
export default useGetDataSpecialProduct;