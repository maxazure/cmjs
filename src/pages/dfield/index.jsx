import { Card, Divider, Form, Table, Button } from 'antd';
import Link from 'umi/link'
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { router } from 'umi';

import styles from './style.less';


/* eslint react/no-multi-comp:0 */
@connect(
  ({
    dfield,
    loading,
  }) => ({
    dfield,
    loading: loading.models.dfield,
  }),
)
class DfieldList extends Component {
  columns = [
    { title: 'Id', dataIndex: 'id' },
{ title: 'Field Name', dataIndex: 'field_name' },
{ title: 'Field Type', dataIndex: 'field_type' },
{ title: 'Is Required', dataIndex: 'is_required', render: val => <span> {val ? 'true' : 'false'} </span> }, 
{ title: 'Is Show In List', dataIndex: 'is_show_in_list', render: val => <span> {val ? 'true' : 'false'} </span> }, 
{ title: 'Is Editable', dataIndex: 'is_editable', render: val => <span> {val ? 'true' : 'false'} </span> }, 
{ title: 'Api', dataIndex: 'api' },
{ title: 'Brick Id', dataIndex: 'brick_id' },

    {
      title: 'Action',
      render: (_text, record) => (<Fragment>
        <Link to={`/dfield/edit/?id=${record.id}`}>Edit</Link>
        <Divider type="vertical" />
        <a onClick={() => this.handleRemoveItem(record.id)}>Delete</a></Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch, dfield: { data: { pagination } } } = this.props;
    let params = {};
    if (pagination) {
      params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      };
    }

    dispatch({ type: 'dfield/fetch', payload: params });
  }

  handleTableChange = pagination => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({ type: 'dfield/fetch', payload: params });
  };

  handleRemoveItem = id => {
    const { dispatch, dfield: { data: { pagination } } } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'dfield/remove',
      payload: id,
      callback: () => {
        dispatch({ type: 'dfield/fetch', payload: params });
      },
    });
  }

  render() {
    const {
      dfield: { data: { list, pagination } },
      loading,
    } = this.props;

    const paginationProps = pagination ?
      {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
      } :
      false;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => router.push('/dfield/create')}>
              New Dfield
                    </Button>
          </div>
          <div className={styles.tableList}>
            <Table dataSource={list} columns={this.columns} loading={loading}
              pagination={paginationProps}
              onChange={this.handleTableChange} />
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Form.create()(DfieldList);
