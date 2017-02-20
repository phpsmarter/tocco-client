import {request, getRequest} from 'tocco-util/src/rest'
import {SubmissionError} from 'redux-form'
import {validationErrorToFormError} from '../reduxForms'

export function fetchEntity(entityName, id, fields) {
  const params = {
    '_paths': fields.join(',')
  }

  return request(`entities/${entityName}/${id}`, params)
    .then(resp => resp.body)
}

export function updateEntity(entity, fields) {
  const params = {
    '_paths': fields.join(',')
  }
  return request(`entities/${entity.model}/${entity.key}`, params, 'PATCH', entity, ['VALIDATION_FAILED'])
    .then(resp => {
      if (resp.body.errorCode === 'VALIDATION_FAILED') {
        throw new SubmissionError(validationErrorToFormError(entity, resp.body.errors))
      }
      return resp.body
    })
}

export const defaultModelTransformer = json => {
  const model = {}
  json.fields.forEach(field => {
    model[field.fieldName] = {
      ...field
    }
  })

  json.relations.forEach(relation => {
    model[relation.relationName] = {
      type: 'relation',
      targetEntity: relation.targetEntity
    }
  })
  return model
}

export function fetchModel(entityName, transformer = defaultModelTransformer) {
  return request(`entities/${entityName}/model`)
    .then(resp => resp.body)
    .then(json => transformer(json))
}

export function fetchEntityCount(entityName, searchInputs) {
  const params = {
    ...searchInputs
  }
  return request(`entities/${entityName}/count`, params)
    .then(resp => resp.body)
    .then(json => json.count)
}

export const entitiesListTransformer = json => {
  return json.data.map(entity => {
    const result = {
      id: entity.key,
      values: {}
    }

    const paths = entity.paths
    for (const path in paths) {
      const type = paths[path].type
      if (type === 'field') {
        result.values[path] = paths[path].value.value
      }
      // } else if (type === 'entity' & false) {
      //   result.values[path] = {
      //     type: 'string',
      //     value: paths[path].value ? paths[path].value.display : ''
      //   }
      // } else if (type === 'entity-list') {
      //   result.values[path] = {
      //     type: 'string',
      //     value: paths[path].value ? paths[path].value.map(v => v.display).join(', ') : ''
      //   }
      // }
    }
    return result.values
  })
}

const defaultEntitiesTransformer = json => (json)

export function fetchEntities(entityName, {
  page = undefined,
  orderBy = {},
  limit = undefined,
  fields = [],
  searchInputs = {},
  formName = undefined
} = {}, transformer = defaultEntitiesTransformer) {
  const params = {
    '_sort': Object.keys(orderBy || {}).length === 2 ? `${orderBy.name} ${orderBy.direction}` : undefined,
    '_paths': fields.join(','),
    '_form': formName,
    ...searchInputs
  }

  if (limit) {
    params._limit = limit
    if (page) {
      params._offset = (page - 1) * limit
    }
  }

  return getRequest(`entities/${entityName}`, params, [])
    .then(resp => resp.body)
    .then(json => transformer(json))
}

export const combineEntitiesInObject = entitiesList => {
  const result = {}
  entitiesList.forEach(entities => {
    result[entities.metaData.modelName] = entities.data.map(entity => ({
      displayName: entity.display,
      value: entity.key
    }))
  })

  return result
}

export const getInitialSelectBoxStore = paths => {
  const keys = Object.keys(paths)
  const stores = []
  for (let i = 0; i < keys.length; i++) {
    let store = []
    const key = keys[i]
    const field = paths[key]
    if (field.type === 'entity') {
      if (field.value != null) {
        store = [{value: field.value.key, label: field.value.display}]
      }
    } else if (field.type === 'entity-list') {
      if (field.value != null && field.value.length > 0) {
        store = field.value.map(e => ({value: e.key, label: e.display}))
      }
    }

    stores.push({key, store})
  }

  return stores
}
