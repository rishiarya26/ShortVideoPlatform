import EmbedIcon from "../commons/svgicons/embedicon-black";
import Share from "../commons/svgicons/share-black";
import Comment from "../commons/svgicons/comment-black";
import Like from "../commons/svgicons/like-black";
import Mute from "../commons/svgicons/mute";
import Close from "../commons/svgicons/close-white";
import UpArrow from "../commons/svgicons/up-arrow";
import DownArrow from "../commons/svgicons/down-arrow";
function VideoDetail() {
return (
<div className="flex w-screen h-screen">
   <div className="flex w-8/12 h-screen bg-black justify-center relative overflow-hidden">
      <div className="video_blur w-8/12">
         <img src="https://akamaividz2.zee5.com/image/upload/w_297,c_scale,f_auto,q_auto/v1632757116/hipi/videos/6d362fe8-1f36-450b-b100-14514e4b998e/6d362fe8-1f36-450b-b100-14514e4b998e_00.webp"/>
      </div>
      <video
      playsInline
      autoPlay
      // muted
      // webkit-playsinline = "true"
      // onLoadCapture ={resetCurrentTime}
      loop
      className="vdo_player"
      // width={size.width}
      // height={videoHeight}
      //poster={props.thumbnail}
      objectfit="cover"
      >
      <source
         src="https://z5shorts.akamaized.net/2021/8/27/6d362fe8-1f36-450b-b100-14514e4b998e/6d362fe8-1f36-450b-b100-14514e4b998e_1536.mp4?hdnea=st=1633927552~exp=1633941952~acl=/*~hmac=60edb50fe8cfc30c8240673177204f2bd3f85fca2385c78ed4b08de8d396d277"
         type="video/mp4"
         />
      </video>
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
               <div className="flex items-center">
                  <img alt="profile-pic" className="usrimg w-12 h-12 rounded-full  mr-4" src="https://akamaividz2.zee5.com/image/upload/w_300,c_scale,f_auto,q_auto/v1608725033/hipi/assets/user/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc/23a27eda-dcb2-4dfd-ade2-7ed7b32aa2bc.webp" />
                  <h3 className=" mb-1 mt-1.5 font-semibold text-sm ">@Princenarula</h3>
               </div>
               <div className="flex justify-end">
                  <button className="font-semibold text-sm border border-hipired rounded-sm py-1 px-9 mr-1 h-10 bg-hipired text-white">Follow</button>
               </div>
            </div>
            <div className="font-bold text-xs mb-3 mt-2">
               <span>#trending </span>
               <span>#couple </span>
               <span>#Lockdown </span><span>#PrinceNarula </span><span>#staronhipi </span><span>#FreshonHipi </span><span>#yuvikachaudhary </span>
            </div>
            <div className="w-8/12 my-1 text-sm">
               <svg className="float-left" width="20" height="20" viewBox="6 0 24 24" fill="none">
                  <path className="st0" fill="#000" d="M12,3v10.6c-0.6-0.3-1.3-0.6-2-0.6c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4V7h4V3H12z"></path>
               </svg>
               <span className=" my-1 text-sm w-4/12">
                  <p className="m-0 m-auto whitespace-nowrap overflow-hidden">
                     <span className="pl-100 inline-block animate-marquee">Princenarula1632602298674</span>
                  </p>
               </span>
            </div>
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
      <div className="container w-full h-full bg-white relative flex w-3/4">
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
            <div className="cmbd_body p-4 py-2 flex flex-col overflow-scroll">
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
                     <div className="cmbd_cat_tabs flex w-full py-4 overflow-x-scroll">
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
export default VideoDetail;