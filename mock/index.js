import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export default{
  init(){
    let mock = new MockAdapter(axios)
    //库存看台总数量卡片
    // mock.onGet('/stockTotal').reply(200,{
    //   code: 1001, msg: '请求成功', data:[
    //     {row1:[{
    //     name:'今日入库货数',num:5955211,icon:'../../../static/img/in_order_icon.png',path:'/inOrder'
    //     },{name:'今日出库货数',num:729422,icon:'../../../static/img/out_order_icon.png',path:'/outOrder'}]},
    //     {row2:[
    //       {name:'库内品牌数',num:675,icon:'../../../static/img/band_icon.png',path:'/brands'},
    //       {name:'库内规格型号数',num:4251,icon:'../../../static/img/spe_type_icon.png',path:'/species'},
    //     ]}
    //   ]
    // })
    mock.onGet('/stockTotal').reply(200,{
      code: 1001, msg: '请求成功', data:[{
        name:'今日入库货数',num:5955211,icon:'../../../static/img/in_order_icon.png',path:'/inOrder'},
        {name:'今日出库货数',num:729422,icon:'../../../static/img/out_order_icon.png',path:'/outOrder'},
        {name:'库内品牌数',num:675,icon:'../../../static/img/band_icon.png',path:'/brands'},
       {name:'库内规格型号数',num:4251,icon:'../../../static/img/spe_type_icon.png',path:'/species'},
      ]
    })
    mock.onGet('/brandTypeData').reply(200,{
      code: 1001, msg: '请求成功', data:[
      {name:'MAYA',typeNum:5955211,boxNum:24,goodsNum:2465768787,shows:true},
      {name:'MAYA',typeNum:5955211,boxNum:24,goodsNum:2465768787},
      {name:'MAYA',typeNum:5955211,boxNum:24,goodsNum:2465768787},
      {name:'MAYA',typeNum:5955211,boxNum:24,goodsNum:2465768787},
      {name:'MAYA',typeNum:5955211,boxNum:24,goodsNum:2465768787},
    ]
    })
    mock.onGet('/brandTypeData1').reply(200,{
      code: 1001, msg: '请求成功',
      data:[
      {name:'MAYA',typeNum:'发光二极管',boxNum:24},
      {name:'ODJFKD',typeNum:'发光二极管',boxNum:24},
      {name:'MAYA',typeNum:'发光二极管',boxNum:24},
      {name:'SGFGHGH',typeNum:'发光二极管',boxNum:24},
      {name:'MAYA',typeNum:'发光二极管',boxNum:24},
      ]
    })
    //
    const pwdData = [{prePwd:'1233',newPwd:''},{prePwd:'123333',newPwd:''},{prePwd:'123',newPwd:'12345'}]
    mock.onPost('/change').reply(config=>{
      let {prePwd,newPwd} = JSON.parse(config.data);
      return new Promise((resolve,reject)=>{
        let pwd = null;
        setTimeout(()=>{
          let hasPwd = pwdData.some(p=>{
            if(p.prePwd === prePwd && p.newPwd === newPwd){
              pwd = JSON.parse(JSON.stringify(p));
              pwd.newPwd = undefined;
              return true;
            }
            if(hasPwd){
              resolve([200,{code:200,msg:'success',pwd}])
            }else{
              resolve([200,{code:500,msg:'密码修改有误'}])
            }
          })
        },500)
      })
    })
    mock.onPost('/orderInfo').reply(config=>{
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          // isnormal 1是加急，2是异常，3是正常
            resolve([200,{code:200,msg:'success',data:{
              isNormal:1,
              curDate:'2019-06-13',
              cusInfo:[
                [
                  {name:'顾客公司',value:'OPPO'},
                  {name:'客户单号',value:'BWI19042345556'},
                  {name:'货物箱数',value:'42'},
                  {name:'货物件数',value:'236764857'},
                ],
                [
                  {name:'顾客公司',value:'OPPO'},
                  {name:'客户单号',value:'BWI19042345556'},
                  {name:'货物箱数',value:'42'},
                  {name:'货物件数',value:'236764857'},
                ],
                [
                  {name:'顾客公司',value:'OPPO'},
                  {name:'客户单号',value:'BWI19042345556'},
                  {name:'货物箱数',value:'42'},
                  {name:'货物件数',value:'236764857'},
                ],
                [
                  {name:'顾客公司',value:'OPPO'},
                  {name:'客户单号',value:'BWI19042345556'},
                  {name:'货物箱数',value:'42'},
                  {name:'货物件数',value:'236764857'},
                ]
                
              ],
              stage:[
                {name:'入仓申报', date:'2019-04-12',useTime:'23'},
                {name:'货物出库'}
              ],
              useTotalTime:'3小时13分钟'
            }}])
        },500)
      })
    })
  }
}