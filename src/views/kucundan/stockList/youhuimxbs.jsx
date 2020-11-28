import React, { Component } from 'react'
import { store} from 'store/index'
import { 
    saveyouhuimxbiao
    } from 'store/actionCreators'
export default class youhuimxbs extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    componentDidMount(){
        // console.log(this.props.item)
    }
    click(item){
        // console.log(item)
        const actionuid = saveyouhuimxbiao(item)
        store.dispatch(actionuid)
        this.props.history.push(`/shouyinmxb/${this.props.item.id}/${this.props.page}`)
    }
    render() {
        // console.log(this.props)
        let item = this.props.item
        return (
            <div className='caigoudan' onClick={()=>{this.click(item)}}>
                <div className='dan'>
                        <div className='dan-top'>
                            <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt=""/>
                            </p>
                            <div className='t-right'>
                            <div className='caigoudanhao'>零售单号：{item.orderno}</div>
                            {/* <div className='zuantai' style={{color:Color}}>{item.statusname}</div> */}
                            </div>
                        </div>
                        <div className='dan-footer'>
                            <p>单据日期：{item.createtime}</p>
                            <p>所属门店：{item.storeName}</p>
                            <p>优惠总额：{item.all_fee}</p>

                        </div>
                    </div>
                {/* <div className='dan'> */}
                    {/* <div className='dan-top'> */}
                        {/* <p>
                            <img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/danhao.png" alt="" />
                        </p> */}
                        {/* <div className='caigoudanhao'>零售单号：{item.orderno}</div> */}
                    {/* </div> */}

                    {/* <div className='conten'>
                            <ul>
                                <li style={{width:"6.5rem"}}>
                                    <article>
                                        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/sj.png" alt=""/></div>
                                        <span>单据日期</span>
                                    </article>
                                    <p>{item.createtime}</p>
                                </li>
                                <li>
                                    <article>
                                        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/ss.png" alt=""/></div>
                                        <span>所属门店</span>
                                    </article>
                                    <p>{item.storeName}</p>
                                </li>
                                <li style={{border:"none"}}>

                                    <article>
                                        <div><img src="https://dev.huodiesoft.com/addons/lexiangpingou/data/share/yh.png" alt=""/></div>
                                        <span>优惠总额</span>
                                    </article>
                                    <p>{item.all_fee}</p>
                                </li>
                            </ul>
                        </div> */}
                        {/* <p>单据日期：{item.createtime}</p>
                        <p>所属商家：{item.storeName}</p>
                        <p>收银员：{item.createName}</p>
                        <p>优惠总额：{item.all_fee}</p> */}
                {/* </div> */}
             </div>
        )
    }
}
