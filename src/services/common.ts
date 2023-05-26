import request from '@/utils/request';

export async function getAnswerBot(params: any) {
  return request.post('/faqManage/getAnswer', {
    data: params,
  });
}
// 留言提交
export async function submitMessageData(params: any) {
  return request.post('/message/addMessage', {
    data: params,
  });
}

// 留言列表
export async function getMessageList(params: any) {
  return request.post('/message/messageList', {
    data: params,
  });
}

// 视频制作
export async function makeMovie(params: any) {
  return request.post('/out/makeMovie', {
    data: params,
    notime: true,
  });
}

// 生成预览
export async function getMoviePreview(params: any) {
  return request.post('/out/getMoviePreview', {
    data: params,
    notime: true,
  });
}

// 获取视频
export async function getMovie(params: any) {
  return request.post('/out/getMovie2', {
    data: params,
  });
}

// 视频列表
export async function getVideoList(params: any) {
  return request.post('/draft/videoList', {
    data: params,
  });
}

// 视频草稿保存
export async function insertVideo(params: any) {
  return request.post('/draft/insertVideo', {
    data: params,
    notime: true,
  });
}

// 获取视频详情
export async function getVideoDetail(params: any) {
  return request.post('/draft/pagesInfoDetails', {
    data: params,
  });
}

// 观看视频
export async function lookVideo(params: any) {
  return request.post('/draft/changeWatchState', {
    data: params,
  });
}

//上传图片
export async function uploadImage(params: any) {
  return request.post('/out/updateImage', {
    data: params,
    notime: true,
  });
}


// 简易版生成视频
export async function makeSimpleVideo(params: any) {
  return request.post('/out/makeMovieOnlyPerson', {
    data: params,
  });
}

// 视频列表
export async function getNewVideoList(params: any) {
  return request.post('/draft/getVideoList2', {
    data: params,
  });
}



// 获取产品模板信息
export async function getTempByProduct(params: any) {
  return request.get(`/web/api/video/product/info?productId=${params.productId}`);
}
// 获取视频详情
export async function getNewVideoDetail(params: any) {
  return request.get(`/web/api/video/progress/storage/get?type=${params.type}&productId=${params.productId}`);
}
// 视频草稿保存
export async function newInsertVideo(params: any) {
  return request.post('/web/api/video/progress/storage', {
    data: params,
  });
}
// 视频制作新版
export async function makeNewMovie(params: any) {
  return request.post('/web/api/video/make', {
    data: params,
  });
}
// 视频制作新版
export async function saveTemp(params: any) {
  return request.post('/web/api/video/moban/add', {
    data: params,
  });
}
// 获取声音列表
export async function getVoiceList(params: any) {
  return request.get('/web/api/video/voice/list');
}
// 获取数字人列表
export async function getModelsList(params: any) {
  return request.get('/web/api/video/model/list');
}
// 获取图片资源列表
export async function getPicList(params: any) {
  return request.get('/web/api/video/temp/list');
}
// 获取模板列表
export async function getTempListData(params: any) {
  return request.get('/web/api/video/moban/list');
}


