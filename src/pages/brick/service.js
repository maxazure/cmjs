import request from '@/utils/request';

export async function queryBricks(params) {
  let response = ''
  if (params) {
    response = request(`/api/bricks/?page=${params.currentPage || 1}&pagesize=${params.pageSize || 10}`);
  } else {
    response = request('/api/bricks/?page=1');
  }
  return response
}

export async function querybrick(id) {
  return request(`/api/bricks/${id}`);
}

export async function removeBrick(id) {
  return request(`/api/bricks/${id}`, {
    method: 'DELETE',
  });
}

export async function addBrick(brick) {
  return request('/api/bricks/', {
    method: 'post',
    data: {
      ...brick,
    },
  });
}

export async function updateBrick(brick) {
  return request(`/api/bricks/${brick.id}`, {
    method: 'put',
    data: {
      ...brick,
    },
  });
}
