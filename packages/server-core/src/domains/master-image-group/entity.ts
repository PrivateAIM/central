/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Column,
    CreateDateColumn,
    Entity, Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type { MasterImageGroup } from '@privateaim/core';

@Entity({ name: 'master_image_groups' })
export class MasterImageGroupEntity implements MasterImageGroup {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ type: 'varchar', length: 128 })
        name: string;

    @Column({ type: 'varchar', length: 512 })
        path: string;

    @Index({ unique: true })
    @Column({ type: 'varchar', length: 256 })
        virtual_path: string;

    @Column({ type: 'text', nullable: true })
        command: string | null;

    @Column({ type: 'json', nullable: true })
        command_arguments: any | null;

    // ------------------------------------------------------------------

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;
}
