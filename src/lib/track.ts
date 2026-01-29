export const track = (event: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && (window as { gtag?: Function }).gtag) {
    (window as { gtag: Function }).gtag("event", event, params);
  }
};
