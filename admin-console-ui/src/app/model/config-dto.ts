import { KeyValueDTO } from './key-value';
import {UUIDDTO} from './uuid-dto';

export class ConfigDTO{
    mac: string;
    ip: string;
    configs: KeyValueDTO[];
    uuid: UUIDDTO[];
    public constructor(init?: Partial<ConfigDTO>) {
        Object.assign(this, init);
    }


}
