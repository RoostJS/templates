import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

export function hashText(text: string): Promise<string> {
  return hash(text, process.env.HASH_SALT);
}

@Injectable()
export class StringService {
  async hash(text: string): Promise<string> {
    return hashText(text);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return compare(text, hash);
  }
}
