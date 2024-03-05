/**
 * 编辑器配置项
 */
// icon的svg源文件
export const icon = {
  deleteFile: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="3-2贴纸形状" transform="translate(-1084.000000, -467.000000)">
                <g id="编组-15" transform="translate(1084.000000, 467.000000)">
                    <circle id="椭圆形" stroke="#EEEEEE" fill="#FFFFFF" cx="10" cy="10" r="9.5"></circle>
                    <g id="编组-14" transform="translate(7.000000, 7.000000)" stroke="#666666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                        <line x1="6" y1="0" x2="0" y2="6" id="路径-2"></line>
                        <line x1="6" y1="0" x2="0" y2="6" id="路径-2" transform="translate(3.000000, 3.000000) scale(-1, 1) translate(-3.000000, -3.000000) "></line>
                    </g>
                </g>
            </g>
        </g>
    </svg>`,
  cloneFile: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="3-2贴纸形状" transform="translate(-1084.000000, -557.000000)">
                <g id="编组-15备份-2" transform="translate(1084.000000, 557.000000)">
                    <circle id="椭圆形" stroke="#EEEEEE" fill="#FFFFFF" cx="10" cy="10" r="9.5"></circle>
                    <g id="编组" transform="translate(10.500000, 9.500000) rotate(180.000000) translate(-10.500000, -9.500000) translate(6.000000, 5.000000)" stroke="#666666" stroke-width="1.3">
                        <rect id="矩形" x="3" y="-5.00222086e-12" width="6" height="6" rx="1"></rect>
                        <path d="M5.5,8.5 L2.5,8.5 C1.3954305,8.5 0.5,7.6045695 0.5,6.5 L0.5,3.5 L0.5,3.5" id="路径-3" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>`,
  rotateFile: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="3-2贴纸形状" transform="translate(-1174.000000, -467.000000)">
                <g id="编组-15备份" transform="translate(1174.000000, 467.000000)">
                    <circle id="椭圆形" stroke="#EEEEEE" fill="#FFFFFF" cx="10" cy="10" r="9.5"></circle>
                    <g id="编组" transform="translate(4.000000, 5.000000)" fill="#666666" fill-rule="nonzero">
                        <path d="M5.89053289,8.86248149 C5.78793375,8.86099646 5.68542826,8.85585178 5.58323027,8.84705819 C5.54163406,8.84381118 5.50003785,8.83731715 5.45844164,8.83244663 C5.37864482,8.82189384 5.29884801,8.81215281 5.220749,8.79754125 C5.17236157,8.78861197 5.12567195,8.77724742 5.07898232,8.76588286 C5.0028328,8.74980303 4.9272417,8.73139385 4.85232541,8.71068365 C4.81582261,8.70013086 4.78101762,8.68795456 4.74536373,8.67659002 C4.65930842,8.64995693 4.57435548,8.62017066 4.49069304,8.58729717 C4.47201719,8.57999139 4.45419024,8.57106211 4.43551439,8.56294457 C4.3383225,8.5228512 4.24288299,8.47897999 4.14943432,8.43144055 L4.1358519,8.42494653 C3.82218017,8.2604431 3.53438771,8.054386 3.28100729,7.81288463 L3.26827377,7.79989658 C3.18996914,7.72487738 3.1154635,7.64631807 3.04501246,7.56448816 L3.00002065,7.50928895 C2.46694945,6.87445039 2.17645561,6.0846347 2.17658543,5.27047366 L3.16555659,5.27047366 L1.58235384,3 L0,5.27047366 L0.989820051,5.27047366 C0.989820051,6.26568307 1.31410072,7.18783469 1.8650383,7.95007092 C1.87182952,7.96143546 1.87607403,7.97280001 1.88371415,7.98254104 C1.94143951,8.0612811 2.00425828,8.13352713 2.06537924,8.20658493 L2.13329142,8.29100726 C2.22412397,8.39572342 2.32004993,8.49394555 2.41852259,8.59054418 C2.42786051,8.59866172 2.43634954,8.60921451 2.44568746,8.61814379 C2.77675934,8.93472752 3.15027634,9.20098257 3.55774944,9.41366191 C3.68573921,9.48028151 3.8165843,9.5417578 3.94994229,9.59792988 L4.04077484,9.63770579 C4.14518982,9.67829345 4.2521515,9.71482234 4.35996209,9.74972773 C4.41089623,9.76596279 4.46183037,9.7830096 4.5136134,9.79843292 C4.60869046,9.82522078 4.70461642,9.84713811 4.80224017,9.86905544 C4.86675674,9.883667 4.93042441,9.89909031 4.9957899,9.91126661 C5.02380367,9.91694889 5.04927074,9.92425467 5.07643561,9.92831343 C5.16811706,9.94454849 5.26064741,9.95266603 5.35232886,9.96321882 L5.45080152,9.97620686 C6.62665383,10.0897546 7.80592292,9.79436635 8.77255613,9.14415986 C9.02089143,8.95783189 9.07354259,8.61835548 8.8924498,8.37112696 C8.71135701,8.12389843 8.35972479,8.05520481 8.09173651,8.21470245 C7.43808175,8.65304917 6.6732208,8.87222253 5.89053289,8.86248149 L5.89053289,8.86248149 Z M10.1505549,2.05485966 C10.1421138,2.04186963 10.1370491,2.02887961 10.1277639,2.01670146 C10.0602351,1.92333565 9.98679752,1.83727674 9.91251583,1.75040594 L9.88719254,1.71793087 C9.39423263,1.14096523 8.7646649,0.686054494 8.05125316,0.391324517 L7.99216545,0.366156338 C7.87820128,0.321978664 7.76277904,0.281363535 7.64608033,0.244374855 C7.60387483,0.230572948 7.56335755,0.215959174 7.51946382,0.203781024 C7.41769604,0.174742084 7.31493738,0.149017987 7.21136365,0.126652741 C7.15396417,0.11447459 7.09572058,0.100672695 7.0383211,0.0893064223 C7.00962136,0.0836232861 6.98176573,0.0755045154 6.95391009,0.0706332574 C6.87625196,0.0576432287 6.79774972,0.0519600926 6.72009161,0.0422175766 C6.66606856,0.0357225623 6.61373374,0.0276038026 6.55971069,0.0227325447 C6.42946244,0.0114180483 6.2988105,0.00491824536 6.16804362,0.00324750162 C6.14440854,0.00324750162 6.12161757,0 6.09798249,0 L6.08616495,0.00162374526 C5.08119056,0.00132023614 4.10065368,0.299616885 3.2786549,0.855717927 C3.0929312,0.966898896 2.98627111,1.16767518 3.0014242,1.37757525 C3.01657729,1.58747533 3.15106361,1.77214696 3.35098078,1.8575734 C3.55089796,1.94299984 3.78352754,1.9152002 3.95563116,1.78531663 C4.68276112,1.29329583 5.5694501,1.06885183 6.45419694,1.15286476 C6.48796134,1.15611227 6.52172575,1.16098353 6.55380192,1.16504291 C6.64243348,1.17559731 6.73106504,1.18777546 6.81800837,1.20401299 C6.85599333,1.21131988 6.89397827,1.22025052 6.93111912,1.22836929 C7.01637424,1.24704245 7.10162935,1.26733936 7.18435213,1.29088379 L7.26369848,1.31686383 C7.35823881,1.34690327 7.45193502,1.37856645 7.54394301,1.41510091 L7.57179864,1.42727906 C8.12131429,1.6546045 8.60414524,2.00533519 8.98061833,2.44374855 L8.98737121,2.45186731 C9.53658777,3.09320737 9.83679529,3.89830288 9.83654593,4.72918117 L8.85146949,4.72918117 L10.4257347,7 L12,4.72836929 L11.0166118,4.72836929 C11.0171856,3.7729937 10.715085,2.84012881 10.1505549,2.05404778 L10.1505549,2.05485966 Z" id="形状"></path>
                    </g>
                </g>
            </g>
        </g>
    </svg>`,
  zoomFile: `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="3-2贴纸形状" transform="translate(-1174.000000, -557.000000)">
                <g id="编组-15备份-3" transform="translate(1174.000000, 557.000000)">
                    <circle id="椭圆形" stroke="#EEEEEE" fill="#FFFFFF" cx="10" cy="10" r="9.5"></circle>
                    <g id="编组" transform="translate(9.500000, 10.500000) rotate(90.000000) translate(-9.500000, -10.500000) translate(5.000000, 6.000000)" stroke="#666666" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3">
                        <g id="编组-16" transform="translate(0.500000, 0.500000)">
                            <path d="M5,7.5 L1,7.5 C0.44771525,7.5 6.76353751e-17,7.05228475 0,6.5 L0,2.5 L0,2.5" id="路径-3"></path>
                            <path d="M7.5,5 L3.5,5 C2.94771525,5 2.5,4.55228475 2.5,4 L2.5,-9.09494702e-13 L2.5,-9.09494702e-13" id="路径-3备份" transform="translate(5.000000, 2.500000) rotate(180.000000) translate(-5.000000, -2.500000) "></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>`,
  zoomX: `<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
    <rect x="4" y="4" width="4" height="16" rx="2" fill="white"/>
    <rect x="4.25" y="4.25" width="3.5" height="15.5" rx="1.75" stroke="black" stroke-opacity="0.3" stroke-width="0.5"/>
    </g>
    <defs>
    <filter id="filter0_d" x="0" y="0" width="12" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.137674 0 0 0 0 0.190937 0 0 0 0 0.270833 0 0 0 0.15 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>
    </svg>
    `,
  zoomY: `<svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
    <rect x="20" y="4" width="4" height="16" rx="2" transform="rotate(90 20 4)" fill="white"/>
    <rect x="19.75" y="4.25" width="3.5" height="15.5" rx="1.75" transform="rotate(90 19.75 4.25)" stroke="black" stroke-opacity="0.3" stroke-width="0.5"/>
    </g>
    <defs>
    <filter id="filter0_d" x="0" y="0" width="24" height="12" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feOffset/>
    <feGaussianBlur stdDeviation="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.137674 0 0 0 0 0.190937 0 0 0 0 0.270833 0 0 0 0.15 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    </defs>
    </svg>
    `,
};

// 删除图标
const zoomXIcon = `data:image/svg+xml,${encodeURIComponent(icon.zoomX)}`;

export const zoomXImg = document.createElement('img');
zoomXImg.src = zoomXIcon;

// 删除图标
const zoomYIcon = `data:image/svg+xml,${encodeURIComponent(icon.zoomY)}`;

export const zoomYImg = document.createElement('img');
zoomYImg.src = zoomYIcon;

// 删除图标
const deleteIcon = `data:image/svg+xml,${encodeURIComponent(icon.deleteFile)}`;

export const deleteImg = document.createElement('img');
deleteImg.src = deleteIcon;

// 复制图标
const cloneIcon = `data:image/svg+xml,${encodeURIComponent(icon.cloneFile)}`;

export const cloneImg = document.createElement('img');
cloneImg.src = cloneIcon;

// 旋转图标
const rotateIcon = `data:image/svg+xml,${encodeURIComponent(icon.rotateFile)}`;

export const rotateImg = document.createElement('img');
rotateImg.src = rotateIcon;

// 缩放图标
const zoomIcon = `data:image/svg+xml,${encodeURIComponent(icon.zoomFile)}`;

export const zoomImg = document.createElement('img');
zoomImg.src = zoomIcon;

// 配置信息
export const config = {
  controlsBorderColor: '#4A90E2',
  controlsBorderWidth: 2,
};

// 控制栏的四个角坐标
export const controlsPostionMap = {
  topLeft: {
    x: -0.5,
    y: -0.5,
  },
  topRight: {
    x: 0.5,
    y: -0.5,
  },
  bottomLeft: {
    x: -0.5,
    y: 0.5,
  },
  bottomRight: {
    x: 0.5,
    y: 0.5,
  },
};
