// Приводит данные пользователя от внешнего API к контракту пользователя RecipeBox
export const normalizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  image: user.image,
  role: user.role,
});
