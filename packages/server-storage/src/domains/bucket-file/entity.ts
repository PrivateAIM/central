/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Realm, Robot, User } from '@authup/core';
import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BucketEntity } from '../bucket';

@Entity({ name: 'bucket_files' })
export class BucketFileEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ type: 'varchar', length: 256 })
        name: string;

    @Column({ type: 'varchar', length: 4096 })
        hash: string;

    @Column({ nullable: true })
        directory: string;

    @Column({ type: 'int', unsigned: true, nullable: true })
        size: number | null;

    // ------------------------------------------------------------------

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    // ------------------------------------------------------------------

    @Column({ type: 'uuid', nullable: true })
        user_id: User['id'] | null;

    @Column({ type: 'uuid', nullable: true })
        realm_id: Realm['id'] | null;

    @Column({ type: 'uuid', nullable: true })
        robot_id: Robot['id'] | null;

    // ------------------------------------------------------------------

    @Column()
        bucket_id: BucketEntity['id'];

    @ManyToOne(() => BucketEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'bucket_id' })
        bucket: BucketEntity;
}