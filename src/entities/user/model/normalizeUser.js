// Приводит данные пользователя от внешнего API к контракту пользователя RecipeBox
export const normalizeUser = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  phone: user.phone,
  age: user.age,
  gender: user.gender,
  birthDate: user.birthDate,
  firstName: user.firstName,
  lastName: user.lastName,
  image: user.image,
  role: user.role,
  location: {
    city: user.address?.city ?? '',
    country: user.address?.country ?? '',
  },
  education: user.university ?? '',
  work: {
    title: user.company?.title ?? '',
    department: user.company?.department ?? '',
    company: user.company?.name ?? '',
  },
});
