import { NodeMap } from "flume";

export interface IFlume {
    getNodes: () => NodeMap;
}