// TODO: Provide repository helpers once Supabase schema is finalized
export interface RepositoryRequest<TFilter = unknown> {
  table: string;
  filter?: TFilter;
}

export const query = async <T>(request: RepositoryRequest): Promise<T[]> => {
  // TODO: Bridge Supabase queries here
  return [];
};

export const mutate = async <T>(request: RepositoryRequest, payload: Partial<T>): Promise<void> => {
  // TODO: Perform Supabase insert/update/delete operations
  void request;
  void payload;
};
