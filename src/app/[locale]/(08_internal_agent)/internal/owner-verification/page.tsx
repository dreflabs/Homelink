import React from "react";
import { getOwnerVerifications } from "@/actions/internal";
import { OwnerVerificationClient } from "./OwnerVerificationClient";

export const dynamic = 'force-dynamic';

export default async function OwnerVerificationPage() {
  const data = await getOwnerVerifications();

  return <OwnerVerificationClient initialOwners={data} />;
}
