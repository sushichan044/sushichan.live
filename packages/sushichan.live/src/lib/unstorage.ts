import { createStorage, Storage } from "unstorage";
import fsDriver from "unstorage/drivers/fs-lite";

export const createFSStorage = (namespace: string): Storage => {
  const storage = createStorage({
    driver: fsDriver({ base: `node_modules/.cache/unstorage/${namespace}` }),
  });
  return storage;
};
