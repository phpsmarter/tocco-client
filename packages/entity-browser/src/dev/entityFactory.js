const getRandomDate = (startYear, endYear) => {
  const start = new Date(startYear, 1, 1)
  const end = new Date(endYear, 1, 1)
  const date = new Date(+start + Math.random() * (end - start))
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const createUsers = amount => {
  const entities = []
  const userTemplate = require('./user_template.json')

  for (let i = 0; i < amount; i++) {
    entities.push({
      ...userTemplate,
      key: i,
      paths: {
        ...userTemplate.paths,
        user_nr: {
          type: 'field',
          value: {
            type: 'counter',
            value: i,
            writable: false
          }
        },
        firstname: {
          type: 'field',
          value: {
            value: 'Firstname ' + i,
            type: 'string',
            writable: true
          }
        },
        lastname: {
          type: 'field',
          value: {
            value: 'Lastname ' + (amount - i),
            type: 'string',
            writable: true
          }
        },
        birthdate: {
          type: 'field',
          value: {
            value: getRandomDate(1980, 2010),
            type: 'birthdate',
            writable: true
          }
        },
        age: {
          type: 'field',
          value: {
            value: getRandomInt(10, 100),
            type: 'number',
            writable: true
          }
        },
        salary: {
          type: 'field',
          value: {
            value: 1000 + i * 2.1,
            type: 'moneyamount',
            writable: true
          }
        },
        publish: {
          type: 'field',
          value: {
            value: (i % 2 === 0),
            type: 'boolean',
            writable: true
          }
        }
      }
    })
  }
  return entities
}
