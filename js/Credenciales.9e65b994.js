"use strict";(self["webpackChunksolana_i_am_entity"]=self["webpackChunksolana_i_am_entity"]||[]).push([[606],{92469:(e,t,s)=>{s.r(t),s.d(t,{default:()=>w});var l=s(66252);const a={class:"flex flex-col"},i={class:"flex items-center justify-between"},n=(0,l._)("div",{class:"text-3xl font-bold text-gray-900 tracking-wide"},"Tus credenciales",-1),d={class:"flex items-center px-2"},o=(0,l._)("div",{class:"mr-3 hidden sm:block"},"Agregar credencial",-1),c=(0,l._)("hr",{class:"mt-3 dark:border-primary-400 border-t-2 rounded mb-8"},null,-1),r={key:1,class:"flex flex-wrap flex-row gap-4"},f=(0,l._)("div",{class:"text-xl font-semibold text-center mt-2"},"Sin credenciales disponibles",-1);function u(e,t,s,u,p,m){const g=(0,l.up)("nft-detail-modal"),b=(0,l.up)("font-awesome-icon"),x=(0,l.up)("v-primary-button"),k=(0,l.up)("v-spinner"),v=(0,l.up)("nft-card"),w=(0,l.up)("lottie-player");return(0,l.wg)(),(0,l.iD)(l.HY,null,[u.isVisibleModal?((0,l.wg)(),(0,l.j4)(g,{key:0,isVisible:u.isVisibleModal,"onUpdate:isVisible":t[0]||(t[0]=e=>u.isVisibleModal=e),nft:u.selectedNft,"onUpdate:nft":t[1]||(t[1]=e=>u.selectedNft=e)},null,8,["isVisible","nft"])):(0,l.kq)("",!0),(0,l._)("div",a,[(0,l._)("div",i,[n,(0,l.Wm)(x,{onClick:t[2]||(t[2]=t=>e.$router.push("/credentials/create")),class:"rounded-full flex flex-col items-center",style:{"min-width":"40px",height:"40px"}},{default:(0,l.w5)((()=>[(0,l._)("div",d,[o,(0,l.Wm)(b,{icon:"fa-solid fa-plus"})])])),_:1})]),c,u.isLoadingNfts?((0,l.wg)(),(0,l.j4)(k,{key:0,class:"self-center"})):u.nfts.length?((0,l.wg)(),(0,l.iD)("div",r,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(u.nfts,(e=>((0,l.wg)(),(0,l.j4)(v,{onClick:()=>u.manageNftClick(e),key:e.metadataAddress?e.metadataAddress.toBase58():e.address.toBase58(),nft:e},null,8,["onClick","nft"])))),128))])):((0,l.wg)(),(0,l.iD)(l.HY,{key:2},[(0,l.Wm)(w,{class:"self-center mt-4",src:"https://assets4.lottiefiles.com/private_files/lf30_e3pteeho.json",background:"transparent",speed:"1",style:{width:"300px",height:"300px"},loop:"",autoplay:""}),f],64))])],64)}s(70886);var p=s(2262),m=s(33907),g=s(92585),b=s(79640);s(63015);const x={components:{NftCard:g.Z,NftDetailModal:b.d2},setup(){const e=(0,m.oR)(),t=(0,p.iH)(!1),s=(0,p.iH)(!1),a=(0,p.iH)(null),i=(0,l.Fl)((()=>e.getters.nftsModels));async function n(){t.value=!0,await e.dispatch("getNftFromCreator",!0),t.value=!1}(0,l.bv)((()=>{n()}));const d=e=>{a.value=e,s.value=!0};(0,l.YP)(s,(e=>{e||(a.value=null)}));const o=e=>{"metadata"!=e.model&&d(e)};return{nfts:i,isLoadingNfts:t,setSelected:d,selectedNft:a,isVisibleModal:s,manageNftClick:o}}};var k=s(83744);const v=(0,k.Z)(x,[["render",u]]),w=v}}]);
//# sourceMappingURL=Credenciales.9e65b994.js.map