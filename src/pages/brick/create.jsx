import { Form, Input, Select, Card, Button } from 'antd';
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
  const handleAdd = fieldsValue => {
    props.dispatch({
      type: 'brick/add',
      payload: fieldsValue
    })
  }
  const okHandle = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
      router.push('/brick');
    });
  };

  return ( <PageHeaderWrapper title="New brick">
    <Card bordered={false}>
    <Form onSubmit={okHandle} >
    <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name">
{ form.getFieldDecorator('name', {
  rules: [{ required: true, message: 'Name is required.' }],
})(<Input placeholder="Name" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Table_type">
{ form.getFieldDecorator('table_type', {
  rules: [{ required: true, message: 'Table Type is required.' }],
})(<Input placeholder="Table Type" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name_plural">
{ form.getFieldDecorator('name_plural', {
  rules: [{ required: true, message: 'Name Plural is required.' }],
})(<Input placeholder="Name Plural" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Parent_dir">
{ form.getFieldDecorator('parent_dir', {
  
})(<Input placeholder="Parent Dir" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Api_path">
{ form.getFieldDecorator('api_path', {
  
})(<Input placeholder="Api Path" />)}
</FormItem>


    <FormItem labelCol={{ span: 7}} wrapperCol={{ span: 15 }} >
    <Button type="primary" htmlType="submit">Submit</Button>
    </FormItem>

    </Form>
    </Card>
    </PageHeaderWrapper>
  )
}

export default connect( state => ({ brick: state.brick }))(Form.create()(CreateForm))
