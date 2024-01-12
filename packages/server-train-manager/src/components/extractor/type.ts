/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Analysis } from '@personalhealthtrain/core';
import type { ExtractorCommand, ExtractorEvent } from './constants';

export type ExtractorFileType = 'file' | 'link' | 'symlink' | 'directory' |
'block-device' | 'character-device' | 'fifo' | 'contiguous-file';

export type ExtractingFile = {
    name: string,
    path?: string,
    size: number,
    content: string,
    type: ExtractorFileType
};

export type ExtractorExtractPayload = {
    id: Analysis['id'],

    filePaths?: string[],
    files?: ExtractingFile[]
};

export type ExtractorCheckPayload = {
    id: Analysis['id']
};

export type ExtractorPayload<C extends `${ExtractorCommand}`> =
    C extends `${ExtractorCommand.EXTRACT}` ?
        ExtractorExtractPayload :
        C extends `${ExtractorCommand.CHECK}` ?
            ExtractorCheckPayload :
            never;

export type ExtractorCheckCommandContext = {
    command: `${ExtractorCommand.CHECK}`,
    data: ExtractorCheckPayload
};

export type ExtractorCheckEventContext = ExtractorCheckCommandContext & {
    event: `${ExtractorEvent.FAILED}` |
        `${ExtractorEvent.CHECKED}` |
        `${ExtractorEvent.CHECKING}` |
        `${ExtractorEvent.NONE}`;
};

export type ExtractorExtractCommandContext = {
    command: `${ExtractorCommand.EXTRACT}`,
    data: ExtractorExtractPayload
};

export type ExtractorExtractEventContext = Omit<ExtractorExtractCommandContext, 'command'> & {
    command: `${ExtractorCommand.EXTRACT}` | `${ExtractorCommand.CHECK}`,
    event: `${ExtractorEvent.FAILED}` |
        `${ExtractorEvent.EXTRACTED}` |
        `${ExtractorEvent.EXTRACTING}` |
        `${ExtractorEvent.DOWNLOADED}` |
        `${ExtractorEvent.DOWNLOADING}`;
};

export type ExtractorCommandContext = ExtractorCheckCommandContext | ExtractorExtractCommandContext;

export type ExtractorEventContext = ExtractorCheckEventContext | ExtractorExtractEventContext;
