export const buildRecipesQuery = ({
  search = '',
  sortBy = '',
  order = 'asc',
  page = 1,
  pageSize = 0,
}) => ({
  search: search.trim().toLowerCase(),
  sortBy,
  order,
  limit: pageSize,
  skip: pageSize ? (page - 1) * pageSize : 0,
});
