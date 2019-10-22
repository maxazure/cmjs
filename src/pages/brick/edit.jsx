import { Form, Input, Select, Card, Button } from 'antd';
import React, { Component } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import router from 'umi/router';
import { connect } from 'dva';
//import OptionWeb from '@/components/OptionWeb';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Option } = Select;
const FormItem = Form.Item;

class EditForm extends Component {
  componentDidMount() {
    const { location, dispatch, form } = this.props;

    if (location.query.id) {
      dispatch({
        type: 'brick/show',
        payload: location.query.id,
        callback: () => {
          form.setFieldsValue({
            name: this.props.brick.single.name, 
table_type: this.props.brick.single.table_type, 
name_plural: this.props.brick.single.name_plural, 
parent_dir: this.props.brick.single.parent_dir, 
api_path: this.props.brick.single.api_path, 

          })
        },
      })
    }
  }

  render() {
    const { form, location } = this.props;

    const handleUpdate = fieldsValue => {
      const { dispatch } = this.props;

      dispatch({
        type: 'brick/update',
        payload: { ...fieldsValue, id: location.query.id },
        callback: () => {
          router.push('/brick');
        },
      })
    }

    const okHandle = e => {
      e.preventDefault();
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate(fieldsValue);
      });
    };

    return (<PageHeaderWrapper title="Edit Brick">
      <Card bordered={false}>
        <Form onSubmit={okHandle}>

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


          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} >
            <Button type="primary" htmlType="submit" > Submit </Button>
          </FormItem>
        </Form>
      </Card>

    </PageHeaderWrapper>
    )
  }
}

export default connect(state => ({ brick: state.brick }))(Form.create()(EditForm))
