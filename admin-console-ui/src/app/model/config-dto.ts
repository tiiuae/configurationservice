import { KeyValueDTO } from './key-value';

export class ConfigDTO{
    mac: string;
    ip: string;
    configs: KeyValueDTO[];
    public constructor(init?: Partial<ConfigDTO>) {
        Object.assign(this, init);
    }


}
