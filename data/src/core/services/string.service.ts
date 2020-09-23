import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class StringService {
  async hash(text: string): Promise<string> {
    return hash(text, process.env.HASH_SALT);
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return compare(text, hash);
  }
}
