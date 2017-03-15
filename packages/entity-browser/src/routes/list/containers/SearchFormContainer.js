import {connect} from 'react-redux'
import {injectIntl} from 'react-intl'
import SearchForm from '../components/SearchForm'

import {setSearchInput, reset, setShowExtendedSearchForm} from '../modules/searchForm/actions'

const mapActionCreators = {
  setSearchInput,
  reset,
  setShowExtendedSearchForm
}

const mapStateToProps = (state, props) => ({
  searchFormDefinition: state.searchForm.formDefinition,
  relationEntities: state.searchForm.relationEntities,
  entityModel: state.entityBrowser.entityModel,
  searchInputs: state.searchForm.searchInputs,
  disableSimpleSearch: state.searchForm.disableSimpleSearch,
  simpleSearchFields: state.searchForm.simpleSearchFields,
  showExtendedSearchForm: state.searchForm.showExtendedSearchForm,
  preselectedSearchFields: state.searchForm.preselectedSearchFields
})

export default connect(mapStateToProps, mapActionCreators)(injectIntl(SearchForm))

