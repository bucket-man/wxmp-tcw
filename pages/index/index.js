const shareTitle = '还在纠结中午吃什么吗？快来看看吧，一秒解决你的选择困难症。'
const shareImageURL = '../../images/eat.jpeg'
const items = [
  {
    name: '浏阳蒸菜',
    imgURL: '/images/0.jpeg'
  },
  {
    name: '驴肉火烧',
    imgURL: '/images/1.jpeg'
  },
  {
    name: '螺狮粉',
    imgURL: '/images/2.jpeg'
  },
  {
    name: '麻辣烫',
    imgURL: '/images/3.jpeg'
  },
  {
    name: '麻辣香锅',
    opeimgURL: '/images/4.jpeg'
  },
  {
    name: '木桶饭',
    imgURL: '/images/5.jpeg'
  },
  {
    name: '牛肉粿条',
    imgURL: '/images/6.jpeg'
  },
  {
    name: '轻食沙拉',
    imgURL: '/images/7.jpeg'
  },
]
const coupons = [
  {
    title: '饿了么红包',
    qrcode: 'https://img.alicdn.com/imgextra/i4/6000000003090/O1CN01kRwvGK1YhGV5bS4G5_!!6000000003090-0-o2oad.jpg',
    we_app_info: {
      app_id: 'wxece3a9a4c82f58c9',
      page_path: 'pages/sharePid/web/index?scene=https://s.click.ele.me/e6cDmru'
    }
  },
  {
    title: '美团红包',
    qrcode: 'https://p0.meituan.net/poiqrcode/2c788c3e84edee8734a9a8e420a6af36102707.jpg',
    we_app_info: {
      app_id: 'wxde8ac0a21135c07d',
      page_path: '/index/pages/h5/h5?weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D1%26p%3DOWMpZ-uzIFOVe6JyOONs3dXuqV0qcAf-r-KCvHdXiNfM3oMXlDSgQ1lHQ7sc1bHIMXeq2XWRYP9S3VMvpbQU5suS6wIbvlY8ysKwoMucfvPFZjzPr32XyWNDU8md9oinzGc2LSfMP_9sKnNfN2qJuzdZ9SlFtLcK3uI9fsEFnkSl0D84qvIL22hipoIHsQESN-etfwt3dnyNeq1XDNZxfwx1P2fT0w-tHdPPPOQMzIVXC8mO3v3cLMh5lcsf7d9OoF2FZb54P3qxDuw4UodrfNKJARe6_KMxzkuP347Qm3qeq4UtpYRGeF1szNturL6DdBqS_ig0Iv6LfQ0ui5SD3-wnoxurm_JdFOis_KrNEu48Ef4bU2qSYK4kH3tinGFfdWU7KILbOP8zrBVzQ9MC_7N85DA3-kzECdvcftPlzTXTjXQUvKfUlro1ygAR8N3D9Zu2dejoz2EdZ5BDBtJzmWqeQAvtLwA-ObGUBdXy7tj0EH_Lv10RlTp0NdTJ2StU9uDcV4ezGUs_89xVmfDNltFNv2thbz4OVeUYPqCOMxVGpf5ss75r6lhSfccAR2LTRa377HK9k5EbhccXXa67nB5Ke7c4fr_GgqQh12jrpNbnZUBeBC90FzkfQGGwf7zjrtplwcteaa64yP09PlUc_zE_eOEVvUGpLreytv-hTU8JdZhNOMmZG4RFggYmEqncQ5pIKQEtAU9HN1Zq4ErgOYEErezSgeLVJqD3ztxIhzgqZ-WysziHQ6NGui0KX63M&lch=cps:waimai:5:a144a9fa40a42c55af00214bb4bb3993971:5916dingdanxiawxmpdff&f_token=1&f_userId=1'
    }
  }
]

