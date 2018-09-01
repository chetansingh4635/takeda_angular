import { PipesModulePipe } from './pipes.module.pipe';

describe('PipesModulePipe', () => {
  it('create an instance', () => {
    const pipe = new PipesModulePipe();
    expect(pipe).toBeTruthy();
  });
});
