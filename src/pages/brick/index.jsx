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
    brick,
    loading,
  }) => ({
    brick,
    loading: loading.models.brick,
  }),
)
class BrickList extends Component {
  columns = [
    { title: 'Id', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Table Type', dataIndex: 'table_type' },
    { title: 'Name Plural', dataIndex: 'name_plural' },
    { title: 'Parent Dir', dataIndex: 'parent_dir' },
    { title: 'Api Path', dataIndex: 'api_path' },

    {
      title: 'Action',
      render: (_text, record) => (<Fragment>
        <Link to={`/dfield/create/?brick_id=${record.id}`}>Add Field</Link>
        <Divider type="vertical" />
        <Link to={`/brick/edit/?id=${record.id}`}>Edit</Link>
        <Divider type="vertical" />
        <a onClick={() => this.handleRemoveItem(record.id)}>Del</a></Fragment>
      ),
    },
  ]

  componentDidMount() {
    const { dispatch, brick: { data: { pagination } } } = this.props;
    let params = {};
    if (pagination) {
      params = {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      };
    }

    dispatch({ type: 'brick/fetch', payload: params });
  }

  handleTableChange = pagination => {
    const { dispatch } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({ type: 'brick/fetch', payload: params });
  };

  handleRemoveItem = id => {
    const { dispatch, brick: { data: { pagination } } } = this.props;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'brick/remove',
      payload: id,
      callback: () => {
        dispatch({ type: 'brick/fetch', payload: params });
      },
    });
  }

  render() {
    const {
      brick: { data: { list, pagination } },
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
            <Button icon="plus" type="primary" onClick={() => router.push('/brick/create')}>
              New Brick
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

export default Form.create()(BrickList);
