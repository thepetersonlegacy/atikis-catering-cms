import { TinaAdmin } from "tinacms";
import config from "../tina/config";

export default function AdminPage() {
  return <TinaAdmin config={config} />;
}
