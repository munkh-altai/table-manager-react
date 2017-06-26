import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import {Select} from 'element-react';
import {postResuest} from '../../../api/ajaxRequest'
var timer;
export default class ComboBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:false,
      options: [],
      value: undefined,
    };
  }
    comboChange(value){

    let value_ = '';
      if(this.props.multi){
        value_ = value.join();
      } else {
        value_ = value;
      }

        this.props.changeHandler(value_)
    }
    getOptions(input, callback){
        clearTimeout(timer);
       if(input){


           timer = setTimeout(()=>{
                this.setState({loading: true});
                postResuest('combo-sync', {input: input, column: this.props.column}).then((response)=>{
                    let options = [];

                    for(let zz = 0; zz < response.length; zz++){
                        if (this.props.fieldOptions.get('textField') instanceof Object) {



                            let arrayLabel = "";

                            for (var i = 0; i < this.props.fieldOptions.get('textField').size; ++i) {
                                if(i == 0)
                                    arrayLabel = this.getTranlate(response[zz][this.props.fieldOptions.getIn(['textField', i])])
                                else
                                    arrayLabel = arrayLabel +", "+  this.getTranlate(response[zz][this.props.fieldOptions.getIn(['textField', i])])
                            }

                            options.push({value:response[zz][this.props.fieldOptions.get('valueField')]+'', label: arrayLabel})
                        }
                        else {

                            options.push({value: data.get(fieldOptions.get('valueField'))+'', label: this.getTranlate(data.get(fieldOptions.get('textField')))})

                            options.push({value:response[zz][this.props.fieldOptions.get('valueField')]+'', label: response[zz][this.props.fieldOptions.get('textField')]})
                        }
                    }

                  this.setState({loading: true, options_:options});

                });
            }, 500);
       } else {
         this.setState({loading: true, options:[]});
        }


    }
    getTranlate(translations){
        if(this.props.fieldOptions.get('with_translation')){

            let json_translations =  JSON.parse(translations);
            let translated_value = null;
            json_translations.map(tranlation =>{
                if(tranlation.locale == this.props.defaultLocale)
                    translated_value = tranlation.value;
            })

            return translated_value;
        } else {
            return translations;
        }

    }

  componentWillMount(){
    let options = [];
    if(this.props.formData.get(this.props.column))

      this.props.formData.getIn([this.props.column, 'data', 'data']).map((data, sindex)=>{



        if (this.props.fieldOptions.get('textField') instanceof Object) {

          let arrayLabel = "";

          for (var i = 0; i < this.props.fieldOptions.get('textField').size; ++i) {
            if(i == 0)
              arrayLabel = this.getTranlate(data.get(this.props.fieldOptions.getIn(['textField', i])))
            else
              arrayLabel = arrayLabel +", "+ this.getTranlate(data.get(this.props.fieldOptions.getIn(['textField', i])))
          }

          options.push({value: data.get(this.props.fieldOptions.get('valueField'))+'', label: arrayLabel})
        }
        else {

          options.push({value: data.get(this.props.fieldOptions.get('valueField'))+'', label: this.getTranlate(data.get(this.props.fieldOptions.get('textField')))})
        }
      })


    let value_ = '';
    if(this.props.multi){
      value_ = this.props.value.split(',');
    } else {
      value_ = this.props.value;
    }


    this.setState({options: options});
    this.setState({value: value_});
  }
  // componentDidMount(){
  //   Select.resetInputHeight();
  // }


    render() {
        const { fieldClass, formData, column, changeHandler,loadOptions, fieldClassName, errorText, formType, placeholder, name, disabled, multi, dataIndex } = this.props;



        return (
            <div className={`form-group ${fieldClass} ${fieldClassName}`}  id={`solar-form-group-${dataIndex}`}>
                {formType == 'inline' ? '' : <label className="control-label">{placeholder}</label>}

                {formData.get(column) ?
                    loadOptions ?

                      <Select
                        value={this.state.value}
                        filterable={true}
                        disabled={disabled}
                        id={`c-${dataIndex}`}
                        name={name}
                        placeholder={`Сонгох`}
                        onChange={this.comboChange.bind(this)}
                        multiple={multi}
                        remote={true} remoteMethod={this.getOptions.bind(this)} loading={this.state.loading}
                      >
                        {
                          this.state.options.map(el =>
                             <Select.Option key={el.value} label={el.label} value={el.value} />
                          )
                        }
                      </Select>:
                      <Select
                        value={this.state.value}
                        filterable={true}
                        disabled={disabled}
                        id={`c-${dataIndex}`}
                        name={name}
                        placeholder={`Сонгох`}
                        onChange={this.comboChange.bind(this)}
                        multiple={multi}
                      >
                        {
                          this.state.options.map(el =>
                             <Select.Option key={el.value} label={el.label} value={el.value} />
                          )
                        }
                      </Select>
                    :
                    null}
                    <span className="help-block">
                        {errorText}
                    </span>

            </div>

        )
    }
}
