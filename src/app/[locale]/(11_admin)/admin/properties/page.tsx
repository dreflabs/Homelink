import React from 'react';
import PropertyList from './PropertyList';
import { getAllProperties } from '@/actions/admin';

export default async function PropertyManagementPage() {
  const properties = await getAllProperties();
  return <PropertyList initialProperties={properties} />;
}
