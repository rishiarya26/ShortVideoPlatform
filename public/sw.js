if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let d={};const n=e=>i(e,r),b={module:{uri:r},exports:d,require:n};a[r]=Promise.all(s.map((e=>b[e]||n(e)))).then((e=>(o(...e),d)))}}define(["./workbox-09483baf"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/agents/instana.js",revision:"b1a1d9d211498b346ba587cce749183f"},{url:"/assets/Hipi_Icon_Logo.png",revision:"3eec7793923707960ad03673502538e2"},{url:"/assets/Hipi_Logo.png",revision:"0377dc703f17c937a9e57355224e8602"},{url:"/assets/Hipi_brand_guideline.pdf",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/assets/document.png",revision:"641d7398f16e363e738113a3cf8453cb"},{url:"/assets/download.png",revision:"33ca9d3e897ad0f99cd2731d4d71db55"},{url:"/business/Hashtag_challenge.mp4",revision:"b779d2045c8d28cc306b6dd242da7d1a"},{url:"/business/IconsAccessories.png",revision:"6be08c8fa86f88f5d1e6009168d18820"},{url:"/business/IconsAdvertise.png",revision:"7dfd8cc7c2a374cf4d47ccb67c0dc76f"},{url:"/business/IconsBeauty.png",revision:"8a587986b8fd0f0276e022721a8330c7"},{url:"/business/IconsCommerce.png",revision:"047b791b75c59bb85e0c811ab723c53c"},{url:"/business/IconsEngage.png",revision:"8673cdb8be8db8552a4ee34ff0d2fb4f"},{url:"/business/IconsFashion.png",revision:"0dbe6e167736f01a2834de60fcf06d16"},{url:"/business/IconsFood.png",revision:"dc15780b40ee3ed1ea44ede2e53545ad"},{url:"/business/IconsHair.png",revision:"c131dffc23091133461e693bb29d671f"},{url:"/business/Infeed_video.mp4",revision:"1eca590020f45f0e9238be243076bfae"},{url:"/business/Product_discovery.mp4",revision:"7d6236c4df9b65dc90d6ca10f0f9edd6"},{url:"/business/RRR.gif",revision:"6b285f6c3e6512a669c09a552eb02d65"},{url:"/business/SPH.gif",revision:"2c3818a68f32f7b7cb2b12764e64cb81"},{url:"/business/SuperMom.gif",revision:"a81571194691676133360ae2155b9099"},{url:"/business/Top_view.mp4",revision:"31af5a90d9b7067617af1303897ee892"},{url:"/content-lang.json",revision:"3cbef43f69b95d50774313e7c720a4dc"},{url:"/countryCode.json",revision:"000ae7c5854bfa0e01cac93e33a07672"},{url:"/fonts/eot/CustomFont-Bold.eot",revision:"45b05f2e491fb27af3a0bf6a78e28a95"},{url:"/fonts/eot/CustomFont-Light.eot",revision:"6d503b08754ee3d8f5b282914c8ef0e2"},{url:"/fonts/eot/CustomFont-Medium.eot",revision:"5734490731350a6b760100713c7d13a5"},{url:"/fonts/ttf/CustomFont-Bold.ttf",revision:"322e44bc7f0ac7207b5d33f5c128478b"},{url:"/fonts/ttf/CustomFont-Light.ttf",revision:"1d38055169378a25a382e4912bb79804"},{url:"/fonts/ttf/CustomFont-Medium.ttf",revision:"9d5462aad98076dfc40c65ae0f14400a"},{url:"/fonts/woff/CustomFont-Bold.woff",revision:"8e1630e8bc5b6a100ac9e9f4c7310760"},{url:"/fonts/woff/CustomFont-Bold.woff2",revision:"81a33cafdfc9721c384a769625b06894"},{url:"/fonts/woff/CustomFont-Light.woff",revision:"c1f04743d1862f46a3819436bf36f14f"},{url:"/fonts/woff/CustomFont-Light.woff2",revision:"f7aba3bfca88a454400574dbb800cb8b"},{url:"/fonts/woff/CustomFont-Medium.woff",revision:"0dd1f5318b85ef26db395beda7386479"},{url:"/fonts/woff/CustomFont-Medium.woff2",revision:"b1efa9c0e0e1a52fbad00d818fc8aacd"},{url:"/goat-FAQ.json",revision:"564f295cecebd9a1500b68c8b35decf5"},{url:"/i10n/bn-in.json",revision:"70cd96349fea1b0a6488846f8c4d5fd0"},{url:"/i10n/en-in.json",revision:"bea1d82c2d0d7ec86d82f2a4bd0ffd99"},{url:"/i10n/hi-in.json",revision:"dd2f5c2e736bdc65d2ad701393787449"},{url:"/icons/1488 (3).gif",revision:"a3eb3aae62011a476513700437f84313"},{url:"/icons/Hipi-Logo-RGB.png",revision:"0ea2586ead3545c80221033030363dc5"},{url:"/icons/Logo_hipi.png",revision:"20733862cb01d7d2a42ee90e6cf6f80f"},{url:"/icons/Spinner.svg",revision:"031758abf5880b4668df97bfc7809e8e"},{url:"/icons/android-chrome-192x192.png",revision:"ca7fc3b20035fc99c3dbefabf403cc7e"},{url:"/icons/android-icon-192x192-dunplab-manifest-17016.png",revision:"f19770c686c4f1ae10a770784d2df765"},{url:"/icons/app_store.png",revision:"5f93c6c34cdcea8c9c587c5591d513fb"},{url:"/icons/app_store_1.png",revision:"4cada90a3ca1b33d61d57ab47ae3c11c"},{url:"/icons/app_store_2.png",revision:"f01bb5b790e2cce3cbef8186e09122f7"},{url:"/icons/apple-icon-114x114-dunplab-manifest-17016.png",revision:"dce4c61abf49baee9e8ba9956f791abc"},{url:"/icons/apple-icon-120x120-dunplab-manifest-17016.png",revision:"21f6963dc31ea662b9cf953343547c64"},{url:"/icons/apple-icon-144x144-dunplab-manifest-17016.png",revision:"42fdd65a3125e41fd36f2afa6b8b1f2c"},{url:"/icons/apple-icon-152x152-dunplab-manifest-17016.png",revision:"9d1ddb7adb816758a849a6fcf3d93b48"},{url:"/icons/apple-icon-180x180-dunplab-manifest-17016.png",revision:"ffca4870c52f850d9f28080349130f82"},{url:"/icons/apple-icon-57x57-dunplab-manifest-17016.png",revision:"0bf63e7b705f2255c1df7c70f05f8e6e"},{url:"/icons/apple-icon-60x60-dunplab-manifest-17016.png",revision:"57cd3a13978ee02cb75f1c681c8a1021"},{url:"/icons/apple-icon-72x72-dunplab-manifest-17016.png",revision:"636902488ca0cfec90d7fdeec15ec559"},{url:"/icons/apple-icon-76x76-dunplab-manifest-17016.png",revision:"825b4def63220630814b4b81dd534907"},{url:"/icons/apple-touch-icon.png",revision:"10469c73f1a834a5b3d266b5f5a24f67"},{url:"/icons/backarrow.svg",revision:"73af14c18be56c23dfcdf2c5a6616807"},{url:"/icons/favicon-16x16-dunplab-manifest-17016.png",revision:"77cab1690a60ad14cc0daa8724cfc521"},{url:"/icons/favicon-32x32-dunplab-manifest-17016.png",revision:"17cbab30cf120f780a08710e4c1c608c"},{url:"/icons/favicon-96x96-dunplab-manifest-17016.png",revision:"df05783d68a782131ff719bfbde6f0de"},{url:"/icons/favicon.ico",revision:"f456cbb57158b28d735f56d8c09bc85a"},{url:"/icons/favicon.png",revision:"77cab1690a60ad14cc0daa8724cfc521"},{url:"/icons/frontarrow.svg",revision:"4871ec780682d96f787739ac13f0e18a"},{url:"/icons/hipi_logo_og.png",revision:"9d1ddb7adb816758a849a6fcf3d93b48"},{url:"/icons/icon-512x512.png",revision:"93a2058d0e6ba3746db2887cc9218527"},{url:"/icons/output-onlinepngtools.png",revision:"e0089016a2a7df95d57b18ca49ec2ad7"},{url:"/icons/output-onlinepngtools_1.png",revision:"0bf63e7b705f2255c1df7c70f05f8e6e"},{url:"/icons/play_store.png",revision:"6af62d734b3701f7cdb87f41784d25e8"},{url:"/icons/play_store_1.png",revision:"2446f946642dd39cfe1f39ffdae4edc1"},{url:"/icons/qrcode.png",revision:"c8993a8c8ea14104c58ce0185ecc7b32"},{url:"/images/2.jpg",revision:"c9b0f7dd6048c89edbeb1d4163848271"},{url:"/images/3.jpg",revision:"b6c458817c01ce120a325eb634567201"},{url:"/images/3rd.png",revision:"8fbc3f81bbce6b819790f6e6deb156cd"},{url:"/images/409.png",revision:"ef3c0f5985a620f0d2d3b7fa7355e56d"},{url:"/images/Background_home.jpg",revision:"4fbd8d276ea5876bbcfb44116eaa2321"},{url:"/images/BhangraTaSajda/Desk_BhangraTaSajda.jpg",revision:"bb6cf13b637f1586405bc54b149807fe"},{url:"/images/BhangraTaSajda/Mob_BhangraTaSajda.jpg",revision:"01a002cb91eaba18c6840f447bb8d550"},{url:"/images/SuperMomIndia-Web.jpg",revision:"d30c96db5e1ffbac1161fa81df029298"},{url:"/images/about/hipi_about.jpg",revision:"47d28767609c4a6de2a0f0688ce60491"},{url:"/images/advertisement/gif/dance.gif",revision:"ce83a79fefe78199eb1de51eaeed815b"},{url:"/images/advertisement/gif/fashion.gif",revision:"1a7a68a86d5ea6ca297ab980740f7c6f"},{url:"/images/advertisement/gif/food.gif",revision:"2ffb598ff7bd71b332889373bdc930e6"},{url:"/images/advertisement/gif/gym.gif",revision:"c642dd1fde3eab221eb8eea1bd7ffd55"},{url:"/images/advertisement/gif/sport.gif",revision:"2fd96dbacf206260c95e49d251d7f68a"},{url:"/images/advertisement/gif/travel.gif",revision:"716d32bd36982c5c1c0cc9310e18b8f0"},{url:"/images/advertisement/logo/amazon.png",revision:"10e08d43633d09ae60c6dcce3dde06ba"},{url:"/images/advertisement/logo/bigbasket.png",revision:"1bcea77476cf889c88f220e4dc463753"},{url:"/images/advertisement/logo/fabindia.png",revision:"41233883e5ec79404eeda30da1865eae"},{url:"/images/advertisement/logo/flipkart.png",revision:"e0b70015944c7cfa1868aaaebed02e5e"},{url:"/images/advertisement/logo/loreal.png",revision:"618c8b7be041bb63ddbada31af1c5e1d"},{url:"/images/advertisement/logo/marico.png",revision:"07c9938b0d9ffb75f4a7f887cb5a187b"},{url:"/images/advertisement/logo/paragon.png",revision:"df12332fed7a47168f9fb040da70cc01"},{url:"/images/advertisement/logo/tanishq.png",revision:"8bec84b0e8f5ab545efb645c623d08f7"},{url:"/images/advertisement/logo/yash.png",revision:"b8e03ab37f9b24306fef68da4279027d"},{url:"/images/app-store.svg",revision:"836ea772ff3695261439981ab08fd8c9"},{url:"/images/contact.jpg",revision:"c5224aa8d848127167de5c237ca59af4"},{url:"/images/de-link.png",revision:"5af714e9d765113e7b1c8a7d646ef370"},{url:"/images/dilse/DilSeDiljit_Mob.png",revision:"c634921105ef996e435afa339c51104e"},{url:"/images/dilse/DilSeDiljit_Web.png",revision:"9e851e0df798c2fb61648f6657bb0128"},{url:"/images/fallback-charms.png",revision:"44947fb69a6f267b36e189c210e2a763"},{url:"/images/goat/desktop/1.jpg",revision:"db2da483d36aea90c6bda6774ca66894"},{url:"/images/goat/desktop/10.jpg",revision:"96351ca1d656d22791df21bc1abf7ce7"},{url:"/images/goat/desktop/2.jpg",revision:"0f2e36966a566e9679254fb7f8c0b5d3"},{url:"/images/goat/desktop/2_1.jpg",revision:"c9a2789640f708cfc483ded1d89e18ed"},{url:"/images/goat/desktop/3.jpg",revision:"b4b8c440964167ba9d7f14a7f2bb2894"},{url:"/images/goat/desktop/3_1.jpg",revision:"4de79f8950cf2b033d7712f9dd84f25f"},{url:"/images/goat/desktop/3_2.jpg",revision:"c393277b6016fb25745eb7651263d157"},{url:"/images/goat/desktop/4.jpg",revision:"c10a2865a73136038ae82b4a33958d97"},{url:"/images/goat/desktop/4_1.jpg",revision:"2a97103ba080c5cabb923f6ead3d8710"},{url:"/images/goat/desktop/5.jpg",revision:"d7a27e3731ec7eb6b904ddbcd0034a77"},{url:"/images/goat/desktop/6.jpg",revision:"225c5c9362dce9937633ff55aca4d09a"},{url:"/images/goat/desktop/7.jpg",revision:"279442b8f4275b1fbbe3452bdee4e1f3"},{url:"/images/goat/desktop/8.jpg",revision:"4addebc6c6803e4d4ac0ac0b155ca1f8"},{url:"/images/goat/desktop/9.jpg",revision:"a833881ba6cae7be3a017c047068b9d2"},{url:"/images/goat/desktop/9_1.jpg",revision:"d5080a54a1d56e353d3566132febc9c5"},{url:"/images/goat/desktop/Round2Desktop.png",revision:"16a49da68d1f049bd4b861ab22e49759"},{url:"/images/goat/desktop/Round3Desktop.png",revision:"730434d9e499bc2fb7e85705022197df"},{url:"/images/goat/desktop/faq.jpg",revision:"b682625dae21cdcfd202d6b0344bcb06"},{url:"/images/goat/desktop/judge.jpg",revision:"4938fe0a4e14b3614dbf23fd2732ba19"},{url:"/images/goat/desktop/round-2-lead.jpg",revision:"1d80a9a8d4986617b681d410321cbb57"},{url:"/images/goat/desktop/round1.png",revision:"9adc89e9a921c076541590bb405bf6b8"},{url:"/images/goat/desktop/round2.png",revision:"b03016ba8d1bcfb10ad4bc47ddb3faae"},{url:"/images/goat/desktop/round2Desk.png",revision:"780397e1eb03bf0e1b9b619ca381caca"},{url:"/images/goat/desktop/round3.png",revision:"f449ed69bdd77703f2d946a60be1bcc9"},{url:"/images/goat/desktop/round3desk.png",revision:"acfbdfbb404d842a02011c4b247e8108"},{url:"/images/goat/desktop/unlu_desktop.jpg",revision:"47e6dc962951517f01110ff440dd507e"},{url:"/images/goat/lb/desk/LEADERBOARD_BG.jpg",revision:"e1ed806d6d7549b3544eee4887437809"},{url:"/images/goat/lb/desk/lb_desc.jpg",revision:"a8a7f91b450373f675cd25de8d3931c9"},{url:"/images/goat/lb/desk/lb_desc_latest.jpg",revision:"845bf56fb23cb0428d742687084e4b88"},{url:"/images/goat/lb/desk/lb_descnn.jpg",revision:"a8a7f91b450373f675cd25de8d3931c9"},{url:"/images/goat/lb/desk/title.png",revision:"9c29e9ffab808ab40e186658c58087c0"},{url:"/images/goat/lb/mob/lb_desc.jpg",revision:"3b0b7c6b7fc90ee8c1b3451a9968884c"},{url:"/images/goat/lb/mob/lb_desc_latest.jpg",revision:"4b5a4a4fe12641d6d59b0c4cfcbf4245"},{url:"/images/goat/lb/mob/lb_desc_original.jpg",revision:"3b0b7c6b7fc90ee8c1b3451a9968884c"},{url:"/images/goat/lb/mob/lb_mobile-bg.jpg",revision:"ffa8e99f174eba2d0fb4ba4e15f3bc0e"},{url:"/images/goat/lb/mob/title.png",revision:"f8734597d13dd277fb9dda68cfdedafa"},{url:"/images/goat/lb_cta.png",revision:"704772a672d88ef22500e8d1277bbeb7"},{url:"/images/goat/mobile/1.jpg",revision:"4e202677bcc0970e91b5901503b5a2bd"},{url:"/images/goat/mobile/10.jpg",revision:"7f9d9bf4269a34d4b08c8ceb5d4ccffc"},{url:"/images/goat/mobile/10_1.jpg",revision:"98c965f2b8209c53029a8f7bfe863deb"},{url:"/images/goat/mobile/11.jpg",revision:"defbd6711bbaf6da3f666605a070c03b"},{url:"/images/goat/mobile/1_1.jpg",revision:"56e58e625db026ab8edaa0f700f9cd3e"},{url:"/images/goat/mobile/2.jpg",revision:"f1d8df1dc3ff2c8e4deb4793c21779df"},{url:"/images/goat/mobile/2_1.jpg",revision:"ac4c0693d13bcc5c245e2d5fc6d19b66"},{url:"/images/goat/mobile/3.jpg",revision:"72e649967528a8ae4d079d295d03765c"},{url:"/images/goat/mobile/4.jpg",revision:"2b955b65ab4337eec4fb15d48dafaab0"},{url:"/images/goat/mobile/5.jpg",revision:"b7be1b7c82a31dd15235815f80bd4952"},{url:"/images/goat/mobile/6.jpg",revision:"7ca3137b19059f36ec0acd7695e65b0c"},{url:"/images/goat/mobile/7.jpg",revision:"409bd2ae15ce33ac8a8c9b1e98b55d1c"},{url:"/images/goat/mobile/8.jpg",revision:"486a5209dd37defca542525467363b1a"},{url:"/images/goat/mobile/9.jpg",revision:"facf18cba8b3a21783e4d7b11fd8779f"},{url:"/images/goat/mobile/Round2Mobile.png",revision:"8066fb69f35a107da6b74ce30d724c08"},{url:"/images/goat/mobile/Round3Mobile.png",revision:"5687fe34e7be80d824b2beadf4b5250d"},{url:"/images/goat/mobile/judge.jpg",revision:"11884970b5e428508517659590424ede"},{url:"/images/goat/mobile/round 1 details - mobile.jpg",revision:"b335e6b8a1f62bc125a9197c56ecb46a"},{url:"/images/goat/mobile/round-2.jpg",revision:"a7b176af4023b69999cd41a56967358e"},{url:"/images/goat/mobile/round1.png",revision:"310d1c5fde3f2222fc5814cd0480407f"},{url:"/images/goat/mobile/round2.png",revision:"8746b39ed80a8f9c77945eb4fb158cfa"},{url:"/images/goat/mobile/round2Mob.png",revision:"a4ab0480e073cbf45e3ecae42889238d"},{url:"/images/goat/mobile/round3.png",revision:"f9e5699efacb4fc28e668ab942a6b8da"},{url:"/images/goat/mobile/round3mob.png",revision:"3db287dc6aaae9c4f5229517e4c37aaf"},{url:"/images/goat/mobile/unlu_mob.jpg",revision:"c6fd7002c91eadf79b8d484997d6f491"},{url:"/images/goat/round-2/desk/1.jpg",revision:"ee7236521259d6097305b05a453314e0"},{url:"/images/goat/round-2/desk/2.jpg",revision:"866ce5ac326d4b4e8a6896546d1da31e"},{url:"/images/goat/round-2/desk/3.jpg",revision:"b82f773e91eff9b2c3c97917d856a457"},{url:"/images/goat/round-2/desk/4.jpg",revision:"e18f2104a3bd4aade84cbca3e9b5ff22"},{url:"/images/goat/round-2/desk/5.jpg",revision:"bb2dd1e72059dbeb8265e235c1a04bab"},{url:"/images/goat/round-2/desk/6.jpg",revision:"e0d68394fa518b9da185636c97ff7197"},{url:"/images/goat/round-2/desk/7.jpg",revision:"6cd7c5b732bb0bf50b01200b52542fca"},{url:"/images/goat/round-2/desk/8.jpg",revision:"76a1e0b106e4d13b910d47e02bfcc822"},{url:"/images/goat/round-2/desktop/1.jpg",revision:"dac6b16fdeac968215d18402e210c71c"},{url:"/images/goat/round-2/desktop/2.jpg",revision:"3bb6fc5caeb041fe47374b6123a75679"},{url:"/images/goat/round-2/desktop/3.jpg",revision:"72a9aa7dd25a36431c62bfd12db3297b"},{url:"/images/goat/round-2/desktop/4.jpg",revision:"e2fd554e1ffa8b3c0d4bb1ea6c16d628"},{url:"/images/goat/round-2/desktop/5.jpg",revision:"ef188e83815e05e61ac563c5e60bf412"},{url:"/images/goat/round-2/desktop/6.jpg",revision:"e361c3101fbe025ff6cab419d28fb67c"},{url:"/images/goat/round-2/desktop/7.jpg",revision:"a9f8fa1e1296730cbbf8aff98ec52624"},{url:"/images/goat/round-2/desktop/Round2DetailsDesktop.png",revision:"3d4119f6f4e302d08e6a43b5306f32a5"},{url:"/images/goat/round-2/hipimobile/1_1.jpg",revision:"30d3426eebc2c53cbfa9fc96bff4cc8d"},{url:"/images/goat/round-2/hipimobile/1_2.jpg",revision:"1899a4ff89f6a4568766e3250893fe9e"},{url:"/images/goat/round-2/hipimobile/1_rel.jpg",revision:"afbfca4ba26bc2be9916e3edc898c1c4"},{url:"/images/goat/round-2/hipimobile/2_1.png",revision:"deecd51da0441509df5c81001956b96d"},{url:"/images/goat/round-2/hipimobile/2_rel.jpg",revision:"e9e031ee871be9619ef8631be33480d3"},{url:"/images/goat/round-2/hipimobile/3_1.jpg",revision:"a41d6ce569f72e8acacb43ccbb148b2b"},{url:"/images/goat/round-2/hipimobile/3_1.png",revision:"faad8175aa1ffbc403d9a169c892dda3"},{url:"/images/goat/round-2/hipimobile/3_2.jpg",revision:"2d305c2be446ab19e5bd9e12f4cce88b"},{url:"/images/goat/round-2/hipimobile/3_rel.jpg",revision:"4ac502971d2c4c441796f9ee7351bd5d"},{url:"/images/goat/round-2/hipimobile/4_1.jpg",revision:"6860ace68d616ab4772e57095e406100"},{url:"/images/goat/round-2/hipimobile/4_rel.jpg",revision:"a6dc712e7167342793f66b0572ee1ec7"},{url:"/images/goat/round-2/hipimobile/5_1.jpg",revision:"a58cef2fba69498cb9eb98ad3d685014"},{url:"/images/goat/round-2/hipimobile/5_2.png",revision:"5c53d44d47d61e8e85d8138481cfadae"},{url:"/images/goat/round-2/hipimobile/5_rel.jpg",revision:"c332ab23a7a7299df20a7425e8d9741e"},{url:"/images/goat/round-2/hipimobile/7_1.jpg",revision:"620625db1f2cfe09b93576c2388c2daf"},{url:"/images/goat/round-2/hipimobile/7_rel.jpg",revision:"4b8aef83efdf62da7ca20512a0494f11"},{url:"/images/goat/round-2/hipimobile/8_1.jpg",revision:"ee88852cc254ae79a25d4067c2aca4f1"},{url:"/images/goat/round-2/hipimobile/8_rel.jpg",revision:"da27248632b0868db0055fe593078fbf"},{url:"/images/goat/round-2/hipimobile/9_1.jpg",revision:"74d81df42fcb429cad80bbb72d3873f1"},{url:"/images/goat/round-2/hipimobile/9_rel.jpg",revision:"6a14f264792f68aa474f971ae56cdb1b"},{url:"/images/goat/round-2/mob/1.jpg",revision:"44a1aa3dcd3c326fc28e5d5ffc6b64ae"},{url:"/images/goat/round-2/mob/10.jpg",revision:"8034fd2171c131b8774bd0f1662eeb55"},{url:"/images/goat/round-2/mob/11.jpg",revision:"aca9668705ec6db775656c52c1590095"},{url:"/images/goat/round-2/mob/2.jpg",revision:"cc143fbb8f99dcd0dfcb48c15b0adf19"},{url:"/images/goat/round-2/mob/3.jpg",revision:"d65b6361ef798978e3b03428740e628d"},{url:"/images/goat/round-2/mob/4.jpg",revision:"47355060296c527ec5ec2baaa70bc3b1"},{url:"/images/goat/round-2/mob/5.jpg",revision:"9ab2114acf8cd1a2fbafcd6b42cf96a8"},{url:"/images/goat/round-2/mob/6.jpg",revision:"59dd72e3d18dfefb6e72c7952aaee136"},{url:"/images/goat/round-2/mob/7.jpg",revision:"0a45f5ffdb80d4ac301735eb5c0e7011"},{url:"/images/goat/round-2/mob/8.jpg",revision:"fd60308558fe6b9a559fa843ed353782"},{url:"/images/goat/round-2/mob/9.jpg",revision:"ba29d3cf00c80bba1af828b08d55cc1c"},{url:"/images/goat/round-2/mob/land.jpg",revision:"170749d6c610978bc7c8ed36e63331b5"},{url:"/images/goat/round-2/mob/land1.jpg",revision:"3f4da9d8cca6d8cf07747adf6837c558"},{url:"/images/goat/round-2/mobile/1.jpg",revision:"b82795e67b9767e9ffdf99e6e896673f"},{url:"/images/goat/round-2/mobile/10.jpg",revision:"6e7e07cc5e5df5d9a3dad207b5ec2b2c"},{url:"/images/goat/round-2/mobile/11.jpg",revision:"d9acc0b5bcd7a46d117bfe3c0e28452f"},{url:"/images/goat/round-2/mobile/2.jpg",revision:"d5435979c3f8a1167a95859684d4abb2"},{url:"/images/goat/round-2/mobile/3.jpg",revision:"eb384eb8cb162e30d23f76b5e03678ec"},{url:"/images/goat/round-2/mobile/4.jpg",revision:"2a28c6ee5f3822594e1874f3b1889e83"},{url:"/images/goat/round-2/mobile/5.jpg",revision:"5aae4e5d614fb457410b5d34c5a5fe46"},{url:"/images/goat/round-2/mobile/6.jpg",revision:"61862b01ae7a41aa39fc2ed715ed4e86"},{url:"/images/goat/round-2/mobile/7.jpg",revision:"21dde45d07ac5de09ccfb9163b48d791"},{url:"/images/goat/round-2/mobile/8.jpg",revision:"f0095a6a3036ec4c84b3fa6372665099"},{url:"/images/goat/round-2/mobile/9.jpg",revision:"fa554b5b30deaec9908859289ab6c006"},{url:"/images/goat/round-2/mobile/Round2DetailsMobile.png",revision:"fa0db5ae160562641747abeb70f63ebc"},{url:"/images/goat/round-2/mobile/land.jpg",revision:"13d237b78a735a68da722d419b43f04d"},{url:"/images/goat/round-2/mobile/land1.jpg",revision:"4415602693a0a0863d2c2e03f5bff3f5"},{url:"/images/goat/round-3/desk/1.jpg",revision:"250e83865f3427aeda5f94aa088f231f"},{url:"/images/goat/round-3/desk/1_1.jpg",revision:"caa86bdd03420eb8c5a55e09682aa1a4"},{url:"/images/goat/round-3/desk/2.jpg",revision:"78d23fd31bd6a396cac23ab501bd49f4"},{url:"/images/goat/round-3/desk/2_1.jpg",revision:"a7ee00bb6810e941ea9eabd6cc983950"},{url:"/images/goat/round-3/desk/3.jpg",revision:"71eea8901eae9012992b4c93b65f03e9"},{url:"/images/goat/round-3/desk/3_1.jpg",revision:"1a64503253359b47669af1d69915d1a8"},{url:"/images/goat/round-3/desk/4.jpg",revision:"636241d99c44fea50a4f8fa76263d3e5"},{url:"/images/goat/round-3/desk/4_1.jpg",revision:"599695f48955d258a878960360890d62"},{url:"/images/goat/round-3/desk/5.jpg",revision:"f7f819538b44913abb3a3fa45b80cb1e"},{url:"/images/goat/round-3/desk/5_1.jpg",revision:"c417c566f7023ec005be34c9c6adb8ff"},{url:"/images/goat/round-3/desk/6.jpg",revision:"0f14f8a7dc26b3963e5612bd8a2c91c0"},{url:"/images/goat/round-3/desk/6_1.jpg",revision:"40423f0c9001b8c2a4f676fe02fd6e18"},{url:"/images/goat/round-3/desk/7_1.jpg",revision:"b582b49a76917da231d61ab432952e77"},{url:"/images/goat/round-3/mob/10_1.jpg",revision:"b510db256405d24e80b3c795fc888e37"},{url:"/images/goat/round-3/mob/11_1.jpg",revision:"1a171c09a12c63511327e23253582b0d"},{url:"/images/goat/round-3/mob/12_1.jpg",revision:"f76f2247e392b08d1d6c0fc59a2e11e1"},{url:"/images/goat/round-3/mob/13_1.jpg",revision:"1f27c63ea2a12ce0a9a1370f847edf00"},{url:"/images/goat/round-3/mob/14_1.jpg",revision:"44c4b27b18a6fcefda87a62a7fc17c1c"},{url:"/images/goat/round-3/mob/1_1.jpg",revision:"3d8e0c912c0ed7cb122ece823afff7de"},{url:"/images/goat/round-3/mob/2_1.jpg",revision:"dfa5db3af1965b8d75332dfcdf415f06"},{url:"/images/goat/round-3/mob/3_1.jpg",revision:"336aeece15940474cbd7336a7e7a4183"},{url:"/images/goat/round-3/mob/4_1.jpg",revision:"d1ee0ff90fc2df784c6afb27fcaa5ca3"},{url:"/images/goat/round-3/mob/5_1.jpg",revision:"30dd5451ab974e60f264162768b85e2d"},{url:"/images/goat/round-3/mob/6_1.jpg",revision:"293e68bf81d83c4abf9dbfd068cb4af0"},{url:"/images/goat/round-3/mob/7_1.jpg",revision:"380ff378fdec4f1fe07e191fdc7545e7"},{url:"/images/goat/round-3/mob/8_1.jpg",revision:"23f05c033a876214dec3f690f77b0a33"},{url:"/images/goat/round-3/mob/9_1.jpg",revision:"17cd101b6b22ab85fe9b47fb1fa54791"},{url:"/images/goat/round-3/mob/land_2.jpg",revision:"6004d04f0d70faad5b73f06ae3cfbdc3"},{url:"/images/goat/round-3/refer/1.png",revision:"bca2ce5758345778b55a2f036b4d8e92"},{url:"/images/goat/round-3/refer/1_1.jpg",revision:"c56c89dde966280fb369ef92f013e1c8"},{url:"/images/goat/round-3/refer/2.png",revision:"e92448e9f1f56d539bb7ac43e69cf377"},{url:"/images/goat/round-3/refer/2_1.jpg",revision:"84f55741b7c8b5f5b5a0dfab99853474"},{url:"/images/goat/round-3/refer/3.png",revision:"7bca22f7894d514c5fb2ce7a13a4b235"},{url:"/images/goat/round-3/refer/3_1.jpg",revision:"0b4ac00ba04382cc23ba3dee33c40347"},{url:"/images/goat/round-3/refer/4.png",revision:"9e66617cc40e7f15e28872e4062d0b36"},{url:"/images/goat/round-3/refer/4_1.jpg",revision:"b1fae79ef31b22191d54095a515c3d73"},{url:"/images/goat/round-3/refer/5.png",revision:"eb9a874fab00fa3c0d918bd40a74bcb5"},{url:"/images/goat/round-3/refer/5_1.jpg",revision:"5850d73c79dee911baf0a12f7670ed71"},{url:"/images/goat/round-3/refer/6.png",revision:"a25270a0071d415539d5d5c24473fba5"},{url:"/images/goat/round-3/refer/6_1.jpg",revision:"7776d784cd44140fd5caf6d529d10210"},{url:"/images/goat/round-3/refer/7.png",revision:"a8c89a2844619d65fb127bb1e9ef8d51"},{url:"/images/goat/round-3/refer/7_1.jpg",revision:"33144cc5022195afdb390616a4ab23a6"},{url:"/images/goat/round-3/refer/8.png",revision:"eebc0840273a07cf50f773e4e1c8ba9e"},{url:"/images/goat/round-3/refer/8_1.jpg",revision:"1d891bae148489fa63727aa4f8621bbf"},{url:"/images/google-play.svg",revision:"3221477f501d0d46b6d98f797bd0b6bf"},{url:"/images/hashtag.png",revision:"46f6253481323670c9e0e860a3c6efce"},{url:"/images/hipi_screenshot.png",revision:"9a511078aafb89cb62894afd8f5df91b"},{url:"/images/hpm/hpm_banner.jpg",revision:"f04cae21a79171024ba588e4436d7aea"},{url:"/images/ic_close.svg",revision:"5b44ad88deff7acd63debbb968712619"},{url:"/images/instagram-de-link.jpg",revision:"3b66627609cb6a69f2a4a33e572d8d5f"},{url:"/images/lang/Bangla.webp",revision:"c65af52102d2c7c0cd55c4978f23e029"},{url:"/images/lang/Bhojpuri.webp",revision:"2e8ac2fd8451f85009db9d04ce198253"},{url:"/images/lang/English.webp",revision:"c86a634a082e06d93e5a1078316ad27a"},{url:"/images/lang/Gujaratii.webp",revision:"efe6a9f87b8a30b6d0662db55a77c139"},{url:"/images/lang/Hindi.webp",revision:"8329d8cd1fa7d57a96b55f4e411808a8"},{url:"/images/lang/Kannada.webp",revision:"2d14478f3efe79e67a40ae80b461b4ba"},{url:"/images/lang/Malayalam.webp",revision:"1c1691ec3f9ea1ea601552b11837a130"},{url:"/images/lang/Marathi.webp",revision:"4fcfb98812ff832fa16f4af27ca4c8ac"},{url:"/images/lang/Oriya.webp",revision:"95018f0391589c529e00952d0b2ec567"},{url:"/images/lang/Punjabi.webp",revision:"23f25a974c4c3754f9f027bbc988f05b"},{url:"/images/lang/Tamil.webp",revision:"58e796e274551cf6d87daff93bffb3c1"},{url:"/images/lang/Telugu.webp",revision:"49d90504d981fd6ff084961fcb7da9f7"},{url:"/images/lavreto/LavReToDesk.jpg",revision:"5f055f9803fc4a6299abb2d2cdac13b1"},{url:"/images/lavreto/LavReToMob.jpg",revision:"5bd86953fcf619c4f0528c2da077ad93"},{url:"/images/logo_hipi.png",revision:"26e1e6e50eb14190adf76920c660f329"},{url:"/images/mobile-switch-white.png",revision:"943d1473e35ad373e15c51e4646aa4d0"},{url:"/images/play.png",revision:"3204fe18b171a3be90e86424c8a2ddb4"},{url:"/images/reward/Chirag_Tomar.jpg",revision:"1c872d1ec425d12600870c2b6348e9c5"},{url:"/images/reward/Get Assured Gifts.png",revision:"8c52e9570e04c15022f3b88bdd6a0138"},{url:"/images/reward/Get Cash Rewards.png",revision:"07fbaba5e07c04b7347b4ebcd99975d8"},{url:"/images/reward/Sara_Gurpal.jpg",revision:"02af347f5335b53fd62a668d73deaf7d"},{url:"/images/reward/Shine_with_Hipi_1.png",revision:"d62fe095c226b78d5df48f48acd6ee21"},{url:"/images/reward/Sid_Patil.png",revision:"f78e837bf82e8b903e0f1e74df51e702"},{url:"/images/rewards/hipi_rewards_bg_1.webp",revision:"c63dac696cb0020bed9dd160991b00e5"},{url:"/images/rewards/hipi_rewards_bg_2.webp",revision:"f51be41ecc720b780457a1565a3604bb"},{url:"/images/rewards/hipi_rewards_sec_1.webp",revision:"7e0fcd9696e86b8ea22cf02736d8046e"},{url:"/images/rewards/rewards_mob.webp",revision:"67e8ae555dbe85dcde83119a789125e1"},{url:"/images/rewards/rewards_web.webp",revision:"1d309610e46bccee0c6bf2fc7c60aa3b"},{url:"/images/shop.png",revision:"ff8453fa71d7cd27374e8927e965d06a"},{url:"/images/sph/sahipakdehain.png",revision:"b3296770fb721bfc6f130a0d752ee186"},{url:"/images/stunner/Desk-Hipi-Stunner.webp",revision:"e79d8fd48dbe463add809bf3ad62134c"},{url:"/images/stunner/Mob-Hipi-Stunner.webp",revision:"1d5a1ae5cf490c55321c7e1a61cf224b"},{url:"/images/stunner/hipistunner_bg_left.png",revision:"990c3f3121730e20abcbfe6b870be4c3"},{url:"/images/stunner/hipistunner_bg_right.png",revision:"73dadb6833d7d4edb0b15a545b6991da"},{url:"/images/stunner/hipistunner_challenge-1.jpg",revision:"23928a699d3a81d65edd357ebe07d955"},{url:"/images/stunner/hipistunner_challenge-2.jpeg",revision:"f203a05981d23a13704958f504300ffe"},{url:"/images/stunner/hipistunner_challenge-2.jpg",revision:"0cc3bff4eb10a571439352db42920ccf"},{url:"/images/stunner/hipistunner_challenge-Dec-1.jpeg",revision:"296e06eebc52d46534891278c689597b"},{url:"/images/stunner/hipistunner_challenge-Dec-2.jpeg",revision:"2dc8e55ba8d2e2f219aa009a2b224b93"},{url:"/images/stunner/hipistunner_challenge-Nov-1.jpg",revision:"9e1c23e18b7ed86143369467a73cc2c2"},{url:"/images/stunner/hipistunner_challenge-Nov-2.jpg",revision:"cb50040a4556e931a91ab20baa38cbb9"},{url:"/images/stunner/hipistunner_challenge-Oct-1.jpg",revision:"3b924b87c0d9e29811e967e7f851ddf9"},{url:"/images/stunner/hipistunner_challenge-Oct-2.jpg",revision:"aaeaafadac5904e2ed146b4022916af3"},{url:"/images/stunner/hipistunner_challenge-Sept-1.jpg",revision:"99ccb745f159e45816af241ddb11defb"},{url:"/images/stunner/hipistunner_challenge-Sept-2.jpg",revision:"b29690d9a6f57f20546f30b273ead88a"},{url:"/images/stunner/hipistunner_thehost.jpg",revision:"24bef89c39d0fcbb71d199a9f7b4099c"},{url:"/images/supermoms_banner_hipi.png",revision:"d05dee56cec162351d0318cc8a57f754"},{url:"/images/users.png",revision:"9698eb319a3c20b3b0968003033e1f78"},{url:"/images/video-player.webp",revision:"ea41b63f9f014480fee3445b37c8733e"},{url:"/images/video.png",revision:"05d816b7b5ab269bac9f9a8a14356fbb"},{url:"/images/zee5_logo_v01.png",revision:"eb9d86d5ca2ccf8339c7031c6bef6b86"},{url:"/languages.json",revision:"c24bbf631d3ca058717bebbddaf24420"},{url:"/manifest.json",revision:"e65e8bb35d1354a47354a9c3b3404b0c"},{url:"/newrelic.js",revision:"cadc22eaf316fdda2e5eade2aada4c09"},{url:"/rewards-FAQ.json",revision:"3ce59c241fe6be9d9c2481873fe02c11"},{url:"/robots.txt",revision:"01e32ee50534bb9316aa8fc4f94c7d6f"},{url:"/static/image/public/icons/apple-icon-152x152-dunplab-manifest-17016.822f1c3da8df1ee9d1eeb35f622ea109.png",revision:"9d1ddb7adb816758a849a6fcf3d93b48"},{url:"/static/image/public/images/fallback-charms.65f9f66f8e6d1c6b4c2b839206eb5a48.png",revision:"44947fb69a6f267b36e189c210e2a763"},{url:"/static/image/public/images/shop.3942ba5c3af49edaedeaefed7cf96733.png",revision:"ff8453fa71d7cd27374e8927e965d06a"},{url:"/static/image/public/images/users.d0b26f68f770bc8c1c4d90a8a410964d.png",revision:"9698eb319a3c20b3b0968003033e1f78"},{url:"/static/image/public/images/video.c626347fad154f3ee40bc6e32b9fcc7d.png",revision:"05d816b7b5ab269bac9f9a8a14356fbb"},{url:"/stunner-FAQ.json",revision:"f485c27b6c25dfe808cea7fcf67b025b"},{url:"/stunnerData.json",revision:"79ed56974690183a4206677f54362004"},{url:"/videos/stunner/august.mp4",revision:"917517fae81adf9c9c2c78160fe43243"},{url:"/videos/stunner/october.mp4",revision:"184a5b9924f84e2ba1e6edda5ab03fd5"},{url:"/videos/stunner/september.mp4",revision:"94d2145f560d928a0b395b7a40c2f397"},{url:"/videos/v.mp4",revision:"de7d4e7750ac51076743b72834f246d7"},{url:"static/css/ae66ddfe18e60bc29538.css",revision:"ae66ddfe18e60bc29538"},{url:"static/css/b734f1e180e014fbc907.css",revision:"b734f1e180e014fbc907"},{url:"static/css/d1608ce62dbfa1878d6c.css",revision:"d1608ce62dbfa1878d6c"},{url:"static/css/d2b89a3375c9fc5a209e.css",revision:"d2b89a3375c9fc5a209e"},{url:"static/css/e0221b027d350ec0e554.css",revision:"e0221b027d350ec0e554"},{url:"static/css/ff7d888319cc84f6ae5f.css",revision:"ff7d888319cc84f6ae5f"},{url:"static/media/Background_home.a8491251438c9d8525be40aa12a72fb5.jpg",revision:"4fbd8d276ea5876bbcfb44116eaa2321"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
