import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { PassThrough } from "node:stream";
import Site from "./Site";
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    output.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    output.on("error", reject);
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <Site />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          reject(error);
        },
      },
    );
  });
}
