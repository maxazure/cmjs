import { Form, Input, Select, Card, Button, DatePicker, Switch, InputNumber } from 'antd';
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
        type: 'dfield/show',
        payload: location.query.id,
        callback: () => {
          form.setFieldsValue({
            field_name: this.props.dfield.single.field_name, 
field_type: this.props.dfield.single.field_type, 
is_required: this.props.dfield.single.is_required, 
is_show_in_list: this.props.dfield.single.is_show_in_list, 
is_editable: this.props.dfield.single.is_editable, 
api: this.props.dfield.single.api, 
brick_id: this.props.dfield.single.brick_id, 

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
        type: 'dfield/update',
        payload: { ...fieldsValue, id: location.query.id },
        callback: () => {
          router.push('/dfield');
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

    return (<PageHeaderWrapper title="Edit Dfield">
      <Card bordered={false}>
        <Form onSubmit={okHandle}>

          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Field_name">
{ form.getFieldDecorator('field_name', {
  rules: [{ required: true, message: 'Field Name is required.' }],
  
})(<Input placeholder="Field Name" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Field_type">
{ form.getFieldDecorator('field_type', {
  rules: [{ required: true, message: 'Field Type is required.' }],
  
})(<Input placeholder="Field Type" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Is_required">
{ form.getFieldDecorator('is_required', {
  
   valuePropName: 'checked', initialValue: false, 
})(<Switch />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Is_show_in_list">
{ form.getFieldDecorator('is_show_in_list', {
  
   valuePropName: 'checked', initialValue: false, 
})(<Switch />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Is_editable">
{ form.getFieldDecorator('is_editable', {
  
   valuePropName: 'checked', initialValue: false, 
})(<Switch />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Api">
{ form.getFieldDecorator('api', {
  
  
})(<Input placeholder="Api" />)}
</FormItem>
<FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Brick_id">
{ form.getFieldDecorator('brick_id', {
  rules: [{ required: true, message: 'Brick Id is required.' }],
  
})(<InputNumber />)}
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

export default connect(state => ({ dfield: state.dfield }))(Form.create()(EditForm))
