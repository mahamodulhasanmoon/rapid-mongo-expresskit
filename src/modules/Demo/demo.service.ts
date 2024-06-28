import { IDemo } from './demo.interface';
import { Demo } from './demo.model';

export const createDemoService = async (data: IDemo) => {
  const result = await Demo.create(data);
  return result;
};
