import { Express } from "express";
declare const config: (app: Express, prefix: string) => Promise<void>;
export { config };
