import { Suite } from "benchmark";
import { randomBytes } from "crypto";

// Newer version
const getRandomInt = (min = 0, max = 4294967295) =>
  ((Math.random() * ((max | 0) - (min | 0) + 1.0)) + (min | 0)) | 0;

// Older version
const getOldRandomInt = (min: number, max: number): number => {
  const randomBuffer = randomBytes(4); // 4 bytes to generate a 32-bit integer
  const randomInt = randomBuffer.readUInt32BE(0); // Convert bytes to an unsigned 32-bit integer
  return min + (randomInt % (max - min + 1));
};

const suite = new Suite();

suite
  .add("Newer version", () => {
    getRandomInt(0, 4294967295);
  })
  .add("Older version", () => {
    getOldRandomInt(0, 4294967295);
  })
  .on("cycle", (event: { target: string }) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    // TODO: refacto here, too lazy to fix this one, or dig the benchmark api
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });