import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useLocationStore } from '@/store/location.store'; // Replace with your Zustand store import

interface SearchParams {
  storeId?: string;
  oobCode?: string;
  tab?: string;
}

export function useStoreIdInitializer() {
  const search = useSearch({ strict: false }) as SearchParams; // Get query params
  const setStoreId = useLocationStore((state) => state.setStoreId); // Zustand action

  useEffect(() => {
    console.log('INITIALIZING STORE ID');
    if (search.storeId) {
      console.log('storeId', search.storeId);
      setStoreId(search.storeId);
    } else {
      setStoreId('a85b6590-1e0b-4b11-bc27-9685398fa7a7');
    }
  }, [search.storeId, setStoreId]);
}
