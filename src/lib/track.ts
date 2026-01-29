declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const track = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
};
