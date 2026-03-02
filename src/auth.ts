export interface TokenExchangeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

export interface TokenManagerOptions {
  baseUrl: string;
  apiToken: string;
  refreshSkewSeconds?: number;
}

export class TokenManager {
  private readonly baseUrl: string;
  private readonly apiToken: string;
  private readonly refreshSkewMs: number;
  private cachedAccessToken: string | null = null;
  private expiresAtMs = 0;
  private refreshInFlight: Promise<string> | null = null;

  constructor(options: TokenManagerOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.apiToken = options.apiToken;
    this.refreshSkewMs = (options.refreshSkewSeconds ?? 60) * 1000;
  }

  async getAccessToken(): Promise<string> {
    if (this.hasValidCachedToken()) {
      return this.cachedAccessToken as string;
    }

    if (!this.refreshInFlight) {
      this.refreshInFlight = this.exchangeToken().finally(() => {
        this.refreshInFlight = null;
      });
    }

    return this.refreshInFlight;
  }

  private hasValidCachedToken(): boolean {
    return (
      this.cachedAccessToken !== null &&
      Date.now() < this.expiresAtMs - this.refreshSkewMs
    );
  }

  private async exchangeToken(): Promise<string> {
    const form = new URLSearchParams();
    form.set("grant_type", "apitoken");
    form.set("scope", "openid");
    form.set("token", this.apiToken);

    const response = await fetch(`${this.baseUrl}/api/uaa/oauth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to exchange API token (HTTP ${response.status}): ${errorText}`,
      );
    }

    const tokenData = (await response.json()) as TokenExchangeResponse;
    if (!tokenData.access_token || !tokenData.expires_in) {
      throw new Error("Token exchange response is missing required fields.");
    }

    this.cachedAccessToken = tokenData.access_token;
    this.expiresAtMs = Date.now() + tokenData.expires_in * 1000;
    return this.cachedAccessToken;
  }
}
