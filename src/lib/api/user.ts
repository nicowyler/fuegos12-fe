import { axiosInstance } from '@/lib/api/axios';
const CREATE_USER = '/api/user';

export async function createUser({
  uid,
  email,
  displayName,
  token,
}: {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  token: string | null;
}) {
  const name = displayName ? displayName : email;
  return await axiosInstance.post(CREATE_USER, JSON.stringify({ uid, email, displayName: name }), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
