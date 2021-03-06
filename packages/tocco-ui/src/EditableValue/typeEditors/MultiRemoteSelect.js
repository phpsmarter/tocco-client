import React from 'react'
import Select from 'react-select'

class MultiRemoteSelect extends React.Component {
  onValueClick = v => {
    if (this.props.options.valueClick) {
      this.props.options.valueClick(v)
    }
  }

  render() {
    return (
      <div>
        <Select
          valueKey="key"
          labelKey="display"
          loadingPlaceholder="Laden"
          placeholder=""
          searchPromptText={this.props.options.searchPromptText}
          clearAllText={this.props.options.clearAllText}
          noResultsText={this.props.options.noResultsText}
          multi
          value={this.props.value}
          onChange={this.props.onChange}
          onValueClick={this.onValueClick}
          filterOption={() => (true)}
          autoload={false}
          onInputChange={searchTerm => {
            this.props.options.fetchOptions(searchTerm)
          }}
          options={this.props.options.options}
          isLoading={this.props.options.isLoading}
        />
      </div>
    )
  }
}

MultiRemoteSelect.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    })
  ),
  options: React.PropTypes.shape({
    options: React.PropTypes.array,
    fetchOptions: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
    valueClick: React.PropTypes.func,
    clearAllText: React.PropTypes.string,
    searchPromptText: React.PropTypes.string,
    noResultsText: React.PropTypes.string
  }),
  readOnly: React.PropTypes.bool
}

export default MultiRemoteSelect
