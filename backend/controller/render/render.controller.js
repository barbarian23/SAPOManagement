import { Render } from "../../service";

export async function renderController(req, res) {
  Render.getInstance().render(req, res);
}