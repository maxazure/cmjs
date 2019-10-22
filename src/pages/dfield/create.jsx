import { Form, Input, Select, Card, Button, DatePicker, Switch, InputNumber } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//import OptionWeb from '@/components/OptionWeb';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Option } = Select;
const FormItem = Form.Item;

const CreateForm = props => {
  const { form } = props;
  console.log(props)
  const handleAdd = fieldsValue => {
    props.dispatch({
      type: 'dfield/add',
      payload: fieldsValue
    })
  }
  const okHandle = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
      router.push('/dfield');
    });
  };

  return (<PageHeaderWrapper title="New dfield">
    <Card bordered={false}>
      <Form onSubmit={okHandle} >
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Field_name">
          {form.getFieldDecorator('field_name', {
            rules: [{ required: true, message: 'Field Name is required.' }],

          })(<Input placeholder="Field Name" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Field_type">
          {form.getFieldDecorator('field_type', {
            rules: [{ required: true, message: 'Field Type is required.' }],

          })(<Input placeholder="Field Type" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Is_required">
          {form.getFieldDecorator('is_required', {

            valuePropName: 'checked', initialValue: false,
          })(<Switch />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Is_show_in_list">
          {form.getFieldDecorator('is_show_in_list', {

            valuePropName: 'checked', initialValue: false,
          })(<Switch />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Is_editable">
          {form.getFieldDecorator('is_editable', {

            valuePropName: 'checked', initialValue: false,
          })(<Switch />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Api">
          {form.getFieldDecorator('api', {


          })(<Input placeholder="Api" />)}
        </FormItem>
        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Brick_id">
          {form.getFieldDecorator('brick_id', {
            rules: [{ required: true, message: 'Brick Id is required.' }],
            initialValue: props.location.query.brick_id,

          })(<InputNumber />)}
        </FormItem>


        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>

      </Form>
    </Card>
  </PageHeaderWrapper>
  )
}

export default connect(state => ({ dfield: state.dfield }))(Form.create()(CreateForm))
