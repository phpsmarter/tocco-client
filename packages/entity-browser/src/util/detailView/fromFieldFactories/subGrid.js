import React from 'react'
import SubGrid from '../../../routes/detail/components/SubGrid/index'

export default type =>
  (formField, modelField, props, events, utils) => (
    <SubGrid
      {...props}
      formDefinition={{children: formField.children}}
      relationName={formField.name}
    />
  )
