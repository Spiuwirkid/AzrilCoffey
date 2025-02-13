import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

export function usePagination<T>(
  tableName: string,
  pageSize: number = 12
) {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery(
    [tableName, page],
    async () => {
      const start = page * pageSize;
      const end = start + pageSize - 1;

      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .range(start, end)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { items: data, total: count };
    },
    {
      keepPreviousData: true,
    }
  );

  return {
    data: data?.items || [],
    total: data?.total || 0,
    isLoading,
    error,
    page,
    setPage,
    hasMore: data ? (page + 1) * pageSize < data.total : false,
  };
} 