import umami from "@umami/node";

umami.init({
  websiteId: "e073531b-8737-4f8a-8dbd-d003fb4124d1", // Your website id
  hostUrl: "https://cloud.umami.is", // URL to your Umami instance
});

export const umamiTrackCheckoutSuccessEvent = async (payload: {
  [key: string]: string | number | Date;
}) => {
  await umami.track("checkout_success", payload);
};
