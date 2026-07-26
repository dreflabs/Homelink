import React from "react";
import { getPropertyForEdit } from "@/actions/dashboard";
import { EditPropertyClient } from "./EditPropertyClient";

export default async function EditPropertyPage(props: {
  params: Promise<{ propertyId: string }> | { propertyId: string };
}) {
  const params = await props.params;
  const propertyId = params.propertyId;

  let property;
  try {
    property = await getPropertyForEdit(propertyId);
  } catch (err: any) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Edit Properti</h1>
        <p className="text-red-500">{err.message || "Properti tidak ditemukan atau Anda tidak memiliki akses."}</p>
      </div>
    );
  }

  return <EditPropertyClient property={property} />;
}
