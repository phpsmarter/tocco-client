/* eslint no-console: 0 */
import React from 'react'
import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readOnly: false,
      values: {
        string: 'Test String',
        text: 'Line\nLine2',
        singleSelect: 2,
        multiSelect: ['b', 'c'],
        date: '2015-12-18',
        datetime: '2017-01-25T15:15:00.000Z',
        boolean: false,
        number: 99
      }
    }
  }

  togglereadOnly() {
    this.setState({
      ...this.state,
      readOnly: !this.state.readOnly
    })
  }

  changeValue(name, value) {
    console.log('changeValue', name, value)
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [name]: value
      }
    })
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.readOnly} onClick={this.togglereadOnly.bind(this)}/> readOnly
        {/* start example */}
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>string</td>
              <td>
                <EditableValue
                  type="string"
                  value={this.state.values.string}
                  onChange={v => this.changeValue('string', v)}
                  readOnly={this.state.readOnly}
              />
              </td>
            </tr>
            <tr>
              <td>text</td>
              <td>
                <EditableValue
                  type="text"
                  value={this.state.values.text}
                  onChange={v => this.changeValue('text', v)}
                  readOnly={this.state.readOnly}
              />
              </td>
            </tr>
            <tr>
              <td>number</td>
              <td>
                <EditableValue
                  type="number"
                  value={this.state.values.number}
                  onChange={v => this.changeValue('number', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>boolean</td>
              <td>
                <EditableValue
                  type="boolean"
                  value={this.state.values.boolean}
                  onChange={v => this.changeValue('boolean', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>single-select</td>
              <td>
                <EditableValue
                  type="single-select"
                  options={{
                    store: [
                    {value: 1, label: 'One'},
                    {value: 2, label: 'Two'},
                    {value: 3, label: 'Three'}
                    ]
                  }}
                  value={this.state.values.singleSelect}
                  onChange={v => this.changeValue('singleSelect', v)}
                  readOnly={this.state.readOnly}
              />
              </td>
            </tr>
            <tr>
              <td>multi-select</td>
              <td>
                <EditableValue
                  type="multi-select"
                  value={this.state.values.multiSelect}
                  onChange={v => this.changeValue('multiSelect', v)}
                  options={{
                    store: [{value: 'a', label: 'One'}, {value: 'b', label: 'Two'},
                    {value: 'c', label: 'Three'}, {value: 'd', label: 'Four'}]
                  }}
                  readOnly={this.state.readOnly}
              />
              </td>
            </tr>
            <tr>
              <td>date</td>
              <td>
                <EditableValue
                  type="date"
                  value={this.state.values.date}
                  onChange={v => this.changeValue('date', v)}
                  readOnly={this.state.readOnly}
              />
              </td>
            </tr>
            <tr>
              <td>datetime</td>
              <td>
                <EditableValue
                  type="datetime"
                  value={this.state.values.datetime}
                  onChange={v => this.changeValue('datetime', v)}
                  readOnly={this.state.readOnly}
              />
              </td>
            </tr>
          </tbody>
        </table>
        {/* end example */}
      </div>
    )
  }
}

export default () => <Example/>
