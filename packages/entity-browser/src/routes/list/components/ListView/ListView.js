import React from 'react'
import {intlShape} from 'react-intl'

import {Grid} from 'react-redux-grid'
import {Pagination} from 'tocco-ui'
import SearchFormContainer from '../../containers/SearchFormContainer'

class ListView extends React.Component {
  componentWillMount() {
    this.props.initialize()
  }

  onPageChange = page => {
    this.props.changePage(page)
  }

  render() {
    const remoteSort = (pageIndex, obj, ordering) => {
      const sort = ordering.sort
      this.props.setOrderBy({
        name: sort.property,
        direction: sort.direction
      })

      // Ugly way to achieve what we want. Actually we just want to change the state (list.orderBy) in order to set the
      // search term correctly but we need to return a promise here to satisfy the react-redux-grid component. This
      // will prompt a warning in the js console which is not really a satisfying solution.
      // It would be ugly as well if we call another function here to return the data by a promise. This should be done
      // at a single point with the redux-state.
      // See the implementation: https://github.com/bencripps/react-redux-grid/blob/master/src/actions/GridActions.js
      return new Promise((resolve, reject) => {
        resolve({})
      })
    }

    return (
      <div className="list-view">
        {this.props.showSearchForm && <SearchFormContainer/>}
        {this.props.columnDefinitions.length > 0
        && <Grid
          columns={this.props.columnDefinitions}
          data={this.props.entities}
          plugins={{
            PAGER: {
              enabled: true,
              pagingType: 'local',
              pagerComponent: (
                <Pagination
                  totalRecords={this.props.entityCount}
                  recordsPerPage={this.props.limit}
                  onPageChange={this.onPageChange}
                  currentPage={this.props.currentPage}
                />
              )
            },
            COLUMN_MANAGER: {
              sortable: {
                enabled: true,
                method: 'remote',
                sortingSource: remoteSort
              }
            }
          }}
          stateKey="listViewGrid"
          reducerKeys="grid"
        />
        }

      </div>
    )
  }
}

ListView.propTypes = {
  intl: intlShape.isRequired,
  initialize: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  changePage: React.PropTypes.func.isRequired,
  entities: React.PropTypes.array.isRequired,
  showSearchForm: React.PropTypes.bool,
  orderBy: React.PropTypes.shape({
    name: React.PropTypes.string,
    direction: React.PropTypes.string
  }),
  redirect: React.PropTypes.func,
  currentPage: React.PropTypes.number,
  limit: React.PropTypes.number,
  columnDefinitions: React.PropTypes.arrayOf(
    React.PropTypes.shape(
      {
        value: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]).isRequired,
        label: React.PropTypes.string,
        order: React.PropTypes.int
      }
    )
  ).isRequired,
  entityCount: React.PropTypes.number,
  setOrderBy: React.PropTypes.func,
  refresh: React.PropTypes.func,
  inProgress: React.PropTypes.bool
}

export default ListView
