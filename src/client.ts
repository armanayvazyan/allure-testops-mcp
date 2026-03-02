import { TokenManager } from "./auth.js";

type QueryValue = string | number | boolean | Array<string | number | boolean>;
type QueryParams = Record<string, QueryValue | undefined | null>;

export interface AllureApiClientOptions {
  baseUrl: string;
  tokenManager: TokenManager;
}

export class AllureApiClient {
  private readonly baseUrl: string;
  private readonly tokenManager: TokenManager;
  private readonly maxGetRetries = 2;
  private readonly requestTimeoutMs = 30000;

  constructor(options: AllureApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.tokenManager = options.tokenManager;
  }

  async get<T>(path: string, query?: QueryParams): Promise<T> {
    return this.request<T>("GET", path, undefined, query);
  }

  async post<T>(
    path: string,
    body?: unknown,
    query?: QueryParams,
  ): Promise<T> {
    return this.request<T>("POST", path, body, query);
  }

  async patch<T>(
    path: string,
    body?: unknown,
    query?: QueryParams,
  ): Promise<T> {
    return this.request<T>("PATCH", path, body, query);
  }

  async put<T>(path: string, body?: unknown, query?: QueryParams): Promise<T> {
    return this.request<T>("PUT", path, body, query);
  }

  async delete<T = unknown>(path: string, query?: QueryParams): Promise<T> {
    return this.request<T>("DELETE", path, undefined, query);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    query?: QueryParams,
  ): Promise<T> {
    const accessToken = await this.tokenManager.getAccessToken();
    const url = this.buildUrl(path, query);
    const retries = method === "GET" ? this.maxGetRetries : 0;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      let response: Response;
      try {
        response = await fetch(url, {
          method,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
          },
          body: body !== undefined ? JSON.stringify(body) : undefined,
          signal: AbortSignal.timeout(this.requestTimeoutMs),
        });

      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (attempt < retries && this.isRetryableNetworkError(message)) {
          await this.wait(300 * (attempt + 1));
          continue;
        }
        throw error;
      }

      if (!response.ok) {
        const text = await response.text();
        const message = `Allure API ${method} ${path} failed (${response.status}): ${text}`;
        if (attempt < retries && [502, 503, 504].includes(response.status)) {
          await this.wait(300 * (attempt + 1));
          continue;
        }
        throw new Error(message);
      }

      if (response.status === 204) {
        return undefined as T;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as T;
    }

    throw new Error(`Allure API ${method} ${path} failed after retries.`);
  }

  private buildUrl(path: string, query?: QueryParams): string {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const url = new URL(`${this.baseUrl}${normalizedPath}`);

    if (!query) {
      return url.toString();
    }

    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          url.searchParams.append(key, String(item));
        }
      } else {
        url.searchParams.append(key, String(value));
      }
    }

    return url.toString();
  }

  private isRetryableNetworkError(message: string): boolean {
    const lower = message.toLowerCase();
    return (
      lower.includes("fetch failed") ||
      lower.includes("timed out") ||
      lower.includes("econnreset") ||
      lower.includes("eai_again")
    );
  }

  private async wait(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
