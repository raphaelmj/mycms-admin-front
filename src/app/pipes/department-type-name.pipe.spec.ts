import { DepartmentTypeNamePipe } from './department-type-name.pipe';

describe('DepartmentTypeNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DepartmentTypeNamePipe();
    expect(pipe).toBeTruthy();
  });
});
