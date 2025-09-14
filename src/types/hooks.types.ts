interface InputFetch {
  url: string;
  options: RequestInit;
}

interface ResponseFetch<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export type { ResponseFetch, InputFetch };
