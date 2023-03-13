import { RefObject } from 'react';

const getRefValue = <T>(ref: RefObject<T>) => ref.current as T;

export default getRefValue;
