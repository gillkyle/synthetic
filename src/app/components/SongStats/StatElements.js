import glamorous from 'glamorous';

const StatRow = glamorous.div({
  '@supports (display: grid)': {
    display: 'grid',
    gridTemplateColumns: '1.5fr 0.5fr 3fr',
    gridTemplateAreas: `
      "title value graph"
    `,
    gridGap: '10px',
  },
  fontSize: 17,
  marginBottom: 15
})
const StatDoubleNumber = glamorous.div({
  '@supports (display: grid)': {
    display: 'grid',
    gridTemplateColumns: '1.5fr 0.5fr 0.5fr 1.5fr 0.5fr',
    gridTemplateAreas: `
      "title value blank title2 value2"
    `,
    gridGap: '10px',
  },
  fontSize: 17,
  marginBottom: 15
})
const StatTitle = glamorous.div({
  color: '#bbb',
  gridArea: 'title',
  textAlign: 'left'
})
const StatValue = glamorous.div({
  color: '#777',
  gridArea: 'value',
  textAlign: 'right'
})
const StatGraphHolder = glamorous.div({
  gridArea: 'graph',
  display: 'flex'
})
const StatGraph = glamorous.div({
  color: '#777',
  background: 'linear-gradient(to left, #27b7ff, #70D5FF)',
  transition: 'width 0.5s ease',
  height: 8,
  alignSelf: 'center',
  borderRadius: '3px'
})

export { StatRow, StatTitle, StatValue, StatGraphHolder, StatGraph, StatDoubleNumber }