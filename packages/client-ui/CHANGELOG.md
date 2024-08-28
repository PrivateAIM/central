# Changelog

## [0.8.2](https://github.com/PrivateAIM/hub/compare/v0.8.1...v0.8.2) (2024-08-28)


### Bug Fixes

* avoid infinite redirects in client ui ([47a2554](https://github.com/PrivateAIM/hub/commit/47a2554e7c53d01c7aee54d3c5c527aee25ce3e4))
* code inspection/download button ([#684](https://github.com/PrivateAIM/hub/issues/684)) ([4a987a5](https://github.com/PrivateAIM/hub/commit/4a987a5ed88c734e6ee58d311303052d88119bb1))
* downgrade to nuxt v3.12.4 ([4222d38](https://github.com/PrivateAIM/hub/commit/4222d3874339e725e646ab789f12b264ec2d1704))
* remove root path of excluded paths ([4745b8e](https://github.com/PrivateAIM/hub/commit/4745b8eecc55165b79d438fcd880ccf9d80853f4))
* service robot view in admin area ([f9072b9](https://github.com/PrivateAIM/hub/commit/f9072b9e1c2c0ae932a0d74dd8e897a593742225))
* temporary fix for routing issue ([a6764c2](https://github.com/PrivateAIM/hub/commit/a6764c2862ff10490d8cf7284c14bf37aab22e8c))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.8.1 to ^0.8.2
    * @privateaim/core-kit bumped from ^0.8.1 to ^0.8.2
    * @privateaim/kit bumped from ^0.8.1 to ^0.8.2
    * @privateaim/storage-kit bumped from ^0.8.1 to ^0.8.2

## [0.8.1](https://github.com/PrivateAIM/hub/compare/v0.8.0...v0.8.1) (2024-08-19)


### Features

* adjust analysis details view ([d80ac5c](https://github.com/PrivateAIM/hub/commit/d80ac5c41c1faf77290d7d986d785d8deabcbdff))
* allow specifying cookie domain ([fb52746](https://github.com/PrivateAIM/hub/commit/fb527465b2842ba8b2d8856c66775cc7a0b879aa))
* initial refactoring of analysis incoming view ([10425af](https://github.com/PrivateAIM/hub/commit/10425af18fcaedf9569876590bd7f4fc1fcf2a92))
* initial refactoring of projects incoming view ([c524618](https://github.com/PrivateAIM/hub/commit/c5246185847c3f8d83d9ac22cfecd62f7351392b))
* prettify project details view ([a788ba8](https://github.com/PrivateAIM/hub/commit/a788ba8868d86d4987a48ac141527d04d5fa289a))
* public & private service URLs for client-ui ([d5c2d41](https://github.com/PrivateAIM/hub/commit/d5c2d41b83a57d9acb14f0649988e11a55d7b726))
* refactored analyses & projects list view ([#639](https://github.com/PrivateAIM/hub/issues/639)) ([ee7a6e7](https://github.com/PrivateAIM/hub/commit/ee7a6e7a1f5d3d12c0726d543337c728d4fb0138))


### Bug Fixes

* bump nuxt to v3.12.3 and fix corrseponding issues ([312420b](https://github.com/PrivateAIM/hub/commit/312420bce1620b032cb4e752011058dd21a1dcbd))
* show error message on realm creation ([c41942c](https://github.com/PrivateAIM/hub/commit/c41942c135a63590334c9661dcc16bb57ecc97b9))
* use non default export for {analysis,project}-node command & status ([ad74cf6](https://github.com/PrivateAIM/hub/commit/ad74cf625143e4f81d45d6894b86e47c725ad52c))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.8.0 to ^0.8.1
    * @privateaim/core-kit bumped from ^0.8.0 to ^0.8.1
    * @privateaim/kit bumped from ^0.8.0 to ^0.8.1
    * @privateaim/storage-kit bumped from ^0.8.0 to ^0.8.1

## [0.8.0](https://github.com/PrivateAIM/hub/compare/v0.7.0...v0.8.0) (2024-07-02)


### Features

* simplified and adjusted permission usage across codespace ([1839f5e](https://github.com/PrivateAIM/hub/commit/1839f5eb768f120e268e57e0a496fef5eb0eca41))


### Bug Fixes

* **deps:** bump authup to v1.0.0.beta-19 ([3410786](https://github.com/PrivateAIM/hub/commit/34107860d7f810cea7b2024b0f303cd70d32a5fe))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.7.0 to ^0.8.0
    * @privateaim/core-kit bumped from ^0.7.0 to ^0.8.0
    * @privateaim/kit bumped from ^0.7.0 to ^0.8.0
    * @privateaim/storage-kit bumped from ^0.7.0 to ^0.8.0

## [0.7.0](https://github.com/PrivateAIM/hub/compare/v0.6.0...v0.7.0) (2024-06-26)


### Features

* add ui package to docker-compose ([75f6bfc](https://github.com/PrivateAIM/hub/commit/75f6bfc56eeb8b58c8f120209583d81d03605a95))
* adjusted code references for core -&gt; core-kit package renaming ([321b8ac](https://github.com/PrivateAIM/hub/commit/321b8acb33e4fdd93252c72da34fac34cc86cd9f))
* adjusted permission names ([3f5e863](https://github.com/PrivateAIM/hub/commit/3f5e8637937f52c73280fe911dd5c150d446da4f))
* adjusted usage of terms and uris of train, station & proposal ([eef58f3](https://github.com/PrivateAIM/hub/commit/eef58f32901150ba0e19a29c5685c92c73188f3f))
* analysis-bucket implementation  ([#433](https://github.com/PrivateAIM/hub/issues/433)) ([15329f4](https://github.com/PrivateAIM/hub/commit/15329f42c5f6ebbe4772715ff2e308e41ae9e91a))
* bump authup to v1.0.0-beta.5 ([13aeab2](https://github.com/PrivateAIM/hub/commit/13aeab2eb8a00069512eee17fc129d56a58309bc))
* extract utils and common consts, fns, ... to kit package ([258bbb2](https://github.com/PrivateAIM/hub/commit/258bbb21bfbf671a7cfad3e91740a1737eaf3f71))
* implement sdk for storage service ([#127](https://github.com/PrivateAIM/hub/issues/127)) ([1db162a](https://github.com/PrivateAIM/hub/commit/1db162aef6d2af8686bd49820f26be03f8e3dbc1))
* initial core -&gt; core-kit package renaming ([9ac9709](https://github.com/PrivateAIM/hub/commit/9ac970999922bc76e3f88381f4d3351a51147a46))
* initial refactor of server api domains ([5cb5eb8](https://github.com/PrivateAIM/hub/commit/5cb5eb8b649cad3691945bba4a3e1bc759ff0a75))
* initial user interface draft ([#148](https://github.com/PrivateAIM/hub/issues/148)) ([600a3cf](https://github.com/PrivateAIM/hub/commit/600a3cf3ad42ca60a610eb2eb3d1a912c42bd12f))
* migrated to authup version v1.0.0-beta.18 ([06928f6](https://github.com/PrivateAIM/hub/commit/06928f681120b423f962a7869f8f6b12708d3047))
* realtime library/service split ([#474](https://github.com/PrivateAIM/hub/issues/474)) ([43c2dfa](https://github.com/PrivateAIM/hub/commit/43c2dfad654cc61ca9784914cbad56c684434088))
* refactored and adjusted vue components ([#143](https://github.com/PrivateAIM/hub/issues/143)) ([ee98e72](https://github.com/PrivateAIM/hub/commit/ee98e7210848c9da8ff64bb6235b6cda34654446))
* reimplemented client socket management + adjusted vue plugin ([c040ee4](https://github.com/PrivateAIM/hub/commit/c040ee46a4822330835a2d36be348c937de96660))
* remove ecosystem buisness logic & intial controller renaming ([650dfde](https://github.com/PrivateAIM/hub/commit/650dfdec81a8611f5011dd18861fab30771c5289))
* remove station-registry buisness logic ([859ccd7](https://github.com/PrivateAIM/hub/commit/859ccd774983dbc2983b57f2dc9e1eab6924c727))
* simplified and refactored client-vue installation & integration ([0532d16](https://github.com/PrivateAIM/hub/commit/0532d16c5bd329f3fc82239c5b06327923b6c56b))
* simplified authentication & authorization management ([0b19929](https://github.com/PrivateAIM/hub/commit/0b199297766780a4c5cfcd8eda02cefb9f226958))
* updated authup, vuecs & ilingo ([66a5f7b](https://github.com/PrivateAIM/hub/commit/66a5f7ba1454fc5e432cd687a509ebf3bf4c4ab4))
* updated bootstrap-vue-next & adjusted usage ([ca76f9f](https://github.com/PrivateAIM/hub/commit/ca76f9f41a250aa23717ccbb55127bbd092c032b))
* view for downloading results + refactored entities/types ([#188](https://github.com/PrivateAIM/hub/issues/188)) ([084040e](https://github.com/PrivateAIM/hub/commit/084040eec1e74b10ec40c577d5f8e3a5fcedf250))


### Bug Fixes

* admin node robot & registry view ([a4c5239](https://github.com/PrivateAIM/hub/commit/a4c5239b34df2c9a4210994b9ec7531932615576))
* analysis entrypoint file selection ([ebf63b8](https://github.com/PrivateAIM/hub/commit/ebf63b8a79f7bcd95d0e61f922f37e7d97aa4582))
* analysis-bucket-file delete operation & auth plugin nuxt-app access ([86e3a2d](https://github.com/PrivateAIM/hub/commit/86e3a2da2b780c1080c83b761f3b0a189c3580de))
* **deps:** bump @authup/core from 1.0.0-beta.1 to 1.0.0-beta.3 ([#53](https://github.com/PrivateAIM/hub/issues/53)) ([95df3be](https://github.com/PrivateAIM/hub/commit/95df3be641bed869a10f69bcb3065eb36ada178e))
* **deps:** bump @authup/core from 1.0.0-beta.3 to 1.0.0-beta.4 ([#92](https://github.com/PrivateAIM/hub/issues/92)) ([b950c83](https://github.com/PrivateAIM/hub/commit/b950c838b0de3e647452145182f906472af2fd12))
* **deps:** bump @authup/core from 1.0.0-beta.5 to 1.0.0-beta.7 ([#155](https://github.com/PrivateAIM/hub/issues/155)) ([e0da3b4](https://github.com/PrivateAIM/hub/commit/e0da3b4ccabc30e8871cd01f373f3437a0f1928a))
* **deps:** bump @authup/core from 1.0.0-beta.7 to 1.0.0-beta.8 ([#210](https://github.com/PrivateAIM/hub/issues/210)) ([6e8adf2](https://github.com/PrivateAIM/hub/commit/6e8adf2c80dba69eb66a76250e1fc1acc1bb71dd))
* **deps:** bump @authup/core from 1.0.0-beta.8 to 1.0.0-beta.9 ([#277](https://github.com/PrivateAIM/hub/issues/277)) ([f9a8f59](https://github.com/PrivateAIM/hub/commit/f9a8f59a60990f8ffe6da044c18150a56f2e196c))
* **deps:** bump hapic from 2.5.0 to 2.5.1 ([#214](https://github.com/PrivateAIM/hub/issues/214)) ([eb3e30c](https://github.com/PrivateAIM/hub/commit/eb3e30c6cf3fb81d30ef9b2c802698a5818505a2))
* minor adjustments in analysis wizard ([d6098a7](https://github.com/PrivateAIM/hub/commit/d6098a70f5d282028964fda3c3fd41e1314daac6))
* minor enhancement for node related components ([7c0ea49](https://github.com/PrivateAIM/hub/commit/7c0ea49d79cdc417941532421e7d68d6c4f43998))
* minor fix in auth middleware ([f6dc1cd](https://github.com/PrivateAIM/hub/commit/f6dc1cd7bcff4cf01aa8c8adda0a8391da29c3b3))
* minor issues in client components & applied linting rules ([b88e168](https://github.com/PrivateAIM/hub/commit/b88e168e0bf3f93e01887f91e9fdff7fe621aafd))
* minor restructuring of source code ([6f504f6](https://github.com/PrivateAIM/hub/commit/6f504f60d07ea8e43f24b9762b2bc8a650525477))
* renamed remaining http sub client properties ([001242b](https://github.com/PrivateAIM/hub/commit/001242b19d9a3df725711dba7c81f19f6a803495))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.6.0 to ^0.7.0
    * @privateaim/core-kit bumped from ^0.6.0 to ^0.7.0
    * @privateaim/kit bumped from ^0.6.0 to ^0.7.0
    * @privateaim/storage-kit bumped from ^0.6.0 to ^0.7.0

## [0.6.0](https://github.com/PrivateAIM/hub/compare/client-ui-v0.5.0...client-ui-v0.6.0) (2024-06-25)


### Features

* adjusted code references for core -&gt; core-kit package renaming ([321b8ac](https://github.com/PrivateAIM/hub/commit/321b8acb33e4fdd93252c72da34fac34cc86cd9f))
* initial core -&gt; core-kit package renaming ([9ac9709](https://github.com/PrivateAIM/hub/commit/9ac970999922bc76e3f88381f4d3351a51147a46))
* migrated to authup version v1.0.0-beta.18 ([06928f6](https://github.com/PrivateAIM/hub/commit/06928f681120b423f962a7869f8f6b12708d3047))
* realtime library/service split ([#474](https://github.com/PrivateAIM/hub/issues/474)) ([43c2dfa](https://github.com/PrivateAIM/hub/commit/43c2dfad654cc61ca9784914cbad56c684434088))


### Bug Fixes

* admin node robot & registry view ([a4c5239](https://github.com/PrivateAIM/hub/commit/a4c5239b34df2c9a4210994b9ec7531932615576))
* analysis-bucket-file delete operation & auth plugin nuxt-app access ([86e3a2d](https://github.com/PrivateAIM/hub/commit/86e3a2da2b780c1080c83b761f3b0a189c3580de))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.5.0 to ^0.6.0
    * @privateaim/core-kit bumped from ^0.5.0 to ^0.6.0
    * @privateaim/kit bumped from ^0.5.0 to ^0.6.0
    * @privateaim/storage-kit bumped from ^0.5.0 to ^0.6.0

## [0.5.0](https://github.com/PrivateAIM/hub/compare/client-ui-v0.4.0...client-ui-v0.5.0) (2024-06-12)


### Features

* analysis-bucket implementation  ([#433](https://github.com/PrivateAIM/hub/issues/433)) ([15329f4](https://github.com/PrivateAIM/hub/commit/15329f42c5f6ebbe4772715ff2e308e41ae9e91a))
* extract utils and common consts, fns, ... to kit package ([258bbb2](https://github.com/PrivateAIM/hub/commit/258bbb21bfbf671a7cfad3e91740a1737eaf3f71))


### Bug Fixes

* minor fix in auth middleware ([f6dc1cd](https://github.com/PrivateAIM/hub/commit/f6dc1cd7bcff4cf01aa8c8adda0a8391da29c3b3))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.4.0 to ^0.5.0
    * @privateaim/core bumped from ^0.4.0 to ^0.5.0
    * @privateaim/kit bumped from ^0.4.0 to ^0.5.0
    * @privateaim/storage-kit bumped from ^0.4.0 to ^0.5.0

## [0.4.0](https://github.com/PrivateAIM/hub/compare/client-ui-v0.4.0...client-ui-v0.4.0) (2024-06-12)


### Features

* analysis-bucket implementation  ([#433](https://github.com/PrivateAIM/hub/issues/433)) ([15329f4](https://github.com/PrivateAIM/hub/commit/15329f42c5f6ebbe4772715ff2e308e41ae9e91a))
* extract utils and common consts, fns, ... to kit package ([258bbb2](https://github.com/PrivateAIM/hub/commit/258bbb21bfbf671a7cfad3e91740a1737eaf3f71))


### Bug Fixes

* minor fix in auth middleware ([f6dc1cd](https://github.com/PrivateAIM/hub/commit/f6dc1cd7bcff4cf01aa8c8adda0a8391da29c3b3))

## [0.4.0](https://github.com/PrivateAIM/hub/compare/client-ui-v0.3.0...client-ui-v0.4.0) (2024-05-15)


### Features

* add ui package to docker-compose ([75f6bfc](https://github.com/PrivateAIM/hub/commit/75f6bfc56eeb8b58c8f120209583d81d03605a95))
* adjusted permission names ([3f5e863](https://github.com/PrivateAIM/hub/commit/3f5e8637937f52c73280fe911dd5c150d446da4f))
* reimplemented client socket management + adjusted vue plugin ([c040ee4](https://github.com/PrivateAIM/hub/commit/c040ee46a4822330835a2d36be348c937de96660))
* simplified and refactored client-vue installation & integration ([0532d16](https://github.com/PrivateAIM/hub/commit/0532d16c5bd329f3fc82239c5b06327923b6c56b))
* simplified authentication & authorization management ([0b19929](https://github.com/PrivateAIM/hub/commit/0b199297766780a4c5cfcd8eda02cefb9f226958))
* updated authup, vuecs & ilingo ([66a5f7b](https://github.com/PrivateAIM/hub/commit/66a5f7ba1454fc5e432cd687a509ebf3bf4c4ab4))
* view for downloading results + refactored entities/types ([#188](https://github.com/PrivateAIM/hub/issues/188)) ([084040e](https://github.com/PrivateAIM/hub/commit/084040eec1e74b10ec40c577d5f8e3a5fcedf250))


### Bug Fixes

* analysis entrypoint file selection ([ebf63b8](https://github.com/PrivateAIM/hub/commit/ebf63b8a79f7bcd95d0e61f922f37e7d97aa4582))
* **deps:** bump @authup/core from 1.0.0-beta.7 to 1.0.0-beta.8 ([#210](https://github.com/PrivateAIM/hub/issues/210)) ([6e8adf2](https://github.com/PrivateAIM/hub/commit/6e8adf2c80dba69eb66a76250e1fc1acc1bb71dd))
* **deps:** bump @authup/core from 1.0.0-beta.8 to 1.0.0-beta.9 ([#277](https://github.com/PrivateAIM/hub/issues/277)) ([f9a8f59](https://github.com/PrivateAIM/hub/commit/f9a8f59a60990f8ffe6da044c18150a56f2e196c))
* **deps:** bump hapic from 2.5.0 to 2.5.1 ([#214](https://github.com/PrivateAIM/hub/issues/214)) ([eb3e30c](https://github.com/PrivateAIM/hub/commit/eb3e30c6cf3fb81d30ef9b2c802698a5818505a2))
* minor adjustments in analysis wizard ([d6098a7](https://github.com/PrivateAIM/hub/commit/d6098a70f5d282028964fda3c3fd41e1314daac6))
* minor enhancement for node related components ([7c0ea49](https://github.com/PrivateAIM/hub/commit/7c0ea49d79cdc417941532421e7d68d6c4f43998))
* minor issues in client components & applied linting rules ([b88e168](https://github.com/PrivateAIM/hub/commit/b88e168e0bf3f93e01887f91e9fdff7fe621aafd))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.3.0 to ^0.4.0
    * @privateaim/core bumped from ^0.3.0 to ^0.4.0
    * @privateaim/storage-kit bumped from ^0.3.0 to ^0.4.0

## [0.3.0](https://github.com/PrivateAIM/hub/compare/client-ui-v0.2.0...client-ui-v0.3.0) (2024-03-11)


### Features

* adjusted usage of terms and uris of train, station & proposal ([eef58f3](https://github.com/PrivateAIM/hub/commit/eef58f32901150ba0e19a29c5685c92c73188f3f))
* initial user interface draft ([#148](https://github.com/PrivateAIM/hub/issues/148)) ([600a3cf](https://github.com/PrivateAIM/hub/commit/600a3cf3ad42ca60a610eb2eb3d1a912c42bd12f))
* refactored and adjusted vue components ([#143](https://github.com/PrivateAIM/hub/issues/143)) ([ee98e72](https://github.com/PrivateAIM/hub/commit/ee98e7210848c9da8ff64bb6235b6cda34654446))
* updated bootstrap-vue-next & adjusted usage ([ca76f9f](https://github.com/PrivateAIM/hub/commit/ca76f9f41a250aa23717ccbb55127bbd092c032b))


### Bug Fixes

* **deps:** bump @authup/core from 1.0.0-beta.5 to 1.0.0-beta.7 ([#155](https://github.com/PrivateAIM/hub/issues/155)) ([e0da3b4](https://github.com/PrivateAIM/hub/commit/e0da3b4ccabc30e8871cd01f373f3437a0f1928a))
* minor restructuring of source code ([6f504f6](https://github.com/PrivateAIM/hub/commit/6f504f60d07ea8e43f24b9762b2bc8a650525477))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.2.0 to ^0.3.0
    * @privateaim/core bumped from ^0.2.0 to ^0.3.0
    * @privateaim/storage-kit bumped from ^0.2.0 to ^0.3.0

## [0.2.0](https://github.com/PrivateAIM/hub/compare/client-ui-v0.1.0...client-ui-v0.2.0) (2024-02-28)


### Features

* bump authup to v1.0.0-beta.5 ([13aeab2](https://github.com/PrivateAIM/hub/commit/13aeab2eb8a00069512eee17fc129d56a58309bc))
* implement sdk for storage service ([#127](https://github.com/PrivateAIM/hub/issues/127)) ([1db162a](https://github.com/PrivateAIM/hub/commit/1db162aef6d2af8686bd49820f26be03f8e3dbc1))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.1.0 to ^0.2.0
    * @privateaim/core bumped from ^0.1.0 to ^0.2.0

## 0.1.0 (2024-02-19)


### Features

* initial refactor of server api domains ([5cb5eb8](https://github.com/PrivateAIM/hub/commit/5cb5eb8b649cad3691945bba4a3e1bc759ff0a75))
* remove ecosystem buisness logic & intial controller renaming ([650dfde](https://github.com/PrivateAIM/hub/commit/650dfdec81a8611f5011dd18861fab30771c5289))
* remove station-registry buisness logic ([859ccd7](https://github.com/PrivateAIM/hub/commit/859ccd774983dbc2983b57f2dc9e1eab6924c727))


### Bug Fixes

* **deps:** bump @authup/core from 1.0.0-beta.1 to 1.0.0-beta.3 ([#53](https://github.com/PrivateAIM/hub/issues/53)) ([95df3be](https://github.com/PrivateAIM/hub/commit/95df3be641bed869a10f69bcb3065eb36ada178e))
* **deps:** bump @authup/core from 1.0.0-beta.3 to 1.0.0-beta.4 ([#92](https://github.com/PrivateAIM/hub/issues/92)) ([b950c83](https://github.com/PrivateAIM/hub/commit/b950c838b0de3e647452145182f906472af2fd12))
* renamed remaining http sub client properties ([001242b](https://github.com/PrivateAIM/hub/commit/001242b19d9a3df725711dba7c81f19f6a803495))


### Dependencies

* The following workspace dependencies were updated
  * devDependencies
    * @privateaim/client-vue bumped from ^0.0.0 to ^0.1.0
    * @privateaim/core bumped from ^0.0.0 to ^0.1.0
