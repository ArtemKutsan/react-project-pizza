// Возвращает пользователя из кэша Redux по его ID
export const selectUserById = (state, userId) => state.users.items[userId];
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
