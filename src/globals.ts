import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";

export const Globals = {
  DEBUG: false,
  conductor: undefined as undefined | IRunnerPlugin,
};

export interface Instruction {
  tag: string;
  val?: any;
  sym?: string;
  addr?: number;
  arity?: number;
  pos?: [number, number];
  num?: number;
  size?: number;
}
