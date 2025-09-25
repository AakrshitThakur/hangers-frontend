import { useState, useEffect, useCallback, useRef } from "react";
import type { ResponseFetch, InputFetch } from "../types/hooks.types";

function useFetch<T>(props: InputFetch): ResponseFetch<T> {
  const [states, setStates] = useState<ResponseFetch<T>>({
    data: null,
    error: null,
    loading: true,
  });

  // to abort previous running api
  const controllerRef = useRef<AbortController | null>(null);

  // returning memoized version to call unique APIs
  const fetchApi = useCallback(async () => {
    if (!props.url) {
      setStates({ data: null, error: null, loading: false });
      return;
    }
    // set initial states
    setStates({ data: null, error: null, loading: true });

    // cancel previous working api
    controllerRef.current?.abort();

    // creaet new abort controller for new api
    controllerRef.current = new AbortController();

    try {
      const res = await fetch(props.url, {
        ...props.options,
        signal: controllerRef.current.signal,
      });
      // error response
      if (!res.ok) {
        const json = await res.json();
        console.error(json.message);
        setStates({ data: null, error: json.message, loading: false });
      } else {
        // success response
        const json = await res.json();
        setStates({ data: json, error: null, loading: false });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.error(error.message);
      } else if (error instanceof Error) {
        console.error(error.message);
        setStates({ data: null, error: error.message, loading: false });
      } else {
        console.error(error);
        setStates({ data: null, error: error as string, loading: false });
      }
    }
  }, [props.url, props.options]);

  // execute unique APIs
  useEffect(() => {
    async function exec() {
      await fetchApi();
    }
    exec();
  }, [fetchApi]);

  // return states
  return { data: states.data, error: states.error, loading: states.loading };
}

export default useFetch;
