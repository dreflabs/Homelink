import React from "react"
import { searchProperties } from "@/actions/property";
import { getTranslations } from "next-intl/server";
import { MapClientWrapper } from "./MapClientWrapper";

export default async function MapSearchPage({ searchParams }: { searchParams: any }) {
  const t = await getTranslations("PropertySearch.MapSearch");
  const resolvedParams = await searchParams || {}
  
  let properties: any[] = []
  try {
    const searchResult = await searchProperties(resolvedParams as any) as any
    properties = searchResult.data ? searchResult.data : Array.isArray(searchResult) ? searchResult : []
  } catch (error) {
    console.error(error)
  }

  // Pass translations as a plain object to client component
  const translations = {
    filter: t("filter"),
    mapPlaceholder: t("mapPlaceholder"),
    mapPlaceholderDesc: t("mapPlaceholderDesc"),
    connectApi: t("connectApi"),
    propertiesInArea: t("propertiesInArea"),
    propertiesFound: t("propertiesFound"),
    list: t("list"),
    map: t("map"),
    allProperties: t("allProperties"),
    noPropertiesFound: t("noPropertiesFound"),
    tryChangeKeyword: t("tryChangeKeyword"),
  };

  return (
    <MapClientWrapper 
      initialProperties={properties} 
      t={translations} 
      initialParams={resolvedParams}
    />
  )
}