Page({
  data: {
    luckyNum: 0,
    prizes: [],
    blocks: [
      { padding: '16px', background: '#fff', borderRadius: 28 },
      { padding: '1px', background: '#f5f5f5', borderRadius: 23 },
      { padding: '6px', background: '#eee', borderRadius: 20 },
    ],
    buttons: [{
      x: 1,
      y: 1,
      background: '#fff',
      borderRadius: 15,
      shadow: '0 5 1 #ebf1f4',
      fonts: [
        { text: '干饭', fontColor: '#f2a057', top: '70%', fontSize: '16px' },
      ],
      imgs: [
        { src: '/images/eat.jpeg', width: '80%', top: '0' }
      ]
    }],
    defaultConfig: {
      gutter: 6,
    },
    defaultStyle: {
      borderRadius: 15,
      fontColor: '#323232',
      fontSize: '14px',
      textAlign: 'center',
      background: '#fff',
      shadow: '0 5 1 #ebf1f4'
    },
    activeStyle: {
      background: 'linear-gradient(270deg, #FFDCB8, #FDC689)',
      shadow: ''
    },

    activeIndex: null,

    showEatRes: false,
    showResult: false,

    allProducts: [],
    isAll: false,
    couponList: [],

    userInfo: '',
    shareInfo: {
      title: shareTitle,
      imageUrl: shareImageURL
    }
  },
  start () {
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    // 调用play方法开始旋转
    child.$lucky.play()
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引
      const index = Math.random() * 6 >> 0
      // 调用stop方法然后缓慢停止
      child.$lucky.stop(index)
    }, 3000)
  },
  end (e) {
    // 中奖奖品详情
    this.setData({
      activeIndex: e.detail.index,
      showEatRes: true,
      showResult: true,
      ['shareInfo.title']: `中午我吃<${e.detail.fonts[0].text}>，快来试试吧！`,
      ['shareInfo.imageUrl']: e.detail.imgs[0].src
    })
  },

  fetchPrizeList () {
    const data = items
    const prizes = []
    let axis = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]]
    for (let i = 0; i < 8; i++) {
      let item = data[i]
      prizes.push({
        index: i, x: axis[i][0], y: axis[i][1],
        fonts: [{ text: item.name, top: '70%' }],
        imgs: [{ src: item.imgURL, width: '55%', top: '8%' }]
      })
    }
    this.setData({
      luckyNum: 1,
      prizes: prizes
    })
  },

  fetchProducts() {
    this.setData({
      allProducts: this.data.allProducts.concat(items)
    })
  },

  fetchIndexConfigs(isRefresh) {
    if (isRefresh) {
      this.setData({
        couponList: coupons,
        prizes: [],
        allProducts: [],
        showResult: false,
        ['shareInfo.title']: shareTitle,
        ['shareInfo.imageUrl']: shareImageURL
      })
    } else {
      this.setData({
        couponList: this.data.couponList.concat(coupons)
      })
    }
    this.fetchPrizeList()
    this.fetchProducts()
  },

  handleCoupon(e) {
    const idx = e.currentTarget.dataset.key;
    const cInfo = this.data.couponList[idx];
    this.linkTo(cInfo.we_app_info.app_id, cInfo.we_app_info.page_path)
  },

  linkTo(appId, path) {
    wx.navigateToMiniProgram({
      appId: appId,
      path: path,
      success(res) {
        // 打开成功
      }
    })
  },

  handleShop(e) {
    const key = e.currentTarget.dataset.key
    console.log(key)
    const item = coupons[key].we_app_info

    this.linkTo(item.app_id, item.page_path)
    this.handleCloseResult()
  },

  handleCloseResult() {
    this.setData({ 
      showEatRes: false 
    });
  },

  wxShowShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onLoad() {
    this.fetchIndexConfigs()
  },

  onShareAppMessage: function () {
    return this.data.shareInfo;
  },

  onReachBottom() {
    console.log('more')
    this.fetchProducts();
  },

  onPullDownRefresh() {
    console.log('refresh')
    this.fetchIndexConfigs(true)
  }
})
