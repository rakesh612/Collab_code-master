export const getRoomId = (userId1, userId2) => {
  return userId1 > userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
};
