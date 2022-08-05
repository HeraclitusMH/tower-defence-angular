import { EnemyFactory } from './enemy-factory';

describe('EnemyFactory', () => {
  it('should create an instance', () => {
    expect(new EnemyFactory()).toBeTruthy();
  });
});
