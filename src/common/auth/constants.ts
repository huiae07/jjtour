export const getJwtAccessSecret = () => {
  return process.env.JWT_SECRET || 'development';
};
export const getJwtAccessExpiration = (): number => {
  return Number(process.env.JWT_EXPIRATION || 60 * 60 * 24 * 7);
};

export enum JwtAuthType {
  USER = 'user',
}
