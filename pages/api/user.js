import { profile } from '../../src/mock/seeds/users/profile';

export default function handler(req, res) {
  res.status(200).json(profile.data);
}
