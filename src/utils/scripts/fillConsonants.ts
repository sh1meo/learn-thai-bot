import { Letters } from 'src/letters/models/consonants.model';
import { consonants } from '../consonants.constant';

export function fillConsonants() {
  consonants.forEach(async (el) => {
    await Letters.create(el);
  });
}
