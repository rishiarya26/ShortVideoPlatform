/*eslint-disable @next/next/no-img-element */

import EmbedIcon from "../commons/svgicons/embedicon-black";
import Share from "../commons/svgicons/share-black";
import Comment from "../commons/svgicons/comment-black";
import Like from "../commons/svgicons/like-black";
import Mute from "../commons/svgicons/mute";
import Close from "../commons/svgicons/close-white";
import UpArrow from "../commons/svgicons/up-arrow";
import DownArrow from "../commons/svgicons/down-arrow";
import { withRouter } from "next/router";
import VideoInfo from "../desk-video-info";

function VideoDetail({url,firstFrame,
userProfilePicUrl, userName, music_title, likesCount, muted, unMute,firstName, lastName,
description, updateActiveIndex, index, router}) {
return (
<div className="flex w-screen h-screen">
   <div className="flex w-8/12 h-screen bg-black justify-center relative overflow-hidden">
      {/* <div className="video_blur w-8/12">
         <img src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1632757116/hipi/videos/6d362fe8-1f36-450b-b100-14514e4b998e/6d362fe8-1f36-450b-b100-14514e4b998e_00.webp"/>
      </div> */}
       <video playsinline="" autoPlay="" preload="auto" importance="high" loop="" className="" src="https://z5shorts.akamaized.net/2022/0/21/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8_1536.mp4?hdnea=st=1643353521~exp=1643367921~acl=/*~hmac=d664de68e5020f873bc6875de493f8173c800751822d4472926f736d25645b29" type="video/mp4"  poster="https://akamaividz2.zee5.com/image/upload/w_300/v1642760371/hipi/videos_ff/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8/807dc125-ef6c-49ac-b92e-8d12b4f0e3b8.webp" objectfit="cover"></video>
      <div className="absolute right-4 bottom-6 cursor-pointer">
         <Mute/>
      </div>
      <div className="absolute right-4 top-1/2 -mt-16  bg-gray-300 p-2 bg-opacity-30 rounded-full cursor-pointer">
         <UpArrow/>
      </div>
      <div className="absolute right-4 top-1/2  bg-gray-300 p-2 bg-opacity-30 rounded-full cursor-pointer">
         <DownArrow/>
      </div>
      <div className="absolute left-4 bg-gray-300 p-2 bg-opacity-30 rounded-full top-6 cursor-pointer">
         <Close/>
      </div>
   </div>
   <div className="flex w-4/12 h-screen overflow-hidden bg-white flex-col">
      <div className="head-sec flex ">
         <div className="videoFooter__text w-full p-6 pb-2">
            <div className="flex justify-between items-center pb-2">
            <div className="avatar">
                  <div className="flex items-center w-16 h-16 overflow-hidden rounded-full">
                     <img alt="profile-pic" className="usrimg" src={userProfilePicUrl} />    
                  </div>
               </div>
               <div className="flex justify-end">
                  <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 h-10 bg-hipired text-white">Follow</button>
               </div>
            </div>
            <VideoInfo
               userName={userName}
               firstName={firstName}
               lastName={lastName}
               description={description}
               music_title={music_title}
            />
         </div>
      </div>
      <div className="flex px-6 py-2 justify-between border-b-2 border-gray-100">
         <div className="flex">
            <div className="pr-4">
               <Like />
            </div>
            <div className="pr-4">
               <Comment />
            </div>
            <div className="pr-4">
               <Share />
            </div>
         </div>
         <div>
            <EmbedIcon />
         </div>
      </div>
      <div className="container w-full h-full bg-white relative flex w-full">
         <div className="cmbd_iframe flex flex-col bg-white box-border h-full w-full pb-48">
            <div className="cmbd_tabs flex w-full justify-around px-4 py-2 items-center">
               <div className="cmbd_look_tab flex justify-center cursor-pointer">
                  In this video
                  <span className="flex justify-center items-center text-sm rounded-full bg-black text-white p-1 px-2 ml-2"> 10</span>
               </div>
               {/* <div class="cmbd_tab_pipe">
                  |
               </div>
               <div class="cmbd_look_tab">
                  Top Looks 
                  <span> 10</span>
               </div> */}
            </div>
            <div className="cmbd_body thin_bar p-4 py-2 flex flex-col overflow-scroll w-3/4">
               <div className="cmbd_charm_card relative flex p-2 rounded-sm mb-2 shadow flex-col">
                  <div className="cmbd_tab_charm flex flex-col relative p-2 rounded-sm" id="Media_charm_2257127" data-title="Sarla Arora">
                     <div className="cmbd_tab_charm_title mb-1">
                        <p className="cmbd_charm_title text-left w-full text-black text-sm">
                           Sarla Arora featuring 
                           <span className="cmbd_title_bond font-semibold ml-1 text-sm">
                           Supriya Shukla
                           </span>
                        </p>
                     </div>
                     <div className="cmbd_tab_charm_disp flex w-full">
                        <div className="cmbd_disp_img  h-16 w-16 flex rounded-sm overflow-hidden">
                           <img className="charm-card-img " data-src="https://assets2.charmboard.com/ik-seo/im/lc/2257127/2257127.jpg?tr=cm-extract:w-150" id="charm-image_2257127" src="https://assets2.charmboard.com/ik-seo/im/lc/2257127/2257127.jpg?tr=cm-extract:w-150" />
                        </div>
                        <div className="cmbd_card_img flex flex-col w-44">
                           <div className="charm-related-products-wrapper-nm w-44">
                              <img className="cld-responsive" data-src="" data-width="200" src="https://assets2.charmboard.com/x_0,y_0,h_100,ar_1,r_5,bo_5px_solid_rgb:ffffff,g_north_west,q_auto:best,c_thumb,e_sharpen/l_im:lk:2257348/fl_layer_apply,h_100,ar_1,x_140,y_0,r_5,bo_5px_solid_rgb:ffffff,g_north_west,q_auto:best,c_thumb,e_sharpen/l_im:lk:2257349/fl_layer_apply,h_100,ar_1,x_280,y_0,r_5,bo_5px_solid_rgb:ffffff,g_north_west,q_auto:best,c_thumb,e_sharpen/w_200,dpr_2.0,r_5,bo_5px_solid_rgb:ffffff,g_north_west,q_auto:best,c_thumb,e_sharpen/im/lk/2257347.jpg" />
                           </div>
                           <a onClick="alert('added to look')" className="cmbd_add_to_my_looks text-blue-400 cursor-pointer text-xs pl-1">Add to my look</a>
                        </div>
                        <div className="cmbd_tab_charm_toggle flex w-12 justify-center items-center cursor-pointer">
                           <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                              <path d="M0 0h24v24H0z" fill="none"/>
                              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className="cmbd_collapse_body flex flex-col w-full ">
                     <div className="cmbd_cat_tabs no_bar flex w-full py-4 overflow-x-scroll">
                        <div className="cmbd_card_cat bg-black text-white rounded text-semibold flex justify-center px-4 py-1 mr-2 cursor-pointer">
                           All
                        </div>
                        <div className="cmbd_card_cat text-semibold flex justify-center px-4 py-1 mr-2 cursor-pointer text-black">
                           Outfit
                        </div>
                        <div className="cmbd_card_cat text-semibold flex justify-center px-4 py-1 mr-2 cursor-pointer text-black">
                           Accessories
                        </div>
                        <div className="cmbd_card_cat text-semibold flex justify-center px-4 py-1 mr-2 cursor-pointer text-black">
                           Cast
                        </div>
                        <div className="cmbd_card_cat text-semibold flex justify-center px-4 py-1 mr-2 cursor-pointer text-black">
                           Beauty
                        </div>
                        <div className="cmbd_card_cat text-semibold flex justify-center px-4 py-1 mr-2 cursor-pointer text-black">
                           Hair
                        </div>
                     </div>
                     {/* <!-- <div class="cat_title">
                        <p>All Style Inspiration from this charm</p>
                        </div> --> */}
                     <div className="cmbd_card_body flex flex-col w-full mx-2">
                        <div className="cmbd_card_wrapper w-full flex flex-col rounded-sm shadow mb-2">
                           <div className="cmbd_cmbd_card_img flex w-full">
                              <a className="flex w-full">
                              <img className="object-contain" src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/2257347/2257347.jpg" />
                              </a>
                           </div>
                           <div className="cmbd_card_content flex w-full p-4 flex-col">
                              <div className="cmbd_card_desc_wrapper flex">
                                 <div className="cmbd_card_desc flex flex-col w-3/4">
                                    <div className="cmbd_card_title text-sm font-semibold">Dupatta Bazaar White  Gold Toned Embroidered Dupatta 
                                    </div>
                                    <div className="cmbd_refer_dom mt-2 text-sm font-semibold text-gray-400 ">
                                       <span className="original-price">Myntra</span> 
                                    </div>
                                 </div>
                                 <div className="cmbd_refer_button flex w-1/4 justify-end">
                                    <div className="charm-item-product-url">
                                       <a target="_blank" href="https://www.myntra.com/dupatta/dupatta-bazaar/dupatta-bazaar-white--gold-toned-embroidered-dupatta/11414724/buy" rel="noreferrer">
                                       <button className="cmbd_refer_btn bg-red-400 text-xs text-white py-1 rounded px-2">BUY NOW</button>
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* <!-- hair and beauty card --> */}
                     <div className="cmbd_card_body flex flex-col w-full mx-2">
                        <div className="cmbd_card_wrapper w-full flex flex-col rounded-sm shadow mb-2">
                           <div className="cmbd_cmbd_card_img flex w-full">
                              <a className="flex">
                                 <div className="cmbd_hb_img flex w-full">
                                    <div>
                                       <img src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/2257347/2257347.jpg" />
                                    </div>
                                    <div>
                                       <img src="https://assets.charmboard.com/images/w_375,ar_0.75,c_fill,c_pad,q_auto:eco,e_sharpen/im/lk/2257347/2257347.jpg" />
                                    </div>
                                 </div>
                              </a>
                           </div>
                           <div className="cmbd_card_content flex w-full p-4 flex-col">
                              <div className="cmbd_hb_step py-2 flex w-1/4 justify-center  bg-black text-white rounded-sm mb-2 text-xs ">
                                 Step 1
                              </div>
                              <div className="cmbd_card_desc_wrapper flex">
                                 <div className="cmbd_card_desc flex flex-col w-3/4">
                                    <div className="cmbd_card_title text-sm font-semibold">Dupatta Bazaar White  Gold Toned Embroidered Dupatta 
                                    </div>
                                 </div>
                                 <div className="cmbd_refer_button flex w-1/4 justify-end">
                                    <div className="charm-item-product-url">
                                       <a target="_blank" href="https://www.myntra.com/dupatta/dupatta-bazaar/dupatta-bazaar-white--gold-toned-embroidered-dupatta/11414724/buy" rel="noreferrer">
                                       <button className="cmbd_refer_btn bg-red-400 text-xs text-white py-1 rounded px-2">BUY NOW</button>
                                       </a>
                                    </div>
                                 </div>
                              </div>
                              <div className="cmbd_refer_dom mt-2 text-sm font-semibold text-gray-400">
                                 <p className="original-price">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi <span className="cmbd_expand">more</span></p>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* <!-- hair and beauty card end --> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
);
}
export default withRouter(VideoDetail);