import { UserOrmEntity } from './user.orm.entity';

describe('UserOrmEntity', () => {
  it('should be defined', () => {
    expect(new UserOrmEntity()).toBeDefined();
  });
});
