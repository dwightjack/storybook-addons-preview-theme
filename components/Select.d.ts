import * as React from 'react';
import { Theme } from '../types';
export interface SelectProps {
    onChange: () => void;
    options: Theme[];
    value?: string;
}
export declare function Select({ onChange, options, value, }: {
    onChange: any;
    options: any;
    value?: string;
}): React.FunctionComponentElement<SelectProps>;
