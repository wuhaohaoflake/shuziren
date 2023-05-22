import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Spin, message, Tooltip } from 'antd';
import { history, connect, useDispatch } from 'umi';
import { EditOutlined, DownCircleOutlined, UpCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import useModel from 'flooks';
import canvasModel from '@/models1/canvasModel';
import { Canvas, Layout } from '../../canvas-components';
import canvasDataModel from '@/models1/canvasDataModel';
import BackReplace from '@/components/BackReplace';
import Icon from '@/components/PageIcon';

const { SliderLeft } = Layout;

import { makeNewMovie, getMovie, getNewVideoDetail, getVoiceList, getModelsList, getTempByProduct, newInsertVideo } from '@/services/common';
const formRef = React.createRef<FormInstance>();
const { TextArea } = Input;
import './newIndex.less';
import { x64 } from 'crypto-js';
const initData: any = {
	id: 0,
	thumb: '',
	content: '',
	sperkerId: '743',
	sceneId: '195803445',
	width: 885,
	height: 500,
	footerVisible: true,
	nodes: [
		{
			id: 'bg',
			type: 'bg-image',
			url: 'https://gateway.irked.cn/bus/oss/all/png/2023-05-17/5e74f04cc0aa421cb381ef88aa185f8d.png',
			width: 885,
			height: 500,
		},
		{
			"x":664,
			"y":30,
			"id":"shuziren",
			"width":253,
			"height":483,
			"type":"shuziren-image",
			"url":"https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png",
			"name":"node",
			"draggable":true
		},
	],
};
const firstPage: any = {
	id: 0,
	thumb: '',
	content: '',
	sperkerId: '743',
	sceneId: '195803445',
	width: 885,
	height: 500,
	footerVisible: true,
	nodes: [
		{
			id: 'bg',
			type: 'bg-image',
			url: 'https://gateway.irked.cn/bus/oss/all/png/2023-05-17/5e74f04cc0aa421cb381ef88aa185f8d.png',
			width: 885,
			height: 500,
		},
		{
			"x":664,
			"y":30,
			"id":"shuziren",
			"width":253,
			"height":483,
			"type":"shuziren-image",
			"url":"https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png",
			"name":"node",
			"draggable":true
		},
		{
			"id":"5d240064-91d8-4819-853e-cba715d5582e",
			"fontSize":48,
			"fontFamily":"Microsoft YaHei",
			backgroundColor: '#000',
			"type":"text-input",
			"text":"双击编辑标题",
			"fill":"#ffffff",
			width:500,
			"x":112.5,
			"y":112,
			"name":"node",
			"draggable":true,
			"height": 48
		},
		{
			"id":"e56c92fa-465d-4c22-9094-f6b2aede22e8",
			"fontSize":28,
			"fontFamily":"Microsoft JhengHei",
			"type":"text-input",
			"text":"桐乡市普法局",
			"fill":"#ffffff",
			width:400,
			"x":222.5,
			"y":250,
			"name":"node",
			"draggable":true,
			"height": 28
		}
	],
};
const commonNode: any = [
	{
		id: 'bg',
		type: 'bg-image',
		url: 'https://gateway.irked.cn/bus/oss/all/png/2023-05-17/5e74f04cc0aa421cb381ef88aa185f8d.png',
		width: 885,
		height: 500,
	},
	{
		"x":664,
		"y":30,
		"id":"shuziren",
		"width":253,
		"height":483,
		"type":"shuziren-image",
		"url":"https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png",
		"name":"node",
		"draggable":true
	},
]
const AboutPage = (props: any) => {
  const { canvasRef } = useModel(canvasModel);
  const [movieVisible, setMovieVisible] = useState(false);
  const [soundsList, setSoundsList] = useState<any>([]);
  const [personList, setPersonList] = useState<any>([{cover: 'https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png', id: '195803445'}, {cover: 'https://gateway.irked.cn/bus/oss/all/png/2023-05-19/b0ee948429e9480f86cfd8657c7ad1fc.png', id: '195803446'}]);
  const [movieId, setMovieId] = useState<any>(null);
  const [movieUrl, setMovieUrl] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);
  const [movieLoading, setMovieLoading] = useState<boolean>(false);
  const [movieFlag, setMovieFlag] = useState<boolean>(false);
  const [spinText, setSpinText] = useState('');
  const [editId, setEditId] = useState(props.location.query.productId);
  const [videoName, setVideoName] = useState('');
  const [nameEdit, setNameEdit] = useState(false);
  const [footerVisible, setFooterVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pagesList, setPagesList] = useState([firstPage]);
  const [selectIndex, setSelectIndex] = useState(0);
  const [addLoading, setAddLoading] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  const { stageRef, setLoading } = useModel(canvasModel);
  const { nodes, setTemplate } = useModel(canvasDataModel);
  
  const dataListRef = useRef(pagesList);
  const selectIndexRef = useRef(selectIndex);
  const newCanvasRef = useRef(canvasRef);
  const footerVisibleRef = useRef(footerVisible);
  

  useEffect(() => {
	// getShuzirenList();
    
    // if (selectIndex > 0) {
    //   let dom: any = document.querySelector('#pageBox');
    //   setTimeout(() => {
    //     dom.scrollTo(0, selectIndex * 100);
    //   }, 200);
    // }
	getSoundsList();
	sessionStorage.setItem('textEdit', 'false');
	sessionStorage.setItem('sperkerId', '743');
	let query = props.location.query;
    if (query.token) {
		localStorage.setItem('token', query.token);
    }
	if (query.productName) {
		setVideoName(query.productName);
	}
	if (query.type == 'edit') {
		getDetailData({type: 'draf', productId: editId});
	} else {
		getDetailData({type: 'pros', productId: editId});
	}
    return () => {
      sessionStorage.clear();
	  clearInterval(timer);
	  setDataLoad(false);
    };
  }, []);

  useEffect(() => {
	if (canvasRef && dataLoad) {
		setTime();
	}
  }, [canvasRef, dataLoad]);

  useEffect(() => {
	dataListRef.current = pagesList;
  }, [pagesList])

  useEffect(() => {
	selectIndexRef.current = selectIndex;
  }, [selectIndex])
  
  useEffect(() => {
	newCanvasRef.current = canvasRef;
  }, [canvasRef])

  useEffect(() => {
	footerVisibleRef.current = footerVisible;
  }, [footerVisible])
  
  // 获取分拆模板信息
  const getTempList = (productId: string) => {
	getTempByProduct({productId: productId}).then(({data}) => {
		if (data && data.sucai && data.sucai.length > 0) {
			let list:any = [...data.sucai];
			let arr:any = [];
			list.map((i:any, index: number) => {
				arr.push({
					id: index,
					thumb: '',
					content: i.xcy,
					sperkerId: '743',
					sceneId: '195803445',
					width: 885,
					height: 500,
					footerVisible: true,
					nodes: [...commonNode, ...[
						{
							"id":`text-${index}-t`,
							"fontSize":28,
							"fontFamily":"Microsoft YaHei",
							"type":"text-input",
							"text": i.title,
							"fill":"#ffffff",
							width: 500,
							"x": 87.5,
							"y": 67,
							"name":"node",
							"draggable":true,
							'height': 30
						},
						{
							"id":`text-${index}-c`,
							"fontSize":20,
							"fontFamily":"Microsoft JhengHei",
							"type":"text-input",
							"text": i.ftyw,
							"fill":"#ffffff",
							width: 500,
							"x": 87.5,
							"y": 120.5,
							"name":"node",
							"draggable":true,
							'height': 243,
							'lineHeight': 1.5
						},
					]]
				});
			})
			setPagesList(arr);
			setSelectIndex(0);
			template(arr[0], 0);
			setDataLoad(true);
		} else {
			template(pagesList[0], 0);
			setDataLoad(true);
		}
	})
  }
  //   获取编辑详情
  const getDetailData = (params: any) => {
    getNewVideoDetail(params).then(({ data }) => {
		if (data && data.value) {
			let obj = JSON.parse(data.value);
			setPagesList(obj.list);
			setSelectIndex(0);
			template(obj.list[0], 0);
			setDataLoad(true);
		} else {
			getTempList(editId);
		}
    });
};
  const replaceAllThumb = (list:any) => {
	// 缩略图尺寸  159 * 90
	//默认画布尺寸 885 * 500  scale 5.6  增大的画布尺寸是 1062 * 600  scale 6.7
	// if (list.length > 0) {
	// 	list.map((i:any) => {
	// 		if (i.footerVisible) {

	// 		} else {

	// 		}
	// 	})
	// }

  }
  //   获取数字人列表
  const getShuzirenList = () => {
    getModelsList({}).then(({ data }) => {
      setPersonList(data);
    });
  };
  // 获取声音列表
  const getSoundsList = () => {
    getVoiceList({}).then(({ data }) => {
      setSoundsList(data);
    });
  };

  // 开启定时器
  const setTime = () => {
	setDataLoad(false);
    const meTime = setInterval(() => {
		saveByRealtime();
    }, 2000);
    setTimer(meTime);
  };

  // 获取视频
  const getMovieAction = (id: string) => {
    getMovie({ movieId: id }).then(({ data }) => {
      if (data) {
        setMovieUrl(data);
        setMovieId(null);
        setTimeout(() => {
          setMovieVisible(true);
        }, 300);
      }
    });
  };
  const changeName = (e:any) => {
	setVideoName(e.target.value);
	setNameEdit(false);
  }
  // 草稿保存
  const saveTemplate = () => {
	const templateData = newCanvasRef.current.getTemplate();
    let list: any = [...pagesList];
	let obj = {
		list: list,
		sceneId: sessionStorage.getItem('sceneId')? sessionStorage.getItem('sceneId') : '195803445',
		sceneUrl: sessionStorage.getItem('sceneUrl')? sessionStorage.getItem('sceneUrl') : 'https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png',
		sperkerId: sessionStorage.getItem('sperkerId')? sessionStorage.getItem('sperkerId') : '743'
	};
	let params = {
		productId: editId,
		value: JSON.stringify(obj),
		type: 'draf'
	};
    setSpinText('草稿保存中...');
    setMovieLoading(true);
    newInsertVideo(params)
      .then(res => {
        message.success('草稿保存成功,窗口即将关闭');
        setTimeout(() => {
          window.close();
          setMovieLoading(false);
        }, 2000);
      })
      .catch(err => {
        setMovieLoading(false);
      });
  };
  // 生成视频
  const makeMovieAction = () => {
    let list: any = [...pagesList];
    let pages: any = [];
    if (!list.every((item: any) => item.content)) {
      message.error('有页面语音讲解内容为空，请完善');
      return false;
    }
    list.map((i: any, index: number) => {
      pages.push({
        index: index,
        width: i.width,
        height: i.height,
        background_image_url: i.nodes[0].url ? i.nodes[0].url : '',
        background_color: i.nodes[0].fill ? i.nodes[0].fill : '#fff',
        digital_human: {
          speakerId: sessionStorage.getItem('sperkerId')? sessionStorage.getItem('sperkerId') : '743',
          sceneId: sessionStorage.getItem('sceneId')? sessionStorage.getItem('sceneId') : '195803445',
          text: i.content,
        },
        image_list: [],
        text_list: [],
      });
      i.nodes.map((s: any, j: number) => {
        if (s.id == 'shuziren') {
          pages[index]['digital_human']['width'] = s.scaleX
            ? s.width * s.scaleX
            : s.width;
          pages[index]['digital_human']['height'] = s.scaleY
            ? s.height * s.scaleY
            : s.height;
          pages[index]['digital_human']['x'] = s.x;
          pages[index]['digital_human']['y'] = s.y;
        }
        if (s.type == 'text-input') {
          if (!s.width) s.width = 360;
          if (!s.height) s.height = 30;
          pages[index]['text_list'].push({
            text: s.text,
            alignment: s.align ? s.align : 'left',
            fill_color: '',
            line_spacing: s.lineHeight,
            font_size: s.fontSize,
            font_bold: s.fontWeight && s.fontWeight == 'bold' ? 1 : 0,
            font_name: s.fontFamily ? s.fontFamily : '宋体',
            font_italic: s.fontStyle && s.fontStyle == 'oblique' ? 1 : 0,
            font_color: s.fill,
            x: s.x,
            y: s.y,
            width: s.scaleX ? s.width * s.scaleX : s.width,
            height: s.scaleY ? s.height * s.scaleY : s.height,
          });
        }
        if (s.type == 'image') {
          pages[index]['image_list'].push({
            url: s.url,
            x: s.x,
            y: s.y,
            width: s.scaleX ? s.width * s.scaleX : s.width,
            height: s.scaleY ? s.height * s.scaleY : s.height,
          });
        }
      });
    });
    let params = {
      pages: pages,
	  productId: editId,
	  productName: videoName
    };
    makeNewMovie(params).then(({ data }) => {
		setMovieId(data.movie_id);
		message.success('视频制作中。窗口即将关闭');
		clearInterval(timer);
		setDataLoad(false);
		setTimeout(() => {
			window.close();
		}, 2000);
    });
  };
  // 实时保存
  const saveByRealtime = () => {
	const templateData = newCanvasRef.current.getTemplate();
    let list: any = [...dataListRef.current];
	let Index:any = selectIndexRef.current;
	if (templateData.length > 0) {
		list[Index]['nodes'] = templateData;
	}
    let textValue: any = formRef.current?.getFieldValue('text');
    list[Index]['content'] = textValue;
	list[Index]['footerVisible'] = footerVisibleRef.current;
    let obj = {
      list: list,
	  selectIndex: Index,
      sceneId: sessionStorage.getItem('sceneId')? sessionStorage.getItem('sceneId') : '195803445',
      sceneUrl: sessionStorage.getItem('sceneUrl')? sessionStorage.getItem('sceneUrl') : 'https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png',
	  sperkerId: sessionStorage.getItem('sperkerId')? sessionStorage.getItem('sperkerId') : '743'
    };
    let params = {
		productId: editId,
      	value: JSON.stringify(obj),
		type: 'pros'
    };
	newInsertVideo(params)
      .then(res => {
			console.log(list)
			setPagesList(list);
    	})
      .catch(err => {
        setMovieLoading(false);
    });
  };
  const toogleFooter = (flag: boolean) => {
	let templateData = newCanvasRef.current.getTemplate();
    let list: any = [...dataListRef.current];
	let Index:any = selectIndexRef.current;
	if (flag) {
		templateData.map((i:any) => {
			if (i.id != 'bg') {
				i.x = i.x / 1.2;
				i.y = i.y / 1.2;
				if (i.type != 'text-input') {
					i.width = i.width / 1.2;
					i.height = i.height / 1.2;
				}
			} else {
				if (i.type != 'text-input') {
					i.width = i.width / 1.2;
					i.height = i.height / 1.2;
				}
			}
		})
	} else {
		templateData.map((i:any) => {
			if (i.id != 'bg') {
				i.x = i.x * 1.2;
				i.y = i.y * 1.2;
				if (i.type != 'text-input') {
					i.width = i.width * 1.2;
					i.height = i.height * 1.2;
				}
				
			} else {
				if (i.type != 'text-input') {
					i.width = i.width * 1.2;
					i.height = i.height * 1.2;
				}
			}
		})
	}
	list[Index]['nodes'] = templateData;
	setPagesList(list);
	template(list[Index], Index);
	setFooterVisible(flag);
  }
  const selectPage = (data: any, index: number) => {
    template(data, index);
  };
  function deepClone(obj: any) {
    if (!obj || typeof obj !== 'object') {
      return;
    }
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      // 遍历可枚举属性，包括原型链上的
      if (obj.hasOwnProperty(key)) {
        newObj[key] =
          typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
      }
    }
    return newObj;
  }
  const template = (data: any, index: number, time?: number) => {
	// console.log(data)
    setLoading(true);
	setTemplate(deepClone(data));
	setLoading(false);
	setSelectIndex(index);
	setFooterVisible(data.footerVisible? data.footerVisible : true);
	formRef.current?.setFieldsValue({
		text: data.content ? data.content : '',
	});
	
  };

  const add = () => {
    let list = [...pagesList];
    if (list.length > 0) {
      if (!list[selectIndex]['content']) {
        message.error('请先完善当前页面的解说内容!');
        return false;
      }
    }
    list.push(initData);
    setAddLoading(true);
    setPagesList(list);
	setSelectIndex(list.length - 1);
	template(initData, list.length - 1);
	setAddLoading(false);
	setFooterVisible(true);
	let dom: any = document.querySelector('#pageBox');
	setTimeout(() => {
		let domHeight = dom.scrollHeight;
		dom.scrollTo(0, domHeight);
	}, 200);
  };
  const delAction = (item: any, index: number, e: any) => {
	let list:any = [...pagesList];
	if (list.length < 2) {
		message.error('页面不可为空');
		return false;
	} else {
		e.stopPropagation();
		Modal.confirm({
		  title: '提示',
		  content: '确认要删除吗？',
		  onOk: () => {
			let list = [...pagesList];
			list.splice(index, 1);
			setPagesList(list);
			if (list.length > 0) {
			  if (index == 0) {
				setSelectIndex(index);
				template(list[index], index);
			  } else {
				setSelectIndex(index - 1);
				template(list[index - 1], index - 1);
			  }
			} else {
			  setSelectIndex(0);
			}
		  },
		  okText: '确认',
		  cancelText: '取消',
		});
	}
  };
  const addAction = (item: any, index: number, e: any) => {
    e.stopPropagation();
    Modal.confirm({
      title: '提示',
      content: '确认要复制当前页面吗？',
      onOk: () => {
        let list = [...pagesList];
        list.push(item);
        let dom: any = document.querySelector('#pageBox');
        setTimeout(() => {
          let domHeight = dom.scrollHeight;
          dom.scrollTo(0, domHeight);
        }, 200);
        setPagesList(list);
        template(item, list.length - 1);
      },
      okText: '确认',
      cancelText: '取消',
    });
  };
  return (
    <Spin style={{width: '100%', height: '100%'}} tip={spinText} spinning={movieLoading}>
      <div id="videoSet">
        <div className="btn_box">
          <div className='btn-left'>
			{
				nameEdit? <span><Input style={{width: '180px'}}  defaultValue={videoName} onPressEnter={changeName} onBlur={changeName} /> <Button style={{marginLeft: '10px'}} type='primary' size="small" onClick={() =>setNameEdit(false)}>保存</Button></span> : <span>{videoName}</span>
			}
			<span className='edit-btn' onClick={() =>setNameEdit(true)}><EditOutlined /></span>
		  </div>
          <div className='btn-right'>
            <Button
              disabled={pagesList.length < 1}
              onClick={saveTemplate}
              loading={movieLoading}
            >
              保存
            </Button>
            <Button
              type="primary"
              disabled={pagesList.length < 1}
              onClick={makeMovieAction}
              loading={movieLoading}
            >
              生成视频
            </Button>
          </div>
        </div>
        <div className="main_box">
          <div className="left_box">
				<div className='page_top_btn' style={{textAlign: 'left', paddingLeft: '15px'}}>
					<Button icon={<PlusCircleOutlined />} onClick={add} loading={addLoading} style={{ width: '80px', borderRadius: '5px', marginBottom: '15px' }} type="primary">新增</Button>
				</div>
				<div id="pageBox">
					{pagesList && [...pagesList].map((item: any, index: number) => {
						return (
						<div
							className={
							selectIndex == index ? 'page_list selectActive' : 'page_list'
							}
							key={index}
							onClick={() => selectPage(item, index)}
						>
							{selectIndex == index && index != 0? (
							<div className="mask">
								<Tooltip placement="top" title="删除当前页">
									<div style={{top: '0px'}} className='icon-logo' onClick={e => delAction(item, index, e)}>
										<Icon type="icon-shanchu3" style={{ fontSize: '20px', color: '#fff'}}/>
									</div>
								</Tooltip>
								<Tooltip placement="top" title="复制当前页">
									<div style={{bottom: '0px'}} className='icon-logo' onClick={e => addAction(item, index, e)}>
										<Icon type="icon-copy" style={{ fontSize: '20px', color: '#fff'}}/>
									</div>
								</Tooltip>
							</div>
							) : null}
							<div className='thumb-box' style={{backgroundImage: `url(${item.nodes[0].url}) `, backgroundSize: '100% 100%'}}>
								{
									item.nodes && item.nodes.map((i:any, s:number) => {
										if (i.id === 'shuziren') {
											return (
												<img style={{top: item.footerVisible? i.y * 2.16 : i.y * 1.8, left: item.footerVisible? i.x * 2.16 : i.x * 1.8, width: item.footerVisible? i.width * 2.16 : i.width * 1.8, height: item.footerVisible? i.height * 2.16 : i.height * 1.8}} key={s} className='shuziren-image' src={i.url} alt="" />
											)
										} else if (i.type == 'text-input') {
											return (
												<span key={s} className='text-span font' style={{display: 'block', top: item.footerVisible? i.y * 2.16 : i.y * 1.8, left: item.footerVisible? i.x * 2.16 : i.x * 1.8, width: item.footerVisible? i.width * 2.16 : i.width * 1.8, height: item.footerVisible? i.height * 2.16 : i.height * 1.8, fontSize: item.footerVisible? i.fontSize * 2.16 : i.fontSize * 1.8, color: i.fill}}>{i.text}</span>
											)
										} if (i.type === 'image') {
											return (
												<img className='thumb-img' style={{top: item.footerVisible? i.y * 2.16 : i.y * 1.8, left: item.footerVisible? i.x * 2.16 : i.x * 1.8, width: item.footerVisible? i.width * 2.16 : i.width * 1.8, height: item.footerVisible? i.height * 2.16 : i.height * 1.8}} key={s} src={i.url} alt="" />
											)
										}
									})

								}
							</div>
						</div>
						);
					})}
				</div>
				<div className='page_bot_btn'>
					<span onClick={() =>setModalVisible(true)}>
						<Tooltip placement="top" title="替换全部背景">
							<Icon type="icon-kuaimenyoubeijing" style={{ fontSize: '24px', cursor: 'pointer'}}></Icon>
						</Tooltip>
					</span>
				</div>
          </div>
          <div className="right_box">
			<div className={footerVisible? 'min_canvas right_top' : 'max_canvas right_top'}>
				<div className="canvas_box">
					<Canvas pagesList={pagesList} canvasWidth={footerVisible? 885 : 1062} canvasHeight={footerVisible? 500 : 600}></Canvas>
				</div>
			</div>
			<div id="rightBot" className={footerVisible? 'right_bot max_height' : 'right_bot min_height'}>
				<div style={{paddingRight: '0px', height: '40px', lineHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<span>语音讲解内容</span> 
					<span style={{textAlign: 'right'}}>
						{
							!footerVisible? <UpCircleOutlined onClick={() => toogleFooter(true)} style={{fontSize: '22px', cursor: 'pointer', color: '#999'}} /> : <DownCircleOutlined onClick={() => toogleFooter(false)} style={{fontSize: '22px', cursor: 'pointer', color: '#999'}} />
						}
					</span>
				</div>
				<Form ref={formRef} labelCol={{ span: 3 }} colon={false} onFinish={data => {}}>
					<Form.Item label="" name="text" rules={[{ required: true }]}>
						<TextArea
						placeholder="请输入语音讲解内容"
						bordered={false}
						showCount
						rows={3}
						maxLength={200}
						allowClear
						style={{ width: '100%', background: '#f2f2f2', resize: 'none' }}
						/>
					</Form.Item>
				</Form>
			</div>
          </div>
		  <div className='slider_box'>
				<SliderLeft
					formRef={formRef}
					editId={props.location.query.id ? props.location.query.id : ''}
					soundsList={soundsList}
					personList={personList}
				></SliderLeft>
		  </div>
        </div>
        <Modal
          bodyStyle={{ padding: 0, height: 540 }}
          style={{ top: '100px' }}
          closable={false}
          className="movieModal"
          destroyOnClose
          forceRender={true}
          width={960}
          title={null}
          open={movieVisible}
          onCancel={() => setMovieVisible(false)}
          footer={false}
        >
          <video src={movieUrl} className="movie_layout" controls></video>
        </Modal>
		<Modal
			bodyStyle={{ padding: 0 }}
			style={{ top: '150px' }}
			className="elementModal"
			destroyOnClose
			forceRender={true}
			width={350}
			title="替换全部背景"
			open={modalVisible}
			onCancel={() => setModalVisible(false)}
			footer={null}
		>
			<BackReplace pagesList={pagesList} type="all" onClose={() =>{setModalVisible(false)}}   />
      	</Modal>
      </div>
    </Spin>
  );
};

export default AboutPage;
