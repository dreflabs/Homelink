import { getPhotographerDeliveries } from "@/actions/photographer";
import { DeliveryClient } from "./delivery-client";

export default async function DeliveryPage() {
  const deliveries = await getPhotographerDeliveries();
  return <DeliveryClient deliveries={deliveries} />;
}
