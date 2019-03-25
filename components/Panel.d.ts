import * as React from 'react';
export interface PanelProp {
    api: any;
    active: boolean;
    channel: any;
}
export declare function Panel({ api, active, channel, }: {
    api: any;
    active: any;
    channel: any;
}): React.FunctionComponentElement<PanelProp>;
