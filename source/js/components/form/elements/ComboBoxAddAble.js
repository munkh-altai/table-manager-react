import React, { Component }  from 'react';
import Select from 'react-select/lib/Select';

export default class ComboBoxAddAble extends Component {
    comboChange(value){

        this.props.changeHandler(value)
    }
    openComboxFrom(column) {
        //this.props.openComboboxAdableForm(column)
    }
    render() {
        const { fieldClass, formData, column, fieldOptions, value, fieldClassName, errorText, formType, placeholder, name, disabled } = this.props;

        let options = [];


        if(formData.get(column))

            formData.getIn([column, 'data', 'data']).map((data, sindex)=>{

                if (fieldOptions.get('textField') instanceof Object) {

                    let arrayLabel = "";

                    for (var i = 0; i < fieldOptions.get('textField').size; ++i) {
                        if(i == 0)
                            arrayLabel = data.get(fieldOptions.getIn(['textField', i]))
                        else
                            arrayLabel = arrayLabel +", "+ data.get(fieldOptions.getIn(['textField', i]))
                    }

                    options.push({value: data.get(fieldOptions.get('valueField')), label: arrayLabel})
                }
                else {

                    options.push({value: data.get(fieldOptions.get('valueField')), label: data.get(fieldOptions.get('textField'))})
                }
            })

        return (
            <div className={`form-group ${fieldClass} ${fieldClassName}`}  id={`solar-form-group-${dataIndex}`}>
                {formType == 'inline' ? '' : <label className="control-label">{placeholder}</label>}

                {formData.get(column) ?

                    <Select
                        disabled={disabled}
                        name={name}
                        value={value}
                        options={options}
                        onChange={this.comboChange.bind(this)}
                    />
                    :
                    null}

                <button className="btn btn-success" onClick={this.openComboxFrom.bind(this,column)} disabled={disabled}>
                    <i className="material-icons">&#xE145;</i>
                </button>

                    <span className="help-block">
                            {errorText}
                    </span>

            </div>

        )
    }
}
