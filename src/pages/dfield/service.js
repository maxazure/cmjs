import request from '@/utils/request';

export async function queryDfields(params) {
  let response = ''
  if (params) {
    response = request(`/api/dfields/?page=${params.currentPage || 1}&pagesize=${params.pageSize || 10}`);
  } else {
    response = request('/api/dfields/?page=1');
  }
  return response
}

export async function querydfield(id) {
  return request(`/api/dfields/${id}`);
}

export async function removeDfield(id) {
  return request(`/api/dfields/${id}`, {
    method: 'DELETE',
  });
}

export async function addDfield(dfield) {
  return request('/api/dfields/', {
    method: 'post',
    data: {
      ...dfield,
    },
  });
}

export async function updateDfield(dfield) {
  return request(`/api/dfields/${dfield.id}`, {
    method: 'put',
    data: {
      ...dfield,
    },
  });
}
