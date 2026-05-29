import { useState, useCallback } from 'react';

export function useGraphQLQuery<TData = any>(query: string) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (variables?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }
      setData(result.data);
      return result.data as TData;
    } catch (err: any) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);
      throw errorInstance;
    } finally {
      setLoading(false);
    }
  }, [query]);

  return { data, loading, error, execute, setData };
}

export function useGraphQLMutation<TData = any>(mutation: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (variables?: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();
      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }
      return result.data as TData;
    } catch (err: any) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);
      throw errorInstance;
    } finally {
      setLoading(false);
    }
  }, [mutation]);

  return { loading, error, execute };
}
