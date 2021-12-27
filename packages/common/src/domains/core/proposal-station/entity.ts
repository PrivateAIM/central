/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Proposal } from '../proposal';
import { Station } from '../station';
import { ProposalStationApprovalStatus } from './status';
import { Realm } from '../../auth';

@Entity({ name: 'proposal_stations' })
export class ProposalStation {
    @PrimaryGeneratedColumn({ unsigned: true })
        id: number;

    @Column({ default: null })
        approval_status: ProposalStationApprovalStatus | null;

    @Column({ type: 'text', nullable: true })
        comment: string;

    // ------------------------------------------------------------------

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    // ------------------------------------------------------------------

    @Column()
        proposal_id: number;

    @ManyToOne(() => Proposal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'proposal_id' })
        proposal: Proposal;

    @Column()
        proposal_realm_id: string;

    @ManyToOne(() => Realm, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'proposal_realm_id' })
        proposal_realm: Realm;

    @Column()
        station_id: number;

    @ManyToOne(() => Station, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'station_id' })
        station: Station;

    @Column()
        station_realm_id: string;

    @ManyToOne(() => Realm, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'station_realm_id' })
        station_realm: Realm;
}
