# iscroll-luo
[![npm version](https://badge.fury.io/js/iscroll-luo.svg)](https://badge.fury.io/js/iscroll-luo)

React组件、下拉刷新上拉加载更多、PC端移动端支持

依赖 iscroll5



## 1. 安装

````bash
npm install --save iscroll
npm install --save iscroll-luo
````

## 2. 使用

````bash
import React from 'react';
import IscrollLuo from 'iscroll-luo';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: [1, 2, 3],
	};
  }

  onDown() {
  	this.setState({
  		data: [1, 2, 3],
  	});
  }

  onUp() {
  	this.setState({
  		data: [...this.state.data, 1, 2, 3],
  	});
  }

  render() {
  	return (
		{/** 务必用一个具有高度的容器包裹iscroll-luo组件 **/}
  		<div style={{ height: '500px' }}>
  			<IscrollLuo
  				id='id'
  				onPullDownRefresh={() => this.onDown()}
            			onPullUpLoadMore={() => this.onUp()}
  			>
  				{
	  				this.state.data.map((v, i) =>
	  					<div key={i}>{v}</div>
	  				)
  				}						
  			</IscrollLuo>
  		</div>
  	);
  }
}
````

## 3. 参数

````bash
id  					# 必需 string	一个唯一的ID
onPullDownRefresh			# 可选 func	触发下拉刷新时的回调函数
onPullUpLoadMore			# 可选 func	触发上拉加载时的回调函数
className				# 可选 string	额外的class,会添加到iscroll-luo组件的包裹元素上
detectionHeight       			# 可选 bool 	是否自动检测容器高度变化 默认false
iscrollOptions: {			# 可选 object	iscroll的原生参数，初始化时会作为iscroll的options
	probeType: 3,			# 不要动此参数，必须设为3
	preventDefault: true,		# 默认禁止浏览器默认事件
	click: true,			# 默认开启了原生点击事件
}
options: {				# 可选 object	自定义参数
	backgroundColor: '#f5f5f5',	# 背景颜色，是滑动底层的背景颜色
	fontColor: '#888888', 		# 文字颜色，是下拉刷新、上拉加载那些文字的颜色
	beyondHeight: 30,		# 超过此长度后触发下拉或上拉,单位px
	pulldownInfo: '下拉刷新',	# 下拉刷新的文字
	pulldownReadyInfo: '松开刷新',	# 触发下拉刷新的文字
	pulldowningInfo: '刷新中…',	# 正在刷新中的文字
	pullupInfo: '加载更多',		# 上拉加载的文字
	pullupReadyInfo: '松开加载',	# 触发上拉加载的文字
	pullupingInfo: '加载中…',	# 正在加载中的文字
}
````

## 4. 特性

* 传入iscroll-luo中的数据改变时，即this.props.children改变时，<br/>iscroll-luo认为已经成功刷新或成功加载更多了，iscroll-luo会刷新内部状态
* 参数detectionHeight，设为true后，iscroll-luo会不停的检测容器的高度是否变化，<br/>如果变化了，则自动调用iscroll的refresh()方法
* 在部分安卓手机上如果存在滑不动，或滑动卡顿的现象，请自行设置touch-action:none（写点css通过设置className即可）;

## 5. 演示案例

http://isluo.com/iscroll-luo/index.html

## 6. 参考

iscroll官网： http://cubiq.org/iscroll-5 <br />
iscroll中文API文档： http://www.cnblogs.com/leolai/articles/4204345.html

