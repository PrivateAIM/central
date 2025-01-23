# Changelog

## [0.8.6](https://github.com/PrivateAIM/hub/compare/v0.8.5...v0.8.6) (2025-01-23)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.8.5 to ^0.8.6
    * @privateaim/kit bumped from ^0.8.5 to ^0.8.6
    * @privateaim/server-kit bumped from ^0.8.5 to ^0.8.6
    * @privateaim/server-core-realtime bumped from ^0.8.5 to ^0.8.6
    * @privateaim/server-http-kit bumped from ^0.8.5 to ^0.8.6
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.6 to ^0.7.7
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.8.5 to ^0.8.6

## [0.8.5](https://github.com/PrivateAIM/hub/compare/v0.8.4...v0.8.5) (2025-01-22)


### Features

* add public_key property to node entity ([69fe08e](https://github.com/PrivateAIM/hub/commit/69fe08e4732852d4cbd977a9bcb145f7fa0cfc15))
* allow node registry_id to be undefined ([a049c7a](https://github.com/PrivateAIM/hub/commit/a049c7ac5a69416ab643a908290e1047a5f7addb))
* bump authup dependencies & adjusted code base ([90f7131](https://github.com/PrivateAIM/hub/commit/90f7131723e4e00dad04cb5ababa3e3f232e9c24))
* implement basic master image event log (db-) entity ([d2fdb7f](https://github.com/PrivateAIM/hub/commit/d2fdb7fed7bf1380e0350f74edb47738a1f81550))
* implemented node-robot service to automatically assign permissions ([5b422bd](https://github.com/PrivateAIM/hub/commit/5b422bd3c0a0edfc0695dbe60a0b49b37a661045))
* initial hybrid cache (redis or memory) implementation ([b1cd569](https://github.com/PrivateAIM/hub/commit/b1cd569ff52d222f61d4b87abc921cb769de8264))
* migrate to new http create validator syntax ([38ca70e](https://github.com/PrivateAIM/hub/commit/38ca70ee1b060a7d1bd22c87bddcdde21b6fbadc))
* refactor http controller validation ([#880](https://github.com/PrivateAIM/hub/issues/880)) ([6e11074](https://github.com/PrivateAIM/hub/commit/6e110742f946d4d0e827f4beb497ba2612568b9a))
* refactoring of master-image workflow ([#845](https://github.com/PrivateAIM/hub/issues/845)) ([7d2b866](https://github.com/PrivateAIM/hub/commit/7d2b8662b24dcf411d3ae8232152fecf53167382))


### Bug Fixes

* analysis-node update operation ([ba6cc10](https://github.com/PrivateAIM/hub/commit/ba6cc10c99688ca25eecd4c06242dcea60b8281c))
* **deps:** bump @authup/core-kit from 1.0.0-beta.22 to 1.0.0-beta.23 ([#896](https://github.com/PrivateAIM/hub/issues/896)) ([e0dcfed](https://github.com/PrivateAIM/hub/commit/e0dcfed47320bd53fadbca11a05ca677ed0ef7ff))
* **deps:** bump @authup/kit from 1.0.0-beta.22 to 1.0.0-beta.23 ([#901](https://github.com/PrivateAIM/hub/issues/901)) ([00a447c](https://github.com/PrivateAIM/hub/commit/00a447ce40ab17b67b0809b41c4233e424303a7c))
* **deps:** bump authup to v1.0.0-beta.24 ([#963](https://github.com/PrivateAIM/hub/issues/963)) ([90c40c0](https://github.com/PrivateAIM/hub/commit/90c40c0d55018557ee8bb381aad7e3cfbcd29b83))
* **deps:** bump the minorandpatch group across 1 directory with 10 updates ([#962](https://github.com/PrivateAIM/hub/issues/962)) ([caf2001](https://github.com/PrivateAIM/hub/commit/caf2001c0e4dad30f24e4d66ce51ca8c89aba818))
* **deps:** bump the minorandpatch group across 1 directory with 31 updates ([#945](https://github.com/PrivateAIM/hub/issues/945)) ([448e9b8](https://github.com/PrivateAIM/hub/commit/448e9b86bf80f83c4aa8bb32ee0a75190a1d5cb8))
* **deps:** bump the minorandpatch group across 1 directory with 4 updates ([#906](https://github.com/PrivateAIM/hub/issues/906)) ([e11bc5f](https://github.com/PrivateAIM/hub/commit/e11bc5f3b565347af3180e8e29b4e3b79ace5961))
* **deps:** bump the minorandpatch group across 1 directory with 9 updates ([#954](https://github.com/PrivateAIM/hub/issues/954)) ([aa26580](https://github.com/PrivateAIM/hub/commit/aa2658002e869c736ba7079018b198b324b927e7))
* do not throw error if permission for node-robot permission creation does not exist ([eac34b5](https://github.com/PrivateAIM/hub/commit/eac34b540b5422fc78658c4aad016fa66ed16bf0))
* enable self permission owner check for analysis permission ([#965](https://github.com/PrivateAIM/hub/issues/965)) ([a37f421](https://github.com/PrivateAIM/hub/commit/a37f421821b76468280d3c7b309a431aca1180ce))
* minor adjustment to set synchronization state ([a716ec7](https://github.com/PrivateAIM/hub/commit/a716ec714d1d9954e4bb7eb164aa56efed60d592))
* minor fix for node-robot permission creation ([ff45808](https://github.com/PrivateAIM/hub/commit/ff45808de43d93fd2c35d9cd35c8285a767becf8))
* move http controllers ([f71c275](https://github.com/PrivateAIM/hub/commit/f71c275afadcd5d48afe76f57b2a361227b294a5))
* set robot_id after creation for node ([234770a](https://github.com/PrivateAIM/hub/commit/234770a14568071707bbe14cee4ec3b65cc92b5e))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.8.4 to ^0.8.5
    * @privateaim/kit bumped from ^0.8.4 to ^0.8.5
    * @privateaim/server-kit bumped from ^0.8.4 to ^0.8.5
    * @privateaim/server-core-realtime bumped from ^0.8.4 to ^0.8.5
    * @privateaim/server-http-kit bumped from ^0.8.4 to ^0.8.5
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.5 to ^0.7.6
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.8.4 to ^0.8.5

## [0.8.4](https://github.com/PrivateAIM/hub/compare/v0.8.3...v0.8.4) (2024-10-24)


### Features

* bump authup & implement async policy & permission evaluation ([#807](https://github.com/PrivateAIM/hub/issues/807)) ([d065562](https://github.com/PrivateAIM/hub/commit/d065562585076e26553ad5a39f4a5789f7e18f24))
* bump authup & vuecs packages + refactored navigation ([c4db8d5](https://github.com/PrivateAIM/hub/commit/c4db8d51588b3d701815e2ba2f9b80e594f3663f))
* delete project-node relation on analysis-node deletion (if possible) ([#794](https://github.com/PrivateAIM/hub/issues/794)) ([0e953e3](https://github.com/PrivateAIM/hub/commit/0e953e39bdd16329ebd3026395262ba3dd6631bb))
* enforce uniqueness for project name attribute ([#793](https://github.com/PrivateAIM/hub/issues/793)) ([0681249](https://github.com/PrivateAIM/hub/commit/0681249654e601c7cc4eec39a76ce8c2600ef7e9))
* initial implementation of database-integrity service ([077fdd3](https://github.com/PrivateAIM/hub/commit/077fdd3aa5e29b285655289ff70c1c85f7d8219c))


### Bug Fixes

* building and scanning master image command arguments ([95041ea](https://github.com/PrivateAIM/hub/commit/95041ea8a037171080cdb2e9e0f5024baf53080b))
* **deps:** bump locter from 2.1.1 to 2.1.2 ([#795](https://github.com/PrivateAIM/hub/issues/795)) ([fdb8cba](https://github.com/PrivateAIM/hub/commit/fdb8cba0c5a991a57ed9a26a324b9f2fed6caf5c))
* **deps:** bump locter from 2.1.2 to 2.1.4 ([#816](https://github.com/PrivateAIM/hub/issues/816)) ([0af403a](https://github.com/PrivateAIM/hub/commit/0af403a0eef7bca9c4f316e6598607c2897a8065))
* **deps:** bump typeorm-extension from 3.6.1 to 3.6.2 ([#810](https://github.com/PrivateAIM/hub/issues/810)) ([c9af9ae](https://github.com/PrivateAIM/hub/commit/c9af9aea537c4a51aae13f1059c1565180045a83))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.8.3 to ^0.8.4
    * @privateaim/kit bumped from ^0.8.3 to ^0.8.4
    * @privateaim/server-kit bumped from ^0.8.3 to ^0.8.4
    * @privateaim/server-core-realtime bumped from ^0.8.3 to ^0.8.4
    * @privateaim/server-http-kit bumped from ^0.8.3 to ^0.8.4
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.4 to ^0.7.5
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.8.3 to ^0.8.4

## [0.8.3](https://github.com/PrivateAIM/hub/compare/v0.8.2...v0.8.3) (2024-09-19)


### Features

* add additional created_at/updated_at of child relations ([7db1a89](https://github.com/PrivateAIM/hub/commit/7db1a89aca1098e2fc716e6a626afaf816153422))
* permit node authority to update run_status if permission is granted ([06d1ba7](https://github.com/PrivateAIM/hub/commit/06d1ba787040fc86226bd1ca3d34271a6487ad1a))


### Bug Fixes

* **deps:** bump @routup/basic from 1.4.0 to 1.4.1 ([#752](https://github.com/PrivateAIM/hub/issues/752)) ([c190870](https://github.com/PrivateAIM/hub/commit/c1908702123c9d6d471d3f62543e91f5f645154d))
* **deps:** bump @routup/decorators from 3.4.0 to 3.4.1 ([#751](https://github.com/PrivateAIM/hub/issues/751)) ([89de8dc](https://github.com/PrivateAIM/hub/commit/89de8dc84d72f3322317df613ae06419b4909b72))
* **deps:** bump @routup/swagger from 2.4.0 to 2.4.1 ([#756](https://github.com/PrivateAIM/hub/issues/756)) ([91a19cd](https://github.com/PrivateAIM/hub/commit/91a19cdd32536ca9cbad23170e685a868431b094))
* **deps:** bump pg from 8.12.0 to 8.13.0 ([#753](https://github.com/PrivateAIM/hub/issues/753)) ([9f6e01e](https://github.com/PrivateAIM/hub/commit/9f6e01e9e85c86364d65be7afb66710595ada868))
* **deps:** bump routup from 4.0.0 to 4.0.1 ([#754](https://github.com/PrivateAIM/hub/issues/754)) ([beaf196](https://github.com/PrivateAIM/hub/commit/beaf196efdcab56695622a164b88eb4024848703))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.8.2 to ^0.8.3
    * @privateaim/kit bumped from ^0.8.2 to ^0.8.3
    * @privateaim/server-kit bumped from ^0.8.2 to ^0.8.3
    * @privateaim/server-core-realtime bumped from ^0.8.2 to ^0.8.3
    * @privateaim/server-http-kit bumped from ^0.8.2 to ^0.8.3
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.3 to ^0.7.4
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.8.2 to ^0.8.3

## [0.8.2](https://github.com/PrivateAIM/hub/compare/v0.8.1...v0.8.2) (2024-08-28)


### Bug Fixes

* **deps:** bump locter from 2.1.0 to 2.1.1 ([#685](https://github.com/PrivateAIM/hub/issues/685)) ([e5e0860](https://github.com/PrivateAIM/hub/commit/e5e086024d7a9157c1833aa656bcc91a0574e4a9))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.8.1 to ^0.8.2
    * @privateaim/kit bumped from ^0.8.1 to ^0.8.2
    * @privateaim/server-kit bumped from ^0.8.1 to ^0.8.2
    * @privateaim/server-core-realtime bumped from ^0.8.1 to ^0.8.2
    * @privateaim/server-http-kit bumped from ^0.8.1 to ^0.8.2
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.2 to ^0.7.3
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.8.1 to ^0.8.2

## [0.8.1](https://github.com/PrivateAIM/hub/compare/v0.8.0...v0.8.1) (2024-08-19)


### Features

* add authup policy aggregator ([adb2235](https://github.com/PrivateAIM/hub/commit/adb22356c177dea09a7e722786f92e13f57481bd))
* add description column to analysis entity ([438297b](https://github.com/PrivateAIM/hub/commit/438297beacbb264d3a8034f5a4a79fef7dff1d33))
* add error log formatting ([976c4cd](https://github.com/PrivateAIM/hub/commit/976c4cdf0648368b3164ba97a36cac13f99c203e))
* add memory-cache & track master images synchronization progress ([bd43978](https://github.com/PrivateAIM/hub/commit/bd439781941e1130f812a30e721227e2893670ea))
* allow specifying branch for syncing master-images ([#587](https://github.com/PrivateAIM/hub/issues/587)) ([b6ff9a5](https://github.com/PrivateAIM/hub/commit/b6ff9a54e8b42fcf7dfd2c1cf0e318973c0e13ec))
* extended and modified project columns (nodes, robot_id, user_id, description) ([#642](https://github.com/PrivateAIM/hub/issues/642)) ([afe9491](https://github.com/PrivateAIM/hub/commit/afe9491c84f98193fe5158fe2c51ec06a247921f))
* master image workflow to sync, build & push image/groups ([#574](https://github.com/PrivateAIM/hub/issues/574)) ([146e66f](https://github.com/PrivateAIM/hub/commit/146e66f2408ddd1363e1077a0bd189b87d5b411e))


### Bug Fixes

* add missing rethrow statement ([d73935a](https://github.com/PrivateAIM/hub/commit/d73935aedbf347e6cf280a49cb1b2986c43cad8d))
* always run db schema synchronization ([b3ba492](https://github.com/PrivateAIM/hub/commit/b3ba4926bc69af70fa94f4004d8c64b40101f116))
* analysis-manager aggregator handler ([8fe18e4](https://github.com/PrivateAIM/hub/commit/8fe18e46d29586cd75f0cf936108b4edc9411392))
* analysis-permisison permission_id field validation ([051ab7e](https://github.com/PrivateAIM/hub/commit/051ab7e2b5b8d10672d66d94635b233eb85d48b3))
* apply schema check again ([7e820e6](https://github.com/PrivateAIM/hub/commit/7e820e665e91c8a61b2684c4d47474cacac1a11a))
* change order when blocking master image sync process ([8e9efc1](https://github.com/PrivateAIM/hub/commit/8e9efc1c707ea3582fe802a8e1073b0c496d5acb))
* **deps:** bump express-validator from 7.1.0 to 7.2.0 ([#654](https://github.com/PrivateAIM/hub/issues/654)) ([1b1d70e](https://github.com/PrivateAIM/hub/commit/1b1d70e759c94d05fc1ae7098f308275735ce971))
* **deps:** bump mysql2 from 3.10.2 to 3.11.0 ([#610](https://github.com/PrivateAIM/hub/issues/610)) ([3786b07](https://github.com/PrivateAIM/hub/commit/3786b079bc2d65cdf87b982e4d937cb283f78aad))
* **deps:** bump typeorm-extension from 3.5.1 to 3.6.0 ([#619](https://github.com/PrivateAIM/hub/issues/619)) ([7af46a3](https://github.com/PrivateAIM/hub/commit/7af46a317755cb8e1d5c26779d5d9157964ba51d))
* **deps:** bump typeorm-extension from 3.6.0 to 3.6.1 ([#652](https://github.com/PrivateAIM/hub/issues/652)) ([c862af7](https://github.com/PrivateAIM/hub/commit/c862af75dec7d42e3da9c50761e7ab61225a1c8f))
* enhance logging for registry component ([b1a8bb3](https://github.com/PrivateAIM/hub/commit/b1a8bb3b80aa4d00398a3624677d4401f701b134))
* harbor reigstry robot permission assignment ([2a0a8f7](https://github.com/PrivateAIM/hub/commit/2a0a8f75df581d7cbbf3654456f3211efa654b19))
* master images synchronization process ([604a375](https://github.com/PrivateAIM/hub/commit/604a375b525e73d17c208731dd7256ea30412d57))
* naming in project read handlers ([fb03369](https://github.com/PrivateAIM/hub/commit/fb0336995dfe5482762b6f6a019b25106722cd89))
* reenable db check in start command ([c83f34f](https://github.com/PrivateAIM/hub/commit/c83f34f101b225356b515da23948d56a36107585))
* set project description column to varchar ([dea15b0](https://github.com/PrivateAIM/hub/commit/dea15b027a02153f6300690be9d0d8ba8fab3add))
* temporarily disable registry project manage restriction ([8f8d8dd](https://github.com/PrivateAIM/hub/commit/8f8d8dd88ea917cf3b967232107487170bcdbaf9))


### Reverts

* "fix: set project description column to varchar" ([705454c](https://github.com/PrivateAIM/hub/commit/705454cc51d3fd943cbcb32b9c4eff64758ae7aa))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.8.0 to ^0.8.1
    * @privateaim/kit bumped from ^0.8.0 to ^0.8.1
    * @privateaim/server-kit bumped from ^0.8.0 to ^0.8.1
    * @privateaim/server-core-realtime bumped from ^0.8.0 to ^0.8.1
    * @privateaim/server-http-kit bumped from ^0.8.0 to ^0.8.1
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.1 to ^0.7.2
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.8.0 to ^0.8.1

## [0.8.0](https://github.com/PrivateAIM/hub/compare/v0.7.0...v0.8.0) (2024-07-02)


### Features

* add missing analysis-permission validation steps ([30cba38](https://github.com/PrivateAIM/hub/commit/30cba3846cd7579b9482b7cd8f622d4cb39f5529))
* add missing policies fetch for analysis-permission get-many handler ([62fc56c](https://github.com/PrivateAIM/hub/commit/62fc56c324aaf0cee10b59045d987d544cbf61df))
* simplified and adjusted permission usage across codespace ([1839f5e](https://github.com/PrivateAIM/hub/commit/1839f5eb768f120e268e57e0a496fef5eb0eca41))


### Bug Fixes

* analysis-permission test-suite ([5604d85](https://github.com/PrivateAIM/hub/commit/5604d8599a634c5f6e84040f58a5ccb29f3c2431))
* **deps:** bump @hapic/harbor from 2.3.3 to 2.3.4 ([#537](https://github.com/PrivateAIM/hub/issues/537)) ([f8f805f](https://github.com/PrivateAIM/hub/commit/f8f805f2a7c30168dc503671f9927bf9689858ec))
* **deps:** bump @hapic/vault from 2.3.3 to 2.3.4 ([#538](https://github.com/PrivateAIM/hub/issues/538)) ([ed2c1fd](https://github.com/PrivateAIM/hub/commit/ed2c1fd0a18482bbc05b5f6f0e9f43bb667abc91))
* **deps:** bump @routup/basic from 1.3.2 to 1.4.0 ([#523](https://github.com/PrivateAIM/hub/issues/523)) ([409a594](https://github.com/PrivateAIM/hub/commit/409a59460fbce2934ba489e7fde579063e2fc6d4))
* **deps:** bump @routup/decorators from 3.3.2 to 3.4.0 ([#531](https://github.com/PrivateAIM/hub/issues/531)) ([295f692](https://github.com/PrivateAIM/hub/commit/295f6926b8492aa58856ec2e0ea469e9b19388d3))
* **deps:** bump @routup/prometheus from 2.3.0 to 2.4.0 ([#525](https://github.com/PrivateAIM/hub/issues/525)) ([b98e5f1](https://github.com/PrivateAIM/hub/commit/b98e5f1020f2363c5074f98408e4786cdde24e0d))
* **deps:** bump @routup/swagger from 2.3.6 to 2.4.0 ([#530](https://github.com/PrivateAIM/hub/issues/530)) ([cef8d2c](https://github.com/PrivateAIM/hub/commit/cef8d2c2de5d29c0cc7cf84abf8ef980b05c5fe9))
* **deps:** bump authup to v1.0.0.beta-19 ([3410786](https://github.com/PrivateAIM/hub/commit/34107860d7f810cea7b2024b0f303cd70d32a5fe))
* **deps:** bump mysql2 from 3.10.0 to 3.10.1 ([#461](https://github.com/PrivateAIM/hub/issues/461)) ([f415417](https://github.com/PrivateAIM/hub/commit/f4154174a7049dea2624b99988ea013790167142))
* **deps:** bump mysql2 from 3.10.1 to 3.10.2 ([#529](https://github.com/PrivateAIM/hub/issues/529)) ([1c73408](https://github.com/PrivateAIM/hub/commit/1c73408e5ca2ca1107a985628a7b421d28ff41ce))
* **deps:** bump routup to v4.x ([787bb7c](https://github.com/PrivateAIM/hub/commit/787bb7cb6951f32fed29ac77467dcdec76683672))
* read analysis-permission read handler ([b1794b1](https://github.com/PrivateAIM/hub/commit/b1794b1934f14932772576ab484f68a2cae31c4c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.7.0 to ^0.8.0
    * @privateaim/kit bumped from ^0.7.0 to ^0.8.0
    * @privateaim/server-kit bumped from ^0.7.0 to ^0.8.0
    * @privateaim/server-core-realtime bumped from ^0.7.0 to ^0.8.0
    * @privateaim/server-http-kit bumped from ^0.7.0 to ^0.8.0
    * @privateaim/server-analysis-manager-kit bumped from ^0.7.0 to ^0.7.1
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.7.0 to ^0.8.0

## [0.7.0](https://github.com/PrivateAIM/hub/compare/v0.6.0...v0.7.0) (2024-06-26)


### Features

* adjusted code references for core -&gt; core-kit package renaming ([321b8ac](https://github.com/PrivateAIM/hub/commit/321b8acb33e4fdd93252c72da34fac34cc86cd9f))
* adjusted permission names ([3f5e863](https://github.com/PrivateAIM/hub/commit/3f5e8637937f52c73280fe911dd5c150d446da4f))
* allow referencing custom robot account to node ([a3277a2](https://github.com/PrivateAIM/hub/commit/a3277a2aa7a8ae2cc44db27afd29694a630d5a89))
* allow specifying node type ([#242](https://github.com/PrivateAIM/hub/issues/242)) ([29e14fa](https://github.com/PrivateAIM/hub/commit/29e14fad131825abeebde769c863b9bd4c92c843))
* analysis-bucket implementation  ([#433](https://github.com/PrivateAIM/hub/issues/433)) ([15329f4](https://github.com/PrivateAIM/hub/commit/15329f42c5f6ebbe4772715ff2e308e41ae9e91a))
* analysis-manager-kit package implementation ([#393](https://github.com/PrivateAIM/hub/issues/393)) ([d9faf4a](https://github.com/PrivateAIM/hub/commit/d9faf4a4580634a62ed58ec994369be1369e33ee))
* auto approval for aggregator nodes ([94b4f30](https://github.com/PrivateAIM/hub/commit/94b4f30464ef48ab34411c3d38eced4845d367a7))
* better restrictions for linking files to an analysis ([45a6d8a](https://github.com/PrivateAIM/hub/commit/45a6d8a8b9699dbf6c5a418dec91a3cfb8b1e3e0))
* bump authup to v1.0.0-beta.5 ([13aeab2](https://github.com/PrivateAIM/hub/commit/13aeab2eb8a00069512eee17fc129d56a58309bc))
* cleanup component error handling ([e8869ef](https://github.com/PrivateAIM/hub/commit/e8869efddf658f695fb4c0e6cf8b9596306c123a))
* enable mysql8 usage ([78d9e0b](https://github.com/PrivateAIM/hub/commit/78d9e0bdbad2fc389676af675a7fdd2b61f5e388))
* enable possibility to unlock analysis configuration ([#245](https://github.com/PrivateAIM/hub/issues/245)) ([1053362](https://github.com/PrivateAIM/hub/commit/105336254714a1e64d340eb66c10ec1681890559))
* extract utils and common consts, fns, ... to kit package ([258bbb2](https://github.com/PrivateAIM/hub/commit/258bbb21bfbf671a7cfad3e91740a1737eaf3f71))
* initial analysis-permission implementation ([#502](https://github.com/PrivateAIM/hub/issues/502)) ([63cfdbe](https://github.com/PrivateAIM/hub/commit/63cfdbe4c97302dd37b9e2ce22da2592ffb8edbd))
* initial core -&gt; core-kit package renaming ([9ac9709](https://github.com/PrivateAIM/hub/commit/9ac970999922bc76e3f88381f4d3351a51147a46))
* initial user interface draft ([#148](https://github.com/PrivateAIM/hub/issues/148)) ([600a3cf](https://github.com/PrivateAIM/hub/commit/600a3cf3ad42ca60a610eb2eb3d1a912c42bd12f))
* integrated authup middleware in server-kit package ([#259](https://github.com/PrivateAIM/hub/issues/259)) ([a4b6871](https://github.com/PrivateAIM/hub/commit/a4b6871ffa7f43f49cceac3044b41bf622aa75d3))
* lock analysis-node creation after analyis is locked ([e353a27](https://github.com/PrivateAIM/hub/commit/e353a275daaba1f1972c6cd724bb04f1d85d4af5))
* migrated to authup version v1.0.0-beta.18 ([06928f6](https://github.com/PrivateAIM/hub/commit/06928f681120b423f962a7869f8f6b12708d3047))
* minor cleanup in vue components ([8753567](https://github.com/PrivateAIM/hub/commit/8753567023992d2b4bbf6efcc2468ee06fd31604))
* move http request validation logic to kit package ([#104](https://github.com/PrivateAIM/hub/issues/104)) ([5c26e44](https://github.com/PrivateAIM/hub/commit/5c26e44fdd1df48c5c35756495df08423481770d))
* move redis singleton management to kit package ([285b073](https://github.com/PrivateAIM/hub/commit/285b073eede72ea342f1f4e75e5f00593c51fafd))
* move service factories/singletons to server-kit-package ([#387](https://github.com/PrivateAIM/hub/issues/387)) ([669d352](https://github.com/PrivateAIM/hub/commit/669d3526893c8bc2d2dd8fe78f423783c5d7e317))
* queue-router for components & aggregators ([#396](https://github.com/PrivateAIM/hub/issues/396)) ([0da6066](https://github.com/PrivateAIM/hub/commit/0da6066e378cc97ee8d7b98558e5281dda66cbc9))
* realtime library/service split ([#474](https://github.com/PrivateAIM/hub/issues/474)) ([43c2dfa](https://github.com/PrivateAIM/hub/commit/43c2dfad654cc61ca9784914cbad56c684434088))
* refactor analysis configuration ([#200](https://github.com/PrivateAIM/hub/issues/200)) ([e7bfc3f](https://github.com/PrivateAIM/hub/commit/e7bfc3f23d5b9ce6fc6d9e8d0a144fe54ea03335))
* refactor analysis file management ([#176](https://github.com/PrivateAIM/hub/issues/176)) ([0ea979a](https://github.com/PrivateAIM/hub/commit/0ea979a2eed3cb557e82c6c96f83b367b0f89f0f))
* refactor analysis-file for new context ([#144](https://github.com/PrivateAIM/hub/issues/144)) ([6a6383c](https://github.com/PrivateAIM/hub/commit/6a6383cf5d920463626f9d6d4798d59597e31d88))
* refactor service singleton management ([#131](https://github.com/PrivateAIM/hub/issues/131)) ([7b9195f](https://github.com/PrivateAIM/hub/commit/7b9195fe0c5eca7a3dfcd356edac55b47ba15278))
* refactor third-party configuration ([#26](https://github.com/PrivateAIM/hub/issues/26)) ([c5e929c](https://github.com/PrivateAIM/hub/commit/c5e929cd8fc2741436001c59a983a64da3f427c6))
* refactored amqp usage & extended docker-compose file ([4a557dc](https://github.com/PrivateAIM/hub/commit/4a557dc4558e575e7d4f1a9ce317dba417a3ef21))
* remove permission & role presets ([ea679aa](https://github.com/PrivateAIM/hub/commit/ea679aad29bdf773fc445af66637b518287a96f1))
* renamed database subscribers ([88405cc](https://github.com/PrivateAIM/hub/commit/88405cceca74218a6485abff0e2fae0b8429e3a1))
* restrict analyis-node management after an analysis has been locked ([#244](https://github.com/PrivateAIM/hub/issues/244)) ([11cc582](https://github.com/PrivateAIM/hub/commit/11cc5824e677368aecac6afe00493886b7a3182b))
* run tests in parallel ([#506](https://github.com/PrivateAIM/hub/issues/506)) ([5739ce4](https://github.com/PrivateAIM/hub/commit/5739ce4133693ced649b1412dfd6f535a6a0e1fa))
* server-http-kit package with validation, authup & request utils/helpers ([#375](https://github.com/PrivateAIM/hub/issues/375)) ([7762a2f](https://github.com/PrivateAIM/hub/commit/7762a2f81ea8dfcd77fc8c7f8d64bb91ad2bcd4f))
* service health endpoint & docker health check ([aa4ef27](https://github.com/PrivateAIM/hub/commit/aa4ef27a0ec56373204f2cc0c3eccf5011519883))
* setup default harbor service on startup if defined ([#170](https://github.com/PrivateAIM/hub/issues/170)) ([e9d9d68](https://github.com/PrivateAIM/hub/commit/e9d9d688548fa1b6fa0e68f8ce024b497335a6b9))
* simplified authentication & authorization management ([0b19929](https://github.com/PrivateAIM/hub/commit/0b199297766780a4c5cfcd8eda02cefb9f226958))
* simplified logger usage across packages ([39ea90f](https://github.com/PrivateAIM/hub/commit/39ea90ffa6296f91ffb0f89a567036b0054f0135))
* simplified test suite class + http client for server-storage tests ([94a9537](https://github.com/PrivateAIM/hub/commit/94a953774617e196d86af6f5b781bf862fa991b2))
* split builder command-exection/event-split ([#412](https://github.com/PrivateAIM/hub/issues/412)) ([13d0d57](https://github.com/PrivateAIM/hub/commit/13d0d575abb45538d79ffef91357e1528c5afb11))
* swagger docs generation & serving for storage service ([2a2a582](https://github.com/PrivateAIM/hub/commit/2a2a582f5afb2c706b08d5da537778587070020f))
* sync master-images on start up ([#169](https://github.com/PrivateAIM/hub/issues/169)) ([a4a916e](https://github.com/PrivateAIM/hub/commit/a4a916ece8e1022d8c2db3bb3de6b0a6d7df37da))
* tar use new onReadEntry in favor of deprecated onentry fn ([9294bc0](https://github.com/PrivateAIM/hub/commit/9294bc01db06c194a112e6ac51df4defc94363f7))
* trigger analysis action in controller instead of subscriber ([026c56a](https://github.com/PrivateAIM/hub/commit/026c56acf6950b473dfe3e5b777c70b659e5b0a9))
* updated authup, vuecs & ilingo ([66a5f7b](https://github.com/PrivateAIM/hub/commit/66a5f7ba1454fc5e432cd687a509ebf3bf4c4ab4))
* use http-client for test-suites ([#508](https://github.com/PrivateAIM/hub/issues/508)) ([83fb96b](https://github.com/PrivateAIM/hub/commit/83fb96bbec6cddc5b8030048a60c5a80153a0d0a))
* use kit package for singleton management of the logger ([61bbe21](https://github.com/PrivateAIM/hub/commit/61bbe215202ba1366d0b44bdd81a6b9b24a4a531))
* view for downloading results + refactored entities/types ([#188](https://github.com/PrivateAIM/hub/issues/188)) ([084040e](https://github.com/PrivateAIM/hub/commit/084040eec1e74b10ec40c577d5f8e3a5fcedf250))


### Bug Fixes

* analysis build command execution ([c793150](https://github.com/PrivateAIM/hub/commit/c7931509d3da05ada66bdc8f547ec961260d63ce))
* analysis-bucket-file delete operation & auth plugin nuxt-app access ([86e3a2d](https://github.com/PrivateAIM/hub/commit/86e3a2da2b780c1080c83b761f3b0a189c3580de))
* auto approve project request for aggregator node ([8a82fe0](https://github.com/PrivateAIM/hub/commit/8a82fe0083683dd90e2c4d23f6f4f68088bbded8))
* change action order of analysis subscriber ([9fbd6fe](https://github.com/PrivateAIM/hub/commit/9fbd6fe72dccdc75b44b542115f170c799beb22b))
* cleanup analysis controller ([1554ba8](https://github.com/PrivateAIM/hub/commit/1554ba812fa4e809cc9668346ab945e26f784ada))
* consuming and publishing with queue-router ([1a461e7](https://github.com/PrivateAIM/hub/commit/1a461e7ce539cf19f5866783f3a58319318de137))
* **deps:** bump @authup/core from 1.0.0-beta.1 to 1.0.0-beta.3 ([#53](https://github.com/PrivateAIM/hub/issues/53)) ([95df3be](https://github.com/PrivateAIM/hub/commit/95df3be641bed869a10f69bcb3065eb36ada178e))
* **deps:** bump @authup/core from 1.0.0-beta.3 to 1.0.0-beta.4 ([#92](https://github.com/PrivateAIM/hub/issues/92)) ([b950c83](https://github.com/PrivateAIM/hub/commit/b950c838b0de3e647452145182f906472af2fd12))
* **deps:** bump @authup/core from 1.0.0-beta.5 to 1.0.0-beta.7 ([#155](https://github.com/PrivateAIM/hub/issues/155)) ([e0da3b4](https://github.com/PrivateAIM/hub/commit/e0da3b4ccabc30e8871cd01f373f3437a0f1928a))
* **deps:** bump @authup/core from 1.0.0-beta.7 to 1.0.0-beta.8 ([#210](https://github.com/PrivateAIM/hub/issues/210)) ([6e8adf2](https://github.com/PrivateAIM/hub/commit/6e8adf2c80dba69eb66a76250e1fc1acc1bb71dd))
* **deps:** bump @authup/core from 1.0.0-beta.8 to 1.0.0-beta.9 ([#277](https://github.com/PrivateAIM/hub/issues/277)) ([f9a8f59](https://github.com/PrivateAIM/hub/commit/f9a8f59a60990f8ffe6da044c18150a56f2e196c))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.3 to 1.0.0-beta.4 ([#94](https://github.com/PrivateAIM/hub/issues/94)) ([a387911](https://github.com/PrivateAIM/hub/commit/a387911dfb8afe8d2f53a2b82f4c8f6b5f70f9a3))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.5 to 1.0.0-beta.7 ([#157](https://github.com/PrivateAIM/hub/issues/157)) ([0aa827b](https://github.com/PrivateAIM/hub/commit/0aa827b7752e3903dad305e5aeb91d754df2d908))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.7 to 1.0.0-beta.8 ([#207](https://github.com/PrivateAIM/hub/issues/207)) ([d7133b5](https://github.com/PrivateAIM/hub/commit/d7133b5cba04eef3150535b6860849a9ed6a584a))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.8 to 1.0.0-beta.9 ([#274](https://github.com/PrivateAIM/hub/issues/274)) ([ce80e33](https://github.com/PrivateAIM/hub/commit/ce80e331524a0d50632e99909587028c6d18b88a))
* **deps:** bump @hapic/harbor from 2.3.2 to 2.3.3 ([#215](https://github.com/PrivateAIM/hub/issues/215)) ([9c83112](https://github.com/PrivateAIM/hub/commit/9c831124847f8a8ac0244f6cebbd437a231ef690))
* **deps:** bump @hapic/vault from 2.3.2 to 2.3.3 ([#213](https://github.com/PrivateAIM/hub/issues/213)) ([94565fc](https://github.com/PrivateAIM/hub/commit/94565fcbd5026ed84cc3c255f1c2ae900c1312cd))
* **deps:** bump @routup/swagger from 2.3.4 to 2.3.5 ([#95](https://github.com/PrivateAIM/hub/issues/95)) ([7b38e6f](https://github.com/PrivateAIM/hub/commit/7b38e6f64510a2b3c919ee72791f34c6d180e6f7))
* **deps:** bump @routup/swagger from 2.3.5 to 2.3.6 ([#248](https://github.com/PrivateAIM/hub/issues/248)) ([6699b8e](https://github.com/PrivateAIM/hub/commit/6699b8ee14b4939f0cc1a0a1dd41e6e106da948b))
* **deps:** bump amqp-extension from 3.0.0 to 3.1.0 ([#149](https://github.com/PrivateAIM/hub/issues/149)) ([bad4cda](https://github.com/PrivateAIM/hub/commit/bad4cda509d374efcd56242410d5458b52af1415))
* **deps:** bump amqp-extension from 3.1.0 to 3.1.1 ([#158](https://github.com/PrivateAIM/hub/issues/158)) ([d4afe51](https://github.com/PrivateAIM/hub/commit/d4afe51fac465990dacc8760490ffc483b601832))
* **deps:** bump amqp-extension from 3.1.1 to 3.2.0 ([#168](https://github.com/PrivateAIM/hub/issues/168)) ([70ea6ca](https://github.com/PrivateAIM/hub/commit/70ea6ca2cecf63b006906c24e6c28d2b5bbd3aae))
* **deps:** bump amqp-extension from 3.2.0 to 3.3.0 ([#196](https://github.com/PrivateAIM/hub/issues/196)) ([5c8d663](https://github.com/PrivateAIM/hub/commit/5c8d663145e0fc55c172242477dfdfb04e4f1472))
* **deps:** bump amqp-extension from 4.0.0-beta.1 to 4.0.0-beta.2 ([#450](https://github.com/PrivateAIM/hub/issues/450)) ([b65538a](https://github.com/PrivateAIM/hub/commit/b65538ac7e6a0b28ad87b966a01425c8bd86ea3d))
* **deps:** bump amqp-extension from 4.0.0-beta.2 to 4.0.0-beta.3 ([#457](https://github.com/PrivateAIM/hub/issues/457)) ([2585ea2](https://github.com/PrivateAIM/hub/commit/2585ea2b22b969c21e82b3b92b2e795198dd5f44))
* **deps:** bump dotenv from 16.3.1 to 16.4.4 ([#78](https://github.com/PrivateAIM/hub/issues/78)) ([c800a59](https://github.com/PrivateAIM/hub/commit/c800a59ce393ff770975b1281180e3c2644949d5))
* **deps:** bump dotenv from 16.4.4 to 16.4.5 ([#98](https://github.com/PrivateAIM/hub/issues/98)) ([4588390](https://github.com/PrivateAIM/hub/commit/458839089cdf27c40dde9c65db822463a0ca5f3a))
* **deps:** bump express-validator from 7.0.1 to 7.1.0 ([#384](https://github.com/PrivateAIM/hub/issues/384)) ([572a429](https://github.com/PrivateAIM/hub/commit/572a42981fb9dcfcaed8fa784c18afa1a897eddc))
* **deps:** bump hapic from 2.5.0 to 2.5.1 ([#214](https://github.com/PrivateAIM/hub/issues/214)) ([eb3e30c](https://github.com/PrivateAIM/hub/commit/eb3e30c6cf3fb81d30ef9b2c802698a5818505a2))
* **deps:** bump locter from 2.0.2 to 2.1.0 ([#229](https://github.com/PrivateAIM/hub/issues/229)) ([bca1800](https://github.com/PrivateAIM/hub/commit/bca18001da52146e80452d3d4fc286c26f03b9b3))
* **deps:** bump mysql2 from 3.9.3 to 3.9.4 ([#268](https://github.com/PrivateAIM/hub/issues/268)) ([c1b16a3](https://github.com/PrivateAIM/hub/commit/c1b16a3ebd6af2ebcd462988c1b9b74df12ebe14))
* **deps:** bump mysql2 from 3.9.4 to 3.9.7 ([#309](https://github.com/PrivateAIM/hub/issues/309)) ([6f4dd4e](https://github.com/PrivateAIM/hub/commit/6f4dd4e7ec1696f034ecbe34edb09609ec54d501))
* **deps:** bump mysql2 from 3.9.8 to 3.10.0 ([#411](https://github.com/PrivateAIM/hub/issues/411)) ([b44e278](https://github.com/PrivateAIM/hub/commit/b44e2782e338fd1d7164d43f1bc5414d29178e61))
* **deps:** bump pg from 8.11.3 to 8.11.4 ([#225](https://github.com/PrivateAIM/hub/issues/225)) ([75ab55e](https://github.com/PrivateAIM/hub/commit/75ab55ef6df1492378c1f80bdc385011deb6c4b4))
* **deps:** bump pg from 8.11.4 to 8.11.5 ([#234](https://github.com/PrivateAIM/hub/issues/234)) ([f7da9c9](https://github.com/PrivateAIM/hub/commit/f7da9c98cb2c73a00d588c99d72008d8c97c7719))
* **deps:** bump pg from 8.11.5 to 8.12.0 ([#424](https://github.com/PrivateAIM/hub/issues/424)) ([37dca53](https://github.com/PrivateAIM/hub/commit/37dca53caef6e7ccb06d621bd540390dd8c1f017))
* **deps:** bump redis-extension from 1.3.0 to 1.5.0 ([#293](https://github.com/PrivateAIM/hub/issues/293)) ([0f98e66](https://github.com/PrivateAIM/hub/commit/0f98e66e56df460d40edf640cff15c1094a3fa04))
* **deps:** bump reflect-metadata from 0.2.1 to 0.2.2 ([#217](https://github.com/PrivateAIM/hub/issues/217)) ([66e557d](https://github.com/PrivateAIM/hub/commit/66e557d914c2a50f014c5060fb153f211b2700d6))
* **deps:** bump routup from 3.2.0 to 3.3.0 ([#226](https://github.com/PrivateAIM/hub/issues/226)) ([9fbe635](https://github.com/PrivateAIM/hub/commit/9fbe635a7464074bebce9ada07afebde1655ed39))
* **deps:** bump tar from 6.2.0 to 6.2.1 ([#203](https://github.com/PrivateAIM/hub/issues/203)) ([3299460](https://github.com/PrivateAIM/hub/commit/3299460e5a20e2f91094fb24437895d996cfa215))
* **deps:** bump tar from 7.0.1 to 7.1.0 ([#343](https://github.com/PrivateAIM/hub/issues/343)) ([002a7a7](https://github.com/PrivateAIM/hub/commit/002a7a70fc85f0794739a51e9980a64ba8b73946))
* **deps:** bump tar from 7.1.0 to 7.2.0 ([#407](https://github.com/PrivateAIM/hub/issues/407)) ([38c3c9b](https://github.com/PrivateAIM/hub/commit/38c3c9bbcf2861af557abc3808d0afaa4866c626))
* **deps:** bump tar from 7.2.0 to 7.4.0 ([#471](https://github.com/PrivateAIM/hub/issues/471)) ([c2ca2e6](https://github.com/PrivateAIM/hub/commit/c2ca2e6877d5230efeba311d4b4de8e97bbadadf))
* **deps:** bump tar to v7 ([68e4120](https://github.com/PrivateAIM/hub/commit/68e41201e834b25b878c666a27e93b8bc811cb23))
* **deps:** bump typeorm-extension from 3.5.0 to 3.5.1 ([#271](https://github.com/PrivateAIM/hub/issues/271)) ([f4be3b9](https://github.com/PrivateAIM/hub/commit/f4be3b90b316e530306d16d8aee79a22c2955f7c))
* **deps:** bump winston from 3.11.0 to 3.12.0 ([#138](https://github.com/PrivateAIM/hub/issues/138)) ([b8b5248](https://github.com/PrivateAIM/hub/commit/b8b5248f4f44b859c367822c21638c8ee9cbefa0))
* **deps:** bump winston from 3.12.0 to 3.13.0 ([#204](https://github.com/PrivateAIM/hub/issues/204)) ([f6d55e9](https://github.com/PrivateAIM/hub/commit/f6d55e957d3330b7c79582fffdc7cd7f345d0a00))
* **deps:** bump zod from 3.22.4 to 3.23.4 ([#318](https://github.com/PrivateAIM/hub/issues/318)) ([d8ac5c9](https://github.com/PrivateAIM/hub/commit/d8ac5c9d51a8a6f603534f755fea0c27e7004cc7))
* **deps:** bump zod from 3.23.4 to 3.23.5 ([#331](https://github.com/PrivateAIM/hub/issues/331)) ([105eb98](https://github.com/PrivateAIM/hub/commit/105eb98011e434e21cdf10330ed4a25949c17809))
* **deps:** bump zod from 3.23.5 to 3.23.7 ([#354](https://github.com/PrivateAIM/hub/issues/354)) ([19400b6](https://github.com/PrivateAIM/hub/commit/19400b6866b4616a5f450be471e37bbe85c0a05c))
* don't require node to be associated to a registry ([d62c3df](https://github.com/PrivateAIM/hub/commit/d62c3dfb2fc7749e4ec7d25085f671da6b92674a))
* http node read handler ([19c41b7](https://github.com/PrivateAIM/hub/commit/19c41b7184460b4bf9c30652fa0944fb4431deea))
* imports of ability manager ([d46fd8b](https://github.com/PrivateAIM/hub/commit/d46fd8b04d2b30224322aaaba391dbc075ac3089))
* minor issues in client components & applied linting rules ([b88e168](https://github.com/PrivateAIM/hub/commit/b88e168e0bf3f93e01887f91e9fdff7fe621aafd))
* minor modifications to logging mechanism ([b1a543a](https://github.com/PrivateAIM/hub/commit/b1a543afd20b2438fa6ba7dc09ae05b13638dfb0))
* node robot create util ([97c08ba](https://github.com/PrivateAIM/hub/commit/97c08ba3ac3a22df60081796dffebcf881d62340))
* pick random registry for analysis if none is defined ([b519a32](https://github.com/PrivateAIM/hub/commit/b519a321d6999e8764a5211ca6b22d26de72b27c))
* project-node read endpoint ([6c46153](https://github.com/PrivateAIM/hub/commit/6c46153114eec1f6aaa9e9fd1dae0bc69519ef89))
* reenable authup robot aggregator ([a684e57](https://github.com/PrivateAIM/hub/commit/a684e5764bb6e483211968a63b655b09070dacb1))
* remove minio driver from core service ([affb432](https://github.com/PrivateAIM/hub/commit/affb4326e407d185d98575c5aa9d8b6ec8bce172))
* remove node email attribute ([66ee923](https://github.com/PrivateAIM/hub/commit/66ee923c424468e79eba39766ce5fd8443d79811))
* restriction for analysis-node collection endpoint ([73412f9](https://github.com/PrivateAIM/hub/commit/73412f95d1b13ccacf45bfa4e99dcdcc1ea4dfef))
* sanitize root property of analysis-file ([d7989fd](https://github.com/PrivateAIM/hub/commit/d7989fd435ec08ed7e0de2ce862111b31b448206))
* separate redis instance for publishing events ([bf95ef3](https://github.com/PrivateAIM/hub/commit/bf95ef36901e5bc2d6167b540fd6440a3db10a1b))
* uri in project-node api client & fixed docker-compose ([5fe5091](https://github.com/PrivateAIM/hub/commit/5fe509118ece00fd2b4ffccd7493a7400ca615f1))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.6.0 to ^0.7.0
    * @privateaim/kit bumped from ^0.6.0 to ^0.7.0
    * @privateaim/server-kit bumped from ^0.6.0 to ^0.7.0
    * @privateaim/server-core-realtime bumped from ^0.6.0 to ^0.7.0
    * @privateaim/server-http-kit bumped from ^0.6.0 to ^0.7.0
    * @privateaim/server-analysis-manager-kit bumped from ^0.6.0 to ^0.7.0
  * devDependencies
    * @privateaim/core-http-kit bumped from ^0.6.0 to ^0.7.0

## [0.6.0](https://github.com/PrivateAIM/hub/compare/server-core-v0.5.0...server-core-v0.6.0) (2024-06-25)


### Features

* adjusted code references for core -&gt; core-kit package renaming ([321b8ac](https://github.com/PrivateAIM/hub/commit/321b8acb33e4fdd93252c72da34fac34cc86cd9f))
* initial core -&gt; core-kit package renaming ([9ac9709](https://github.com/PrivateAIM/hub/commit/9ac970999922bc76e3f88381f4d3351a51147a46))
* migrated to authup version v1.0.0-beta.18 ([06928f6](https://github.com/PrivateAIM/hub/commit/06928f681120b423f962a7869f8f6b12708d3047))
* realtime library/service split ([#474](https://github.com/PrivateAIM/hub/issues/474)) ([43c2dfa](https://github.com/PrivateAIM/hub/commit/43c2dfad654cc61ca9784914cbad56c684434088))
* tar use new onReadEntry in favor of deprecated onentry fn ([9294bc0](https://github.com/PrivateAIM/hub/commit/9294bc01db06c194a112e6ac51df4defc94363f7))


### Bug Fixes

* analysis-bucket-file delete operation & auth plugin nuxt-app access ([86e3a2d](https://github.com/PrivateAIM/hub/commit/86e3a2da2b780c1080c83b761f3b0a189c3580de))
* **deps:** bump amqp-extension from 4.0.0-beta.2 to 4.0.0-beta.3 ([#457](https://github.com/PrivateAIM/hub/issues/457)) ([2585ea2](https://github.com/PrivateAIM/hub/commit/2585ea2b22b969c21e82b3b92b2e795198dd5f44))
* **deps:** bump tar from 7.2.0 to 7.4.0 ([#471](https://github.com/PrivateAIM/hub/issues/471)) ([c2ca2e6](https://github.com/PrivateAIM/hub/commit/c2ca2e6877d5230efeba311d4b4de8e97bbadadf))
* http node read handler ([19c41b7](https://github.com/PrivateAIM/hub/commit/19c41b7184460b4bf9c30652fa0944fb4431deea))
* project-node read endpoint ([6c46153](https://github.com/PrivateAIM/hub/commit/6c46153114eec1f6aaa9e9fd1dae0bc69519ef89))
* reenable authup robot aggregator ([a684e57](https://github.com/PrivateAIM/hub/commit/a684e5764bb6e483211968a63b655b09070dacb1))
* remove node email attribute ([66ee923](https://github.com/PrivateAIM/hub/commit/66ee923c424468e79eba39766ce5fd8443d79811))
* restriction for analysis-node collection endpoint ([73412f9](https://github.com/PrivateAIM/hub/commit/73412f95d1b13ccacf45bfa4e99dcdcc1ea4dfef))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core-kit bumped from ^0.5.0 to ^0.6.0
    * @privateaim/kit bumped from ^0.5.0 to ^0.6.0
    * @privateaim/server-kit bumped from ^0.5.0 to ^0.6.0
    * @privateaim/server-core-realtime bumped from ^0.5.0 to ^0.6.0
    * @privateaim/server-http-kit bumped from ^0.5.0 to ^0.6.0
    * @privateaim/server-analysis-manager-kit bumped from ^0.5.0 to ^0.6.0

## [0.5.0](https://github.com/PrivateAIM/hub/compare/server-core-v0.4.0...server-core-v0.5.0) (2024-06-12)


### Features

* analysis-bucket implementation  ([#433](https://github.com/PrivateAIM/hub/issues/433)) ([15329f4](https://github.com/PrivateAIM/hub/commit/15329f42c5f6ebbe4772715ff2e308e41ae9e91a))
* analysis-manager-kit package implementation ([#393](https://github.com/PrivateAIM/hub/issues/393)) ([d9faf4a](https://github.com/PrivateAIM/hub/commit/d9faf4a4580634a62ed58ec994369be1369e33ee))
* cleanup component error handling ([e8869ef](https://github.com/PrivateAIM/hub/commit/e8869efddf658f695fb4c0e6cf8b9596306c123a))
* extract utils and common consts, fns, ... to kit package ([258bbb2](https://github.com/PrivateAIM/hub/commit/258bbb21bfbf671a7cfad3e91740a1737eaf3f71))
* move redis singleton management to kit package ([285b073](https://github.com/PrivateAIM/hub/commit/285b073eede72ea342f1f4e75e5f00593c51fafd))
* move service factories/singletons to server-kit-package ([#387](https://github.com/PrivateAIM/hub/issues/387)) ([669d352](https://github.com/PrivateAIM/hub/commit/669d3526893c8bc2d2dd8fe78f423783c5d7e317))
* queue-router for components & aggregators ([#396](https://github.com/PrivateAIM/hub/issues/396)) ([0da6066](https://github.com/PrivateAIM/hub/commit/0da6066e378cc97ee8d7b98558e5281dda66cbc9))
* server-http-kit package with validation, authup & request utils/helpers ([#375](https://github.com/PrivateAIM/hub/issues/375)) ([7762a2f](https://github.com/PrivateAIM/hub/commit/7762a2f81ea8dfcd77fc8c7f8d64bb91ad2bcd4f))
* split builder command-exection/event-split ([#412](https://github.com/PrivateAIM/hub/issues/412)) ([13d0d57](https://github.com/PrivateAIM/hub/commit/13d0d575abb45538d79ffef91357e1528c5afb11))
* use kit package for singleton management of the logger ([61bbe21](https://github.com/PrivateAIM/hub/commit/61bbe215202ba1366d0b44bdd81a6b9b24a4a531))


### Bug Fixes

* consuming and publishing with queue-router ([1a461e7](https://github.com/PrivateAIM/hub/commit/1a461e7ce539cf19f5866783f3a58319318de137))
* **deps:** bump amqp-extension from 4.0.0-beta.1 to 4.0.0-beta.2 ([#450](https://github.com/PrivateAIM/hub/issues/450)) ([b65538a](https://github.com/PrivateAIM/hub/commit/b65538ac7e6a0b28ad87b966a01425c8bd86ea3d))
* **deps:** bump express-validator from 7.0.1 to 7.1.0 ([#384](https://github.com/PrivateAIM/hub/issues/384)) ([572a429](https://github.com/PrivateAIM/hub/commit/572a42981fb9dcfcaed8fa784c18afa1a897eddc))
* **deps:** bump mysql2 from 3.9.8 to 3.10.0 ([#411](https://github.com/PrivateAIM/hub/issues/411)) ([b44e278](https://github.com/PrivateAIM/hub/commit/b44e2782e338fd1d7164d43f1bc5414d29178e61))
* **deps:** bump pg from 8.11.5 to 8.12.0 ([#424](https://github.com/PrivateAIM/hub/issues/424)) ([37dca53](https://github.com/PrivateAIM/hub/commit/37dca53caef6e7ccb06d621bd540390dd8c1f017))
* **deps:** bump tar from 7.1.0 to 7.2.0 ([#407](https://github.com/PrivateAIM/hub/issues/407)) ([38c3c9b](https://github.com/PrivateAIM/hub/commit/38c3c9bbcf2861af557abc3808d0afaa4866c626))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core bumped from ^0.4.0 to ^0.5.0
    * @privateaim/kit bumped from ^0.4.0 to ^0.5.0
    * @privateaim/server-kit bumped from ^0.4.0 to ^0.5.0
    * @privateaim/server-http-kit bumped from ^0.4.0 to ^0.5.0
    * @privateaim/server-analysis-manager-kit bumped from ^0.4.0 to ^0.5.0

## [0.4.0](https://github.com/PrivateAIM/hub/compare/server-core-v0.4.0...server-core-v0.4.0) (2024-06-12)


### Features

* analysis-bucket implementation  ([#433](https://github.com/PrivateAIM/hub/issues/433)) ([15329f4](https://github.com/PrivateAIM/hub/commit/15329f42c5f6ebbe4772715ff2e308e41ae9e91a))
* analysis-manager-kit package implementation ([#393](https://github.com/PrivateAIM/hub/issues/393)) ([d9faf4a](https://github.com/PrivateAIM/hub/commit/d9faf4a4580634a62ed58ec994369be1369e33ee))
* cleanup component error handling ([e8869ef](https://github.com/PrivateAIM/hub/commit/e8869efddf658f695fb4c0e6cf8b9596306c123a))
* extract utils and common consts, fns, ... to kit package ([258bbb2](https://github.com/PrivateAIM/hub/commit/258bbb21bfbf671a7cfad3e91740a1737eaf3f71))
* move redis singleton management to kit package ([285b073](https://github.com/PrivateAIM/hub/commit/285b073eede72ea342f1f4e75e5f00593c51fafd))
* move service factories/singletons to server-kit-package ([#387](https://github.com/PrivateAIM/hub/issues/387)) ([669d352](https://github.com/PrivateAIM/hub/commit/669d3526893c8bc2d2dd8fe78f423783c5d7e317))
* queue-router for components & aggregators ([#396](https://github.com/PrivateAIM/hub/issues/396)) ([0da6066](https://github.com/PrivateAIM/hub/commit/0da6066e378cc97ee8d7b98558e5281dda66cbc9))
* server-http-kit package with validation, authup & request utils/helpers ([#375](https://github.com/PrivateAIM/hub/issues/375)) ([7762a2f](https://github.com/PrivateAIM/hub/commit/7762a2f81ea8dfcd77fc8c7f8d64bb91ad2bcd4f))
* split builder command-exection/event-split ([#412](https://github.com/PrivateAIM/hub/issues/412)) ([13d0d57](https://github.com/PrivateAIM/hub/commit/13d0d575abb45538d79ffef91357e1528c5afb11))
* use kit package for singleton management of the logger ([61bbe21](https://github.com/PrivateAIM/hub/commit/61bbe215202ba1366d0b44bdd81a6b9b24a4a531))


### Bug Fixes

* consuming and publishing with queue-router ([1a461e7](https://github.com/PrivateAIM/hub/commit/1a461e7ce539cf19f5866783f3a58319318de137))
* **deps:** bump amqp-extension from 4.0.0-beta.1 to 4.0.0-beta.2 ([#450](https://github.com/PrivateAIM/hub/issues/450)) ([b65538a](https://github.com/PrivateAIM/hub/commit/b65538ac7e6a0b28ad87b966a01425c8bd86ea3d))
* **deps:** bump express-validator from 7.0.1 to 7.1.0 ([#384](https://github.com/PrivateAIM/hub/issues/384)) ([572a429](https://github.com/PrivateAIM/hub/commit/572a42981fb9dcfcaed8fa784c18afa1a897eddc))
* **deps:** bump mysql2 from 3.9.8 to 3.10.0 ([#411](https://github.com/PrivateAIM/hub/issues/411)) ([b44e278](https://github.com/PrivateAIM/hub/commit/b44e2782e338fd1d7164d43f1bc5414d29178e61))
* **deps:** bump pg from 8.11.5 to 8.12.0 ([#424](https://github.com/PrivateAIM/hub/issues/424)) ([37dca53](https://github.com/PrivateAIM/hub/commit/37dca53caef6e7ccb06d621bd540390dd8c1f017))
* **deps:** bump tar from 7.1.0 to 7.2.0 ([#407](https://github.com/PrivateAIM/hub/issues/407)) ([38c3c9b](https://github.com/PrivateAIM/hub/commit/38c3c9bbcf2861af557abc3808d0afaa4866c626))

## [0.4.0](https://github.com/PrivateAIM/hub/compare/server-core-v0.3.0...server-core-v0.4.0) (2024-05-15)


### Features

* adjusted permission names ([3f5e863](https://github.com/PrivateAIM/hub/commit/3f5e8637937f52c73280fe911dd5c150d446da4f))
* allow referencing custom robot account to node ([a3277a2](https://github.com/PrivateAIM/hub/commit/a3277a2aa7a8ae2cc44db27afd29694a630d5a89))
* allow specifying node type ([#242](https://github.com/PrivateAIM/hub/issues/242)) ([29e14fa](https://github.com/PrivateAIM/hub/commit/29e14fad131825abeebde769c863b9bd4c92c843))
* auto approval for aggregator nodes ([94b4f30](https://github.com/PrivateAIM/hub/commit/94b4f30464ef48ab34411c3d38eced4845d367a7))
* better restrictions for linking files to an analysis ([45a6d8a](https://github.com/PrivateAIM/hub/commit/45a6d8a8b9699dbf6c5a418dec91a3cfb8b1e3e0))
* enable mysql8 usage ([78d9e0b](https://github.com/PrivateAIM/hub/commit/78d9e0bdbad2fc389676af675a7fdd2b61f5e388))
* enable possibility to unlock analysis configuration ([#245](https://github.com/PrivateAIM/hub/issues/245)) ([1053362](https://github.com/PrivateAIM/hub/commit/105336254714a1e64d340eb66c10ec1681890559))
* integrated authup middleware in server-kit package ([#259](https://github.com/PrivateAIM/hub/issues/259)) ([a4b6871](https://github.com/PrivateAIM/hub/commit/a4b6871ffa7f43f49cceac3044b41bf622aa75d3))
* lock analysis-node creation after analyis is locked ([e353a27](https://github.com/PrivateAIM/hub/commit/e353a275daaba1f1972c6cd724bb04f1d85d4af5))
* refactor analysis configuration ([#200](https://github.com/PrivateAIM/hub/issues/200)) ([e7bfc3f](https://github.com/PrivateAIM/hub/commit/e7bfc3f23d5b9ce6fc6d9e8d0a144fe54ea03335))
* refactor analysis file management ([#176](https://github.com/PrivateAIM/hub/issues/176)) ([0ea979a](https://github.com/PrivateAIM/hub/commit/0ea979a2eed3cb557e82c6c96f83b367b0f89f0f))
* renamed database subscribers ([88405cc](https://github.com/PrivateAIM/hub/commit/88405cceca74218a6485abff0e2fae0b8429e3a1))
* restrict analyis-node management after an analysis has been locked ([#244](https://github.com/PrivateAIM/hub/issues/244)) ([11cc582](https://github.com/PrivateAIM/hub/commit/11cc5824e677368aecac6afe00493886b7a3182b))
* setup default harbor service on startup if defined ([#170](https://github.com/PrivateAIM/hub/issues/170)) ([e9d9d68](https://github.com/PrivateAIM/hub/commit/e9d9d688548fa1b6fa0e68f8ce024b497335a6b9))
* simplified authentication & authorization management ([0b19929](https://github.com/PrivateAIM/hub/commit/0b199297766780a4c5cfcd8eda02cefb9f226958))
* simplified logger usage across packages ([39ea90f](https://github.com/PrivateAIM/hub/commit/39ea90ffa6296f91ffb0f89a567036b0054f0135))
* trigger analysis action in controller instead of subscriber ([026c56a](https://github.com/PrivateAIM/hub/commit/026c56acf6950b473dfe3e5b777c70b659e5b0a9))
* updated authup, vuecs & ilingo ([66a5f7b](https://github.com/PrivateAIM/hub/commit/66a5f7ba1454fc5e432cd687a509ebf3bf4c4ab4))
* view for downloading results + refactored entities/types ([#188](https://github.com/PrivateAIM/hub/issues/188)) ([084040e](https://github.com/PrivateAIM/hub/commit/084040eec1e74b10ec40c577d5f8e3a5fcedf250))


### Bug Fixes

* analysis build command execution ([c793150](https://github.com/PrivateAIM/hub/commit/c7931509d3da05ada66bdc8f547ec961260d63ce))
* auto approve project request for aggregator node ([8a82fe0](https://github.com/PrivateAIM/hub/commit/8a82fe0083683dd90e2c4d23f6f4f68088bbded8))
* change action order of analysis subscriber ([9fbd6fe](https://github.com/PrivateAIM/hub/commit/9fbd6fe72dccdc75b44b542115f170c799beb22b))
* **deps:** bump @authup/core from 1.0.0-beta.7 to 1.0.0-beta.8 ([#210](https://github.com/PrivateAIM/hub/issues/210)) ([6e8adf2](https://github.com/PrivateAIM/hub/commit/6e8adf2c80dba69eb66a76250e1fc1acc1bb71dd))
* **deps:** bump @authup/core from 1.0.0-beta.8 to 1.0.0-beta.9 ([#277](https://github.com/PrivateAIM/hub/issues/277)) ([f9a8f59](https://github.com/PrivateAIM/hub/commit/f9a8f59a60990f8ffe6da044c18150a56f2e196c))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.7 to 1.0.0-beta.8 ([#207](https://github.com/PrivateAIM/hub/issues/207)) ([d7133b5](https://github.com/PrivateAIM/hub/commit/d7133b5cba04eef3150535b6860849a9ed6a584a))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.8 to 1.0.0-beta.9 ([#274](https://github.com/PrivateAIM/hub/issues/274)) ([ce80e33](https://github.com/PrivateAIM/hub/commit/ce80e331524a0d50632e99909587028c6d18b88a))
* **deps:** bump @hapic/harbor from 2.3.2 to 2.3.3 ([#215](https://github.com/PrivateAIM/hub/issues/215)) ([9c83112](https://github.com/PrivateAIM/hub/commit/9c831124847f8a8ac0244f6cebbd437a231ef690))
* **deps:** bump @hapic/vault from 2.3.2 to 2.3.3 ([#213](https://github.com/PrivateAIM/hub/issues/213)) ([94565fc](https://github.com/PrivateAIM/hub/commit/94565fcbd5026ed84cc3c255f1c2ae900c1312cd))
* **deps:** bump @routup/swagger from 2.3.5 to 2.3.6 ([#248](https://github.com/PrivateAIM/hub/issues/248)) ([6699b8e](https://github.com/PrivateAIM/hub/commit/6699b8ee14b4939f0cc1a0a1dd41e6e106da948b))
* **deps:** bump amqp-extension from 3.2.0 to 3.3.0 ([#196](https://github.com/PrivateAIM/hub/issues/196)) ([5c8d663](https://github.com/PrivateAIM/hub/commit/5c8d663145e0fc55c172242477dfdfb04e4f1472))
* **deps:** bump hapic from 2.5.0 to 2.5.1 ([#214](https://github.com/PrivateAIM/hub/issues/214)) ([eb3e30c](https://github.com/PrivateAIM/hub/commit/eb3e30c6cf3fb81d30ef9b2c802698a5818505a2))
* **deps:** bump locter from 2.0.2 to 2.1.0 ([#229](https://github.com/PrivateAIM/hub/issues/229)) ([bca1800](https://github.com/PrivateAIM/hub/commit/bca18001da52146e80452d3d4fc286c26f03b9b3))
* **deps:** bump mysql2 from 3.9.3 to 3.9.4 ([#268](https://github.com/PrivateAIM/hub/issues/268)) ([c1b16a3](https://github.com/PrivateAIM/hub/commit/c1b16a3ebd6af2ebcd462988c1b9b74df12ebe14))
* **deps:** bump mysql2 from 3.9.4 to 3.9.7 ([#309](https://github.com/PrivateAIM/hub/issues/309)) ([6f4dd4e](https://github.com/PrivateAIM/hub/commit/6f4dd4e7ec1696f034ecbe34edb09609ec54d501))
* **deps:** bump pg from 8.11.3 to 8.11.4 ([#225](https://github.com/PrivateAIM/hub/issues/225)) ([75ab55e](https://github.com/PrivateAIM/hub/commit/75ab55ef6df1492378c1f80bdc385011deb6c4b4))
* **deps:** bump pg from 8.11.4 to 8.11.5 ([#234](https://github.com/PrivateAIM/hub/issues/234)) ([f7da9c9](https://github.com/PrivateAIM/hub/commit/f7da9c98cb2c73a00d588c99d72008d8c97c7719))
* **deps:** bump redis-extension from 1.3.0 to 1.5.0 ([#293](https://github.com/PrivateAIM/hub/issues/293)) ([0f98e66](https://github.com/PrivateAIM/hub/commit/0f98e66e56df460d40edf640cff15c1094a3fa04))
* **deps:** bump reflect-metadata from 0.2.1 to 0.2.2 ([#217](https://github.com/PrivateAIM/hub/issues/217)) ([66e557d](https://github.com/PrivateAIM/hub/commit/66e557d914c2a50f014c5060fb153f211b2700d6))
* **deps:** bump routup from 3.2.0 to 3.3.0 ([#226](https://github.com/PrivateAIM/hub/issues/226)) ([9fbe635](https://github.com/PrivateAIM/hub/commit/9fbe635a7464074bebce9ada07afebde1655ed39))
* **deps:** bump tar from 6.2.0 to 6.2.1 ([#203](https://github.com/PrivateAIM/hub/issues/203)) ([3299460](https://github.com/PrivateAIM/hub/commit/3299460e5a20e2f91094fb24437895d996cfa215))
* **deps:** bump tar from 7.0.1 to 7.1.0 ([#343](https://github.com/PrivateAIM/hub/issues/343)) ([002a7a7](https://github.com/PrivateAIM/hub/commit/002a7a70fc85f0794739a51e9980a64ba8b73946))
* **deps:** bump tar to v7 ([68e4120](https://github.com/PrivateAIM/hub/commit/68e41201e834b25b878c666a27e93b8bc811cb23))
* **deps:** bump typeorm-extension from 3.5.0 to 3.5.1 ([#271](https://github.com/PrivateAIM/hub/issues/271)) ([f4be3b9](https://github.com/PrivateAIM/hub/commit/f4be3b90b316e530306d16d8aee79a22c2955f7c))
* **deps:** bump winston from 3.12.0 to 3.13.0 ([#204](https://github.com/PrivateAIM/hub/issues/204)) ([f6d55e9](https://github.com/PrivateAIM/hub/commit/f6d55e957d3330b7c79582fffdc7cd7f345d0a00))
* **deps:** bump zod from 3.22.4 to 3.23.4 ([#318](https://github.com/PrivateAIM/hub/issues/318)) ([d8ac5c9](https://github.com/PrivateAIM/hub/commit/d8ac5c9d51a8a6f603534f755fea0c27e7004cc7))
* **deps:** bump zod from 3.23.4 to 3.23.5 ([#331](https://github.com/PrivateAIM/hub/issues/331)) ([105eb98](https://github.com/PrivateAIM/hub/commit/105eb98011e434e21cdf10330ed4a25949c17809))
* **deps:** bump zod from 3.23.5 to 3.23.7 ([#354](https://github.com/PrivateAIM/hub/issues/354)) ([19400b6](https://github.com/PrivateAIM/hub/commit/19400b6866b4616a5f450be471e37bbe85c0a05c))
* imports of ability manager ([d46fd8b](https://github.com/PrivateAIM/hub/commit/d46fd8b04d2b30224322aaaba391dbc075ac3089))
* minor issues in client components & applied linting rules ([b88e168](https://github.com/PrivateAIM/hub/commit/b88e168e0bf3f93e01887f91e9fdff7fe621aafd))
* minor modifications to logging mechanism ([b1a543a](https://github.com/PrivateAIM/hub/commit/b1a543afd20b2438fa6ba7dc09ae05b13638dfb0))
* node robot create util ([97c08ba](https://github.com/PrivateAIM/hub/commit/97c08ba3ac3a22df60081796dffebcf881d62340))
* pick random registry for analysis if none is defined ([b519a32](https://github.com/PrivateAIM/hub/commit/b519a321d6999e8764a5211ca6b22d26de72b27c))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core bumped from ^0.3.0 to ^0.4.0
    * @privateaim/server-kit bumped from ^0.3.0 to ^0.4.0
    * @privateaim/server-analysis-manager bumped from ^0.3.0 to ^0.4.0

## [0.3.0](https://github.com/PrivateAIM/hub/compare/server-core-v0.2.0...server-core-v0.3.0) (2024-03-11)


### Features

* initial user interface draft ([#148](https://github.com/PrivateAIM/hub/issues/148)) ([600a3cf](https://github.com/PrivateAIM/hub/commit/600a3cf3ad42ca60a610eb2eb3d1a912c42bd12f))
* minor cleanup in vue components ([8753567](https://github.com/PrivateAIM/hub/commit/8753567023992d2b4bbf6efcc2468ee06fd31604))
* refactor analysis-file for new context ([#144](https://github.com/PrivateAIM/hub/issues/144)) ([6a6383c](https://github.com/PrivateAIM/hub/commit/6a6383cf5d920463626f9d6d4798d59597e31d88))
* swagger docs generation & serving for storage service ([2a2a582](https://github.com/PrivateAIM/hub/commit/2a2a582f5afb2c706b08d5da537778587070020f))
* sync master-images on start up ([#169](https://github.com/PrivateAIM/hub/issues/169)) ([a4a916e](https://github.com/PrivateAIM/hub/commit/a4a916ece8e1022d8c2db3bb3de6b0a6d7df37da))


### Bug Fixes

* **deps:** bump @authup/core from 1.0.0-beta.5 to 1.0.0-beta.7 ([#155](https://github.com/PrivateAIM/hub/issues/155)) ([e0da3b4](https://github.com/PrivateAIM/hub/commit/e0da3b4ccabc30e8871cd01f373f3437a0f1928a))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.5 to 1.0.0-beta.7 ([#157](https://github.com/PrivateAIM/hub/issues/157)) ([0aa827b](https://github.com/PrivateAIM/hub/commit/0aa827b7752e3903dad305e5aeb91d754df2d908))
* **deps:** bump amqp-extension from 3.0.0 to 3.1.0 ([#149](https://github.com/PrivateAIM/hub/issues/149)) ([bad4cda](https://github.com/PrivateAIM/hub/commit/bad4cda509d374efcd56242410d5458b52af1415))
* **deps:** bump amqp-extension from 3.1.0 to 3.1.1 ([#158](https://github.com/PrivateAIM/hub/issues/158)) ([d4afe51](https://github.com/PrivateAIM/hub/commit/d4afe51fac465990dacc8760490ffc483b601832))
* **deps:** bump amqp-extension from 3.1.1 to 3.2.0 ([#168](https://github.com/PrivateAIM/hub/issues/168)) ([70ea6ca](https://github.com/PrivateAIM/hub/commit/70ea6ca2cecf63b006906c24e6c28d2b5bbd3aae))
* **deps:** bump winston from 3.11.0 to 3.12.0 ([#138](https://github.com/PrivateAIM/hub/issues/138)) ([b8b5248](https://github.com/PrivateAIM/hub/commit/b8b5248f4f44b859c367822c21638c8ee9cbefa0))
* don't require node to be associated to a registry ([d62c3df](https://github.com/PrivateAIM/hub/commit/d62c3dfb2fc7749e4ec7d25085f671da6b92674a))
* sanitize root property of analysis-file ([d7989fd](https://github.com/PrivateAIM/hub/commit/d7989fd435ec08ed7e0de2ce862111b31b448206))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core bumped from ^0.2.0 to ^0.3.0
    * @privateaim/server-kit bumped from ^0.2.0 to ^0.3.0
    * @privateaim/server-analysis-manager bumped from ^0.2.0 to ^0.3.0

## [0.2.0](https://github.com/PrivateAIM/hub/compare/server-core-v0.1.0...server-core-v0.2.0) (2024-02-28)


### Features

* bump authup to v1.0.0-beta.5 ([13aeab2](https://github.com/PrivateAIM/hub/commit/13aeab2eb8a00069512eee17fc129d56a58309bc))
* move http request validation logic to kit package ([#104](https://github.com/PrivateAIM/hub/issues/104)) ([5c26e44](https://github.com/PrivateAIM/hub/commit/5c26e44fdd1df48c5c35756495df08423481770d))
* refactor service singleton management ([#131](https://github.com/PrivateAIM/hub/issues/131)) ([7b9195f](https://github.com/PrivateAIM/hub/commit/7b9195fe0c5eca7a3dfcd356edac55b47ba15278))
* refactored amqp usage & extended docker-compose file ([4a557dc](https://github.com/PrivateAIM/hub/commit/4a557dc4558e575e7d4f1a9ce317dba417a3ef21))
* remove permission & role presets ([ea679aa](https://github.com/PrivateAIM/hub/commit/ea679aad29bdf773fc445af66637b518287a96f1))


### Bug Fixes

* cleanup analysis controller ([1554ba8](https://github.com/PrivateAIM/hub/commit/1554ba812fa4e809cc9668346ab945e26f784ada))
* **deps:** bump dotenv from 16.4.4 to 16.4.5 ([#98](https://github.com/PrivateAIM/hub/issues/98)) ([4588390](https://github.com/PrivateAIM/hub/commit/458839089cdf27c40dde9c65db822463a0ca5f3a))
* remove minio driver from core service ([affb432](https://github.com/PrivateAIM/hub/commit/affb4326e407d185d98575c5aa9d8b6ec8bce172))
* uri in project-node api client & fixed docker-compose ([5fe5091](https://github.com/PrivateAIM/hub/commit/5fe509118ece00fd2b4ffccd7493a7400ca615f1))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core bumped from ^0.1.0 to ^0.2.0
    * @privateaim/server-kit bumped from ^0.1.0 to ^0.2.0
    * @privateaim/server-analysis-manager bumped from ^0.1.0 to ^0.2.0

## 0.1.0 (2024-02-19)


### Features

* refactor third-party configuration ([#26](https://github.com/PrivateAIM/hub/issues/26)) ([c5e929c](https://github.com/PrivateAIM/hub/commit/c5e929cd8fc2741436001c59a983a64da3f427c6))
* service health endpoint & docker health check ([aa4ef27](https://github.com/PrivateAIM/hub/commit/aa4ef27a0ec56373204f2cc0c3eccf5011519883))


### Bug Fixes

* **deps:** bump @authup/core from 1.0.0-beta.1 to 1.0.0-beta.3 ([#53](https://github.com/PrivateAIM/hub/issues/53)) ([95df3be](https://github.com/PrivateAIM/hub/commit/95df3be641bed869a10f69bcb3065eb36ada178e))
* **deps:** bump @authup/core from 1.0.0-beta.3 to 1.0.0-beta.4 ([#92](https://github.com/PrivateAIM/hub/issues/92)) ([b950c83](https://github.com/PrivateAIM/hub/commit/b950c838b0de3e647452145182f906472af2fd12))
* **deps:** bump @authup/server-adapter from 1.0.0-beta.3 to 1.0.0-beta.4 ([#94](https://github.com/PrivateAIM/hub/issues/94)) ([a387911](https://github.com/PrivateAIM/hub/commit/a387911dfb8afe8d2f53a2b82f4c8f6b5f70f9a3))
* **deps:** bump @routup/swagger from 2.3.4 to 2.3.5 ([#95](https://github.com/PrivateAIM/hub/issues/95)) ([7b38e6f](https://github.com/PrivateAIM/hub/commit/7b38e6f64510a2b3c919ee72791f34c6d180e6f7))
* **deps:** bump dotenv from 16.3.1 to 16.4.4 ([#78](https://github.com/PrivateAIM/hub/issues/78)) ([c800a59](https://github.com/PrivateAIM/hub/commit/c800a59ce393ff770975b1281180e3c2644949d5))
* separate redis instance for publishing events ([bf95ef3](https://github.com/PrivateAIM/hub/commit/bf95ef36901e5bc2d6167b540fd6440a3db10a1b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @privateaim/core bumped from ^0.0.0 to ^0.1.0
    * @privateaim/server-kit bumped from ^0.0.0 to ^0.1.0
    * @privateaim/server-analysis-manager bumped from ^0.0.0 to ^0.1.0
