import { getInvoices } from "@/actions/billing";
import InvoiceClient from "./InvoiceClient";

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  
  return <InvoiceClient initialInvoices={invoices} />;
}
