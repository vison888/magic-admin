import { MD5 } from 'crypto-js';
export const getPassword = (value: any) => MD5(value).toString();