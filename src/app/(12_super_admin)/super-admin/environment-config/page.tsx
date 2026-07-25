import { getEnvironmentConfigs } from "@/actions/super-admin";
import ConfigForm from "./ConfigForm";

export default async function EnvironmentConfigPage() {
  const configs = await getEnvironmentConfigs();

  return <ConfigForm initialConfigs={configs} />;
}
