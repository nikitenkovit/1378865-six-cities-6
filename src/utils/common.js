export const getRatingStarValue = (number) => {
  return Math.round(number) * 20 + `%`;
};

export const adaptCommentsData = (data) => ({
  comment: data.comment,
  date: data.date,
  id: data.id,
  rating: data.rating,
  user: {
    avatarUrl: data.user.avatar_url,
    id: data.user.id,
    isPro: data.user.is_pro,
    name: data.user.name,
  }
});
