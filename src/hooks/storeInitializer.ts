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
    if (search.storeId) {
      setStoreId(search.storeId || '306c6666-e048-452a-ad8a-b76723b4a1ca');
    }
  }, [search.storeId, setStoreId]);
}
